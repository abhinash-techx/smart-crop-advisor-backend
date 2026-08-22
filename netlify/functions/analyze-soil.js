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

दिए गए मिट्टी के फोटो का केवल दृश्य आधार पर विश्लेषण करें।

महत्वपूर्ण:
- फोटो से exact pH, NPK या laboratory values का दावा न करें।
- जहां अनुमान हो वहां "संभावित" या "अनुमान" लिखें।
- उत्तर छोटा, साफ और किसान के लिए आसान होना चाहिए।
- लंबे paragraph बिल्कुल न लिखें।

उत्तर बिल्कुल इस format में दें:

🌱 मिट्टी की स्थिति:
• 1-2 छोटे points

🪨 संभावित मिट्टी का प्रकार:
• 1-2 छोटे points

💧 नमी की स्थिति:
• 1-2 छोटे points

🌾 उपयुक्त फसलें:
• फसल 1
• फसल 2
• फसल 3

⚠️ ध्यान देने योग्य बातें:
• 1-2 छोटे points

👨‍🌾 किसान के लिए सुझाव:
• 2-3 practical points

उत्तर केवल हिंदी में दें।
`;

    }


    if (language === "bho") {

        return `
रउआ एगो कृषि विशेषज्ञ AI बानी।

दिहल गइल माटी के फोटो के खाली दृश्य आधार पर जांचीं।

जरूरी:
- फोटो से exact pH, NPK या laboratory value बतावे के दावा मत करीं।
- जहां अनुमान होखे, "संभावित" या "अनुमान" साफ लिखीं।
- जवाब छोट, साफ आ किसान खातिर आसान होखे।
- लंबा paragraph बिल्कुल मत लिखीं।

जवाब ठीक एह format में दीं:

🌱 माटी के स्थिति:
• 1-2 छोट points

🪨 संभावित माटी के प्रकार:
• 1-2 छोट points

💧 नमी के स्थिति:
• 1-2 छोट points

🌾 बढ़िया फसल:
• फसल 1
• फसल 2
• फसल 3

⚠️ ध्यान देवे लायक बात:
• 1-2 छोट points

👨‍🌾 किसान खातिर सुझाव:
• 2-3 practical points

जवाब खाली भोजपुरी में दीं।
`;

    }


    return `
You are an agricultural soil analysis AI.

Analyze the provided soil image using visual observations only.

IMPORTANT:
- Do NOT claim exact pH, NPK or laboratory values from an ordinary photograph.
- Clearly label estimates as "Possible" or "Estimated".
- Keep the answer short and easy for a farmer to understand.
- Do NOT write long paragraphs.

Use EXACTLY this format:

🌱 Soil Condition:
• 1-2 short points

🪨 Possible Soil Type:
• 1-2 short points

💧 Moisture Condition:
• 1-2 short points

🌾 Suitable Crops:
• Crop 1
• Crop 2
• Crop 3

⚠️ Things to Watch:
• 1-2 short points

👨‍🌾 Farmer Recommendations:
• 2-3 practical points

Respond only in English.
`;

}

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

किसान की मिट्टी की जानकारी:

${baseData}

इन values का विश्लेषण करें।

लंबे paragraph बिल्कुल न लिखें।
उत्तर छोटे और स्पष्ट bullet points में दें।

ठीक इस format का उपयोग करें:

🌱 मिट्टी का स्वास्थ्य:
• स्थिति बताएं
• छोटा कारण बताएं

🧪 pH की स्थिति:
• pH कैसा है
• इसका प्रभाव क्या है

🌿 NPK की स्थिति:
• Nitrogen (N): स्थिति
• Phosphorus (P): स्थिति
• Potassium (K): स्थिति

💧 नमी की स्थिति:
• स्थिति बताएं

🌾 उपयुक्त फसलें:
• फसल 1
• फसल 2
• फसल 3

⚠️ पोषक तत्वों की कमी:
• यदि कोई कमी है तो बताएं
• सुधार का छोटा सुझाव दें

👨‍🌾 किसान के लिए सुझाव:
• 2-3 practical recommendations

उत्तर केवल आसान हिंदी में दें।
`;

    }


    if (language === "bho") {

        return `
रउआ एगो कृषि विशेषज्ञ AI बानी।

किसान के माटी के जानकारी:

${baseData}

एह जानकारी के जांचीं।

लंबा paragraph बिल्कुल मत लिखीं।
जवाब छोट आ साफ bullet points में दीं।

ठीक एह format में जवाब दीं:

🌱 माटी के स्वास्थ्य:
• स्थिति बताईं
• छोट कारण बताईं

🧪 pH के स्थिति:
• pH कइसन बा
• एकर असर का बा

🌿 NPK के स्थिति:
• Nitrogen (N): स्थिति
• Phosphorus (P): स्थिति
• Potassium (K): स्थिति

💧 नमी के स्थिति:
• स्थिति बताईं

🌾 बढ़िया फसल:
• फसल 1
• फसल 2
• फसल 3

⚠️ पोषक तत्व के कमी:
• अगर कमी बा त बताईं
• सुधार के छोट सुझाव दीं

👨‍🌾 किसान खातिर सुझाव:
• 2-3 practical सलाह

जवाब खाली आसान भोजपुरी में दीं।
`;

    }


    return `
You are an agricultural soil analysis AI.

Farmer's soil information:

${baseData}

Analyze the information.

Do NOT write long paragraphs.
Give the answer in short, clear bullet points.

Use EXACTLY this format:

🌱 Soil Health:
• Give the health status
• Give a short reason

🧪 pH Status:
• Explain the pH status
• Mention its possible effect

🌿 NPK Status:
• Nitrogen (N): status
• Phosphorus (P): status
• Potassium (K): status

💧 Moisture Status:
• Give the moisture status

🌾 Suitable Crops:
• Crop 1
• Crop 2
• Crop 3

⚠️ Nutrient Deficiency:
• Mention any deficiency
• Give a short improvement suggestion

👨‍🌾 Farmer Recommendations:
• 2-3 practical recommendations

Respond only in simple English.
`;

}

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