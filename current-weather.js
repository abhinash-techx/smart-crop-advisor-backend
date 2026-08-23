// =========================================
// SMART CROP ADVISOR
// CURRENT WEATHER - FRONTEND
// =========================================


// =========================================
// ELEMENTS
// =========================================

const languageSelect =
    document.getElementById("language");

const getWeatherBtn =
    document.getElementById("getWeatherBtn");

const loading =
    document.getElementById("loading");

const weatherResult =
    document.getElementById("weatherResult");

const errorMessage =
    document.getElementById("errorMessage");

const locationStatus =
    document.getElementById("locationStatus");


// =========================================
// TRANSLATIONS
// =========================================

const translations = {

    en: {

        badge: "🌾 Smart Weather Advisory",

        title: "Current Weather",

        subtitle:
            "Get live weather information and farming advice based on your current location.",

        location:
            "Location permission is required",

        button:
            "Get Current Weather",

        loading:
            "Getting current weather...",

        feels:
            "Feels Like",

        humidity:
            "Humidity",

        rain:
            "Rain",

        wind:
            "Wind",

        advisory:
            "Farmer Advisory",

        locationDenied:
            "Please allow location access to get local weather.",

        locationFound:
            "Location detected successfully.",

        error:
            "Unable to get weather. Please try again."

    },


    hi: {

        badge: "🌾 स्मार्ट मौसम सलाह",

        title: "वर्तमान मौसम",

        subtitle:
            "अपने वर्तमान स्थान के अनुसार लाइव मौसम की जानकारी और खेती की सलाह प्राप्त करें।",

        location:
            "स्थान की अनुमति आवश्यक है",

        button:
            "वर्तमान मौसम देखें",

        loading:
            "वर्तमान मौसम प्राप्त किया जा रहा है...",

        feels:
            "महसूस होने वाला तापमान",

        humidity:
            "नमी",

        rain:
            "बारिश",

        wind:
            "हवा",

        advisory:
            "किसान सलाह",

        locationDenied:
            "स्थानीय मौसम जानने के लिए स्थान की अनुमति दें।",

        locationFound:
            "स्थान सफलतापूर्वक प्राप्त हो गया।",

        error:
            "मौसम की जानकारी प्राप्त नहीं हो सकी। दोबारा प्रयास करें।"

    },


    bho: {

        badge: "🌾 स्मार्ट मौसम सलाह",

        title: "अभी के मौसम",

        subtitle:
            "रउआ के वर्तमान जगह के हिसाब से मौसम के जानकारी आ खेती के सलाह पाईं।",

        location:
            "स्थान के अनुमति जरूरी बा",

        button:
            "अभी के मौसम देखीं",

        loading:
            "अभी के मौसम के जानकारी मिल रहल बा...",

        feels:
            "महसूस होखे वाला तापमान",

        humidity:
            "नमी",

        rain:
            "बरखा",

        wind:
            "हवा",

        advisory:
            "किसान खातिर सलाह",

        locationDenied:
            "स्थानीय मौसम जाने खातिर स्थान के अनुमति दीं।",

        locationFound:
            "स्थान सफलतापूर्वक मिल गइल।",

        error:
            "मौसम के जानकारी ना मिल पावल। फेरु कोशिश करीं।"

    }

};


// =========================================
// LANGUAGE CHANGE
// =========================================

languageSelect.addEventListener(
    "change",
    function () {

        const language =
            languageSelect.value;

        applyLanguage(language);

        // If weather already loaded,
        // refresh advisory in selected language.
        if (
            weatherResult &&
            !weatherResult.classList.contains("hidden")
        ) {
            getWeather();
        }

    }
);


// =========================================
// APPLY LANGUAGE
// =========================================

function applyLanguage(language) {

    const t =
        translations[language] ||
        translations.en;

    document.getElementById("badge").textContent =
        t.badge;

    document.getElementById("title").textContent =
        t.title;

    document.getElementById("subtitle").textContent =
        t.subtitle;

    document.getElementById("locationStatus").textContent =
        t.location;

    document.getElementById("getWeatherBtn").textContent =
        t.button;

    document.getElementById("loadingText").textContent =
        t.loading;

    document.getElementById("feelsLabel").textContent =
        t.feels;

    document.getElementById("humidityLabel").textContent =
        t.humidity;

    document.getElementById("rainLabel").textContent =
        t.rain;

    document.getElementById("windLabel").textContent =
        t.wind;

    document.getElementById("advisoryTitle").textContent =
        t.advisory;

}


// =========================================
// BUTTON
// =========================================

getWeatherBtn.addEventListener(
    "click",
    getWeather
);


// =========================================
// GET WEATHER
// =========================================

async function getWeather() {

    hideError();

    showLoading();

    try {

        const position =
            await getUserLocation();

        const latitude =
            position.coords.latitude;

        const longitude =
            position.coords.longitude;

        locationStatus.textContent =
            translations[
                languageSelect.value
            ].locationFound;


        const language =
            languageSelect.value;


        const API_URL =
            `/.netlify/functions/current-weather` +
            `?latitude=${encodeURIComponent(latitude)}` +
            `&longitude=${encodeURIComponent(longitude)}` +
            `&language=${encodeURIComponent(language)}`;


        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Weather request failed"
            );

        }


        const data =
            await response.json();


        if (!data.success) {

            throw new Error(
                data.message ||
                "Weather request failed"
            );

        }


        displayWeather(data);


    } catch (error) {

        console.error(
            "Weather Error:",
            error
        );

        showError(
            translations[
                languageSelect.value
            ].error
        );

    } finally {

        hideLoading();

    }

}


// =========================================
// GET USER LOCATION
// =========================================

function getUserLocation() {

    return new Promise(
        (resolve, reject) => {

            if (!navigator.geolocation) {

                reject(
                    new Error(
                        "Geolocation is not supported"
                    )
                );

                return;
            }


            navigator.geolocation.getCurrentPosition(

                resolve,

                reject,

                {
                    enableHighAccuracy: true,

                    timeout: 10000,

                    maximumAge: 300000
                }

            );

        }
    );

}


// =========================================
// DISPLAY WEATHER
// =========================================

function displayWeather(data) {

    const weather =
        data.weather;


    document.getElementById("temperature").textContent =
        `${Math.round(weather.temperature)}°C`;


    document.getElementById("feelsLike").textContent =
        `${Math.round(weather.feelsLike)}°C`;


    document.getElementById("humidity").textContent =
        `${Math.round(weather.humidity)}%`;


    document.getElementById("rain").textContent =
        `${Number(weather.rain).toFixed(1)} mm`;


    document.getElementById("wind").textContent =
        `${Number(weather.windSpeed).toFixed(1)} km/h`;


    document.getElementById("condition").textContent =
        weather.condition;


    document.getElementById("weatherIcon").textContent =
        getWeatherIcon(
            weather.weatherCode
        );


    displayAdvisory(
        data.advisory
    );


    weatherResult.classList.remove(
        "hidden"
    );

}


// =========================================
// WEATHER ICON
// =========================================

function getWeatherIcon(code) {

    if (code === 0) {
        return "☀️";
    }

    if ([1, 2].includes(code)) {
        return "🌤️";
    }

    if (code === 3) {
        return "☁️";
    }

    if ([45, 48].includes(code)) {
        return "🌫️";
    }

    if (
        [51, 53, 55, 61, 63, 65, 80, 81, 82]
            .includes(code)
    ) {
        return "🌧️";
    }

    if (
        [71, 73, 75]
            .includes(code)
    ) {
        return "❄️";
    }

    if (
        [95, 96, 99]
            .includes(code)
    ) {
        return "⛈️";
    }

    return "🌦️";

}


// =========================================
// ADVISORY
// =========================================

function displayAdvisory(advisories) {

    const advisoryList =
        document.getElementById(
            "advisoryList"
        );


    advisoryList.innerHTML = "";


    advisories.forEach(
        (advice) => {

            const item =
                document.createElement("div");

            item.className =
                "advisory-item";

            item.textContent =
                `🌱 ${advice}`;

            advisoryList.appendChild(
                item
            );

        }
    );

}


// =========================================
// LOADING
// =========================================

function showLoading() {

    loading.classList.remove(
        "hidden"
    );

    weatherResult.classList.add(
        "hidden"
    );

    getWeatherBtn.disabled =
        true;

    getWeatherBtn.style.opacity =
        "0.6";

}


function hideLoading() {

    loading.classList.add(
        "hidden"
    );

    getWeatherBtn.disabled =
        false;

    getWeatherBtn.style.opacity =
        "1";

}


// =========================================
// ERROR
// =========================================

function showError(message) {

    errorMessage.textContent =
        message;

    errorMessage.classList.remove(
        "hidden"
    );

}


function hideError() {

    errorMessage.classList.add(
        "hidden"
    );

}


// =========================================
// INITIAL LANGUAGE
// =========================================

applyLanguage(
    languageSelect.value
);