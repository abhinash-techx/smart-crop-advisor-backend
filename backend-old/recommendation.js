const crops = require("./crops");


function isInRange(value, min, max) {

    return value >= min && value <= max;

}


function calculateScore(farmer, crop) {

    let score = 0;

    let reasons = [];



    // ================= SOIL TYPE =================

    if (crop.soilTypes.includes(farmer.soilType)) {

        score += 15;

        reasons.push("Soil type is suitable");

    }



    // ================= SOIL PH =================

    if (
        isInRange(
            farmer.ph,
            crop.ph.min,
            crop.ph.max
        )
    ) {

        score += 15;

        reasons.push("Soil pH is suitable");

    }



    // ================= TEMPERATURE =================

    if (
        isInRange(
            farmer.temperature,
            crop.temperature.min,
            crop.temperature.max
        )
    ) {

        score += 15;

        reasons.push("Temperature is suitable");

    }



    // ================= RAINFALL =================

    if (
        isInRange(
            farmer.rainfall,
            crop.rainfall.min,
            crop.rainfall.max
        )
    ) {

        score += 15;

        reasons.push("Rainfall requirement matches");

    }



    // ================= WATER =================

    if (
        crop.water.includes(
            farmer.waterAvailability
        )
    ) {

        score += 10;

        reasons.push("Water availability is suitable");

    }



    // ================= SEASON =================

    if (
        crop.seasons.includes(
            farmer.sowingSeason
        )
    ) {

        score += 10;

        reasons.push("Sowing season is suitable");

    }



    // ================= FARMING TYPE =================

    if (
        crop.farmingTypes.includes(
            farmer.farmingType
        )
    ) {

        score += 8;

        reasons.push("Farming method is suitable");

    }



    // ================= PREVIOUS CROP =================

    if (
        crop.goodAfter.includes(
            farmer.previousCrop
        )
    ) {

        score += 5;

        reasons.push("Previous crop is a good match");

    }



    // ================= FERTILIZER =================

    if (
        crop.fertilizer.includes(
            farmer.fertilizerUsage
        )
    ) {

        score += 7;

        reasons.push("Fertilizer usage matches");

    }



    return {

        score: score,

        reasons: reasons

    };

}



function recommendCrops(farmer) {


    const results = crops.map(crop => {


        const analysis =
            calculateScore(
                farmer,
                crop
            );


        return {

            crop: crop.name,

            score: analysis.score,

            reasons: analysis.reasons

        };

    });



    results.sort(
        (a, b) =>
            b.score - a.score
    );



    return results.slice(0, 3);

}



module.exports = {

    recommendCrops

};