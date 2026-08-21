// =========================================
// SMART CROP ADVISOR
// ANALYZE MY SOIL - JAVASCRIPT
// =========================================


// =========================================
// TRANSLATIONS
// =========================================

const translations = {

    en: {

        badge: "🌱 Smart Soil Analysis",

        title: "Analyze Your Soil",

        subtitle:
            "Choose how you want to analyze your soil and get personalized crop insights.",


        imageTitle: "Analyze from Soil Image",

        imageDescription:
            "Upload a clear photo of your soil and let AI visually analyze it.",

        imagePoint1: "AI visual soil assessment",

        imagePoint2: "Soil appearance & moisture insights",

        imagePoint3: "Crop suitability suggestions",

        imageButton: "📸 Analyze Soil Image",


        manualTitle: "Manual Soil Analysis",

        manualDescription:
            "Enter your soil test values manually for a detailed analysis.",

        manualPoint1: "pH level",

        manualPoint2: "Nitrogen, Phosphorus & Potassium",

        manualPoint3: "Moisture & soil type",

        manualButton: "📝 Enter Soil Details",


        infoTitle: "Important Note",

        infoText:
            "Soil images provide an AI-based visual assessment. For accurate pH and NPK values, use soil test results from a reliable soil testing facility.",


        uploadTitle: "Upload Soil Image",

        uploadDescription:
            "Upload a clear photo of the soil.",

        chooseImage: "Choose Soil Image",

        analyzeImage: "🔍 Analyze Image",

        imageNote:
            "Use a clear, well-lit soil photo for better visual analysis.",


        manualFormTitle: "Enter Soil Details",

        manualFormDescription:
            "Enter values from your soil test report.",


        soilType: "Soil Type",

        selectSoil: "Select Soil Type",

        alluvial: "Alluvial",

        black: "Black Soil",

        red: "Red Soil",

        sandy: "Sandy Soil",

        loamy: "Loamy Soil",

        clay: "Clay Soil",


        ph: "Soil pH",

        nitrogen: "Nitrogen (N)",

        phosphorus: "Phosphorus (P)",

        potassium: "Potassium (K)",

        moisture: "Soil Moisture",

        location: "Location",

        analyzeSoil: "🌱 Analyze My Soil",


        resultTitle: "🌱 Soil Analysis Result",

        analyzing: "Analyzing your soil...",

        pleaseWait: "Please wait while AI analyzes the information.",

        selectImageError: "Please select a soil image first.",

        invalidImage:
            "Please select a valid image file.",

        analysisFailed:
            "Unable to analyze the soil right now. Please try again.",

        networkError:
            "Unable to connect to the soil analysis server.",

        imageTooLarge:
            "Image size is too large. Please choose an image smaller than 5 MB.",

        manualRequired:
            "Please fill all required soil details.",

        soilHealth: "Soil Health",

        soilTypeResult: "Soil Type",

        phStatus: "pH Status",

        nutrientStatus: "Nutrient Status",

        moistureStatus: "Moisture Status",

        suitableCrops: "Suitable Crops",

        recommendations: "Recommendations",

        visualAssessment: "AI Visual Assessment",

        confidence: "Confidence"

    },


    hi: {

        badge: "🌱 स्मार्ट मिट्टी विश्लेषण",

        title: "अपनी मिट्टी का विश्लेषण करें",

        subtitle:
            "मिट्टी का विश्लेषण करने का तरीका चुनें और अपनी फसल के लिए उपयोगी जानकारी प्राप्त करें।",


        imageTitle: "मिट्टी की फोटो से विश्लेषण",

        imageDescription:
            "मिट्टी की साफ फोटो अपलोड करें और AI से उसका दृश्य विश्लेषण करवाएं।",

        imagePoint1: "AI द्वारा मिट्टी का दृश्य विश्लेषण",

        imagePoint2: "मिट्टी की स्थिति और नमी की जानकारी",

        imagePoint3: "उपयुक्त फसलों के सुझाव",

        imageButton: "📸 मिट्टी की फोटो का विश्लेषण",


        manualTitle: "मैनुअल मिट्टी विश्लेषण",

        manualDescription:
            "विस्तृत विश्लेषण के लिए अपनी मिट्टी की जांच की जानकारी दर्ज करें।",

        manualPoint1: "pH स्तर",

        manualPoint2: "नाइट्रोजन, फॉस्फोरस और पोटैशियम",

        manualPoint3: "नमी और मिट्टी का प्रकार",

        manualButton: "📝 मिट्टी की जानकारी दर्ज करें",


        infoTitle: "महत्वपूर्ण जानकारी",

        infoText:
            "मिट्टी की फोटो से AI आधारित दृश्य अनुमान मिलता है। सटीक pH और NPK के लिए विश्वसनीय मिट्टी जांच रिपोर्ट का उपयोग करें।",


        uploadTitle: "मिट्टी की फोटो अपलोड करें",

        uploadDescription:
            "मिट्टी की एक साफ फोटो अपलोड करें।",

        chooseImage: "मिट्टी की फोटो चुनें",

        analyzeImage: "🔍 फोटो का विश्लेषण करें",

        imageNote:
            "बेहतर परिणाम के लिए साफ और पर्याप्त रोशनी वाली मिट्टी की फोटो लें।",


        manualFormTitle: "मिट्टी की जानकारी दर्ज करें",

        manualFormDescription:
            "अपनी मिट्टी जांच रिपोर्ट से मान दर्ज करें।",


        soilType: "मिट्टी का प्रकार",

        selectSoil: "मिट्टी का प्रकार चुनें",

        alluvial: "जलोढ़ मिट्टी",

        black: "काली मिट्टी",

        red: "लाल मिट्टी",

        sandy: "बलुई मिट्टी",

        loamy: "दोमट मिट्टी",

        clay: "चिकनी मिट्टी",


        ph: "मिट्टी का pH",

        nitrogen: "नाइट्रोजन (N)",

        phosphorus: "फॉस्फोरस (P)",

        potassium: "पोटैशियम (K)",

        moisture: "मिट्टी की नमी",

        location: "स्थान",

        analyzeSoil: "🌱 मेरी मिट्टी का विश्लेषण करें",


        resultTitle: "🌱 मिट्टी विश्लेषण परिणाम",

        analyzing: "मिट्टी का विश्लेषण किया जा रहा है...",

        pleaseWait:
            "कृपया प्रतीक्षा करें, AI जानकारी का विश्लेषण कर रहा है।",

        selectImageError:
            "कृपया पहले मिट्टी की फोटो चुनें।",

        invalidImage:
            "कृपया एक सही image file चुनें।",

        analysisFailed:
            "अभी मिट्टी का विश्लेषण नहीं हो पाया। कृपया दोबारा प्रयास करें।",

        networkError:
            "मिट्टी विश्लेषण सर्वर से कनेक्ट नहीं हो पाया।",

        imageTooLarge:
            "फोटो बहुत बड़ी है। कृपया 5 MB से छोटी फोटो चुनें।",

        manualRequired:
            "कृपया सभी जरूरी मिट्टी की जानकारी भरें।",

        soilHealth: "मिट्टी का स्वास्थ्य",

        soilTypeResult: "मिट्टी का प्रकार",

        phStatus: "pH स्थिति",

        nutrientStatus: "पोषक तत्व स्थिति",

        moistureStatus: "नमी की स्थिति",

        suitableCrops: "उपयुक्त फसलें",

        recommendations: "सुझाव",

        visualAssessment: "AI दृश्य विश्लेषण",

        confidence: "विश्वसनीयता"

    },


    bho: {

        badge: "🌱 स्मार्ट माटी जांच",

        title: "आपन माटी के जांच करीं",

        subtitle:
            "माटी के जांच करे के तरीका चुनीं आ अपना फसल खातिर उपयोगी जानकारी पाईं।",


        imageTitle: "माटी के फोटो से जांच",

        imageDescription:
            "माटी के साफ फोटो अपलोड करीं आ AI से ओकर दृश्य जांच करवाईं।",

        imagePoint1: "AI से माटी के दृश्य जांच",

        imagePoint2: "माटी के हालत आ नमी के जानकारी",

        imagePoint3: "उपयुक्त फसल के सुझाव",

        imageButton: "📸 माटी के फोटो जांचीं",


        manualTitle: "मैनुअल माटी जांच",

        manualDescription:
            "विस्तार से जांच खातिर माटी जांच रिपोर्ट के जानकारी भरीं।",

        manualPoint1: "pH स्तर",

        manualPoint2: "नाइट्रोजन, फॉस्फोरस आ पोटैशियम",

        manualPoint3: "नमी आ माटी के प्रकार",

        manualButton: "📝 माटी के जानकारी भरीं",


        infoTitle: "जरूरी जानकारी",

        infoText:
            "माटी के फोटो से AI आधारित दृश्य अनुमान मिलेला। सही pH आ NPK खातिर भरोसेमंद माटी जांच रिपोर्ट के इस्तेमाल करीं।",


        uploadTitle: "माटी के फोटो अपलोड करीं",

        uploadDescription:
            "माटी के साफ फोटो अपलोड करीं।",

        chooseImage: "माटी के फोटो चुनीं",

        analyzeImage: "🔍 फोटो जांचीं",

        imageNote:
            "बेहतर परिणाम खातिर साफ आ बढ़िया रोशनी वाला माटी के फोटो लीं।",


        manualFormTitle: "माटी के जानकारी भरीं",

        manualFormDescription:
            "अपना माटी जांच रिपोर्ट से मान भरीं।",


        soilType: "माटी के प्रकार",

        selectSoil: "माटी के प्रकार चुनीं",

        alluvial: "जलोढ़ माटी",

        black: "काली माटी",

        red: "लाल माटी",

        sandy: "बलुई माटी",

        loamy: "दोमट माटी",

        clay: "चिकन माटी",


        ph: "माटी के pH",

        nitrogen: "नाइट्रोजन (N)",

        phosphorus: "फॉस्फोरस (P)",

        potassium: "पोटैशियम (K)",

        moisture: "माटी के नमी",

        location: "जगह",

        analyzeSoil: "🌱 हमार माटी के जांच करीं",


        resultTitle: "🌱 माटी जांच के नतीजा",

        analyzing: "माटी के जांच हो रहल बा...",

        pleaseWait:
            "थोड़ा इंतजार करीं, AI जानकारी के जांच कर रहल बा।",

        selectImageError:
            "पहिले माटी के फोटो चुनीं।",

        invalidImage:
            "कृपया सही image file चुनीं।",

        analysisFailed:
            "अभी माटी के जांच ना हो पावल। फेर से कोशिश करीं।",

        networkError:
            "माटी जांच सर्वर से कनेक्शन ना हो पावल।",

        imageTooLarge:
            "फोटो बहुत बड़ बा। 5 MB से छोट फोटो चुनीं।",

        manualRequired:
            "जरूरी माटी के जानकारी पूरा भरीं।",

        soilHealth: "माटी के स्वास्थ्य",

        soilTypeResult: "माटी के प्रकार",

        phStatus: "pH के स्थिति",

        nutrientStatus: "पोषक तत्व के स्थिति",

        moistureStatus: "नमी के स्थिति",

        suitableCrops: "उपयुक्त फसल",

        recommendations: "सुझाव",

        visualAssessment: "AI से दृश्य जांच",

        confidence: "विश्वसनीयता"

    }

};


// =========================================
// GLOBAL VARIABLES
// =========================================

let currentLanguage = "en";

let selectedSoilImage = null;


// =========================================
// DOM ELEMENTS
// =========================================

const languageSelect =
    document.getElementById("languageSelect");

const imageAnalysisBtn =
    document.getElementById("imageAnalysisBtn");

const manualAnalysisBtn =
    document.getElementById("manualAnalysisBtn");

const imageModal =
    document.getElementById("imageModal");

const manualModal =
    document.getElementById("manualModal");

const closeImageModal =
    document.getElementById("closeImageModal");

const closeManualModal =
    document.getElementById("closeManualModal");

const soilImage =
    document.getElementById("soilImage");

const fileName =
    document.getElementById("fileName");

const analyzeImageBtn =
    document.getElementById("analyzeImageBtn");

const soilForm =
    document.getElementById("soilForm");

const soilResult =
    document.getElementById("soilResult");

const resultContent =
    document.getElementById("resultContent");


// =========================================
// LANGUAGE SWITCH
// =========================================

function changeLanguage(language) {

    if (!translations[language]) {
        language = "en";
    }

    currentLanguage = language;

    document.documentElement.lang = language;

    const elements =
        document.querySelectorAll("[data-i18n]");

    elements.forEach(element => {

        const key =
            element.getAttribute("data-i18n");

        if (
            translations[currentLanguage] &&
            translations[currentLanguage][key]
        ) {
            element.textContent =
                translations[currentLanguage][key];
        }

    });

}


// Language dropdown event
languageSelect.addEventListener("change", function () {

    changeLanguage(this.value);

});


// =========================================
// OPEN IMAGE MODAL
// =========================================

imageAnalysisBtn.addEventListener("click", function () {

    imageModal.classList.remove("hidden");

});


// =========================================
// OPEN MANUAL MODAL
// =========================================

manualAnalysisBtn.addEventListener("click", function () {

    manualModal.classList.remove("hidden");

});


// =========================================
// CLOSE IMAGE MODAL
// =========================================

closeImageModal.addEventListener("click", function () {

    imageModal.classList.add("hidden");

});


// =========================================
// CLOSE MANUAL MODAL
// =========================================

closeManualModal.addEventListener("click", function () {

    manualModal.classList.add("hidden");

});


// =========================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// =========================================

imageModal.addEventListener("click", function (event) {

    if (event.target === imageModal) {
        imageModal.classList.add("hidden");
    }

});


manualModal.addEventListener("click", function (event) {

    if (event.target === manualModal) {
        manualModal.classList.add("hidden");
    }

});


// =========================================
// IMAGE SELECTION
// =========================================

soilImage.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        selectedSoilImage = null;
        fileName.textContent = "";
        return;
    }


    // Check file type
    if (!file.type.startsWith("image/")) {

        alert(
            translations[currentLanguage].invalidImage
        );

        this.value = "";

        selectedSoilImage = null;

        fileName.textContent = "";

        return;
    }


    // Check file size - 5 MB
    if (file.size > 5 * 1024 * 1024) {

        alert(
            translations[currentLanguage].imageTooLarge
        );

        this.value = "";

        selectedSoilImage = null;

        fileName.textContent = "";

        return;
    }


    selectedSoilImage = file;

    fileName.textContent =
        `📎 ${file.name}`;

});


// =========================================
// IMAGE ANALYSIS
// =========================================

analyzeImageBtn.addEventListener("click", async function () {

    if (!selectedSoilImage) {

        alert(
            translations[currentLanguage].selectImageError
        );

        return;
    }


    showLoading();


    try {

        const base64Image =
            await convertImageToBase64(selectedSoilImage);


        const response = await fetch(
            "/api/analyze-soil",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    mode: "image",

                    language: currentLanguage,

                    image: base64Image

                })

            }
        );


        if (!response.ok) {
            throw new Error("Server error");
        }


        const data = await response.json();


        if (!data.success) {
            throw new Error(
                data.message || "Analysis failed"
            );
        }


        showResult(data.result);


    } catch (error) {

        console.error(
            "Soil image analysis error:",
            error
        );

        showError(
            translations[currentLanguage].analysisFailed
        );

    }

});


// =========================================
// CONVERT IMAGE TO BASE64
// =========================================

function convertImageToBase64(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = function () {

            resolve(reader.result);

        };

        reader.onerror = function () {

            reject(
                new Error("Unable to read image")
            );

        };

        reader.readAsDataURL(file);

    });

}


// =========================================
// MANUAL SOIL ANALYSIS
// =========================================

soilForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const soilType =
        document.getElementById("soilType").value;

    const ph =
        document.getElementById("ph").value;

    const nitrogen =
        document.getElementById("nitrogen").value;

    const phosphorus =
        document.getElementById("phosphorus").value;

    const potassium =
        document.getElementById("potassium").value;

    const moisture =
        document.getElementById("moisture").value;

    const location =
        document.getElementById("location").value;


    // Basic validation
    if (
        !soilType ||
        !ph ||
        !nitrogen ||
        !phosphorus ||
        !potassium ||
        !moisture
    ) {

        alert(
            translations[currentLanguage].manualRequired
        );

        return;
    }


    const soilData = {

        mode: "manual",

        language: currentLanguage,

        soilType: soilType,

        ph: Number(ph),

        nitrogen: Number(nitrogen),

        phosphorus: Number(phosphorus),

        potassium: Number(potassium),

        moisture: Number(moisture),

        location: location.trim()

    };


    showLoading();


    try {

        const response = await fetch(
            "/api/analyze-soil",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(soilData)

            }
        );


        if (!response.ok) {
            throw new Error("Server error");
        }


        const data =
            await response.json();


        if (!data.success) {
            throw new Error(
                data.message || "Analysis failed"
            );
        }


        manualModal.classList.add("hidden");


        showResult(data.result);


    } catch (error) {

        console.error(
            "Manual soil analysis error:",
            error
        );

        showError(
            translations[currentLanguage].analysisFailed
        );

    }

});


// =========================================
// SHOW LOADING
// =========================================

function showLoading() {

    soilResult.classList.remove("hidden");

    resultContent.innerHTML = `

        <div class="loading">

            <div class="loading-spinner"></div>

            <h3>
                ${translations[currentLanguage].analyzing}
            </h3>

            <p>
                ${translations[currentLanguage].pleaseWait}
            </p>

        </div>

    `;


    soilResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// =========================================
// SHOW ERROR
// =========================================

function showError(message) {

    soilResult.classList.remove("hidden");

    resultContent.innerHTML = `

        <div class="error-message">

            ❌ ${escapeHTML(message)}

        </div>

    `;


    soilResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// =========================================
// SHOW RESULT
// =========================================

function showResult(result) {

    soilResult.classList.remove("hidden");


    if (!result) {

        showError(
            translations[currentLanguage].analysisFailed
        );

        return;

    }


    let html = "";


    // Soil Health
    if (result.soilHealth) {

        html += `

            <div class="result-item">

                <h3>
                    🌱 ${translations[currentLanguage].soilHealth}
                </h3>

                <p>
                    ${escapeHTML(result.soilHealth)}
                </p>

            </div>

        `;

    }


    // Soil Type
    if (result.soilType) {

        html += `

            <div class="result-item">

                <h3>
                    🌍 ${translations[currentLanguage].soilTypeResult}
                </h3>

                <p>
                    ${escapeHTML(result.soilType)}
                </p>

            </div>

        `;

    }


    // pH
    if (result.phStatus) {

        html += `

            <div class="result-item">

                <h3>
                    🧪 ${translations[currentLanguage].phStatus}
                </h3>

                <p>
                    ${escapeHTML(result.phStatus)}
                </p>

            </div>

        `;

    }


    // Nutrients
    if (result.nutrientStatus) {

        html += `

            <div class="result-item">

                <h3>
                    🧬 ${translations[currentLanguage].nutrientStatus}
                </h3>

                <p>
                    ${escapeHTML(result.nutrientStatus)}
                </p>

            </div>

        `;

    }


    // Moisture
    if (result.moistureStatus) {

        html += `

            <div class="result-item">

                <h3>
                    💧 ${translations[currentLanguage].moistureStatus}
                </h3>

                <p>
                    ${escapeHTML(result.moistureStatus)}
                </p>

            </div>

        `;

    }


    // Suitable Crops
    if (result.suitableCrops) {

        let crops = "";

        if (Array.isArray(result.suitableCrops)) {

            crops =
                result.suitableCrops
                    .map(crop => `🌾 ${escapeHTML(crop)}`)
                    .join("<br>");

        } else {

            crops =
                escapeHTML(result.suitableCrops);

        }


        html += `

            <div class="result-item">

                <h3>
                    🌾 ${translations[currentLanguage].suitableCrops}
                </h3>

                <p>
                    ${crops}
                </p>

            </div>

        `;

    }


    // Recommendations
    if (result.recommendations) {

        let recommendations = "";


        if (Array.isArray(result.recommendations)) {

            recommendations =
                result.recommendations
                    .map(item =>
                        `✓ ${escapeHTML(item)}`
                    )
                    .join("<br>");

        } else {

            recommendations =
                escapeHTML(result.recommendations);

        }


        html += `

            <div class="result-item">

                <h3>
                    💡 ${translations[currentLanguage].recommendations}
                </h3>

                <p>
                    ${recommendations}
                </p>

            </div>

        `;

    }


    // AI Visual Assessment
    if (result.visualAssessment) {

        html += `

            <div class="result-item">

                <h3>
                    📸 ${translations[currentLanguage].visualAssessment}
                </h3>

                <p>
                    ${escapeHTML(result.visualAssessment)}
                </p>

            </div>

        `;

    }


    // Confidence
    if (result.confidence) {

        html += `

            <div class="result-item">

                <h3>
                    🎯 ${translations[currentLanguage].confidence}
                </h3>

                <p>
                    ${escapeHTML(result.confidence)}
                </p>

            </div>

        `;

    }


    if (!html) {

        html = `

            <div class="result-item">

                <p>
                    ${escapeHTML(
                        JSON.stringify(result)
                    )}
                </p>

            </div>

        `;

    }


    resultContent.innerHTML = html;


    soilResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// =========================================
// HTML SECURITY
// =========================================

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =========================================
// INITIAL LANGUAGE
// =========================================

changeLanguage("en");


// =========================================
// ESC KEY CLOSE MODALS
// =========================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        imageModal.classList.add("hidden");

        manualModal.classList.add("hidden");

    }

});