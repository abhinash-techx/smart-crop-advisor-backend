const express = require("express");
const cors = require("cors");

const { recommendCrops } = require("./recommendation");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Test route
app.get("/", (req, res) => {

    res.send("🌾 Smart Crop Advisor Backend is Running!");

});


// Crop Recommendation API
app.post("/recommend", (req, res) => {

    try {

        const farmerData = req.body;

        console.log("Farmer Data Received:");
        console.log(farmerData);


        const recommendations =
            recommendCrops(farmerData);


        console.log("Recommendations:");
        console.log(recommendations);


        res.json({

            success: true,

            recommendations: recommendations

        });


    } catch (error) {

        console.error("Recommendation Error:", error);


        res.status(500).json({

            success: false,

            message: "Failed to generate crop recommendation"

        });

    }

});


// Start Server
const PORT = 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${5000}`
    );

});