const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

exports.handler = async (event) => {

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

            const resultText = response.text || "";

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

            const prompt = getManualPrompt(
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

            const response = await ai.models.generateContent({

                model: "gemini-3.6-flash",

                contents: prompt

            });

            const resultText = response.text || "";

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

दिए गए मिट्टी के फोटो का दृश्य विश्लेषण करें।

महत्वपूर्ण:
सिर्फ फोटो के आधार पर pH, NPK या laboratory values को exact बताने का दावा न करें।

उत्तर केवल छोटे और स्पष्ट bullet points में दें।

इस exact format का उपयोग करें:

🌱 मिट्टी का प्रकार
• संभावित मिट्टी का प्रकार बताएं
• यदि निश्चित नहीं है तो "संभावित" लिखें

🔍 दिखाई देने वाली विशेषताएं
• मिट्टी का रंग
• बनावट
• कणों की स्थिति
• अन्य दिखाई देने वाली विशेषताएं

💧 नमी की स्थिति
• सूखी / सामान्य / अधिक नमी
• छोटा कारण

🧪 सामान्य मिट्टी की स्थिति
• अच्छी / सामान्य / सुधार की आवश्यकता
• छोटा कारण

🌾 संभावित उपयुक्त फसलें
• फसल 1
• फसल 2
• फसल 3

⚠️ संभावित समस्याएं
• समस्या 1
• समस्या 2
• यदि कोई स्पष्ट समस्या नहीं दिखती तो ऐसा बताएं

💡 किसान के लिए सुझाव
• सुझाव 1
• सुझाव 2
• सुझाव 3

📌 महत्वपूर्ण नोट
• pH और NPK जैसी exact values केवल proper soil testing से पता चलती हैं।

लंबे paragraphs न लिखें।
उत्तर हिंदी में दें।
`;

    }


    if (language === "bho") {

        return `
रउआ एगो कृषि विशेषज्ञ AI बानी।

दिहल गइल माटी के फोटो के ध्यान से दृश्य जांच करीं।

जरूरी:
सिर्फ फोटो के आधार पर pH, NPK या laboratory value के exact बतावे के दावा मत करीं।

जवाब खाली छोट-छोट आ साफ bullet points में दीं।

ई exact format इस्तेमाल करीं:

🌱 माटी के प्रकार
• संभावित माटी के प्रकार
• अगर पक्का ना होखे त "संभावित" लिखीं

🔍 देखाई देत विशेषता
• माटी के रंग
• बनावट
• कण के स्थिति
• अउरी देखाई देत विशेषता

💧 नमी के स्थिति
• सूखल / सामान्य / जादे नमी
• छोट कारण

🧪 माटी के सामान्य हालत
• बढ़िया / सामान्य / सुधार के जरूरत
• छोट कारण

🌾 संभावित बढ़िया फसल
• फसल 1
• फसल 2
• फसल 3

⚠️ संभावित समस्या
• समस्या 1
• समस्या 2
• अगर साफ समस्या ना दिखे त ई बताईं

💡 किसान खातिर सुझाव
• सुझाव 1
• सुझाव 2
• सुझाव 3

📌 जरूरी जानकारी
• pH आ NPK के exact value सही soil testing से ही पता चलेला।

लंबा paragraph मत लिखीं।
जवाब भोजपुरी में दीं।
`;

    }


    return `
You are an agricultural soil analysis AI.

Carefully analyze the provided soil image visually.

IMPORTANT:
Do NOT claim exact pH, NPK or laboratory measurements from an ordinary photograph.

Return ONLY short, clear bullet points.

Use this exact format:

🌱 Soil Type
• Possible soil type
• Clearly mention if it is only an estimate

🔍 Visible Characteristics
• Soil color
• Texture
• Particle appearance
• Other visible characteristics

💧 Moisture Condition
• Dry / Normal / High
• Short reason

🧪 General Soil Condition
• Good / Fair / Needs Improvement
• Short reason

🌾 Potentially Suitable Crops
• Crop 1
• Crop 2
• Crop 3

⚠️ Possible Problems
• Problem 1
• Problem 2
• If no obvious problem is visible, say so

💡 Farmer Recommendations
• Recommendation 1
• Recommendation 2
• Recommendation 3

📌 Important Note
• Exact pH and NPK values require proper laboratory soil testing.

Do NOT write long paragraphs.
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

किसान की मिट्टी की जांच:

${baseData}

इन values का विश्लेषण करें।

उत्तर केवल छोटे और स्पष्ट bullet points में दें।

इस exact format का उपयोग करें:

🌱 मिट्टी का स्वास्थ्य
• अच्छा / सामान्य / सुधार की आवश्यकता
• छोटा कारण

🧪 pH की स्थिति
• pH value: ${soil.ph}
• अम्लीय / सामान्य / क्षारीय
• छोटा सुझाव

🧬 पोषक तत्वों की स्थिति
• Nitrogen (N): ${soil.nitrogen}
• Phosphorus (P): ${soil.phosphorus}
• Potassium (K): ${soil.potassium}

💧 नमी की स्थिति
• Moisture: ${soil.moisture}%
• स्थिति और छोटा सुझाव

🌾 उपयुक्त फसलें
• फसल 1
• फसल 2
• फसल 3

⚠️ संभावित समस्याएं
• समस्या 1
• समस्या 2
• यदि कोई बड़ी समस्या नहीं है तो ऐसा बताएं

💡 किसान के लिए सुझाव
• सुझाव 1
• सुझाव 2
• सुझाव 3

📌 खाद / पोषक तत्व सुझाव
• केवल दिए गए soil values के आधार पर सामान्य सुझाव दें
• exact fertilizer dosage का दावा न करें

लंबे paragraphs न लिखें।
आसान हिंदी में उत्तर दें।
`;

    }


    if (language === "bho") {

        return `
रउआ एगो कृषि विशेषज्ञ AI बानी।

किसान के माटी जांच:

${baseData}

ई जानकारी के जांचीं।

जवाब खाली छोट-छोट आ साफ bullet points में दीं।

ई exact format इस्तेमाल करीं:

🌱 माटी के स्वास्थ्य
• बढ़िया / सामान्य / सुधार के जरूरत
• छोट कारण

🧪 pH के स्थिति
• pH value: ${soil.ph}
• अम्लीय / सामान्य / क्षारीय
• छोट सुझाव

🧬 पोषक तत्व के स्थिति
• Nitrogen (N): ${soil.nitrogen}
• Phosphorus (P): ${soil.phosphorus}
• Potassium (K): ${soil.potassium}

💧 नमी के स्थिति
• Moisture: ${soil.moisture}%
• स्थिति आ छोट सुझाव

🌾 बढ़िया फसल
• फसल 1
• फसल 2
• फसल 3

⚠️ संभावित समस्या
• समस्या 1
• समस्या 2
• अगर कवनो बड़ी समस्या ना होखे त ई बताईं

💡 किसान खातिर सुझाव
• सुझाव 1
• सुझाव 2
• सुझाव 3

📌 खाद / पोषक तत्व सुझाव
• दिहल soil values के आधार पर सामान्य सुझाव दीं
• exact fertilizer dosage के दावा मत करीं

लंबा paragraph मत लिखीं।
आसान भोजपुरी में जवाब दीं।
`;

    }


    return `
You are an agricultural soil analysis AI.

Farmer's soil test information:

${baseData}

Analyze the values.

Return ONLY short, clear bullet points.

Use this exact format:

🌱 Soil Health
• Good / Fair / Needs Improvement
• Short reason

🧪 pH Status
• pH value: ${soil.ph}
• Acidic / Normal / Alkaline
• Short recommendation

🧬 Nutrient Status
• Nitrogen (N): ${soil.nitrogen}
• Phosphorus (P): ${soil.phosphorus}
• Potassium (K): ${soil.potassium}

💧 Moisture Status
• Moisture: ${soil.moisture}%
• Condition and short recommendation

🌾 Suitable Crops
• Crop 1
• Crop 2
• Crop 3

⚠️ Possible Problems
• Problem 1
• Problem 2
• If there is no major problem, say so

💡 Farmer Recommendations
• Recommendation 1
• Recommendation 2
• Recommendation 3

📌 Fertilizer / Nutrient Suggestions
• Give general suggestions based on the provided soil values
• Do not claim an exact fertilizer dosage

Do NOT write long paragraphs.
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