// =========================================
// SMART CROP ADVISOR
// MARKET INSIGHT - NETLIFY FUNCTION
// =========================================

exports.handler = async (event) => {

    if (event.httpMethod !== "GET") {
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

        const params = event.queryStringParameters || {};

        const crop = String(params.crop || "").trim();
        const language = String(params.language || "en").toLowerCase();

        if (!crop) {
            return {
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    success: false,
                    message: "Crop name is required"
                })
            };
        }

        // -----------------------------------------
        // DEMO MARKET DATA
        // -----------------------------------------
        // Later this can be replaced with a
        // live government/market API.

        const marketData = getMarketData(crop, language);

        return {
            statusCode: 200,

            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=1800"
            },

            body: JSON.stringify({
                success: true,
                crop: crop,
                market: marketData
            })
        };

    } catch (error) {

        console.error(
            "Market Insight Error:",
            error
        );

        return {
            statusCode: 500,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                success: false,
                message: "Unable to get market information."
            })
        };
    }
};


// =========================================
// MARKET DATA
// =========================================

function getMarketData(crop, language) {

    const cropKey = crop.toLowerCase();

    const prices = {

        rice: {
            price: 2350,
            trend: "up"
        },

        wheat: {
            price: 2480,
            trend: "stable"
        },

        maize: {
            price: 2200,
            trend: "up"
        },

        potato: {
            price: 1800,
            trend: "down"
        },

        tomato: {
            price: 3200,
            trend: "up"
        },

        onion: {
            price: 2800,
            trend: "stable"
        },

        sugarcane: {
            price: 380,
            trend: "stable"
        },

        mustard: {
            price: 5900,
            trend: "up"
        },

        soybean: {
            price: 4600,
            trend: "up"
        }

    };


    const data =
        prices[cropKey] || {
            price: 2500,
            trend: "stable"
        };


    const translations = {

        en: {

            unit: "₹ / quintal",

            up: "Price is increasing",

            down: "Price is decreasing",

            stable: "Price is stable",

            advice:
                "Monitor the market before selling. Compare prices at nearby markets and consider storage if prices are expected to improve."

        },

        hi: {

            unit: "₹ / क्विंटल",

            up: "कीमत बढ़ रही है",

            down: "कीमत घट रही है",

            stable: "कीमत स्थिर है",

            advice:
                "बेचने से पहले बाजार पर नजर रखें। नजदीकी मंडियों की कीमतों की तुलना करें और कीमत बढ़ने की संभावना हो तो भंडारण पर विचार करें।"

        },

        bho: {

            unit: "₹ / क्विंटल",

            up: "भाव बढ़ रहल बा",

            down: "भाव घट रहल बा",

            stable: "भाव स्थिर बा",

            advice:
                "बेचे से पहिले बाजार के भाव देखीं। नजदीकी मंडी के भाव से तुलना करीं आ भाव बढ़े के उम्मीद होखे त भंडारण पर विचार करीं।"

        }

    };


    const t =
        translations[language] ||
        translations.en;


    return {

        price: data.price,

        unit: t.unit,

        trend: data.trend,

        trendText:
            data.trend === "up"
                ? t.up
                : data.trend === "down"
                    ? t.down
                    : t.stable,

        advice: t.advice

    };

}