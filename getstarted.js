const API_URL =
    window.location.hostname === "localhost"
        ? "http://localhost:5000/recommend"
        : "/.netlify/functions/recommend";

const recommendButton =
    document.getElementById("recommendBtn");



recommendButton.addEventListener(
    "click",
    async function () {


        // ================================
        // GET FARMER DATA
        // ================================

        const farmerData = {

            farmerName:
                document.getElementById(
                    "farmerName"
                ).value.trim(),

            mobile:
                document.getElementById(
                    "mobile"
                ).value.trim(),

            state:
                document.getElementById(
                    "state"
                ).value,

            district:
                document.getElementById(
                    "district"
                ).value.trim(),


            // FARM DETAILS

            landArea:
                Number(
                    document.getElementById(
                        "landArea"
                    ).value
                ),

            soilType:
                document.getElementById(
                    "soilType"
                ).value,

            ph:
                Number(
                    document.getElementById(
                        "ph"
                    ).value
                ),

            waterAvailability:
                document.getElementById(
                    "waterAvailability"
                ).value,

            previousCrop:
                document.getElementById(
                    "previousCrop"
                ).value.trim(),

            farmingType:
                document.getElementById(
                    "farmingType"
                ).value,


            // ENVIRONMENT

            temperature:
                Number(
                    document.getElementById(
                        "temperature"
                    ).value
                ),

            rainfall:
                Number(
                    document.getElementById(
                        "rainfall"
                    ).value
                ),

            sowingSeason:
                document.getElementById(
                    "sowingSeason"
                ).value,

            fertilizerUsage:
                document.getElementById(
                    "fertilizerUsage"
                ).value

        };


        // ================================
        // VALIDATION
        // ================================

        if (!farmerData.farmerName) {

            alert(
                "Please enter farmer name."
            );

            return;
        }


        if (!farmerData.state) {

            alert(
                "Please select state."
            );

            return;
        }


        if (!farmerData.district) {

            alert(
                "Please enter district."
            );

            return;
        }


        if (!farmerData.landArea) {

            alert(
                "Please enter land area."
            );

            return;
        }


        if (!farmerData.soilType) {

            alert(
                "Please select soil type."
            );

            return;
        }


        if (!farmerData.ph) {

            alert(
                "Please enter soil pH."
            );

            return;
        }


        if (!farmerData.waterAvailability) {

            alert(
                "Please select water availability."
            );

            return;
        }


        if (!farmerData.temperature) {

            alert(
                "Please enter temperature."
            );

            return;
        }


        if (!farmerData.rainfall) {

            alert(
                "Please enter rainfall."
            );

            return;
        }


        if (!farmerData.sowingSeason) {

            alert(
                "Please select sowing season."
            );

            return;
        }


        if (!farmerData.fertilizerUsage) {

            alert(
                "Please select fertilizer usage."
            );

            return;
        }



        // ================================
        // LOADING
        // ================================

        recommendButton.disabled = true;

        recommendButton.innerText =
            "🌾 Analyzing Farm Data...";


        try {


            // ================================
            // SEND DATA TO BACKEND
            // ================================

            const response =
                await fetch(
                    API_URL,
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                farmerData
                            )

                    }
                );


            const result =
                await response.json();


            console.log(
                "Backend Response:",
                result
            );


            // ================================
            // CHECK SUCCESS
            // ================================

            if (!result.success) {

                throw new Error(
                  result.error ||
                   result.message ||
                  "Recommendation failed"
                );

            }


            // ================================
            // SHOW RESULT
            // ================================

            showRecommendations(
             result.recommendations,
               result.aiAdvice
            );

        } catch (error) {


            console.error(
                "Backend Error:",
                error
            );


            alert(
             "❌ Backend Error:\n\n" +
                 error.message
            );


        } finally {


            recommendButton.disabled =
                false;

            recommendButton.innerText =
                "🌾 Get Smart Recommendation →";

        }

    }
);



// =================================================
// SHOW RECOMMENDATIONS
// =================================================

function showRecommendations(
    recommendations,
    aiAdvice
) {


    // Remove previous result

    const oldResult =
        document.getElementById(
            "recommendationResult"
        );


    if (oldResult) {

        oldResult.remove();

    }


    if (
        !recommendations ||
        recommendations.length === 0
    ) {

        alert(
            "No crop recommendation found."
        );

        return;

    }


    // ================================
    // BEST CROP
    // ================================

    const bestCrop =
        recommendations[0];


    // Main result container

    const resultDiv =
        document.createElement("div");

    resultDiv.id =
        "recommendationResult";

    resultDiv.className =
        "recommendation-result";



    // ================================
    // HEADING
    // ================================

    const heading =
        document.createElement("div");

    heading.className =
        "result-heading";


    heading.innerHTML = `

        <div class="result-icon">
            🌾
        </div>

        <h2>
            Smart Crop Recommendation
        </h2>

        <p>
            Based on your soil, weather,
            water and farming conditions
        </p>

    `;


    resultDiv.appendChild(
        heading
    );



    // ================================
    // BEST CROP CARD
    // ================================

    const bestCard =
        document.createElement("div");

    bestCard.className =
        "best-crop-card";


    // Reasons

    let reasonsHTML = "";


    if (
        bestCrop.reasons &&
        bestCrop.reasons.length > 0
    ) {


        bestCrop.reasons.forEach(
            function (reason) {

                reasonsHTML += `

                    <li>
                        ✓ ${reason}
                    </li>

                `;

            }
        );


    } else {


        reasonsHTML = `

            <li>
                ✓ Crop conditions matched
            </li>

        `;

    }



    bestCard.innerHTML = `

        <div class="best-label">
            🏆 BEST MATCH
        </div>


        <div class="crop-name">
            🌱 ${bestCrop.crop}
        </div>


        <div class="score">
            ${bestCrop.score}%
        </div>


        <div class="score-label">
            Suitability Score
        </div>


        <div class="reasons">

            <h3>
                Why this crop?
            </h3>


            <ul>

                ${reasonsHTML}

            </ul>

        </div>

    `;


    resultDiv.appendChild(
        bestCard
    );


    // ================================
// GEMINI AI ADVICE
// ================================

if (aiAdvice) {

    const aiCard = document.createElement("div");

    aiCard.className = "ai-advice-card";

    aiCard.innerHTML = `

        <div class="ai-advice-title">
            🤖 AI Farming Advisor
        </div>

        <div class="ai-advice-content">
            ${aiAdvice.replace(/\n/g, "<br>")}
        </div>

    `;

    resultDiv.appendChild(aiCard);

}



    // ================================
    // OTHER CROPS
    // ================================

    if (
        recommendations.length > 1
    ) {


        const otherHeading =
            document.createElement(
                "h3"
            );


        otherHeading.className =
            "other-heading";


        otherHeading.innerText =
            "Other Suitable Crops";


        resultDiv.appendChild(
            otherHeading
        );



        const otherContainer =
            document.createElement(
                "div"
            );


        otherContainer.className =
            "other-crops";



        recommendations
            .slice(1)
            .forEach(
                function (crop, index) {


                    const card =
                        document.createElement(
                            "div"
                        );


                    card.className =
                        "other-crop-card";


                    const medal =
                        index === 0
                            ? "🥈"
                            : "🥉";



                    card.innerHTML = `

                        <div class="other-medal">
                            ${medal}
                        </div>


                        <div class="other-info">

                            <h3>
                                ${crop.crop}
                            </h3>

                            <p>
                                Suitability
                            </p>

                        </div>


                        <div class="other-score">
                            ${crop.score}%
                        </div>

                    `;


                    otherContainer.appendChild(
                        card
                    );

                }
            );


        resultDiv.appendChild(
            otherContainer
        );

    }



    // ================================
    // ADD TO PAGE
    // ================================

    const formCard =
        document.querySelector(
            ".form-card"
        );


    formCard.appendChild(
        resultDiv
    );



    // ================================
    // SCROLL TO RESULT
    // ================================

    resultDiv.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}