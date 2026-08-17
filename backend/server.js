const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const { recommendCrops } = require("./recommendation");

const app = express();


// ================= GEMINI SETUP =================

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


// ================= MIDDLEWARE =================

app.use(cors());
app.use(express.json());


// ================= TEST ROUTE =================

app.get("/", (req, res) => {

    res.send("🌾 Smart Crop Advisor Backend is Running!");

});


// ================= CROP RECOMMENDATION API =================

app.post("/recommend", async (req, res) => {

    try {

        const farmerData = req.body;

        console.log("Farmer Data Received:");
        console.log(farmerData);


        // Your existing recommendation system
        const recommendations = recommendCrops(farmerData);

        console.log("Local Recommendations:");
        console.log(recommendations);


        // ================= GEMINI AI =================

        const prompt = `
You are an agricultural advisor helping a small farmer in India.

Analyze the following farmer information:

Farmer Name: ${farmerData.farmerName}
State: ${farmerData.state}
District/Village: ${farmerData.district}

Land Area: ${farmerData.landArea} acres
Soil Type: ${farmerData.soilType}
Soil pH: ${farmerData.ph}
Water Availability: ${farmerData.waterAvailability}
Previous Crop: ${farmerData.previousCrop}
Farming Type: ${farmerData.farmingType}

Average Temperature: ${farmerData.temperature} °C
Expected Rainfall: ${farmerData.rainfall} mm
Sowing Season: ${farmerData.sowingSeason}
Fertilizer Usage: ${farmerData.fertilizerUsage}

Our rule-based system has recommended these crops:

${JSON.stringify(recommendations, null, 2)}

Give a short, practical agricultural advisory.

Explain:
1. Which crop is the best choice and why.
2. Why the soil and climate are suitable.
3. Water requirement.
4. One important farming tip.
5. One risk or caution.

Keep the answer simple enough for a small farmer to understand.
Do not invent exact prices or guarantees.
`;


        const response = await ai.models.generateContent({

            model: "gemini-3.6-flash",

            contents: prompt

        });


        const aiAdvice = response.text;


        console.log("Gemini Advice:");
        console.log(aiAdvice);


        // ================= FINAL RESPONSE =================

        res.json({

            success: true,

            recommendations: recommendations,

            aiAdvice: aiAdvice

        });


    } catch (error) {

        console.error("Recommendation Error:", error);


        res.status(500).json({

            success: false,

            message: "Failed to generate crop recommendation",

            error: error.message

        });

    }

});


// ================= START SERVER =================

const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `🌾 Smart Crop Advisor running on http://localhost:${PORT}`
    );

});