// =========================================
// SMART CROP ADVISOR
// CURRENT WEATHER - NETLIFY FUNCTION
// =========================================

exports.handler = async (event) => {

    // Only GET request allowed
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

        const latitude = parseFloat(params.latitude);
        const longitude = parseFloat(params.longitude);
        const language = String(params.language || "en").toLowerCase();

        // Validate location
        if (
            Number.isNaN(latitude) ||
            Number.isNaN(longitude)
        ) {
            return {
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    success: false,
                    message: "Valid latitude and longitude are required"
                })
            };
        }

        // =========================================
        // OPEN-METEO API
        // =========================================

        const weatherURL =
            `https://api.open-meteo.com/v1/forecast` +
            `?latitude=${latitude}` +
            `&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,wind_speed_10m` +
            `&timezone=auto`;

        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw new Error("Weather API request failed");
        }

        const weatherData = await response.json();

        const current = weatherData.current;

        // =========================================
        // WEATHER CONDITION
        // =========================================

        const condition = getWeatherCondition(
            current.weather_code,
            language
        );

        // =========================================
        // FARMER ADVISORY
        // =========================================

        const advisory = getFarmerAdvisory(
            current,
            language
        );

        // =========================================
        // RESPONSE
        // =========================================

        return {
            statusCode: 200,

            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=300"
            },

            body: JSON.stringify({

                success: true,

                location: {
                    latitude,
                    longitude,
                    timezone: weatherData.timezone || ""
                },

                weather: {

                    temperature:
                        current.temperature_2m,

                    feelsLike:
                        current.apparent_temperature,

                    humidity:
                        current.relative_humidity_2m,

                    precipitation:
                        current.precipitation,

                    rain:
                        current.rain,

                    windSpeed:
                        current.wind_speed_10m,

                    weatherCode:
                        current.weather_code,

                    condition

                },

                advisory

            })
        };

    } catch (error) {

        console.error(
            "Current Weather Function Error:",
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
                    "Unable to fetch current weather. Please try again."

            })
        };
    }
};


// =========================================
// WEATHER CONDITIONS
// =========================================

function getWeatherCondition(code, language) {

    const conditions = {

        0: {
            en: "Clear sky",
            hi: "साफ आसमान",
            bho: "साफ आसमान"
        },

        1: {
            en: "Mainly clear",
            hi: "मुख्य रूप से साफ",
            bho: "ज्यादातर साफ"
        },

        2: {
            en: "Partly cloudy",
            hi: "आंशिक रूप से बादल",
            bho: "थोड़ा बादल"
        },

        3: {
            en: "Overcast",
            hi: "बादल छाए हुए",
            bho: "बादल छाइल बा"
        },

        45: {
            en: "Foggy",
            hi: "कोहरा",
            bho: "कोहरा"
        },

        48: {
            en: "Foggy",
            hi: "कोहरा",
            bho: "कोहरा"
        },

        51: {
            en: "Light drizzle",
            hi: "हल्की बूंदाबांदी",
            bho: "हल्का बूंदाबांदी"
        },

        53: {
            en: "Drizzle",
            hi: "बूंदाबांदी",
            bho: "बूंदाबांदी"
        },

        55: {
            en: "Heavy drizzle",
            hi: "तेज बूंदाबांदी",
            bho: "तेज बूंदाबांदी"
        },

        61: {
            en: "Light rain",
            hi: "हल्की बारिश",
            bho: "हल्का बरखा"
        },

        63: {
            en: "Moderate rain",
            hi: "मध्यम बारिश",
            bho: "मध्यम बरखा"
        },

        65: {
            en: "Heavy rain",
            hi: "भारी बारिश",
            bho: "भारी बरखा"
        },

        71: {
            en: "Light snowfall",
            hi: "हल्की बर्फबारी",
            bho: "हल्का बरफबारी"
        },

        73: {
            en: "Snowfall",
            hi: "बर्फबारी",
            bho: "बरफबारी"
        },

        75: {
            en: "Heavy snowfall",
            hi: "भारी बर्फबारी",
            bho: "भारी बरफबारी"
        },

        80: {
            en: "Rain showers",
            hi: "बारिश की फुहार",
            bho: "बरखा के फुहार"
        },

        81: {
            en: "Rain showers",
            hi: "बारिश की फुहार",
            bho: "बरखा के फुहार"
        },

        82: {
            en: "Heavy rain showers",
            hi: "तेज बारिश",
            bho: "तेज बरखा"
        },

        95: {
            en: "Thunderstorm",
            hi: "गरज के साथ बारिश",
            bho: "गरज के साथ बरखा"
        },

        96: {
            en: "Thunderstorm with hail",
            hi: "ओलावृष्टि के साथ तूफान",
            bho: "ओला के साथ आंधी-तूफान"
        },

        99: {
            en: "Severe thunderstorm",
            hi: "तेज आंधी-तूफान",
            bho: "तेज आंधी-तूफान"
        }

    };

    const item = conditions[code] || {
        en: "Unknown weather",
        hi: "अज्ञात मौसम",
        bho: "मौसम के जानकारी उपलब्ध नइखे"
    };

    return item[language] || item.en;
}


// =========================================
// FARMER WEATHER ADVISORY
// =========================================

function getFarmerAdvisory(weather, language) {

    const temperature = weather.temperature_2m;
    const humidity = weather.relative_humidity_2m;
    const rain = weather.rain;
    const wind = weather.wind_speed_10m;
    const code = weather.weather_code;

    const advisories = [];

    // -----------------------------------------
    // ENGLISH
    // -----------------------------------------

    if (language === "en") {

        if (rain > 0 || [61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {
            advisories.push(
                "Rain is currently present or likely. Avoid unnecessary irrigation."
            );
        } else {
            advisories.push(
                "No significant rain is currently detected. Check soil moisture before irrigation."
            );
        }

        if (temperature >= 35) {
            advisories.push(
                "High temperature detected. Provide adequate irrigation and protect sensitive crops from heat stress."
            );
        } else if (temperature <= 10) {
            advisories.push(
                "Low temperature detected. Protect temperature-sensitive crops from cold stress."
            );
        }

        if (humidity >= 80) {
            advisories.push(
                "High humidity may increase fungal disease risk. Monitor crops carefully."
            );
        }

        if (wind >= 30) {
            advisories.push(
                "Strong wind detected. Avoid spraying pesticides or fertilizers during strong winds."
            );
        }

        advisories.push(
            "Always consider crop type, soil moisture and local field conditions before taking action."
        );

        return advisories;
    }


    // -----------------------------------------
    // HINDI
    // -----------------------------------------

    if (language === "hi") {

        if (rain > 0 || [61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {
            advisories.push(
                "अभी बारिश हो रही है या बारिश की स्थिति है। अनावश्यक सिंचाई से बचें।"
            );
        } else {
            advisories.push(
                "अभी महत्वपूर्ण बारिश नहीं हो रही है। सिंचाई से पहले मिट्टी की नमी जांचें।"
            );
        }

        if (temperature >= 35) {
            advisories.push(
                "तापमान अधिक है। पर्याप्त सिंचाई करें और संवेदनशील फसलों को गर्मी के तनाव से बचाएं।"
            );
        } else if (temperature <= 10) {
            advisories.push(
                "तापमान कम है। ठंड से प्रभावित होने वाली फसलों की सुरक्षा करें।"
            );
        }

        if (humidity >= 80) {
            advisories.push(
                "नमी अधिक है, जिससे फफूंद संबंधी रोगों का खतरा बढ़ सकता है। फसलों पर नजर रखें।"
            );
        }

        if (wind >= 30) {
            advisories.push(
                "हवा तेज है। तेज हवा में कीटनाशक या उर्वरक का छिड़काव करने से बचें।"
            );
        }

        advisories.push(
            "किसी भी कृषि निर्णय से पहले फसल, मिट्टी की नमी और खेत की स्थानीय स्थिति को ध्यान में रखें।"
        );

        return advisories;
    }


    // -----------------------------------------
    // BHOJPURI
    // -----------------------------------------

    if (language === "bho") {

        if (rain > 0 || [61, 63, 65, 80, 81, 82, 95, 96, 99].includes(code)) {
            advisories.push(
                "अभी बरखा हो रहल बा या बरखा के स्थिति बा। बिना जरूरत सिंचाई मत करीं।"
            );
        } else {
            advisories.push(
                "अभी खास बरखा नइखे। सिंचाई से पहिले माटी के नमी जरूर जांचीं।"
            );
        }

        if (temperature >= 35) {
            advisories.push(
                "तापमान बहुत अधिक बा। पर्याप्त पानी दीं आ फसल के गर्मी से बचाईं।"
            );
        } else if (temperature <= 10) {
            advisories.push(
                "तापमान कम बा। ठंड से प्रभावित होखे वाली फसल के बचाव करीं।"
            );
        }

        if (humidity >= 80) {
            advisories.push(
                "नमी बहुत अधिक बा, एहसे फफूंद वाला रोग के खतरा बढ़ सकेला। फसल पर नजर रखीं।"
            );
        }

        if (wind >= 30) {
            advisories.push(
                "हवा तेज बा। तेज हवा में कीटनाशक या खाद के छिड़काव मत करीं।"
            );
        }

        advisories.push(
            "खेती के फैसला लेत समय फसल, माटी के नमी आ खेत के स्थानीय स्थिति के जरूर ध्यान में रखीं।"
        );

        return advisories;
    }


    return advisories;
}