const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

exports.handler = async (event) => {

    // Only POST request allowed
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                success: false,
                message: "Method not allowed"
            })
        };
    }

    try {

        const data = JSON.parse(event.body || "{}");

        const {
            mode,
            language = "en",
            soilType,
            ph,
            nitrogen,
            phosphorus,
            potassium,
            moisture,
            location,
            image
        } = data;


        // =====================================
        // IMAGE ANALYSIS
        // =====================================

        if (mode === "image") {

            if (!image) {
                return {
                    statusCode: 400,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        success: false,
                        message: "Soil image is required"
                    })
                };
            }


            const prompt = getImagePrompt(language);


            const response = await ai.models.generateContent({

                model: "gemini-3.6-flash",

                contents: [
                    {
                        role: "user",

                        parts: [
                            {
                                text: prompt
                            },
                            {
                                inlineData: {
                                    mimeType: getMimeType(image),
                                    data: removeBase64Prefix(image)
                                }
                            }
                        ]
                    }
                ]

            });


            const resultText =
                response.text || "";


            return {
                statusCode: 200,

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    success: true,

                    result: {
                        visualAssessment: resultText
                    }

                })
            };
        }


        // =====================================
        // MANUAL ANALYSIS
        // =====================================

        if (mode === "manual") {

            if (
                !soilType ||
                ph === undefined ||
                nitrogen === undefined ||
                phosphorus === undefined ||
                potassium === undefined ||
                moisture === undefined
            ) {

                return {
                    statusCode: 400,

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        success: false,
                        message: "Required soil data is missing"
                    })
                };
            }


            const prompt =
                getManualPrompt(
                    language,
                    {
                        soilType,
                        ph,
                        nitrogen,
                        phosphorus,
                        potassium,
                        moisture,
                        location
                    }
                );


            const response =
                await ai.models.generateContent({

                    model: "gemini-3.6-flash",

                    contents: prompt

                });


            const resultText =
                response.text || "";


            return {
                statusCode: 200,

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    success: true,

                    result: {
                        soilHealth: resultText
                    }

                })
            };
        }


        // =====================================
        // INVALID MODE
        // =====================================

        return {
            statusCode: 400,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                success: false,
                message: "Invalid analysis mode"
            })
        };


    } catch (error) {

        console.error(
            "Analyze Soil Function Error:",
            error
        );


        return {
            statusCode: 500,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                success: false,

                message:
                    "Soil analysis failed. Please try again."

            })
        };

    }

};


// =========================================
// IMAGE PROMPT
// =========================================

function getImagePrompt(language) {

    if (language === "hi") {

        return `
आप एक कृषि विशेषज्ञ AI हैं।

दिए गए मिट्टी के फोटो का सावधानीपूर्वक दृश्य विश्लेषण करें।

महत्वपूर्ण:
केवल फोटो के आधार पर pH, NPK या अन्य laboratory values को exact बताने का दावा न करें।

विश्लेषण में बताएं:

1. मिट्टी की दिखाई देने वाली विशेषताएं
2. संभावित मिट्टी का प्रकार
3. नमी की दृश्य स्थिति
4. मिट्टी की सामान्य स्थिति
5. संभावित रूप से उपयुक्त फसलें
6. किसान के लिए व्यावहारिक सुझाव

जहां जानकारी केवल अनुमान है, वहां स्पष्ट रूप से "संभावित" या "अनुमान" शब्द का उपयोग करें।

उत्तर हिंदी में दें।
`;

    }


    if (language === "bho") {

        return `
रउआ एगो कृषि विशेषज्ञ AI बानी।

दिहल गइल माटी के फोटो के ध्यान से दृश्य जांच करीं।

जरूरी:
सिर्फ फोटो के आधार पर pH, NPK या laboratory value के exact बतावे के दावा मत करीं।

जांच में बताईं:

1. माटी में देखाई देत विशेषता
2. संभावित माटी के प्रकार
3. नमी के दृश्य स्थिति
4. माटी के सामान्य हालत
5. संभावित रूप से बढ़िया फसल
6. किसान खातिर काम के सुझाव

जहां जानकारी अनुमान पर आधारित होखे, साफ-साफ बताईं कि ई संभावित/अनुमान बा।

जवाब भोजपुरी में दीं।
`;

    }


    return `
You are an agricultural soil analysis AI.

Carefully analyze the provided soil image visually.

Important:
Do NOT claim exact pH, NPK or laboratory measurements from an ordinary photograph.

Provide:

1. Visible soil characteristics
2. Possible soil type
3. Visual moisture condition
4. General soil condition
5. Potentially suitable crops
6. Practical suggestions for the farmer

Clearly mention when something is only an estimate or visual observation.

Respond in English.
`;

}


// =========================================
// MANUAL PROMPT
// =========================================

function getManualPrompt(language, soil) {

    const baseData = `
Soil Type: ${soil.soilType}
pH: ${soil.ph}
Nitrogen (N): ${soil.nitrogen}
Phosphorus (P): ${soil.phosphorus}
Potassium (K): ${soil.potassium}
Moisture: ${soil.moisture}%
Location: ${soil.location || "Not provided"}
`;


    if (language === "hi") {

        return `
आप एक कृषि विशेषज्ञ AI हैं।

नीचे किसान की मिट्टी की जांच की जानकारी दी गई है:

${baseData}

इन values का विश्लेषण करके आसान हिंदी में बताएं:

1. मिट्टी का स्वास्थ्य
2. pH की स्थिति
3. NPK की स्थिति
4. नमी की स्थिति
5. उपयुक्त फसलें
6. पोषक तत्वों की कमी होने पर सुझाव
7. किसान के लिए practical recommendations

जहां संभव हो, स्पष्ट और आसान भाषा का उपयोग करें।

उत्तर हिंदी में दें।
`;

    }


    if (language === "bho") {

        return `
रउआ एगो कृषि विशेषज्ञ AI बानी।

किसान के माटी जांच के जानकारी नीचे दिहल बा:

${baseData}

एकरा के आसान भोजपुरी में जांचीं आ बताईं:

1. माटी के स्वास्थ्य
2. pH के स्थिति
3. NPK के स्थिति
4. नमी के स्थिति
5. बढ़िया फसल
6. पोषक तत्व के कमी होखे त सुझाव
7. किसान खातिर practical सलाह

जवाब भोजपुरी में दीं।
`;

    }


    return `
You are an agricultural soil analysis AI.

Here is the farmer's soil test information:

${baseData}

Analyze the values and provide:

1. Soil health
2. pH status
3. NPK status
4. Moisture status
5. Suitable crops
6. Nutrient deficiency suggestions
7. Practical recommendations for the farmer

Use simple and easy-to-understand language.

Respond in English.
`;

}


// =========================================
// IMAGE HELPERS
// =========================================

function removeBase64Prefix(image) {

    return image.replace(
        /^data:image\/[a-zA-Z0-9.+-]+;base64,/,
        ""
    );

}


function getMimeType(image) {

    const match =
        image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);

    return match
        ? match[1]
        : "image/jpeg";

}