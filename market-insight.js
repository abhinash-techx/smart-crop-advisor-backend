// =========================================
// SMART CROP ADVISOR
// MARKET INSIGHT - FRONTEND
// =========================================

// =========================================
// ELEMENTS
// =========================================

const languageSelect =
    document.getElementById("language");

const cropSelect =
    document.getElementById("crop");

const stateSelect =
    document.getElementById("state");

const getMarketBtn =
    document.getElementById("getMarketBtn");

const loading =
    document.getElementById("loading");

const marketResult =
    document.getElementById("marketResult");

const errorMessage =
    document.getElementById("errorMessage");


// =========================================
// TRANSLATIONS
// =========================================

const translations = {

    en: {

        badge: "🌾 Smart Market Insight",

        title: "Market Insight",

        subtitle:
            "Check current mandi prices and get useful selling insights for your crop.",

        crop: "Select Crop",

        state: "State",

        button: "📊 Get Market Price",

        loading:
            "Fetching latest market prices...",

        modal: "Modal Price",

        min: "Minimum Price",

        max: "Maximum Price",

        market: "Market",

        date: "Price Date",

        unit: "per quintal",

        insight: "Farmer Market Insight",

        source:
            "Market prices are based on available government mandi data.",

        error:
            "Unable to fetch market prices. Please try again.",

        noData:
            "No market data found for the selected crop and state."

    },


    hi: {

        badge: "🌾 स्मार्ट बाजार जानकारी",

        title: "बाजार जानकारी",

        subtitle:
            "अपनी फसल के वर्तमान मंडी भाव देखें और बिक्री से जुड़ी उपयोगी जानकारी प्राप्त करें।",

        crop: "फसल चुनें",

        state: "राज्य",

        button: "📊 मंडी भाव देखें",

        loading:
            "नवीनतम मंडी भाव प्राप्त किए जा रहे हैं...",

        modal: "मॉडल भाव",

        min: "न्यूनतम भाव",

        max: "अधिकतम भाव",

        market: "मंडी",

        date: "भाव की तारीख",

        unit: "प्रति क्विंटल",

        insight: "किसान बाजार सलाह",

        source:
            "मंडी भाव उपलब्ध सरकारी डेटा पर आधारित हैं।",

        error:
            "मंडी भाव प्राप्त नहीं हो सके। कृपया दोबारा प्रयास करें।",

        noData:
            "चयनित फसल और राज्य के लिए मंडी डेटा नहीं मिला।"

    },


    bho: {

        badge: "🌾 स्मार्ट बाजार जानकारी",

        title: "बाजार के जानकारी",

        subtitle:
            "अपना फसल के आज के मंडी भाव देखीं आ बेचाई से जुड़ल जरूरी जानकारी पाईं।",

        crop: "फसल चुनीं",

        state: "राज्य",

        button: "📊 मंडी भाव देखीं",

        loading:
            "नवीनतम मंडी भाव मिल रहल बा...",

        modal: "मॉडल भाव",

        min: "सबसे कम भाव",

        max: "सबसे अधिक भाव",

        market: "मंडी",

        date: "भाव के तारीख",

        unit: "प्रति क्विंटल",

        insight: "किसान बाजार सलाह",

        source:
            "मंडी के भाव उपलब्ध सरकारी डेटा पर आधारित बा।",

        error:
            "मंडी के भाव ना मिल पावल। फेरु कोशिश करीं।",

        noData:
            "चुनल फसल आ राज्य खातिर मंडी के डेटा नइखे मिलल।"

    }

};


// =========================================
// LANGUAGE CHANGE
// =========================================

languageSelect.addEventListener(
    "change",
    function () {

        applyLanguage(
            languageSelect.value
        );

        if (
            marketResult &&
            !marketResult.classList.contains("hidden")
        ) {

            getMarketPrice();

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

    document.getElementById("cropLabel").textContent =
        t.crop;

    document.getElementById("stateLabel").textContent =
        t.state;

    document.getElementById("getMarketBtn").textContent =
        t.button;

    document.getElementById("loadingText").textContent =
        t.loading;

    document.getElementById("modalLabel").textContent =
        t.modal;

    document.getElementById("minLabel").textContent =
        t.min;

    document.getElementById("maxLabel").textContent =
        t.max;

    document.getElementById("marketLabel").textContent =
        t.market;

    document.getElementById("dateLabel").textContent =
        t.date;

    document.getElementById("priceUnit").textContent =
        t.unit;

    document.getElementById("insightTitle").textContent =
        t.insight;

    document.getElementById("sourceText").textContent =
        t.source;

}


// =========================================
// BUTTON
// =========================================

getMarketBtn.addEventListener(
    "click",
    getMarketPrice
);


// =========================================
// GET MARKET PRICE
// =========================================

async function getMarketPrice() {

    hideError();

    showLoading();

    const crop =
        cropSelect.value;

    const state =
        stateSelect.value;

    const language =
        languageSelect.value;


    try {

        const API_URL =
            `/.netlify/functions/market-insight` +
            `?crop=${encodeURIComponent(crop)}` +
            `&state=${encodeURIComponent(state)}` +
            `&language=${encodeURIComponent(language)}`;


        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Market API request failed"
            );

        }


        const data =
            await response.json();


        if (!data.success) {

            throw new Error(
                data.message ||
                "Market data unavailable"
            );

        }


        if (
            !data.market ||
            data.market.modalPrice === null
        ) {

            throw new Error(
                translations[language].noData
            );

        }


        displayMarketData(data);


    } catch (error) {

        console.error(
            "Market Insight Error:",
            error
        );

        showError(
            error.message ||
            translations[language].error
        );

    } finally {

        hideLoading();

    }

}


// =========================================
// DISPLAY MARKET DATA
// =========================================

function displayMarketData(data) {

    const market =
        data.market;


    document.getElementById("modalPrice").textContent =
        formatPrice(market.modalPrice);


    document.getElementById("minPrice").textContent =
        formatPrice(market.minPrice);


    document.getElementById("maxPrice").textContent =
        formatPrice(market.maxPrice);


    document.getElementById("marketName").textContent =
        market.marketName || "--";


    document.getElementById("priceDate").textContent =
        market.date || "--";


    displayInsights(
        data.insights || []
    );


    marketResult.classList.remove(
        "hidden"
    );

}


// =========================================
// PRICE FORMAT
// =========================================

function formatPrice(price) {

    if (
        price === null ||
        price === undefined ||
        Number.isNaN(Number(price))
    ) {

        return "₹--";

    }


    return "₹" +
        Number(price).toLocaleString(
            "en-IN",
            {
                maximumFractionDigits: 0
            }
        );

}


// =========================================
// DISPLAY INSIGHTS
// =========================================

function displayInsights(insights) {

    const insightList =
        document.getElementById(
            "insightList"
        );


    insightList.innerHTML = "";


    insights.forEach(
        (insight) => {

            const item =
                document.createElement("div");

            item.className =
                "insight-item";

            item.textContent =
                `🌱 ${insight}`;

            insightList.appendChild(
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

    marketResult.classList.add(
        "hidden"
    );

    getMarketBtn.disabled =
        true;

    getMarketBtn.style.opacity =
        "0.6";

}


function hideLoading() {

    loading.classList.add(
        "hidden"
    );

    getMarketBtn.disabled =
        false;

    getMarketBtn.style.opacity =
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