const crops = [
    {
        name: "Rice",

        soilTypes: ["Loamy", "Clayey", "Alluvial"],

        ph: {
            min: 5.5,
            max: 7.0
        },

        temperature: {
            min: 20,
            max: 35
        },

        rainfall: {
            min: 100,
            max: 300
        },

        water: ["High", "Rainwater Dependent"],

        seasons: ["Kharif"],

        farmingTypes: ["Irrigated", "Rain-fed"],

        fertilizer: ["Moderate", "High"],

        goodAfter: ["Wheat", "Potato", "Pea"]
    },

    {
        name: "Maize",

        soilTypes: ["Loamy", "Sandy Loam", "Alluvial"],

        ph: {
            min: 5.5,
            max: 7.5
        },

        temperature: {
            min: 18,
            max: 32
        },

        rainfall: {
            min: 50,
            max: 200
        },

        water: ["Medium", "High"],

        seasons: ["Kharif", "Rabi"],

        farmingTypes: ["Irrigated", "Rain-fed"],

        fertilizer: ["Moderate", "High"],

        goodAfter: ["Wheat", "Potato", "Pea"]
    },

    {
        name: "Wheat",

        soilTypes: ["Loamy", "Clayey", "Alluvial"],

        ph: {
            min: 6.0,
            max: 7.5
        },

        temperature: {
            min: 10,
            max: 25
        },

        rainfall: {
            min: 50,
            max: 150
        },

        water: ["Medium", "High"],

        seasons: ["Rabi"],

        farmingTypes: ["Irrigated", "Rain-fed"],

        fertilizer: ["Moderate", "High"],

        goodAfter: ["Rice", "Maize", "Cotton"]
    },

    {
        name: "Cotton",

        soilTypes: ["Loamy", "Black Soil", "Alluvial"],

        ph: {
            min: 5.5,
            max: 8.0
        },

        temperature: {
            min: 21,
            max: 35
        },

        rainfall: {
            min: 50,
            max: 200
        },

        water: ["Medium", "Low"],

        seasons: ["Kharif"],

        farmingTypes: ["Irrigated", "Rain-fed"],

        fertilizer: ["Moderate", "High"],

        goodAfter: ["Wheat", "Gram"]
    },

    {
        name: "Gram",

        soilTypes: ["Loamy", "Sandy Loam", "Black Soil"],

        ph: {
            min: 6.0,
            max: 8.0
        },

        temperature: {
            min: 15,
            max: 30
        },

        rainfall: {
            min: 40,
            max: 100
        },

        water: ["Low", "Medium"],

        seasons: ["Rabi"],

        farmingTypes: ["Rain-fed", "Irrigated"],

        fertilizer: ["Low", "Moderate"],

        goodAfter: ["Rice", "Maize", "Cotton"]
    }
];

module.exports = crops;