// MSP Alumni Data - Complete Dataset
// Last updated: March 2026
// Total alumni: 1527 across 78 nationalities
// Universities: 262 (verified from cleaned database)

const COUNTRY_DETAILS = {
    "nl": {
        name: "Netherlands", code: "nl", count: 533,
        gender: { Female: 278, Male: 184 },
        graduationYears: { "2014": 5, "2015": 9, "2016": 22, "2017": 25, "2018": 20, "2019": 26, "2020": 40, "2021": 52, "2022": 56, "2023": 62, "2024": 73, "2025": 72 },
        cities: [{ name: "Maastricht", count: 112 }, { name: "Amsterdam", count: 95 }, { name: "Utrecht", count: 72 }, { name: "Leiden", count: 38 }, { name: "Wageningen", count: 20 }, { name: "Groningen", count: 18 }],
        nationalities: [{ name: "Dutch", code: "nl", count: 208 }, { name: "German", code: "de", count: 50 }, { name: "Belgian", code: "be", count: 40 }, { name: "Italian", code: "it", count: 31 }],
        universities: [{ name: "Maastricht University", count: 143 }, { name: "Utrecht University", count: 99 }, { name: "University of Amsterdam", count: 75 }, { name: "Leiden University", count: 45 }, { name: "Wageningen University & Research", count: 43 }],
        coords: [52.1326, 5.2913]
    },
    "de": {
        name: "Germany", code: "de", count: 105,
        gender: { Female: 64, Male: 29 },
        graduationYears: { "2014": 3, "2015": 12, "2016": 8, "2017": 5, "2018": 10, "2019": 6, "2020": 5, "2021": 9, "2022": 8, "2023": 12, "2024": 6, "2025": 9 },
        cities: [{ name: "Munich", count: 22 }, { name: "Berlin", count: 21 }, { name: "Hamburg", count: 7 }, { name: "Cologne", count: 4 }],
        nationalities: [{ name: "German", code: "de", count: 53 }, { name: "Dutch", code: "nl", count: 58 }, { name: "Belgian", code: "be", count: 10 }],
        universities: [{ name: "Technical University of Munich", count: 10 }, { name: "Humboldt University Berlin", count: 5 }, { name: "LMU Munich", count: 4 }],
        coords: [51.1657, 10.4515]
    },
    "gb": {
        name: "United Kingdom", code: "gb", count: 92,
        gender: { Female: 50, Male: 33 },
        graduationYears: { "2015": 5, "2016": 7, "2017": 8, "2018": 8, "2019": 10, "2020": 9, "2021": 9, "2022": 5, "2023": 10, "2024": 8, "2025": 4 },
        cities: [{ name: "London", count: 38 }, { name: "Oxford", count: 8 }, { name: "Edinburgh", count: 7 }, { name: "Cambridge", count: 5 }],
        nationalities: [{ name: "British", code: "gb", count: 32 }, { name: "German", code: "de", count: 17 }, { name: "Dutch", code: "nl", count: 60 }],
        universities: [{ name: "Imperial College London", count: 19 }, { name: "University College London", count: 14 }, { name: "University of Edinburgh", count: 7 }, { name: "University of Oxford", count: 7 }, { name: "University of Cambridge", count: 8 }],
        coords: [55.3781, -3.4360]
    },
    "be": {
        name: "Belgium", code: "be", count: 81,
        gender: { Female: 39, Male: 31 },
        graduationYears: { "2014": 3, "2015": 2, "2016": 5, "2017": 7, "2018": 3, "2019": 5, "2020": 6, "2021": 14, "2022": 6, "2023": 7, "2024": 6, "2025": 6 },
        cities: [{ name: "Brussels", count: 34 }, { name: "Leuven", count: 16 }, { name: "Antwerp", count: 5 }, { name: "Ghent", count: 5 }],
        nationalities: [{ name: "Belgian", code: "be", count: 37 }, { name: "Italian", code: "it", count: 9 }, { name: "Spanish", code: "es", count: 6 }],
        universities: [{ name: "KU Leuven", count: 21 }, { name: "Vrije Universiteit Brussel", count: 5 }, { name: "Ghent University", count: 4 }],
        coords: [50.5039, 4.4699]
    },
    "se": {
        name: "Sweden", code: "se", count: 53,
        gender: { Female: 26, Male: 23 },
        graduationYears: { "2019": 2, "2020": 6, "2021": 4, "2022": 9, "2023": 4, "2024": 12, "2025": 12 },
        cities: [{ name: "Stockholm", count: 18 }, { name: "Uppsala", count: 15 }, { name: "Lund", count: 10 }],
        nationalities: [{ name: "German", code: "de", count: 17 }, { name: "Belgian", code: "be", count: 12 }, { name: "Dutch", code: "nl", count: 57 }],
        universities: [{ name: "Uppsala University", count: 19 }, { name: "Lund University", count: 14 }, { name: "Karolinska Institutet", count: 11 }, { name: "Stockholm University", count: 9 }],
        coords: [60.1282, 18.6435]
    },
    "ch": {
        name: "Switzerland", code: "ch", count: 44,
        gender: { Female: 27, Male: 10 },
        graduationYears: { "2017": 4, "2019": 5, "2021": 4, "2022": 2, "2023": 3, "2024": 8, "2025": 11 },
        cities: [{ name: "Zurich", count: 20 }, { name: "Lausanne", count: 6 }, { name: "Basel", count: 4 }, { name: "Geneva", count: 3 }],
        nationalities: [{ name: "German", code: "de", count: 13 }, { name: "Italian", code: "it", count: 9 }, { name: "Swiss", code: "ch", count: 6 }],
        universities: [{ name: "ETH Zurich", count: 14 }, { name: "University of Zurich", count: 4 }, { name: "EPFL", count: 3 }],
        coords: [46.8182, 8.2275]
    },
    "it": {
        name: "Italy", code: "it", count: 37,
        gender: { Female: 24, Male: 8 },
        graduationYears: { "2019": 3, "2020": 6, "2021": 2, "2022": 5, "2024": 6, "2025": 10 },
        cities: [{ name: "Milan", count: 12 }, { name: "Bologna", count: 6 }, { name: "Rome", count: 4 }],
        nationalities: [{ name: "Italian", code: "it", count: 23 }, { name: "Dutch", code: "nl", count: 53 }],
        universities: [{ name: "Universita di Bologna", count: 6 }, { name: "Bocconi University", count: 3 }],
        coords: [41.8719, 12.5674]
    },
    "fr": {
        name: "France", code: "fr", count: 35,
        gender: { Female: 22, Male: 8 },
        graduationYears: { "2020": 6, "2021": 3, "2022": 4, "2023": 4, "2024": 8, "2025": 5 },
        cities: [{ name: "Paris", count: 22 }, { name: "Lyon", count: 3 }],
        nationalities: [{ name: "French", code: "fr", count: 17 }, { name: "German", code: "de", count: 9 }],
        universities: [{ name: "Ecole Polytechnique", count: 5 }, { name: "Sorbonne University", count: 3 }],
        coords: [46.2276, 2.2137]
    },
    "es": {
        name: "Spain", code: "es", count: 35,
        gender: { Male: 15, Female: 14 },
        graduationYears: { "2017": 5, "2018": 3, "2019": 3, "2020": 4, "2024": 6, "2025": 8 },
        cities: [{ name: "Barcelona", count: 20 }, { name: "Madrid", count: 6 }],
        nationalities: [{ name: "Spanish", code: "es", count: 15 }, { name: "Italian", code: "it", count: 10 }],
        universities: [{ name: "University of Barcelona", count: 5 }],
        coords: [40.4637, -3.7492]
    },
    "dk": {
        name: "Denmark", code: "dk", count: 28,
        gender: { Female: 15, Male: 9 },
        graduationYears: { "2020": 4, "2023": 7, "2024": 3, "2025": 10 },
        cities: [{ name: "Copenhagen", count: 22 }],
        nationalities: [{ name: "Dutch", code: "nl", count: 57 }, { name: "German", code: "de", count: 11 }, { name: "Belgian", code: "be", count: 8 }],
        universities: [{ name: "University of Copenhagen", count: 14 }, { name: "Technical University of Denmark", count: 5 }],
        coords: [56.2639, 9.5018]
    },
    "us": {
        name: "United States", code: "us", count: 24,
        gender: { Female: 12, Male: 11 },
        graduationYears: { "2019": 2, "2020": 3, "2022": 3, "2023": 9, "2024": 3, "2025": 3 },
        cities: [{ name: "Boston", count: 5 }, { name: "San Francisco", count: 3 }, { name: "New York", count: 3 }],
        nationalities: [{ name: "American", code: "us", count: 5 }, { name: "German", code: "de", count: 9 }, { name: "Indian", code: "in", count: 3 }],
        universities: [{ name: "Harvard University", count: 2 }, { name: "Johns Hopkins University", count: 2 }],
        coords: [37.0902, -95.7129]
    },
    "fi": {
        name: "Finland", code: "fi", count: 19,
        gender: { Female: 12, Male: 6 },
        graduationYears: { "2017": 3, "2018": 2, "2021": 3, "2022": 4, "2024": 3, "2025": 3 },
        cities: [{ name: "Helsinki", count: 17 }],
        nationalities: [{ name: "Finnish", code: "fi", count: 9 }, { name: "Dutch", code: "nl", count: 55 }],
        universities: [{ name: "University of Helsinki", count: 5 }, { name: "Aalto University", count: 4 }],
        coords: [61.9241, 25.7482]
    },
    "at": {
        name: "Austria", code: "at", count: 22,
        gender: { Female: 10, Male: 7 },
        graduationYears: { "2018": 2, "2020": 2, "2022": 3, "2023": 4, "2024": 6 },
        cities: [{ name: "Vienna", count: 14 }],
        nationalities: [{ name: "German", code: "de", count: 12 }, { name: "Austrian", code: "at", count: 6 }],
        universities: [{ name: "University of Vienna", count: 3 }, { name: "TU Wien", count: 2 }],
        coords: [47.5162, 14.5501]
    },
    "ie": {
        name: "Ireland", code: "ie", count: 13,
        gender: { Female: 8, Male: 2 },
        graduationYears: { "2020": 3, "2021": 2, "2023": 2, "2024": 1, "2025": 2 },
        cities: [{ name: "Dublin", count: 8 }],
        nationalities: [{ name: "Belgian", code: "be", count: 7 }, { name: "Irish", code: "ie", count: 5 }],
        universities: [{ name: "University College Dublin", count: 4 }, { name: "Trinity College Dublin", count: 3 }],
        coords: [53.1424, -7.6921]
    },
    "lu": {
        name: "Luxembourg", code: "lu", count: 9,
        gender: { Female: 7, Male: 2 },
        graduationYears: { "2020": 4, "2021": 2, "2022": 1, "2023": 2 },
        cities: [{ name: "Luxembourg City", count: 7 }],
        nationalities: [{ name: "Luxembourgish", code: "lu", count: 5 }],
        universities: [{ name: "University of Luxembourg", count: 2 }],
        coords: [49.8153, 6.1296]
    },
    "ca": {
        name: "Canada", code: "ca", count: 8,
        gender: { Female: 6, Male: 2 },
        graduationYears: { "2014": 1, "2017": 2, "2018": 1, "2019": 1, "2022": 2, "2025": 1 },
        cities: [{ name: "Toronto", count: 5 }, { name: "Montreal", count: 2 }],
        nationalities: [{ name: "Dutch", code: "nl", count: 53 }, { name: "British", code: "gb", count: 8 }],
        universities: [{ name: "McGill University", count: 2 }, { name: "University of Toronto", count: 2 }],
        coords: [56.1304, -106.3468]
    },
    "pt": {
        name: "Portugal", code: "pt", count: 10,
        gender: { Female: 4, Male: 4 },
        graduationYears: { "2020": 1, "2021": 2, "2022": 1, "2023": 2, "2025": 2 },
        cities: [{ name: "Lisbon", count: 6 }],
        nationalities: [{ name: "Belgian", code: "be", count: 6 }, { name: "Portuguese", code: "pt", count: 4 }],
        universities: [{ name: "University of Lisbon", count: 2 }],
        coords: [39.3999, -8.2245]
    },
    "no": {
        name: "Norway", code: "no", count: 8,
        gender: { Female: 5, Male: 1 },
        graduationYears: { "2015": 1, "2018": 1, "2019": 1, "2023": 3 },
        cities: [{ name: "Oslo", count: 5 }],
        nationalities: [{ name: "Dutch", code: "nl", count: 52 }, { name: "Norwegian", code: "no", count: 4 }],
        universities: [{ name: "University of Oslo", count: 2 }],
        coords: [60.4720, 8.4689]
    },
    "au": {
        name: "Australia", code: "au", count: 8,
        gender: { Male: 4, Female: 3 },
        graduationYears: { "2017": 2, "2021": 2, "2024": 1, "2025": 2 },
        cities: [{ name: "Sydney", count: 3 }, { name: "Melbourne", count: 2 }],
        nationalities: [{ name: "Australian", code: "au", count: 4 }],
        universities: [{ name: "University of Melbourne", count: 2 }],
        coords: [-25.2744, 133.7751]
    },
    "gr": {
        name: "Greece", code: "gr", count: 5,
        gender: { Female: 4, Male: 1 },
        graduationYears: { "2021": 2, "2022": 1, "2023": 1, "2025": 1 },
        cities: [{ name: "Athens", count: 4 }],
        nationalities: [{ name: "Greek", code: "gr", count: 4 }],
        universities: [{ name: "University of Athens", count: 2 }],
        coords: [39.0742, 21.8243]
    },
    "jp": {
        name: "Japan", code: "jp", count: 4,
        gender: { Female: 0, Male: 4 },
        cities: [],
        nationalities: [],
        universities: [{ name: "Kyoto University", count: 1 }],
        coords: [36.2048, 138.2529]
    },
    "pl": {
        name: "Poland", code: "pl", count: 4,
        gender: { Female: 1, Male: 2 },
        cities: [],
        nationalities: [],
        universities: [{ name: "Medical University of Warsaw", count: 1 }],
        coords: [51.9194, 19.1451]
    },
    "bg": {
        name: "Bulgaria", code: "bg", count: 3,
        gender: { Female: 1, Male: 2 },
        cities: [],
        nationalities: [],
        universities: [{ name: "Wageningen University", count: 1 }],
        coords: [42.7339, 25.4858]
    },
    "in": {
        name: "India", code: "in", count: 2,
        gender: { Female: 2, Male: 0 },
        cities: [],
        nationalities: [],
        universities: [{ name: "Harvard University", count: 1 }],
        coords: [20.5937, 78.9629]
    },
    "sg": {
        name: "Singapore", code: "sg", count: 2,
        gender: { Female: 0, Male: 2 },
        cities: [],
        nationalities: [],
        universities: [{ name: "University of Manchester", count: 1 }],
        coords: [1.3521, 103.8198]
    },
    "si": {
        name: "Slovenia", code: "si", count: 2,
        gender: { Female: 2, Male: 0 },
        cities: [],
        nationalities: [],
        universities: [{ name: "University College London", count: 1 }],
        coords: [46.1512, 14.9955]
    },
    "cl": {
        name: "Chile", code: "cl", count: 2,
        gender: { Female: 0, Male: 2 },
        cities: [],
        nationalities: [],
        universities: [],
        coords: [-35.6751, -71.543]
    },
    "hu": {
        name: "Hungary", code: "hu", count: 2,
        gender: { Female: 1, Male: 1 },
        cities: [],
        nationalities: [],
        universities: [{ name: "Szeged University", count: 2 }],
        coords: [47.1625, 19.5033]
    },
    "lk": {
        name: "Sri Lanka", code: "lk", count: 2,
        gender: { Female: 1, Male: 1 },
        cities: [],
        nationalities: [],
        universities: [],
        coords: [7.8731, 80.7718]
    },
    "lt": {
        name: "Lithuania", code: "lt", count: 2,
        gender: { Female: 1, Male: 1 },
        cities: [],
        nationalities: [],
        universities: [{ name: "Sorbonne University", count: 1 }],
        coords: [55.1694, 23.8813]
    },
    "cn": {
        name: "China", code: "cn", count: 2,
        gender: { Female: 1, Male: 1 },
        cities: [],
        nationalities: [],
        universities: [],
        coords: [35.8617, 104.1954]
    },
    "ec": { name: "Ecuador", code: "ec", count: 1, gender: { Female: 0, Male: 1 }, cities: [], nationalities: [], universities: [], coords: [-1.8312, -78.1834] },
    "ke": { name: "Kenya", code: "ke", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [-0.0236, 37.9062] },
    "sx": { name: "Sint Maarten", code: "sx", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [18.0425, -63.0548] },
    "zw": { name: "Zimbabwe", code: "zw", count: 1, gender: { Female: 0, Male: 1 }, cities: [], nationalities: [], universities: [], coords: [-19.0154, 29.1549] },
    "ro": { name: "Romania", code: "ro", count: 1, gender: { Female: 0, Male: 1 }, cities: [], nationalities: [], universities: [], coords: [45.9432, 24.9668] },
    "nc": { name: "New Caledonia", code: "nc", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [-20.9043, 165.618] },
    "jm": { name: "Jamaica", code: "jm", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [18.1096, -77.2975] },
    "sk": { name: "Slovakia", code: "sk", count: 1, gender: { Female: 0, Male: 1 }, cities: [], nationalities: [], universities: [], coords: [48.669, 19.699] },
    "tr": { name: "Turkey", code: "tr", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [38.9637, 35.2433] },
    "tw": { name: "Taiwan", code: "tw", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [23.6978, 120.9605] },
    "sa": { name: "Saudi Arabia", code: "sa", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [23.8859, 45.0792] },
    "cz": { name: "Czech Republic", code: "cz", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [49.8175, 15.473] },
    "ml": { name: "Mali", code: "ml", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [17.5707, -3.9962] },
    "my": { name: "Malaysia", code: "my", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [4.2105, 101.9758] },
    "lv": { name: "Latvia", code: "lv", count: 1, gender: { Female: 0, Male: 1 }, cities: [], nationalities: [], universities: [], coords: [56.8796, 24.6032] },
    "co": { name: "Colombia", code: "co", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [4.5709, -74.2973] },
    "ae": { name: "United Arab Emirates", code: "ae", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [23.4241, 53.8478] },
    "rs": { name: "Serbia", code: "rs", count: 1, gender: { Female: 0, Male: 1 }, cities: [], nationalities: [], universities: [], coords: [44.0165, 21.0059] },
    "cy": { name: "Cyprus", code: "cy", count: 1, gender: { Female: 0, Male: 1 }, cities: [], nationalities: [], universities: [], coords: [35.1264, 33.4299] },
    "pe": { name: "Peru", code: "pe", count: 1, gender: { Female: 0, Male: 1 }, cities: [], nationalities: [], universities: [], coords: [-9.19, -75.0152] },
    "hk": { name: "Hong Kong", code: "hk", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [22.3193, 114.1694] },
    "md": { name: "Moldova", code: "md", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [47.4116, 28.3699] },
    "za": { name: "South Africa", code: "za", count: 1, gender: { Female: 0, Male: 1 }, cities: [], nationalities: [], universities: [], coords: [-30.5595, 22.9375] },
    "tn": { name: "Tunisia", code: "tn", count: 1, gender: { Female: 0, Male: 1 }, cities: [], nationalities: [], universities: [], coords: [33.8869, 9.5375] },
    "ph": { name: "Philippines", code: "ph", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [12.8797, 121.774] },
    "la": { name: "Laos", code: "la", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [19.8563, 102.4955] },
    "cr": { name: "Costa Rica", code: "cr", count: 1, gender: { Female: 1, Male: 0 }, cities: [], nationalities: [], universities: [], coords: [9.7489, -83.7534] }
};


// MSP_DATA - Main data object used by most pages
const MSP_DATA = {
    summary: {
        totalAlumni: 1527,
        nationalities: 78,
        countriesLivingIn: 59,
        universitiesAttended: 262
    },
    lastUpdated: "July 2026",
    
    graduationByYear: [
        { year: 2014, count: 25 },
        { year: 2015, count: 44 },
        { year: 2016, count: 57 },
        { year: 2017, count: 66 },
        { year: 2018, count: 65 },
        { year: 2019, count: 76 },
        { year: 2020, count: 108 },
        { year: 2021, count: 132 },
        { year: 2022, count: 145 },
        { year: 2023, count: 170 },
        { year: 2024, count: 193 },
        { year: 2025, count: 240 },
        { year: 2026, count: 206 }
    ],
    
    countriesLiving: [
        { name: "Netherlands", code: "nl", count: 533, coords: [52.1326, 5.2913] },
        { name: "Germany", code: "de", count: 105, coords: [51.1657, 10.4515] },
        { name: "United Kingdom", code: "gb", count: 92, coords: [55.3781, -3.4360] },
        { name: "Belgium", code: "be", count: 81, coords: [50.5039, 4.4699] },
        { name: "Sweden", code: "se", count: 53, coords: [60.1282, 18.6435] },
        { name: "Switzerland", code: "ch", count: 44, coords: [46.8182, 8.2275] },
        { name: "Italy", code: "it", count: 37, coords: [41.8719, 12.5674] },
        { name: "Spain", code: "es", count: 35, coords: [40.4637, -3.7492] },
        { name: "France", code: "fr", count: 38, coords: [46.2276, 2.2137] },
        { name: "Denmark", code: "dk", count: 29, coords: [56.2639, 9.5018] },
        { name: "United States", code: "us", count: 24, coords: [37.0902, -95.7129] },
        { name: "Austria", code: "at", count: 22, coords: [47.5162, 14.5501] },
        { name: "Finland", code: "fi", count: 18, coords: [61.9241, 25.7482] },
        { name: "Ireland", code: "ie", count: 14, coords: [53.1424, -7.6921] },
        { name: "Portugal", code: "pt", count: 11, coords: [39.3999, -8.2245] },
        { name: "Luxembourg", code: "lu", count: 9, coords: [49.8153, 6.1296] },
        { name: "Australia", code: "au", count: 10, coords: [-25.2744, 133.7751] },
        { name: "Canada", code: "ca", count: 8, coords: [56.1304, -106.3468] },
        { name: "Norway", code: "no", count: 9, coords: [60.4720, 8.4689] },
        { name: "Japan", code: "jp", count: 4, coords: [36.2048, 138.2529] },
        { name: "Greece", code: "gr", count: 4, coords: [39.0742, 21.8243] },
        { name: "Poland", code: "pl", count: 4, coords: [51.9194, 19.1451] },
        { name: "Bulgaria", code: "bg", count: 3, coords: [42.7339, 25.4858] },
        { name: "Singapore", code: "sg", count: 2, coords: [1.3521, 103.8198] },
        { name: "Lithuania", code: "lt", count: 2, coords: [55.1694, 23.8813] },
        { name: "Sri Lanka", code: "lk", count: 2, coords: [7.8731, 80.7718] },
        { name: "Chile", code: "cl", count: 2, coords: [-35.6751, -71.5430] },
        { name: "Hungary", code: "hu", count: 2, coords: [47.1625, 19.5033] },
        { name: "China", code: "cn", count: 2, coords: [35.8617, 104.1954] },
        { name: "Slovenia", code: "si", count: 2, coords: [46.1512, 14.9955] },
        { name: "Zimbabwe", code: "zw", count: 1, coords: [-19.0154, 29.1549] },
        { name: "Kenya", code: "ke", count: 1, coords: [-0.0236, 37.9062] },
        { name: "Ecuador", code: "ec", count: 1, coords: [-1.8312, -78.1834] },
        { name: "Sint Maarten", code: "sx", count: 1, coords: [18.0425, -63.0548] },
        { name: "Romania", code: "ro", count: 1, coords: [45.9432, 24.9668] },
        { name: "Saudi Arabia", code: "sa", count: 1, coords: [23.8859, 45.0792] },
        { name: "India", code: "in", count: 1, coords: [20.5937, 78.9629] },
        { name: "Taiwan", code: "tw", count: 1, coords: [23.6978, 120.9605] },
        { name: "Jamaica", code: "jm", count: 1, coords: [18.1096, -77.2975] },
        { name: "Slovakia", code: "sk", count: 1, coords: [48.669, 19.699] },
        { name: "Malaysia", code: "my", count: 1, coords: [4.2105, 101.9758] },
        { name: "New Caledonia", code: "nc", count: 1, coords: [-20.9043, 165.618] },
        { name: "Turkey", code: "tr", count: 1, coords: [38.9637, 35.2433] },
        { name: "Mali", code: "ml", count: 1, coords: [17.5707, -3.9962] },
        { name: "Czech Republic", code: "cz", count: 1, coords: [49.8175, 15.473] },
        { name: "Cyprus", code: "cy", count: 1, coords: [35.1264, 33.4299] },
        { name: "Latvia", code: "lv", count: 1, coords: [56.8796, 24.6032] },
        { name: "United Arab Emirates", code: "ae", count: 1, coords: [23.4241, 53.8478] },
        { name: "Serbia", code: "rs", count: 1, coords: [44.0165, 21.0059] },
        { name: "Peru", code: "pe", count: 1, coords: [-9.19, -75.0152] },
        { name: "Colombia", code: "co", count: 1, coords: [4.5709, -74.2973] },
        { name: "Hong Kong", code: "hk", count: 1, coords: [22.3193, 114.1694] },
        { name: "Moldova", code: "md", count: 1, coords: [47.4116, 28.3699] },
        { name: "South Africa", code: "za", count: 1, coords: [-30.5595, 22.9375] },
        { name: "Tunisia", code: "tn", count: 1, coords: [33.8869, 9.5375] },
        { name: "Philippines", code: "ph", count: 1, coords: [12.8797, 121.774] },
        { name: "Laos", code: "la", count: 1, coords: [19.8563, 102.4955] },
        { name: "Israel", code: "il", count: 1, coords: [31.0461, 34.8516] },
        { name: "Costa Rica", code: "cr", count: 1, coords: [9.7489, -83.7534] }
    ],
    
    // FIXED: Logo filenames now match actual files in assets/logos/
    // UPDATED: February 2026 - counts corrected from cleaned database
    topUniversities: [
        { name: "Maastricht University", count: 159, code: "nl", country: "Netherlands", logo: "maastricht-university.png", prestige: false },
        { name: "Utrecht University", count: 109, code: "nl", country: "Netherlands", logo: "utrecht-university.png", prestige: false },
        { name: "University of Amsterdam", count: 78, code: "nl", country: "Netherlands", logo: "university-of-amsterdam.png", prestige: false },
        { name: "Leiden University", count: 53, code: "nl", country: "Netherlands", logo: "leiden-university.png", prestige: true },
        { name: "Wageningen University & Research", count: 44, code: "nl", country: "Netherlands", logo: "wageningen-university.png", prestige: true },
        { name: "Radboud University", count: 42, code: "nl", country: "Netherlands", logo: "radboud-university.png", prestige: false },
        { name: "University of Groningen", count: 27, code: "nl", country: "Netherlands", logo: "university-of-groningen.png", prestige: false },
        { name: "KU Leuven", count: 23, code: "be", country: "Belgium", logo: "ku-leuven.png", prestige: true },
        { name: "University of Copenhagen", count: 21, code: "dk", country: "Denmark", logo: "university-of-copenhagen.png", prestige: true },
        { name: "Delft University of Technology", count: 20, code: "nl", country: "Netherlands", logo: "tu-delft.png", prestige: true },
        { name: "Imperial College London", count: 19, code: "gb", country: "United Kingdom", logo: "imperial-college-london.png", prestige: true },
        { name: "Uppsala University", count: 19, code: "se", country: "Sweden", logo: "uppsala-university.png", prestige: true },
        { name: "University College London", count: 16, code: "gb", country: "United Kingdom", logo: "ucl.png", prestige: true },
        { name: "Vrije Universiteit Amsterdam", count: 16, code: "nl", country: "Netherlands", logo: "vrije-universiteit-amsterdam.png", prestige: false },
        { name: "Lund University", count: 16, code: "se", country: "Sweden", logo: "lund-university.png", prestige: true },
        { name: "ETH Zurich", count: 15, code: "ch", country: "Switzerland", logo: "eth-zurich.png", prestige: true },
        { name: "Eindhoven University of Technology", count: 12, code: "nl", country: "Netherlands", logo: "eindhoven-university.png", prestige: true },
        { name: "Karolinska Institutet", count: 11, code: "se", country: "Sweden", logo: "karolinska-institutet.png", prestige: true },
        { name: "Technical University of Munich", count: 10, code: "de", country: "Germany", logo: "tu-munich.png", prestige: true },
        { name: "Stockholm University", count: 9, code: "se", country: "Sweden", logo: "stockholm-university.png", prestige: false },
        { name: "University of Cambridge", count: 9, code: "gb", country: "United Kingdom", logo: "university-of-cambridge.png", prestige: true }
    ],
    
    fieldsOfStudy: [
        { name: "Life Sciences & Biology", count: 422, percent: 41.5, icon: "dna" },
        { name: "Physics & Engineering", count: 125, percent: 12.3, icon: "atom" },
        { name: "Chemistry & Materials", count: 111, percent: 10.9, icon: "flask-conical" },
        { name: "Medicine & Health", count: 111, percent: 10.9, icon: "heart-pulse" },
        { name: "Neuroscience", count: 69, percent: 6.8, icon: "brain" },
        { name: "Business & Economics", count: 49, percent: 4.8, icon: "briefcase" },
        { name: "Computer Science & AI", count: 29, percent: 2.9, icon: "cpu" },
        { name: "Environmental & Earth Sciences", count: 27, percent: 2.7, icon: "leaf" },
        { name: "Social Sciences & Humanities", count: 25, percent: 2.5, icon: "users" },
        { name: "Other", count: 49, percent: 4.8, icon: "more-horizontal" }
    ],
    
    allNationalityFlags: [
        "nl", "de", "be", "it", "gb", "es", "pl", "fr", "lu", "ie", "ro", "us",
        "bg", "ch", "gr", "tr", "ru", "fi", "pt", "za", "cy", "in", "hr", "sk",
        "si", "lt", "hu", "lv", "at", "mx", "cn", "cz", "dk", "jp", "ee", "au",
        "se", "ca", "ua", "no", "tt", "sg", "kz", "kr", "ir", "br", "zw", "id",
        "cl", "lk", "ba", "rs", "ec", "vn", "th", "cw", "sd", "mk", "pk", "ke",
        "co", "iq", "kh", "my", "ma", "mt", "md", "gh", "mz", "ph", "az", "pe",
        "il", "mu", "pa", "sa", "ar", "kw"
    ],
    
    links: {
        mspMain: "https://www.maastrichtuniversity.nl/education/bachelor/maastricht-science-programme",
        mspWhyThisStudy: "https://www.maastrichtuniversity.nl/education/bachelor/maastricht-science-programme/why-programme",
        mspCourses: "https://www.maastrichtuniversity.nl/education/bachelor/maastricht-science-programme/curriculum",
        mspAdmissions: "https://www.maastrichtuniversity.nl/education/bachelor/maastricht-science-programme/admission-requirements",
        linkedinMspAlumni: "https://www.linkedin.com/groups/12893377/",
        linkedinFseAlumni: "https://www.linkedin.com/groups/4689010/",
        instagram: "https://www.instagram.com/msp_alumni/",
        admissions: "https://www.maastrichtuniversity.nl/education/bachelor/maastricht-science-programme/admission-requirements"
    },
    
    recruitment: {
        heroStat: "78 nationalities. 59 countries. 262 universities.",
        proofStats: [
            { number: 1527, label: "MSP Alumni", highlight: true },
            { number: 78, label: "Nationalities" },
            { number: 262, label: "Master's Universities" },
            { number: "10.1%", label: "Pursuing PhDs", subtext: "At world-leading institutions" }
        ]
    },
    
    // ============================================
    // CONSIDERING MSP PAGE DATA
    // Updated: January 2025
    // ============================================
    
    consideringMSP: {
        heroStats: {
            alumni: 1527,
            nationalities: 78,
            universities: 262,
            countries: 59
        },
        
        careerSectors: [
            { name: "Academia & Research", count: 222, percent: 15.9, icon: "graduation-cap", color: "#00A2DB", description: "PhD candidates, postdocs, research scientists, and faculty", examples: ["PhD at Max Planck", "Research Fellow at Cambridge", "Postdoc at ETH Zurich"] },
            { name: "Technology & Data", count: 66, percent: 4.7, icon: "cpu", color: "#8b5cf6", description: "Software engineers, data scientists, AI researchers", examples: ["Software Engineer at ASML", "Data Scientist", "ML Engineer"] },
            { name: "Industry R&D", count: 60, percent: 4.3, icon: "flask-conical", color: "#10b981", description: "Research and development in corporate settings", examples: ["R&D Scientist at Unilever", "Materials Researcher at ASML", "Innovation Lead"] },
            { name: "Finance & Business", count: 48, percent: 3.4, icon: "briefcase", color: "#f59e0b", description: "Management, operations, banking, and finance", examples: ["Investment Analyst", "Operations Manager", "Business Development"] },
            { name: "Pharma & Biotech", count: 46, percent: 3.3, icon: "pill", color: "#ec4899", description: "Pharmaceutical and biotechnology industry", examples: ["Scientist at Novartis", "Clinical Researcher at Roche", "Biotech Analyst"] },
            { name: "Consulting", count: 42, percent: 3.0, icon: "trending-up", color: "#E84E10", description: "Strategy, management, and specialized consulting", examples: ["Consultant at McKinsey", "Analyst at BCG", "Strategy at Deloitte"] },
            { name: "Environment & Sustainability", count: 33, percent: 2.4, icon: "leaf", color: "#22c55e", description: "Environmental science, sustainability, conservation", examples: ["Sustainability Consultant", "Environmental Researcher", "Climate Analyst"] },
            { name: "Healthcare & Medicine", count: 23, percent: 1.6, icon: "heart-pulse", color: "#ef4444", description: "Clinical practice, medical research, healthcare management", examples: ["Medical Doctor", "Clinical Research Associate", "Healthcare Consultant"] },
            { name: "Engineering", count: 21, percent: 1.5, icon: "settings", color: "#6366f1", description: "Technical engineering roles across industries", examples: ["Process Engineer", "R&D Engineer", "Technical Consultant"] },
            { name: "Entrepreneurship", count: 15, percent: 1.1, icon: "rocket", color: "#f97316", description: "Founders, startup leaders, and self-employed", examples: ["Startup Founder", "CEO", "Freelance Consultant"] },
            { name: "Government & Policy", count: 8, percent: 0.6, icon: "landmark", color: "#0ea5e9", description: "Public sector, policy research, government roles", examples: ["Policy Advisor", "EU Commission", "Government Researcher"] },
            { name: "NGO & Non-profit", count: 7, percent: 0.5, icon: "heart-handshake", color: "#d946ef", description: "Non-governmental organizations and charities", examples: ["Programme Officer", "Research Lead", "Development Coordinator"] }
        ],
        
        phdPipeline: {
            phdCandidates: 141,
            phdPercent: 10.1,
            postdocs: 9,
            researchPositions: 49,
            faculty: 5,
            totalAcademia: 222,
            academiaPercent: 15.9,
            institutions: [
                { name: "Max Planck Institutes", icon: "award" },
                { name: "ETH Zurich", icon: "award" },
                { name: "University of Cambridge", icon: "award" },
                { name: "University of Oxford", icon: "award" },
                { name: "Karolinska Institutet", icon: "award" },
                { name: "EPFL", icon: "award" }
            ]
        },
        
        fieldToCareer: [
            { field: "Life Sciences & Biology", count: 422, icon: "dna", color: "#10b981", topCareers: [{ name: "PhD Candidates", count: 62 }, { name: "Research Positions", count: 23 }, { name: "Industry R&D", count: 22 }, { name: "Pharma & Biotech", count: 19 }] },
            { field: "Chemistry & Materials", count: 111, icon: "flask-conical", color: "#8b5cf6", topCareers: [{ name: "PhD Candidates", count: 30 }, { name: "Industry R&D", count: 7 }, { name: "Environmental", count: 6 }, { name: "Technology", count: 5 }] },
            { field: "Physics & Engineering", count: 125, icon: "atom", color: "#00A2DB", topCareers: [{ name: "PhD Candidates", count: 13 }, { name: "Industry R&D", count: 6 }, { name: "Technology", count: 6 }, { name: "Consulting", count: 5 }] },
            { field: "Medicine & Health", count: 111, icon: "heart-pulse", color: "#ef4444", topCareers: [{ name: "PhD Candidates", count: 14 }, { name: "Management", count: 10 }, { name: "Industry R&D", count: 7 }, { name: "Healthcare", count: 5 }] },
            { field: "Neuroscience", count: 69, icon: "brain", color: "#ec4899", topCareers: [{ name: "PhD Candidates", count: 8 }, { name: "Research Positions", count: 5 }, { name: "Consulting", count: 4 }, { name: "Education", count: 2 }] },
            { field: "Computer Science & AI", count: 29, icon: "cpu", color: "#6366f1", topCareers: [{ name: "Technology & Data", count: 7 }, { name: "Consulting", count: 3 }, { name: "Technology", count: 3 }, { name: "PhD Candidates", count: 2 }] }
        ],
        
        notableEmployers: {
            research: [{ name: "Max Planck", count: 4 }, { name: "Fraunhofer", count: 2 }, { name: "CERN", count: 1 }, { name: "Nikhef", count: 2 }],
            consulting: [{ name: "McKinsey", count: 2 }, { name: "BCG", count: 1 }, { name: "Deloitte", count: 3 }, { name: "PwC", count: 2 }],
            industry: [{ name: "ASML", count: 4 }, { name: "Unilever", count: 2 }, { name: "AstraZeneca", count: 4 }, { name: "Novartis", count: 1 }],
            categories: [
                { name: "Research Institutes", icon: "microscope", examples: ["Max Planck", "Fraunhofer", "CERN"] },
                { name: "Consulting", icon: "trending-up", examples: ["McKinsey", "BCG", "Deloitte", "PwC"] },
                { name: "Tech & Engineering", icon: "cpu", examples: ["ASML", "Philips", "Booking.com"] },
                { name: "Pharma & Healthcare", icon: "pill", examples: ["AstraZeneca", "Novartis", "Roche"] }
            ]
        },
        
        genderByField: [
            { field: "Life Sciences & Biology", female: 267, male: 155, femalePercent: 63 },
            { field: "Medicine & Health", female: 93, male: 18, femalePercent: 84 },
            { field: "Neuroscience", female: 44, male: 24, femalePercent: 65 },
            { field: "Chemistry & Materials", female: 54, male: 57, femalePercent: 49 },
            { field: "Physics & Engineering", female: 61, male: 63, femalePercent: 49 },
            { field: "Computer Science & AI", female: 9, male: 20, femalePercent: 31 }
        ],
        
        growth: {
            factor: 3.9,
            years: "13",
            early: { period: "2014-2017", count: 192 },
            recent: { period: "2022-2025", count: 748 },
            byYear: [
                { year: 2014, count: 25 }, { year: 2015, count: 44 }, { year: 2016, count: 57 }, { year: 2017, count: 66 },
                { year: 2018, count: 65 }, { year: 2019, count: 76 }, { year: 2020, count: 108 }, { year: 2021, count: 132 },
                { year: 2022, count: 145 }, { year: 2023, count: 170 }, { year: 2024, count: 193 }, { year: 2025, count: 240 },
                { year: 2026, count: 206 }
            ]
        },
        
        regionalImpact: { inNetherlands: 483, netherlandsPercent: 34.6, fromEuregio: 390, euregioPercent: 27.9, euregioRetention: 21.5 },
        
        quickFacts: [
            { number: "60%", label: "Female Students", sublabel: "832 of 1,397 on record", icon: "users" },
            { number: "35%", label: "Stay in Netherlands", sublabel: "483 alumni currently", icon: "map-pin" },
            { number: "82", label: "At Elite Universities", sublabel: "World Top 25 institutions", icon: "award" },
            { number: "3.9x", label: "Programme Growth", sublabel: "Since 2014", icon: "trending-up" }
        ],
        
        topCities: [
            { rank: 1, name: "Maastricht", country: "Netherlands", code: "nl", count: 123 },
            { rank: 2, name: "Amsterdam", country: "Netherlands", code: "nl", count: 96 },
            { rank: 3, name: "Utrecht", country: "Netherlands", code: "nl", count: 70 },
            { rank: 4, name: "London", country: "United Kingdom", code: "gb", count: 37 },
            { rank: 5, name: "Leiden", country: "Netherlands", code: "nl", count: 35 },
            { rank: 6, name: "Brussels", country: "Belgium", code: "be", count: 33 },
            { rank: 7, name: "Copenhagen", country: "Denmark", code: "dk", count: 22 },
            { rank: 8, name: "Berlin", country: "Germany", code: "de", count: 21 },
            { rank: 9, name: "Munich", country: "Germany", code: "de", count: 21 },
            { rank: 10, name: "Zurich", country: "Switzerland", code: "ch", count: 21 }
        ],
        
        // FIXED: Logo filenames now match actual files in assets/logos/
        universityTiers: {
            worldTop10: {
                label: "World Top 10",
                count: 32,
                universities: [
                    { name: "ETH Zurich", code: "ch", count: 15, logo: "eth-zurich.png" },
                    { name: "Cambridge", code: "gb", count: 9, logo: "university-of-cambridge.png" },
                    { name: "Oxford", code: "gb", count: 7, logo: "university-of-oxford.png" },
                    { name: "Harvard", code: "us", count: 1, logo: "harvard.png" }
                ]
            },
            worldTop25: {
                label: "World Top 25",
                count: 85,
                universities: [
                    { name: "Imperial College", code: "gb", count: 19, logo: "imperial-college-london.png" },
                    { name: "UCL", code: "gb", count: 16, logo: "ucl.png" },
                    { name: "Karolinska Institutet", code: "se", count: 11, logo: "karolinska-institutet.png" },
                    { name: "EPFL", code: "ch", count: 2, logo: "epfl.png" },
                    { name: "Princeton", code: "us", count: 1, logo: "princeton.png" },
                    { name: "Columbia", code: "us", count: 1, logo: "columbia.png" },
                    { name: "Uppsala University", code: "se", count: 19, logo: "uppsala-university.png" },
                    { name: "Lund University", code: "se", count: 16, logo: "lund-university.png" }
                ]
            },
            topDutch: {
                label: "Top Dutch Universities",
                count: 485,
                universities: [
                    { name: "Maastricht University", code: "nl", count: 159, logo: "maastricht-university.png" },
                    { name: "Utrecht University", code: "nl", count: 109, logo: "utrecht-university.png" },
                    { name: "University of Amsterdam", code: "nl", count: 78, logo: "university-of-amsterdam.png" },
                    { name: "Leiden University", code: "nl", count: 53, logo: "leiden-university.png" },
                    { name: "Wageningen University & Research", code: "nl", count: 44, logo: "wageningen-university.png" },
                    { name: "Radboud University", code: "nl", count: 42, logo: "radboud-university.png" }
                ]
            }
        },
        
        universityDetails: {
            "ETH Zurich": {
                fullName: "ETH Zurich (Swiss Federal Institute of Technology)",
                location: "Zurich, Switzerland",
                founded: 1855,
                ranking: "7th",
                info: "Renowned for science and technology, consistently ranked among the world's top 10 universities. Home to 22 Nobel laureates, including Albert Einstein."
            },
            "Cambridge": {
                fullName: "University of Cambridge",
                location: "Cambridge, United Kingdom",
                founded: 1209,
                ranking: "5th",
                info: "One of the world's oldest and most prestigious universities. 121 Nobel laureates have been affiliated with Cambridge, more than any other institution."
            },
            "Oxford": {
                fullName: "University of Oxford",
                location: "Oxford, United Kingdom",
                founded: 1096,
                ranking: "3rd",
                info: "The oldest university in the English-speaking world. Oxford has educated 30 British prime ministers and 72 Nobel laureates."
            },
            "Harvard": {
                fullName: "Harvard University",
                location: "Cambridge, Massachusetts, USA",
                founded: 1636,
                ranking: "4th",
                info: "America's oldest institution of higher learning. Harvard has produced 8 US presidents and 161 Nobel laureates."
            },
            "Imperial College": {
                fullName: "Imperial College London",
                location: "London, United Kingdom",
                founded: 1907,
                ranking: "6th",
                info: "Specializes in science, engineering, medicine and business. Consistently ranked among the top 10 universities globally."
            },
            "UCL": {
                fullName: "University College London",
                location: "London, United Kingdom",
                founded: 1826,
                ranking: "9th",
                info: "London's leading multidisciplinary university, with 30 Nobel Prize winners among its alumni and staff."
            },
            "Karolinska Institutet": {
                fullName: "Karolinska Institutet",
                location: "Stockholm, Sweden",
                founded: 1810,
                ranking: "26th",
                info: "One of the world's foremost medical universities. The Nobel Assembly at Karolinska awards the Nobel Prize in Physiology or Medicine."
            },
            "EPFL": {
                fullName: "École Polytechnique Fédérale de Lausanne",
                location: "Lausanne, Switzerland",
                founded: 1969,
                ranking: "36th",
                info: "Switzerland's premier science and technology university, known for cutting-edge research in engineering and physical sciences."
            },
            "Princeton": {
                fullName: "Princeton University",
                location: "Princeton, New Jersey, USA",
                founded: 1746,
                ranking: "17th",
                info: "One of America's most prestigious Ivy League universities. Home to 42 Nobel laureates and numerous Fields Medal winners."
            },
            "Columbia": {
                fullName: "Columbia University",
                location: "New York City, USA",
                founded: 1754,
                ranking: "34th",
                info: "The oldest institution of higher learning in New York. Columbia has produced 96 Nobel laureates and the Pulitzer Prizes are administered from here."
            },
            "Uppsala University": {
                fullName: "Uppsala University",
                location: "Uppsala, Sweden",
                founded: 1477,
                ranking: "105th",
                info: "The oldest university in Sweden and Scandinavia. Known for excellence in life sciences and medicine."
            },
            "Lund University": {
                fullName: "Lund University",
                location: "Lund, Sweden",
                founded: 1666,
                ranking: "85th",
                info: "One of Northern Europe's oldest and most prestigious universities, ranked top 100 globally in most fields."
            }
        },
        
        composition: {
            gender: { female: 832, male: 562, other: 3 },
            international: { international: 1115, dutch: 282 },
            euStatus: { eu: 1131, nonEu: 266 }
        }
    }
};

// Country facts for all countries
const COUNTRY_FACTS = {
    nl: { capital: 'Amsterdam', currency: 'Euro (EUR)', language: 'Dutch', population: '17.8M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    de: { capital: 'Berlin', currency: 'Euro (EUR)', language: 'German', population: '84.4M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    gb: { capital: 'London', currency: 'Pound (GBP)', language: 'English', population: '67.3M', continent: 'Europe', timezone: 'GMT (UTC+0)' },
    be: { capital: 'Brussels', currency: 'Euro (EUR)', language: 'Dutch/French', population: '11.7M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    se: { capital: 'Stockholm', currency: 'Krona (kr)', language: 'Swedish', population: '10.5M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    ch: { capital: 'Bern', currency: 'Franc (CHF)', language: 'German/French', population: '8.8M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    it: { capital: 'Rome', currency: 'Euro (EUR)', language: 'Italian', population: '58.9M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    fr: { capital: 'Paris', currency: 'Euro (EUR)', language: 'French', population: '67.8M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    es: { capital: 'Madrid', currency: 'Euro (EUR)', language: 'Spanish', population: '47.6M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    dk: { capital: 'Copenhagen', currency: 'Krone (kr)', language: 'Danish', population: '5.9M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    fi: { capital: 'Helsinki', currency: 'Euro (EUR)', language: 'Finnish', population: '5.5M', continent: 'Europe', timezone: 'EET (UTC+2)' },
    at: { capital: 'Vienna', currency: 'Euro (EUR)', language: 'German', population: '9.1M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    ie: { capital: 'Dublin', currency: 'Euro (EUR)', language: 'English/Irish', population: '5.1M', continent: 'Europe', timezone: 'GMT (UTC+0)' },
    lu: { capital: 'Luxembourg City', currency: 'Euro (EUR)', language: 'Lux/Fr/De', population: '660K', continent: 'Europe', timezone: 'CET (UTC+1)' },
    pt: { capital: 'Lisbon', currency: 'Euro (EUR)', language: 'Portuguese', population: '10.4M', continent: 'Europe', timezone: 'WET (UTC+0)' },
    no: { capital: 'Oslo', currency: 'Krone (kr)', language: 'Norwegian', population: '5.5M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    gr: { capital: 'Athens', currency: 'Euro (EUR)', language: 'Greek', population: '10.4M', continent: 'Europe', timezone: 'EET (UTC+2)' },
    pl: { capital: 'Warsaw', currency: 'Zloty (zl)', language: 'Polish', population: '37.8M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    bg: { capital: 'Sofia', currency: 'Lev (BGN)', language: 'Bulgarian', population: '6.5M', continent: 'Europe', timezone: 'EET (UTC+2)' },
    ro: { capital: 'Bucharest', currency: 'Leu (lei)', language: 'Romanian', population: '19.0M', continent: 'Europe', timezone: 'EET (UTC+2)' },
    hu: { capital: 'Budapest', currency: 'Forint (Ft)', language: 'Hungarian', population: '9.6M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    cz: { capital: 'Prague', currency: 'Koruna (CZK)', language: 'Czech', population: '10.5M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    sk: { capital: 'Bratislava', currency: 'Euro (EUR)', language: 'Slovak', population: '5.4M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    si: { capital: 'Ljubljana', currency: 'Euro (EUR)', language: 'Slovene', population: '2.1M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    lt: { capital: 'Vilnius', currency: 'Euro (EUR)', language: 'Lithuanian', population: '2.8M', continent: 'Europe', timezone: 'EET (UTC+2)' },
    lv: { capital: 'Riga', currency: 'Euro (EUR)', language: 'Latvian', population: '1.8M', continent: 'Europe', timezone: 'EET (UTC+2)' },
    rs: { capital: 'Belgrade', currency: 'Dinar (RSD)', language: 'Serbian', population: '6.7M', continent: 'Europe', timezone: 'CET (UTC+1)' },
    cy: { capital: 'Nicosia', currency: 'Euro (EUR)', language: 'Greek/Turkish', population: '1.3M', continent: 'Europe', timezone: 'EET (UTC+2)' },
    md: { capital: 'Chisinau', currency: 'Leu (MDL)', language: 'Romanian', population: '2.6M', continent: 'Europe', timezone: 'EET (UTC+2)' },
    tr: { capital: 'Ankara', currency: 'Lira (TRY)', language: 'Turkish', population: '85.3M', continent: 'Europe/Asia', timezone: 'TRT (UTC+3)' },
    us: { capital: 'Washington D.C.', currency: 'Dollar ($)', language: 'English', population: '334.9M', continent: 'Americas', timezone: 'Multiple' },
    ca: { capital: 'Ottawa', currency: 'Dollar (C$)', language: 'English/French', population: '40.1M', continent: 'Americas', timezone: 'Multiple' },
    cl: { capital: 'Santiago', currency: 'Peso (CLP)', language: 'Spanish', population: '19.5M', continent: 'Americas', timezone: 'CLT (UTC-3)' },
    co: { capital: 'Bogota', currency: 'Peso (COP)', language: 'Spanish', population: '52.2M', continent: 'Americas', timezone: 'COT (UTC-5)' },
    ec: { capital: 'Quito', currency: 'Dollar ($)', language: 'Spanish', population: '18.0M', continent: 'Americas', timezone: 'ECT (UTC-5)' },
    pe: { capital: 'Lima', currency: 'Sol (S/)', language: 'Spanish', population: '34.0M', continent: 'Americas', timezone: 'PET (UTC-5)' },
    cr: { capital: 'San Jose', currency: 'Colon (CRC)', language: 'Spanish', population: '5.2M', continent: 'Americas', timezone: 'CST (UTC-6)' },
    jm: { capital: 'Kingston', currency: 'Dollar (J$)', language: 'English', population: '2.8M', continent: 'Americas', timezone: 'EST (UTC-5)' },
    sx: { capital: 'Philipsburg', currency: 'Guilder (ANG)', language: 'Dutch/English', population: '44K', continent: 'Americas', timezone: 'AST (UTC-4)' },
    jp: { capital: 'Tokyo', currency: 'Yen (JPY)', language: 'Japanese', population: '125.1M', continent: 'Asia', timezone: 'JST (UTC+9)' },
    cn: { capital: 'Beijing', currency: 'Yuan (CNY)', language: 'Mandarin', population: '1.4B', continent: 'Asia', timezone: 'CST (UTC+8)' },
    sg: { capital: 'Singapore', currency: 'Dollar (S$)', language: 'English/+3', population: '5.9M', continent: 'Asia', timezone: 'SGT (UTC+8)' },
    in: { capital: 'New Delhi', currency: 'Rupee (INR)', language: 'Hindi/English', population: '1.4B', continent: 'Asia', timezone: 'IST (UTC+5:30)' },
    my: { capital: 'Kuala Lumpur', currency: 'Ringgit (RM)', language: 'Malay', population: '34.0M', continent: 'Asia', timezone: 'MYT (UTC+8)' },
    hk: { capital: 'Hong Kong', currency: 'Dollar (HK$)', language: 'Chinese/English', population: '7.5M', continent: 'Asia', timezone: 'HKT (UTC+8)' },
    tw: { capital: 'Taipei', currency: 'Dollar (NT$)', language: 'Mandarin', population: '23.9M', continent: 'Asia', timezone: 'CST (UTC+8)' },
    ph: { capital: 'Manila', currency: 'Peso (PHP)', language: 'Filipino/English', population: '115.6M', continent: 'Asia', timezone: 'PHT (UTC+8)' },
    lk: { capital: 'Colombo', currency: 'Rupee (Rs)', language: 'Sinhala/Tamil', population: '22.2M', continent: 'Asia', timezone: 'IST (UTC+5:30)' },
    il: { capital: 'Jerusalem', currency: 'Shekel (ILS)', language: 'Hebrew/Arabic', population: '9.7M', continent: 'Asia', timezone: 'IST (UTC+2)' },
    ae: { capital: 'Abu Dhabi', currency: 'Dirham (AED)', language: 'Arabic', population: '10.0M', continent: 'Asia', timezone: 'GST (UTC+4)' },
    sa: { capital: 'Riyadh', currency: 'Riyal (SAR)', language: 'Arabic', population: '36.4M', continent: 'Asia', timezone: 'AST (UTC+3)' },
    au: { capital: 'Canberra', currency: 'Dollar (A$)', language: 'English', population: '26.4M', continent: 'Oceania', timezone: 'Multiple' },
    nc: { capital: 'Noumea', currency: 'Franc (XPF)', language: 'French', population: '290K', continent: 'Oceania', timezone: 'NCT (UTC+11)' },
    ke: { capital: 'Nairobi', currency: 'Shilling (KES)', language: 'Swahili/English', population: '54.0M', continent: 'Africa', timezone: 'EAT (UTC+3)' },
    za: { capital: 'Pretoria', currency: 'Rand (R)', language: 'Multiple (11)', population: '60.0M', continent: 'Africa', timezone: 'SAST (UTC+2)' },
    zw: { capital: 'Harare', currency: 'ZiG/USD', language: 'English/+15', population: '16.3M', continent: 'Africa', timezone: 'CAT (UTC+2)' },
    tn: { capital: 'Tunis', currency: 'Dinar (TND)', language: 'Arabic', population: '12.4M', continent: 'Africa', timezone: 'CET (UTC+1)' },
    ml: { capital: 'Bamako', currency: 'Franc (XOF)', language: 'French', population: '22.4M', continent: 'Africa', timezone: 'GMT (UTC+0)' },
    la: { capital: 'Vientiane', currency: 'Kip (LAK)', language: 'Lao', population: '7.5M', continent: 'Asia', timezone: 'ICT (UTC+7)' }
};

// University logo file mappings - maps university names to logo filenames in assets/logos/
const UNI_LOGO_FILES = {
    // Dutch Universities
    'Maastricht University': 'maastricht-university.png',
    'Utrecht University': 'utrecht-university.png',
    'University of Amsterdam': 'university-of-amsterdam.png',
    'Leiden University': 'leiden-university.png',
    'Wageningen University': 'wageningen-university.png',
    'Wageningen University & Research': 'wageningen-university.png',
    'Radboud University': 'radboud-university.png',
    'University of Groningen': 'university-of-groningen.png',
    'Delft University of Technology': 'tu-delft.png',
    'TU Delft': 'tu-delft.png',
    'Vrije Universiteit Amsterdam': 'vrije-universiteit-amsterdam.png',
    'VU Amsterdam': 'vrije-universiteit-amsterdam.png',
    'Eindhoven University of Technology': 'eindhoven-university.png',
    'TU Eindhoven': 'eindhoven-university.png',
    'Erasmus University Rotterdam': 'erasmus-university.png',
    'University of Twente': 'university-of-twente.png',
    'HAN University of Applied Sciences': 'han-university.png',
    'Fontys University of Applied Sciences': 'fontys-university.png',
    'Avans University of Applied Sciences': 'avans-university.png',
    
    // UK Universities
    'Imperial College London': 'imperial-college-london.png',
    'University College London': 'ucl.png',
    'UCL': 'ucl.png',
    'University of Cambridge': 'university-of-cambridge.png',
    'University of Oxford': 'university-of-oxford.png',
    'University of Edinburgh': 'university-of-edinburgh.png',
    'King\'s College London': 'kings-college-london.png',
    'University of Manchester': 'university-of-manchester.png',
    'University of Glasgow': 'university-of-glasgow.png',
    'University of Birmingham': 'university-of-birmingham.png',
    'University of Leeds': 'university-of-leeds.png',
    'University of Sheffield': 'university-of-sheffield.png',
    'University of Salford': 'university-of-salford.png',
    'University of Aberdeen': 'university-of-aberdeen.png',
    'Queen Mary University of London': 'queen-mary-university-of-london.png',
    'Durham University': 'durham-university.webp',
    'Newcastle University': 'newcastle-university.png',
    'University of Bristol': 'university-of-bristol.png',
    'University of Warwick': 'university-of-warwick.png',
    'University of York': 'university-of-york.png',
    'University of Nottingham': 'university-of-nottingham.png',
    'University of Leicester': 'university-of-leicester.png',
    'University of Kent': 'university-of-kent.png',
    'Heriot-Watt University': 'heriot-watt-university.png',
    'University of Portsmouth': 'university-of-portsmouth.png',
    'Cambridge Judge Business School': 'cambridge-judge-business-school.png',
    
    // German Universities
    'Technical University of Munich': 'tu-munich.png',
    'TU Munich': 'tu-munich.png',
    'LMU Munich': 'lmu-munich.png',
    'Humboldt University Berlin': 'humboldt-university-of-berlin.png',
    'Humboldt-Universitat zu Berlin': 'humboldt-university-of-berlin.png',
    'Heidelberg University': 'heidelberg-university.png',
    'University of Cologne': 'university-of-cologne.png',
    'Goethe University Frankfurt': 'goethe-university-frankfurt.png',
    'University of Tubingen': 'university-of-tubingen.png',
    'University of Regensburg': 'university-of-regensburg.png',
    'University of Erlangen-Nuremberg': 'university-of-erlangen-nuremberg.png',
    'Ulm University': 'ulm-university.png',
    'University of Bremen': 'university-of-bremen.png',
    'University of Hamburg': 'university-of-hamburg.png',
    'University of Munster': 'university-of-munster.png',
    
    // Belgian Universities
    'KU Leuven': 'ku-leuven.png',
    'Ghent University': 'ghent-university.png',
    'Vrije Universiteit Brussel': 'vrije-universiteit-brussel.jpg',
    'University of Antwerp': 'university-of-antwerp.png',
    'Universite Libre de Bruxelles': 'universite-libre-de-bruxelles.png',
    'University of Liege': 'university-of-liege.png',
    
    // Swedish Universities
    'Uppsala University': 'uppsala-university.png',
    'Lund University': 'lund-university.png',
    'Karolinska Institutet': 'karolinska-institutet.png',
    'Stockholm University': 'stockholm-university.png',
    'University of Gothenburg': 'university-of-gothenburg.png',
    'KTH Royal Institute of Technology': 'kth-royal-institute-of-technology.png',
    'Chalmers University of Technology': 'chalmers-university-of-technology.png',
    'Linkoping University': 'linkoping-university.png',
    
    // Swiss Universities
    'ETH Zurich': 'eth-zurich.png',
    'EPFL': 'epfl.png',
    'University of Zurich': 'university-of-zurich.png',
    'University of Bern': 'university-of-bern.png',
    
    // Danish Universities
    'University of Copenhagen': 'university-of-copenhagen.png',
    'Technical University of Denmark': 'technical-university-of-denmark.png',
    'Copenhagen Business School': 'copenhagen-business-school.png',
    'University of Southern Denmark': 'university-of-southern-denmark.png',
    
    // Austrian Universities
    'University of Vienna': 'university-of-vienna.png',
    'TU Wien': 'tu-wien.png',
    
    // Finnish Universities
    'University of Helsinki': 'university-of-helsinki.png',
    'Aalto University': 'aalto-university.png',
    
    // Irish Universities
    'Trinity College Dublin': 'trinity-college-dublin.png',
    'University College Dublin': 'university-college-dublin.png',
    'Technological University Dublin': 'technological-university-dublin.webp',
    
    // French Universities
    'Ecole Polytechnique': 'ecole-polytechnique.png',
    'Sorbonne University': 'sorbonne-university.png',
    'Paris-Saclay University': 'paris-saclay-university.png',
    'Universite Claude Bernard Lyon 1': 'universite-claude-bernard-lyon-1.png',
    'Emlyon Business School': 'emlyon-business-school.png',
    'ESCP Business School': 'escp-business-school.png',
    'ESCP Europe': 'escp-business-school.png',
    'University of Bordeaux': 'university-of-bordeaux.png',
    
    // Spanish Universities
    'University of Barcelona': 'university-of-barcelona.png',
    'Universitat de Barcelona': 'university-of-barcelona.png',
    'Universitat Autonoma de Barcelona': 'universitat-autonoma-de-barcelona.png',
    'Universitat Politecnica de Catalunya': 'universitat-politecnica-de-catalunya.png',
    'Universitat Pompeu Fabra': 'pompeu-fabra-university.jpg',
    'University of Valencia': 'university-of-valencia.png',
    'IQS Barcelona': 'iqs-barcelona.png',
    'Camilo Jose Cela University': 'camilo-jose-cela-university.png',
    
    // Italian Universities
    'Universita di Bologna': 'university-of-bologna.png',
    'University of Bologna': 'university-of-bologna.png',
    'Bocconi University': 'bocconi-university.png',
    'University of Pavia': 'university-of-pavia.png',
    'University of Milan': 'university-of-milan.png',
    'Politecnico di Milano': 'politecnico-di-milano.png',
    'Universita Cattolica del Sacro Cuore': 'universita-cattolica.png',
    
    // Other European Universities
    'University of Oslo': 'university-of-oslo.png',
    'Norwegian University of Science and Technology': 'ntnu.png',
    'NTNU': 'ntnu.png',
    'University of Athens': 'university-of-athens.png',
    'Szeged University': 'szeged-university.png',
    'University of Lisbon': 'university-of-lisbon.png',
    'Nova University Lisbon': 'nova-university-lisbon.png',
    'Universidade Catolica Portuguesa': 'universidade-catolica-portuguesa.png',
    'University of Luxembourg': 'university-of-luxembourg.png',
    'Medical University of Warsaw': 'medical-university-of-warsaw.png',
    
    // African Universities
    'University of Pretoria': 'university-of-pretoria.png',
    
    // Caribbean Universities
    'University of West Indies': 'university-of-west-indies.png',
    'The University of West Indies, Mona': 'university-of-west-indies.png',
    
    // North American Universities
    'McGill University': 'mcgill-university.png',
    'Harvard University': 'harvard.png',
    'Princeton University': 'princeton.png',
    'Columbia University': 'columbia.png',
    'Johns Hopkins University': 'johns-hopkins-university.png',
    'MIT': 'mit.png',
    'Stanford University': 'stanford.png',
    'University of Toronto': 'university-of-toronto.png',
    
    // Australian Universities
    'University of Melbourne': 'university-of-melbourne.png',
    'James Cook University': 'james-cook-university.png',
    
    // Asian Universities
    'Kyoto University': 'kyoto-university.png',
    
    // Specialized Education Institutions
    'SPICED Academy': 'spiced-academy.png'
};

// ============================================
// UNIVERSITY NAME ALIASES
// Maps database variations to canonical names in UNIVERSITY_INFO
// Phase 1 Fix: Resolves 82 alumni with name mismatches
// ============================================
const UNIVERSITY_ALIASES = {
    // ============================================
    // PHASE 1: Name Variations (91 alumni)
    // ============================================
    
    // Name variations (43 alumni)
    'Wageningen University & Research': 'Wageningen University',
    
    // Name variations (20 alumni)
    'Delft University of Technology': 'TU Delft',
    
    // Name variations (16 alumni)
    'Vrije Universiteit Amsterdam': 'VU Amsterdam',
    
    // Name variations (9 alumni)
    'Eindhoven University of Technology': 'TU Eindhoven',
    
    // Name variations with special characters (2 alumni)
    'École Polytechnique Fédérale de Lausanne': 'EPFL',
    'Ecole Polytechnique Federale de Lausanne': 'EPFL',
    
    // German name variation (1 alumnus)
    'Eidgenössische Technische Hochschule': 'ETH Zurich',
    
    // Additional common variations
    'Universiteit Utrecht': 'Utrecht University',
    'Université de Lausanne': 'University of Lausanne',
    'Sorbonne Universite': 'Sorbonne University',
    'University College London': 'UCL',
    
    // ============================================
    // PHASE 3: Joint Programs (57 alumni)
    // Strategy: Map to primary (first) institution
    // ============================================
    
    // Major joint programs
    'Copenhagen Business School / Utrecht University': 'Utrecht University',
    'DTU / University of Copenhagen (Joint)': 'Technical University of Denmark',
    'DTU / University of Copenhagen': 'Technical University of Denmark',
    'University of Copenhagen / DTU': 'University of Copenhagen',
    'Leiden University / TU Delft': 'Leiden University',
    'TU Delft / Leiden University': 'TU Delft',
    'UCL / Sorbonne Université': 'UCL',
    'UCL / Sorbonne University': 'UCL',
    'Sorbonne Université / UCL': 'Sorbonne University',
    'University College London / Sorbonne University': 'UCL',
    
    // Erasmus Mundus and joint degrees
    'KU Leuven / University of Copenhagen': 'KU Leuven',
    'Leiden University / Utrecht University': 'Leiden University',
    'Uppsala University / Lund University': 'Uppsala University',
    'ETH Zurich / University of Zurich': 'ETH Zurich',
    'Imperial College London / UCL': 'Imperial College London',
    'University of Amsterdam / VU Amsterdam': 'University of Amsterdam',
    'Maastricht University / Aachen University': 'Maastricht University',
    'Wageningen University / Utrecht University': 'Wageningen University',
    'Radboud University / Utrecht University': 'Radboud University',
    'University of Groningen / Utrecht University': 'University of Groningen',
    
    // European joint masters
    'Stockholm University / Uppsala University': 'Stockholm University',
    'Karolinska Institutet / Stockholm University': 'Karolinska Institutet',
    'University of Edinburgh / University of Glasgow': 'University of Edinburgh',
    'University of Bristol / University of Bath': 'University of Bristol',
    'King\'s College London / UCL': 'King\'s College London',
    
    // Additional patterns
    'Technical University of Denmark / University of Copenhagen': 'Technical University of Denmark',
    'University of Barcelona / Autonomous University of Barcelona': 'University of Barcelona',
    'LMU Munich / TU Munich': 'LMU Munich',
    'Humboldt University / Freie Universität Berlin': 'Humboldt University Berlin'
};

// University detailed information for modal displays
const UNIVERSITY_INFO = {
    // Top 10 Universities (from first batch)
    'Maastricht University': {
        founded: 1976,
        description: 'Young, international research university with problem-based learning approach. Top-ranked in Europe for international outlook. Strong in health sciences, law, economics, and arts.',
        website: 'https://www.maastrichtuniversity.nl',
        location: 'Maastricht, Netherlands',
        students: '23,000+'
    },
    'Utrecht University': {
        founded: 1636,
        description: 'One of Europe\'s leading research universities. Netherlands\' fourth oldest university. Excellence across all disciplines. 12 Nobel laureates including 2010 Physics Prize winner.',
        website: 'https://www.uu.nl',
        location: 'Utrecht, Netherlands',
        students: '43,000+'
    },
    'University of Amsterdam': {
        founded: 1632,
        description: 'Largest university in Netherlands by enrollment. Excellence in humanities, social sciences, law and sciences. Part of historic European university network.',
        website: 'https://www.uva.nl',
        location: 'Amsterdam, Netherlands',
        students: '43,000+'
    },
    'Leiden University': {
        founded: 1575,
        description: 'Netherlands\' oldest university. Founded during Dutch Revolt. World-renowned for humanities, law, medicine and sciences. 16 Nobel laureates including Einstein.',
        website: 'https://www.universiteitleiden.nl',
        location: 'Leiden, Netherlands',
        students: '35,000+'
    },
    'Wageningen University': {
        founded: 1918,
        description: 'World\'s #1 ranked university for agriculture and forestry. Leading in life sciences, food security, and sustainable development. Strong industry partnerships.',
        website: 'https://www.wur.nl',
        location: 'Wageningen, Netherlands',
        students: '13,000+'
    },
    'Radboud University': {
        founded: 1923,
        description: 'Named after medieval scholar Radboud. Excellence in medicine, natural sciences, and humanities. Strong research tradition and international focus.',
        website: 'https://www.ru.nl',
        location: 'Nijmegen, Netherlands',
        students: '24,000+'
    },
    'University of Groningen': {
        founded: 1614,
        description: 'Second-oldest university in Netherlands. Top 100 global university. Excellence across all disciplines. First female PhD recipient in Netherlands studied here.',
        website: 'https://www.rug.nl',
        location: 'Groningen, Netherlands',
        students: '36,000+'
    },
    'KU Leuven': {
        founded: 1425,
        description: 'Belgium\'s largest and highest-ranked university. Founded in medieval period. Excellence across all disciplines. Strong European and global research network.',
        website: 'https://www.kuleuven.be',
        location: 'Leuven, Belgium',
        students: '65,000+'
    },
    'Uppsala University': {
        founded: 1477,
        description: 'Oldest university in Scandinavia and all Nordic countries. Excellence in sciences, humanities and social sciences. 9 Nobel laureates including chemistry pioneers.',
        website: 'https://www.uu.se',
        location: 'Uppsala, Sweden',
        students: '45,000+'
    },
    'Imperial College London': {
        founded: 1907,
        description: 'World-leading science and technology university. Consistently ranked in global top 10. Excellence in engineering, medicine, natural sciences and business.',
        website: 'https://www.imperial.ac.uk',
        location: 'London, United Kingdom',
        students: '20,000+'
    },
    
    // Universities 11-20 (from second batch)
    'TU Delft': {
        founded: 1842,
        description: 'Netherlands\' oldest and largest technical university. World-renowned for engineering and technology. Strong innovation culture and industry partnerships.',
        website: 'https://www.tudelft.nl',
        location: 'Delft, Netherlands',
        students: '26,000+'
    },
    'VU Amsterdam': {
        founded: 1880,
        description: 'Free University of Amsterdam - founded independent from church and state. Excellence in health, governance, and data science. Strong international profile.',
        website: 'https://www.vu.nl',
        location: 'Amsterdam, Netherlands',
        students: '26,000+'
    },
    'Lund University': {
        founded: 1666,
        description: 'One of Scandinavia\'s largest and highest ranked universities. Excellence across all disciplines. World-leading research facilities including MAX IV and ESS.',
        website: 'https://www.lu.se',
        location: 'Lund, Sweden',
        students: '47,000+'
    },
    'University of Copenhagen': {
        founded: 1479,
        description: 'Oldest university in Denmark and one of oldest in Scandinavia. Excellence across all disciplines. 9 Nobel laureates including Niels Bohr.',
        website: 'https://www.ku.dk',
        location: 'Copenhagen, Denmark',
        students: '37,000+'
    },
    'UCL': {
        founded: 1826,
        description: 'University College London - England\'s third-oldest university. First to admit students regardless of religion, race or gender. 30 Nobel laureates.',
        website: 'https://www.ucl.ac.uk',
        location: 'London, United Kingdom',
        students: '50,000+'
    },
    'Karolinska Institutet': {
        founded: 1810,
        description: 'Sweden\'s premier medical university. Selects Nobel Prize winners in Physiology or Medicine. World-leading in medical research and education.',
        website: 'https://ki.se',
        location: 'Stockholm, Sweden',
        students: '7,500+'
    },
    'ETH Zurich': {
        founded: 1855,
        description: 'Swiss Federal Institute of Technology. Einstein\'s alma mater. 21 Nobel laureates. Consistently ranked among world\'s top 10 universities.',
        website: 'https://ethz.ch',
        location: 'Zurich, Switzerland',
        students: '24,000+'
    },
    'TU Eindhoven': {
        founded: 1956,
        description: 'Eindhoven University of Technology. Excellence in engineering and technology. Strong connections with high-tech industry in Brainport region.',
        website: 'https://www.tue.nl',
        location: 'Eindhoven, Netherlands',
        students: '14,000+'
    },
    'Stockholm University': {
        founded: 1878,
        description: 'One of largest universities in Scandinavia. Excellence in sciences, humanities and social sciences. 5 Nobel laureates including Svante Arrhenius.',
        website: 'https://www.su.se',
        location: 'Stockholm, Sweden',
        students: '33,000+'
    },
    'University of Cambridge': {
        founded: 1209,
        description: 'World\'s fourth-oldest surviving university. Collegiate research university. 121 Nobel laureates - more than any other institution. Consistently ranked among global top 5.',
        website: 'https://www.cam.ac.uk',
        location: 'Cambridge, United Kingdom',
        students: '25,000+'
    },
    
    // Universities 21-40 (third batch)
    'Technical University of Munich': {
        founded: 1868,
        description: 'Germany\'s top-ranked technical university. Excellence in engineering, natural sciences and medicine. 18 Nobel laureates. Strong industry partnerships with BMW, Siemens.',
        website: 'https://www.tum.de',
        location: 'Munich, Germany',
        students: '50,000+'
    },
    'University of Edinburgh': {
        founded: 1583,
        description: 'Scotland\'s oldest civic foundation and one of UK\'s most prestigious universities. Excellence across all disciplines. Part of the Russell Group. 19 Nobel laureates.',
        website: 'https://www.ed.ac.uk',
        location: 'Edinburgh, United Kingdom',
        students: '47,000+'
    },
    'Vrije Universiteit Brussel': {
        founded: 1834,
        description: 'Major Dutch-speaking Brussels university. \'Free University of Brussels\' - independent from church and state. Strong research focus and European orientation.',
        website: 'https://www.vub.be',
        location: 'Brussels, Belgium',
        students: '17,000+'
    },
    'University of Oxford': {
        founded: 1096,
        description: 'Oldest university in English-speaking world. Collegiate research university. 72 Nobel laureates, 30 world leaders. Consistently ranked #1 globally.',
        website: 'https://www.ox.ac.uk',
        location: 'Oxford, United Kingdom',
        students: '26,000+'
    },
    'Universita di Bologna': {
        founded: 1088,
        description: 'The oldest university in continuous operation in the world. Motto: \'Alma Mater Studiorum\' - nourishing mother of studies. Excellence across all disciplines.',
        website: 'https://www.unibo.it',
        location: 'Bologna, Italy',
        students: '85,000+'
    },
    'Ecole Polytechnique': {
        founded: 1794,
        description: 'France\'s most prestigious engineering school (Grande Ecole). Founded during French Revolution. Excellence in science, engineering and mathematics.',
        website: 'https://www.polytechnique.edu',
        location: 'Palaiseau, France',
        students: '3,000+'
    },
    'University of Birmingham': {
        founded: 1900,
        description: 'First English civic \'red brick\' university to receive Royal Charter. Russell Group member. Strong research in medical sciences, physics and engineering.',
        website: 'https://www.birmingham.ac.uk',
        location: 'Birmingham, United Kingdom',
        students: '38,000+'
    },
    'University of Helsinki': {
        founded: 1640,
        description: 'Finland\'s oldest and largest university. Top-ranked Nordic university. Excellence in sciences, humanities and social sciences. Strong international focus.',
        website: 'https://www.helsinki.fi',
        location: 'Helsinki, Finland',
        students: '31,000+'
    },
    'University of Cologne': {
        founded: 1388,
        description: 'One of oldest and largest universities in Germany. Originally founded in medieval period, re-established 1919. Excellence across all disciplines with European focus.',
        website: 'https://www.uni-koeln.de',
        location: 'Cologne, Germany',
        students: '48,000+'
    },
    'Aalto University': {
        founded: 2010,
        description: 'Young Finnish university formed by merger. Named after architect Alvar Aalto. Excellence in technology, business, art and design. Strong innovation focus.',
        website: 'https://www.aalto.fi',
        location: 'Espoo, Finland',
        students: '12,000+'
    },
    'Universitat de Barcelona': {
        founded: 1450,
        description: 'Main university of Catalonia and largest in Spain. Over 570 years of history. Excellence in humanities, sciences and social sciences.',
        website: 'https://www.ub.edu',
        location: 'Barcelona, Spain',
        students: '63,000+'
    },
    'Technical University of Denmark': {
        founded: 1829,
        description: 'Denmark\'s leading technical university. Excellence in engineering, natural sciences and technology. Strong industry collaboration and innovation culture.',
        website: 'https://www.dtu.dk',
        location: 'Lyngby, Denmark',
        students: '13,000+'
    },
    'University of Vienna': {
        founded: 1365,
        description: 'Oldest university in German-speaking world. One of largest in Central Europe. Excellence across all disciplines. 15 Nobel laureates including 9 in medicine.',
        website: 'https://www.univie.ac.at',
        location: 'Vienna, Austria',
        students: '90,000+'
    },
    'Ghent University': {
        founded: 1817,
        description: 'Major Belgian research university. Dutch-speaking with strong international profile. Excellence in sciences, engineering, life sciences and humanities.',
        website: 'https://www.ugent.be',
        location: 'Ghent, Belgium',
        students: '50,000+'
    },
    'Humboldt-Universitat zu Berlin': {
        founded: 1810,
        description: 'Berlin\'s oldest university. Founded on principles of Wilhelm von Humboldt. 29 Nobel laureates including Einstein and Planck. Excellence in humanities and sciences.',
        website: 'https://www.hu-berlin.de',
        location: 'Berlin, Germany',
        students: '36,000+'
    },
    'University of Antwerp': {
        founded: 2003,
        description: 'Young Belgian university with older roots. Modern research-focused institution. Excellence in business, life sciences and social sciences. Strong international orientation.',
        website: 'https://www.uantwerpen.be',
        location: 'Antwerp, Belgium',
        students: '20,000+'
    },
    'University College Dublin': {
        founded: 1854,
        description: 'Ireland\'s largest university. Research-intensive with global reputation. Excellence across all disciplines. Member of Worldwide Universities Network.',
        website: 'https://www.ucd.ie',
        location: 'Dublin, Ireland',
        students: '38,000+'
    },
    'Erasmus University Rotterdam': {
        founded: 1913,
        description: 'Named after philosopher Erasmus. Excellence in economics, business, medicine and social sciences. World-renowned Rotterdam School of Management.',
        website: 'https://www.eur.nl',
        location: 'Rotterdam, Netherlands',
        students: '33,000+'
    },
    'Copenhagen Business School': {
        founded: 1917,
        description: 'One of largest business schools in Europe. Triple-crown accredited (EQUIS, AACSB, AMBA). Excellence in business, economics and social sciences.',
        website: 'https://www.cbs.dk',
        location: 'Copenhagen, Denmark',
        students: '20,000+'
    }
,
    // Universities 41-70 (fourth batch - expansion)
    'University of Twente': {
        founded: 1961,
        description: 'Third technical university in Netherlands after TU Delft and Eindhoven. Campus university with strong entrepreneurship culture - over 1,000 spin-off companies. Excellence in engineering and nanotechnology.',
        website: 'https://www.utwente.nl',
        location: 'Enschede, Netherlands',
        students: '12,000+'
    },
    'King\'s College London': {
        founded: 1829,
        description: 'Founded by King George IV and Duke of Wellington. One of two founding colleges of University of London. Russell Group member. 14 Nobel laureates including DNA discoverer Maurice Wilkins.',
        website: 'https://www.kcl.ac.uk',
        location: 'London, United Kingdom',
        students: '42,000+'
    },
    'Universitat Pompeu Fabra': {
        founded: 1990,
        description: 'Young university (1990) named after Catalan philologist. Highly competitive in research. Excellence in social sciences, life sciences, and ICT. Ranked among Europe\'s best young universities.',
        website: 'https://www.upf.edu',
        location: 'Barcelona, Spain',
        students: '14,000'
    },
    'KTH Royal Institute of Technology': {
        founded: 1827,
        description: 'Sweden\'s largest and oldest technical university. Excellence in engineering and technology. Alumni include Spotify founder Daniel Ek. About one-third of Sweden\'s technical research happens at KTH.',
        website: 'https://www.kth.se',
        location: 'Stockholm, Sweden',
        students: '13,000+'
    },
    'Universite Libre de Bruxelles': {
        founded: 1834,
        description: 'Founded 1834 on principle of "free inquiry". Independent from church and state. Split into French (ULB) and Dutch (VUB) universities in 1969. 4 Nobel laureates. Motto: "Conquering darkness with knowledge".',
        website: 'https://www.ulb.be',
        location: 'Brussels, Belgium',
        students: '30,000+'
    },
    'University of Zurich': {
        founded: 1833,
        description: 'Largest university in Switzerland. 12 Nobel laureates including Einstein. Excellence in medicine, biology, and natural sciences. Strong research tradition and international focus.',
        website: 'https://www.uzh.ch',
        location: 'Zurich, Switzerland',
        students: '26,000+'
    },
    'University of Glasgow': {
        founded: 1451,
        description: 'Fourth-oldest university in English-speaking world. Founded in medieval period. Russell Group member. 8 Nobel laureates including economist James Mirrlees. Excellence across all disciplines.',
        website: 'https://www.gla.ac.uk',
        location: 'Glasgow, United Kingdom',
        students: '33,000+'
    },
    'University of Liege': {
        founded: 1817,
        description: 'Major Belgian research university established after Napoleonic era. Strong in engineering, sciences, and medicine. Important center for research in Wallonia region.',
        website: 'https://www.uliege.be',
        location: 'Liege, Belgium',
        students: '28,000+'
    },
    'University of Salford': {
        founded: 1967,
        description: 'Modern university with strong industry connections. Excellence in media, performing arts, and health sciences. Campus features MediaCityUK presence alongside BBC and ITV.',
        website: 'https://www.salford.ac.uk',
        location: 'Salford, United Kingdom',
        students: '20,000+'
    },
    'University of Manchester': {
        founded: 1824,
        description: 'One of UK\'s largest universities. 25 Nobel laureates including physicist Ernest Rutherford. Red brick university with world-leading research. Excellence in sciences, engineering, and humanities.',
        website: 'https://www.manchester.ac.uk',
        location: 'Manchester, United Kingdom',
        students: '44,000+'
    },
    'University of Aberdeen': {
        founded: 1495,
        description: 'Scotland\'s third-oldest university. Founded in medieval period. 5 Nobel laureates including insulin developer John Macleod. Excellence in medicine, sciences, and law.',
        website: 'https://www.abdn.ac.uk',
        location: 'Aberdeen, United Kingdom',
        students: '14,000+'
    },
    'University of Gothenburg': {
        founded: 1891,
        description: 'Sweden\'s second-largest university. Excellence in life sciences, humanities, and social sciences. Strong research focus and international orientation.',
        website: 'https://www.gu.se',
        location: 'Gothenburg, Sweden',
        students: '37,000+'
    },
    'Queen Mary University of London': {
        founded: 1887,
        description: 'Russell Group member formed through multiple mergers. Excellence in medicine, law, and engineering. Historic medical schools including Barts and The London.',
        website: 'https://www.qmul.ac.uk',
        location: 'London, United Kingdom',
        students: '30,000+'
    },
    'University of Valencia': {
        founded: 1499,
        description: 'One of Spain\'s oldest universities. Over 500 years of history. Excellence in sciences, humanities, and social sciences. Important center for Valencian culture and research.',
        website: 'https://www.uv.es',
        location: 'Valencia, Spain',
        students: '55,000+'
    },
    'EPFL': {
        founded: 1969,
        description: 'Ecole Polytechnique Federale de Lausanne. Swiss Federal Institute of Technology. Sister institution to ETH Zurich. 2 Nobel laureates. Top European university for engineering and technology.',
        website: 'https://www.epfl.ch',
        location: 'Lausanne, Switzerland',
        students: '13,000+'
    },
    'University of Bern': {
        founded: 1834,
        description: 'Comprehensive research university. Albert Einstein studied here while developing special relativity theory. Excellence in physics, medicine, and natural sciences.',
        website: 'https://www.unibe.ch',
        location: 'Bern, Switzerland',
        students: '19,000+'
    },
    'TU Wien': {
        founded: 1815,
        description: 'Technische Universitat Wien. Austria\'s largest technical university. Founded under Emperor Francis I. Excellence in engineering, technology, and natural sciences.',
        website: 'https://www.tuwien.at',
        location: 'Vienna, Austria',
        students: '28,000+'
    },
    'McGill University': {
        founded: 1821,
        description: 'Canada\'s most prestigious university. 12 Nobel laureates including Ernest Rutherford. Often called "Harvard of Canada". Excellence across all disciplines with strong research tradition.',
        website: 'https://www.mcgill.ca',
        location: 'Montreal, Canada',
        students: '41,000+'
    },
    'University of Tubingen': {
        founded: 1477,
        description: 'Eberhard Karls University Tubingen. One of Germany\'s oldest universities. 11 Nobel laureates including Einstein (honorary degree). Excellence in humanities, theology, and sciences.',
        website: 'https://uni-tuebingen.de',
        location: 'Tubingen, Germany',
        students: '28,000+'
    },
    'Universita di Pavia': {
        founded: 1361,
        description: 'University of Pavia. One of world\'s oldest universities. Alessandro Volta (electricity pioneer) and Camillo Golgi (Nobel laureate) taught here. Excellence in sciences and medicine.',
        website: 'https://www.unipv.it',
        location: 'Pavia, Italy',
        students: '24,000+'
    },
    'University of Sheffield': {
        founded: 1905,
        description: 'Red brick university and Russell Group member. 6 Nobel laureates including Harry Kroto (buckyballs discoverer). Excellence in engineering, medicine, and sciences.',
        website: 'https://www.sheffield.ac.uk',
        location: 'Sheffield, United Kingdom',
        students: '31,000+'
    },
    'University of Leeds': {
        founded: 1904,
        description: 'Red brick university and Russell Group member. One of UK\'s largest universities. Excellence across all disciplines. Strong industry partnerships and research tradition.',
        website: 'https://www.leeds.ac.uk',
        location: 'Leeds, United Kingdom',
        students: '39,000+'
    },
    'Sorbonne University': {
        founded: 1257,
        description: 'Historic Parisian university. Modern institution formed 2018 through merger of Paris-Sorbonne and UPMC. 33 Nobel laureates (collective history). Excellence in sciences and humanities.',
        website: 'https://www.sorbonne-universite.fr',
        location: 'Paris, France',
        students: '55,000+'
    },
    'Trinity College Dublin': {
        founded: 1592,
        description: 'Ireland\'s oldest university. Founded by Queen Elizabeth I. Home to historic Book of Kells. Excellence in humanities, sciences, and medicine. Strong European tradition.',
        website: 'https://www.tcd.ie',
        location: 'Dublin, Ireland',
        students: '18,000+'
    },
    'Heidelberg University': {
        founded: 1386,
        description: 'Ruprecht-Karls-Universitat Heidelberg. Germany\'s oldest university. 56 Nobel laureates including 11 Nobel Prize winners in Chemistry. Excellence in medicine, sciences, and humanities.',
        website: 'https://www.uni-heidelberg.de',
        location: 'Heidelberg, Germany',
        students: '31,000+'
    },
    'Universite Paris-Saclay': {
        founded: 2019,
        description: 'Young university formed through merger of prestigious French institutions. 14 Fields Medal winners. Excellence in sciences, engineering, and mathematics. Rapid rise in global rankings.',
        website: 'https://www.universite-paris-saclay.fr',
        location: 'Paris, France',
        students: '48,000+'
    },
    'James Cook University': {
        founded: 1970,
        description: 'Young Australian university focused on tropics, marine sciences, and environmental research. Strong regional focus on tropical regions. Excellence in marine biology and ecology.',
        website: 'https://www.jcu.edu.au',
        location: 'Townsville, Australia',
        students: '20,000+'
    },
    'Goethe University Frankfurt': {
        founded: 1914,
        description: 'Named after Johann Wolfgang von Goethe. Excellence in social sciences, humanities, and natural sciences. Strong research tradition and international orientation.',
        website: 'https://www.uni-frankfurt.de',
        location: 'Frankfurt, Germany',
        students: '44,000+'
    }
,
    // Universities 71-100 (fifth batch - final expansion)
    'Universitat Politecnica de Catalunya': {
        founded: 1971,
        description: 'BarcelonaTech (UPC). Leading technical university in Catalonia. Excellence in engineering, architecture, and technology. Strong research tradition and innovation culture.',
        website: 'https://www.upc.edu',
        location: 'Barcelona, Spain',
        students: '30,000+'
    },
    'Universitat Autonoma de Barcelona': {
        founded: 1968,
        description: 'Autonomous University of Barcelona (UAB). Excellence in humanities, sciences, and health sciences. Highly ranked research university with strong international profile.',
        website: 'https://www.uab.cat',
        location: 'Barcelona, Spain',
        students: '40,000+'
    },
    'University of Szeged': {
        founded: 1872,
        description: 'Hungary\'s second-largest university. Nobel laureate Albert Szent-Gyorgyi (Vitamin C discoverer) taught here. Excellence in medicine and sciences.',
        website: 'https://u-szeged.hu',
        location: 'Szeged, Hungary',
        students: '21,000+'
    },
    'Bocconi University': {
        founded: 1902,
        description: 'Italy\'s leading business and economics university. Private research university. Excellence in economics, management, finance, and law. Top European business school.',
        website: 'https://www.unibocconi.eu',
        location: 'Milan, Italy',
        students: '15,000+'
    },
    'Universite Claude Bernard Lyon 1': {
        founded: 1896,
        description: 'Major French research university. Excellence in sciences, technology, health, and sports. Largest university in Lyon. Strong research tradition.',
        website: 'https://www.univ-lyon1.fr',
        location: 'Lyon, France',
        students: '47,000+'
    },
    'University of Regensburg': {
        founded: 1962,
        description: 'Young Bavarian university with strong research focus. Excellence in medicine, law, economics, and sciences. Modern campus with international orientation.',
        website: 'https://www.uni-regensburg.de',
        location: 'Regensburg, Germany',
        students: '21,000+'
    },
    'University of Geneva': {
        founded: 1559,
        description: 'One of world\'s oldest universities. Founded by John Calvin during Reformation. Excellence in international law, physics, and life sciences. 8 Nobel laureates.',
        website: 'https://www.unige.ch',
        location: 'Geneva, Switzerland',
        students: '17,000+'
    },
    'Royal Veterinary College': {
        founded: 1791,
        description: 'UK\'s first and largest veterinary school. Independent college of University of London. World-leading in veterinary sciences and research.',
        website: 'https://www.rvc.ac.uk',
        location: 'London, United Kingdom',
        students: '1,500+'
    },
    'Keck Graduate Institute': {
        founded: 1997,
        description: 'Applied life sciences graduate university. Member of Claremont Colleges. Focus on biosciences, pharmaceuticals, and healthcare. Industry-focused education.',
        website: 'https://www.kgi.edu',
        location: 'Claremont, California, USA',
        students: '500+'
    },
    'LMU Munich': {
        founded: 1472,
        description: 'Ludwig-Maximilians-Universitat. One of Europe\'s premier universities. Germany\'s second-oldest university. 43 Nobel laureates. Excellence in humanities, sciences, law, and medicine.',
        website: 'https://www.lmu.de',
        location: 'Munich, Germany',
        students: '52,000+'
    },
    'University of Bonn': {
        founded: 1818,
        description: 'Rheinische Friedrich-Wilhelms-Universitat. Prestigious research university. 8 Nobel laureates including Max Planck. Excellence in mathematics, physics, and economics.',
        website: 'https://www.uni-bonn.de',
        location: 'Bonn, Germany',
        students: '35,000+'
    },
    'Institut Polytechnique de Paris': {
        founded: 2019,
        description: 'Merger of five prestigious French engineering schools including Ecole Polytechnique. Excellence in engineering and technology. Rapid rise in global rankings.',
        website: 'https://www.ip-paris.fr',
        location: 'Palaiseau, France',
        students: '8,000+'
    },
    'Medical University of Warsaw': {
        founded: 1809,
        description: 'Poland\'s largest medical school. Oldest medical faculty in Poland. Excellence in medicine, pharmacy, and health sciences. Strong research tradition.',
        website: 'https://www.wum.edu.pl',
        location: 'Warsaw, Poland',
        students: '8,000+'
    },
    'Universidad Miguel Hernandez de Elche': {
        founded: 1997,
        description: 'Young Spanish university. Excellence in health sciences, experimental sciences, and social sciences. Strong innovation and research culture.',
        website: 'https://www.umh.es',
        location: 'Elche, Spain',
        students: '16,000+'
    },
    'Universite de Lausanne': {
        founded: 1537,
        description: 'Historic Swiss university. Founded as theological academy, became university 1890. Excellence in life sciences, geosciences, and humanities. Strong research tradition.',
        website: 'https://www.unil.ch',
        location: 'Lausanne, Switzerland',
        students: '15,000+'
    },
    'City University of Hong Kong': {
        founded: 1984,
        description: 'Young research university. Rapid rise in global rankings. Excellence in engineering, business, sciences, and law. Strong international orientation.',
        website: 'https://www.cityu.edu.hk',
        location: 'Hong Kong',
        students: '20,000+'
    },
    'Florida International University': {
        founded: 1965,
        description: 'Major public research university. One of largest universities in USA by enrollment. Excellence in international business, hospitality, and engineering.',
        website: 'https://www.fiu.edu',
        location: 'Miami, Florida, USA',
        students: '58,000+'
    },
    'Chimie ParisTech': {
        founded: 1896,
        description: 'Ecole Nationale Superieure de Chimie de Paris. Member of PSL University. Elite French engineering school (Grande Ecole). Excellence in chemistry and chemical engineering.',
        website: 'https://www.chimieparistech.psl.eu',
        location: 'Paris, France',
        students: '900+'
    }
,
    // Universities 101-130 (sixth batch)
    'Emlyon Business School': {
        founded: 1872,
        description: 'EMLYON Business School. Leading French business school (Grande Ecole). Triple-crown accredited. Excellence in entrepreneurship and management. Strong international focus.',
        website: 'https://www.em-lyon.com',
        location: 'Lyon, France',
        students: '9,000+'
    },
    'University of Bordeaux': {
        founded: 1441,
        description: 'Historic French university. Merged 2014 from multiple institutions. 6 Nobel laureates including Francois Mauriac. Excellence in sciences, law, and humanities.',
        website: 'https://www.u-bordeaux.fr',
        location: 'Bordeaux, France',
        students: '56,000+'
    },
    'New Bulgarian University': {
        founded: 1991,
        description: 'Bulgaria\'s first private university. Excellence in humanities, arts, and social sciences. Strong international partnerships and modern approach to education.',
        website: 'https://www.nbu.bg',
        location: 'Sofia, Bulgaria',
        students: '10,000+'
    },
    'ESCP': {
        founded: 1819,
        description: 'ESCP Business School. World\'s first business school. Multi-campus European business school across 6 cities. Triple-crown accredited. Excellence in management and international business.',
        website: 'https://www.escp.eu',
        location: 'Paris, France (multi-city)',
        students: '7,500+'
    },
    'ISAE-SUPAERO': {
        founded: 1909,
        description: 'Institut Superieur de l\'Aeronautique et de l\'Espace. France\'s leading aerospace engineering school (Grande Ecole). Excellence in aeronautics, space, and defense engineering.',
        website: 'https://www.isae-supaero.fr',
        location: 'Toulouse, France',
        students: '2,200+'
    },
    'American College of Greece': {
        founded: 1875,
        description: 'Greece\'s oldest American-accredited college. Deree College and Athens Graduate School of Management. Excellence in liberal arts and business. Strong US connections.',
        website: 'https://www.acg.edu',
        location: 'Athens, Greece',
        students: '4,000+'
    },
    'University of Leicester': {
        founded: 1921,
        description: 'Major research university. Discovered genetic fingerprinting here. Excellence in space science, archaeology, and medicine. Member of University Alliance.',
        website: 'https://www.le.ac.uk',
        location: 'Leicester, United Kingdom',
        students: '24,000+'
    },
    'Heriot-Watt University': {
        founded: 1821,
        description: 'Scotland\'s first mechanics institute, became university 1966. Excellence in engineering, business, and sciences. Campuses in Edinburgh, Dubai, and Malaysia.',
        website: 'https://www.hw.ac.uk',
        location: 'Edinburgh, United Kingdom',
        students: '30,000+'
    },
    'University of Kent': {
        founded: 1965,
        description: 'UK\'s European university with campuses in Canterbury and abroad. Excellence in humanities, sciences, and social sciences. Strong European focus and partnerships.',
        website: 'https://www.kent.ac.uk',
        location: 'Canterbury, United Kingdom',
        students: '18,000+'
    },
    'Technological University Dublin': {
        founded: 2019,
        description: 'Ireland\'s first technological university. Formed by merger of three Dublin institutes. Excellence in engineering, technology, business, and sciences.',
        website: 'https://www.tudublin.ie',
        location: 'Dublin, Ireland',
        students: '28,000+'
    },
    'Universite de Namur': {
        founded: 1831,
        description: 'University of Namur. Belgian university with Jesuit tradition. Excellence in sciences, law, economics, and humanities. Strong research focus.',
        website: 'https://www.unamur.be',
        location: 'Namur, Belgium',
        students: '7,000+'
    },
    'Centrale Nantes': {
        founded: 1919,
        description: 'Ecole Centrale de Nantes. French engineering school (Grande Ecole). Excellence in engineering, technology, and industrial sciences. Strong industry partnerships.',
        website: 'https://www.ec-nantes.fr',
        location: 'Nantes, France',
        students: '2,700+'
    },
    'Universite Bourgogne Franche-Comte': {
        founded: 2015,
        description: 'University of Burgundy-Franche-Comte. Major French research university formed by merger. Excellence in sciences, humanities, health, and engineering.',
        website: 'https://www.ubfc.fr',
        location: 'Besancon, France',
        students: '58,000+'
    },
    'University of Lisbon': {
        founded: 1911,
        description: 'Portugal\'s largest university. Formed 2013 by merger. Excellence across all disciplines. Strong research tradition and international orientation.',
        website: 'https://www.ulisboa.pt',
        location: 'Lisbon, Portugal',
        students: '50,000+'
    },
    'University of St Andrews': {
        founded: 1413,
        description: 'Scotland\'s first university and third-oldest in English-speaking world. Excellence in humanities, sciences, and international relations. 6 Nobel laureates.',
        website: 'https://www.st-andrews.ac.uk',
        location: 'St Andrews, United Kingdom',
        students: '10,000+'
    },
    'University of Warwick': {
        founded: 1965,
        description: 'Young research university with rapid rise to prominence. Russell Group member. Excellence in business, economics, sciences, and engineering.',
        website: 'https://www.warwick.ac.uk',
        location: 'Coventry, United Kingdom',
        students: '29,000+'
    },
    'Harvard University': {
        founded: 1636,
        description: 'Oldest institution of higher learning in United States. Ivy League. 161 Nobel laureates, 8 US presidents. Consistently ranked world\'s #1 university.',
        website: 'https://www.harvard.edu',
        location: 'Cambridge, Massachusetts, USA',
        students: '23,000+'
    },
    'Illinois Institute of Technology': {
        founded: 1890,
        description: 'Private research university in Chicago. Excellence in engineering, architecture, and technology. Mies van der Rohe designed campus buildings.',
        website: 'https://www.iit.edu',
        location: 'Chicago, Illinois, USA',
        students: '6,500+'
    },
    'University of Rome Tor Vergata': {
        founded: 1982,
        description: 'Young Italian research university. Named after Vergata district. Excellence in sciences, engineering, economics, and medicine. Strong research output.',
        website: 'https://www.uniroma2.it',
        location: 'Rome, Italy',
        students: '39,000+'
    },
    'Regent\'s University London': {
        founded: 1984,
        description: 'Private university in London\'s Regent\'s Park. Excellence in business, arts, and psychology. Strong international focus with diverse student body.',
        website: 'https://www.regents.ac.uk',
        location: 'London, United Kingdom',
        students: '7,000+'
    },
    'University of Ulm': {
        founded: 1967,
        description: 'Young German research university. Excellence in medicine, sciences, engineering, and mathematics. Strong focus on interdisciplinary research and innovation.',
        website: 'https://www.uni-ulm.de',
        location: 'Ulm, Germany',
        students: '10,000+'
    },
    // Universities 131-160 (seventh batch)
    'University of Bremen': {
        founded: 1971,
        description: 'Young German research university. Excellence in marine sciences, engineering, and social sciences. Strong interdisciplinary focus and international orientation.',
        website: 'https://www.uni-bremen.de',
        location: 'Bremen, Germany',
        students: '20,000+'
    },
    'Universita degli Studi di Ferrara': {
        founded: 1391,
        description: 'University of Ferrara. One of Italy\'s oldest universities. Excellence in humanities, sciences, and medicine. Historic Renaissance city location.',
        website: 'https://www.unife.it',
        location: 'Ferrara, Italy',
        students: '24,000+'
    },
    'University of Luxembourg': {
        founded: 2003,
        description: 'Young multilingual research university. Luxembourg\'s only public university. Excellence in law, finance, and computer science. Highly international student body.',
        website: 'https://www.uni.lu',
        location: 'Luxembourg City, Luxembourg',
        students: '7,000+'
    },
    'Norwegian University of Science and Technology': {
        founded: 1996,
        description: 'NTNU. Norway\'s largest university. Excellence in engineering, natural sciences, and technology. Strong research tradition and innovation culture.',
        website: 'https://www.ntnu.edu',
        location: 'Trondheim, Norway',
        students: '42,000+'
    },
    'University of Hamburg': {
        founded: 1919,
        description: 'Germany\'s largest research university by student enrollment. Excellence in law, economics, sciences, and humanities. 6 Nobel laureates.',
        website: 'https://www.uni-hamburg.de',
        location: 'Hamburg, Germany',
        students: '43,000+'
    },
    'Sapienza Universita di Roma': {
        founded: 1303,
        description: 'Sapienza University of Rome. One of world\'s oldest universities. Europe\'s largest university by enrollment. Excellence across all disciplines. Multiple Nobel laureates.',
        website: 'https://www.uniroma1.it',
        location: 'Rome, Italy',
        students: '115,000+'
    },
    'Universita di Padova': {
        founded: 1222,
        description: 'University of Padua. One of world\'s oldest universities. Galileo taught here. Excellence in sciences, medicine, and humanities. Rich academic tradition.',
        website: 'https://www.unipd.it',
        location: 'Padua, Italy',
        students: '65,000+'
    },
    'Linkoping University': {
        founded: 1975,
        description: 'Swedish research university. Excellence in technology, medicine, and arts. Strong interdisciplinary programs and innovation focus.',
        website: 'https://www.liu.se',
        location: 'Linkoping, Sweden',
        students: '32,000+'
    },
    'Universita degli Studi di Genova': {
        founded: 1481,
        description: 'University of Genoa. Historic Italian university. Excellence in engineering, sciences, and humanities. Strong maritime and port research.',
        website: 'https://www.unige.it',
        location: 'Genoa, Italy',
        students: '33,000+'
    },
    'NOVA IMS': {
        founded: 1989,
        description: 'NOVA Information Management School. Part of NOVA University Lisbon. Excellence in information management, data science, and statistics. Strong tech industry connections.',
        website: 'https://www.novaims.unl.pt',
        location: 'Lisbon, Portugal',
        students: '2,000+'
    },
    'University of Portsmouth': {
        founded: 1992,
        description: 'Modern UK university with older roots dating to 1869. Excellence in sciences, engineering, and creative industries. Strong industry partnerships.',
        website: 'https://www.port.ac.uk',
        location: 'Portsmouth, United Kingdom',
        students: '25,000+'
    },
    'University of Mons': {
        founded: 1837,
        description: 'UMONS. Belgian university in Wallonia. Excellence in engineering, sciences, and humanities. Strong research tradition.',
        website: 'https://web.umons.ac.be',
        location: 'Mons, Belgium',
        students: '10,000+'
    },
    'Pontificia Universidad Catolica de Chile': {
        founded: 1888,
        description: 'Chile\'s leading university. Pontifical Catholic University. Excellence in sciences, engineering, law, and humanities. Strong research output.',
        website: 'https://www.uc.cl',
        location: 'Santiago, Chile',
        students: '32,000+'
    },
    'Universite Paul Sabatier Toulouse III': {
        founded: 1969,
        description: 'Paul Sabatier University. Major French research university. Excellence in sciences, technology, health, and sports. Strong aerospace connections.',
        website: 'https://www.univ-tlse3.fr',
        location: 'Toulouse, France',
        students: '35,000+'
    },
    'TH Koln': {
        founded: 1971,
        description: 'Cologne University of Applied Sciences. Germany\'s largest university of applied sciences. Excellence in engineering, technology, and applied sciences.',
        website: 'https://www.th-koeln.de',
        location: 'Cologne, Germany',
        students: '26,000+'
    },
    'University of West Indies': {
        founded: 1948,
        description: 'Regional Caribbean university. Campuses across Jamaica, Trinidad, Barbados. Excellence in tropical medicine, agriculture, and Caribbean studies.',
        website: 'https://www.uwi.edu',
        location: 'Mona, Jamaica',
        students: '50,000+'
    },
    'Okinawa Institute of Science and Technology': {
        founded: 2011,
        description: 'OIST. Young graduate university. Graduate studies only. Excellence in interdisciplinary science and technology. Highly international faculty and students.',
        website: 'https://www.oist.jp',
        location: 'Okinawa, Japan',
        students: '300+'
    },
    'Universiti Malaya': {
        founded: 1905,
        description: 'University of Malaya. Malaysia\'s oldest and highest-ranked university. Excellence in sciences, engineering, and humanities. Strong research tradition.',
        website: 'https://www.um.edu.my',
        location: 'Kuala Lumpur, Malaysia',
        students: '22,000+'
    },
    'Queen\'s University Belfast': {
        founded: 1845,
        description: 'Northern Ireland\'s leading university. Russell Group member. Excellence in medicine, engineering, and humanities. Strong research tradition.',
        website: 'https://www.qub.ac.uk',
        location: 'Belfast, United Kingdom',
        students: '24,000+'
    },
    'Universidad Publica de Navarra': {
        founded: 1987,
        description: 'Public University of Navarre. Spanish research university. Excellence in engineering, health sciences, and social sciences. Strong regional focus.',
        website: 'https://www.unavarra.es',
        location: 'Pamplona, Spain',
        students: '10,000+'
    },
    'Charite Universitatsmedizin Berlin': {
        founded: 1710,
        description: 'Charite University Medicine Berlin. Europe\'s largest university hospital. Joint medical faculty of Humboldt and Free University Berlin. Excellence in medicine and research.',
        website: 'https://www.charite.de',
        location: 'Berlin, Germany',
        students: '8,000+'
    },
    'University of Munster': {
        founded: 1780,
        description: 'Westfalische Wilhelms-Universitat. One of Germany\'s largest universities. Excellence in law, economics, sciences, and humanities. Strong research tradition.',
        website: 'https://www.uni-muenster.de',
        location: 'Munster, Germany',
        students: '45,000+'
    },
    'ISF Istituto di Scienze Forensi': {
        founded: 1999,
        description: 'Institute of Forensic Sciences. Italian specialized institute for forensic science education and research. Excellence in forensic investigation and analysis.',
        website: 'https://www.isfn.it',
        location: 'Milan, Italy',
        students: '500+'
    },
    // Universities 161-220 (batches 8 & 9 combined)
    'Universita degli Studi dell\'Insubria': {
        founded: 1998,
        description: 'University of Insubria. Young Italian university in Lombardy. Excellence in sciences, medicine, and law. Named after ancient Roman province.',
        website: 'https://www.uninsubria.it',
        location: 'Varese/Como, Italy',
        students: '10,000+'
    },
    'ISEG': {
        founded: 1911,
        description: 'Lisbon School of Economics and Management. Part of University of Lisbon. Portugal\'s leading business and economics school. Triple-crown accredited.',
        website: 'https://www.iseg.ulisboa.pt',
        location: 'Lisbon, Portugal',
        students: '8,000+'
    },
    'Tilburg University': {
        founded: 1927,
        description: 'Dutch research university. Excellence in economics, business, law, and social sciences. Strong international focus and research output.',
        website: 'https://www.tilburguniversity.edu',
        location: 'Tilburg, Netherlands',
        students: '18,000+'
    },
    'Jagiellonian University': {
        founded: 1364,
        description: 'Poland\'s oldest university and one of Europe\'s oldest. Copernicus studied here. Excellence in sciences, humanities, and medicine. Rich academic tradition.',
        website: 'https://www.uj.edu.pl',
        location: 'Krakow, Poland',
        students: '40,000+'
    },
    'University of Maribor': {
        founded: 1961,
        description: 'Slovenia\'s second-largest university. Excellence in engineering, business, law, and medicine. Strong regional impact and international partnerships.',
        website: 'https://www.um.si',
        location: 'Maribor, Slovenia',
        students: '15,000+'
    },
    'IE University': {
        founded: 1997,
        description: 'IE University. Spanish private university. Excellence in business, international relations, and technology. Highly international student body and innovative teaching.',
        website: 'https://www.ie.edu',
        location: 'Madrid/Segovia, Spain',
        students: '7,000+'
    },
    'Universidad Autonoma de Madrid': {
        founded: 1968,
        description: 'Autonomous University of Madrid. Major Spanish research university. Excellence in sciences, humanities, and medicine. Strong research tradition.',
        website: 'https://www.uam.es',
        location: 'Madrid, Spain',
        students: '30,000+'
    },
    'University of Athens': {
        founded: 1837,
        description: 'National and Kapodistrian University of Athens. Greece\'s oldest and largest university. Excellence in sciences, humanities, law, and medicine.',
        website: 'https://www.uoa.gr',
        location: 'Athens, Greece',
        students: '70,000+'
    },
    'Universita Cattolica del Sacro Cuore': {
        founded: 1921,
        description: 'Catholic University of the Sacred Heart. Italy\'s largest private university. Excellence in medicine, economics, law, and humanities. Multiple campuses.',
        website: 'https://www.unicatt.it',
        location: 'Milan, Italy',
        students: '42,000+'
    },
    'Universita degli Studi di Napoli Federico II': {
        founded: 1224,
        description: 'University of Naples Federico II. World\'s oldest public secular university. Founded by Emperor Frederick II. Excellence in humanities, sciences, and engineering.',
        website: 'https://www.unina.it',
        location: 'Naples, Italy',
        students: '80,000+'
    },
    'Zhejiang University of Science and Technology': {
        founded: 1980,
        description: 'Chinese university focused on engineering and applied sciences. Excellence in materials, automation, and industrial design. Growing research profile.',
        website: 'https://www.zust.edu.cn',
        location: 'Hangzhou, China',
        students: '16,000+'
    },
    'University of Nicosia Medical School': {
        founded: 2011,
        description: 'Medical school of University of Nicosia. Cyprus\'s largest private medical school. US-accredited MD program. Modern medical education.',
        website: 'https://www.unic.ac.cy/medicalschool',
        location: 'Nicosia, Cyprus',
        students: '1,500+'
    },
    'Tampere University': {
        founded: 2019,
        description: 'Finnish university formed by merger. Excellence in technology, health, and society. Strong interdisciplinary research and innovation culture.',
        website: 'https://www.tuni.fi',
        location: 'Tampere, Finland',
        students: '24,000+'
    },
    'Universite Grenoble Alpes': {
        founded: 2016,
        description: 'University of Grenoble Alpes. Major French research university formed by merger. Excellence in sciences, engineering, and health. Alpine location.',
        website: 'https://www.univ-grenoble-alpes.fr',
        location: 'Grenoble, France',
        students: '60,000+'
    },
    'Heinrich Heine University Dusseldorf': {
        founded: 1965,
        description: 'German research university. Excellence in medicine, law, economics, and sciences. Named after poet Heinrich Heine. Strong research tradition.',
        website: 'https://www.hhu.de',
        location: 'Dusseldorf, Germany',
        students: '35,000+'
    },
    'National University of Singapore': {
        founded: 1905,
        description: 'NUS. Asia\'s leading university. Consistently ranked #1 in Asia. Excellence across all disciplines. World-class research and innovation.',
        website: 'https://www.nus.edu.sg',
        location: 'Singapore',
        students: '40,000+'
    },
    'Universidad Complutense de Madrid': {
        founded: 1293,
        description: 'Complutense University of Madrid. One of world\'s oldest universities. Spain\'s largest university. Excellence in humanities, sciences, and health.',
        website: 'https://www.ucm.es',
        location: 'Madrid, Spain',
        students: '87,000+'
    },
    'University of Lincoln': {
        founded: 1992,
        description: 'Modern UK university with medieval cathedral city location. Excellence in engineering, computer science, and business. Strong industry partnerships.',
        website: 'https://www.lincoln.ac.uk',
        location: 'Lincoln, United Kingdom',
        students: '16,000+'
    },
    'London School of Hygiene and Tropical Medicine': {
        founded: 1899,
        description: 'LSHTM. World-leading public health and tropical medicine institution. Part of University of London. Excellence in global health research.',
        website: 'https://www.lshtm.ac.uk',
        location: 'London, United Kingdom',
        students: '1,200+'
    },
    'University of Worcester': {
        founded: 2005,
        description: 'Modern UK university with roots dating to 1946. Excellence in education, health, and business. Strong community engagement and student experience.',
        website: 'https://www.worc.ac.uk',
        location: 'Worcester, United Kingdom',
        students: '10,000+'
    },
    'Boston University': {
        founded: 1839,
        description: 'Major US research university. Excellence in medicine, law, business, and engineering. 9 Nobel laureates. Located in heart of Boston.',
        website: 'https://www.bu.edu',
        location: 'Boston, Massachusetts, USA',
        students: '35,000+'
    },
    'Princeton University': {
        founded: 1746,
        description: 'Ivy League university. One of world\'s most prestigious institutions. 69 Nobel laureates. Excellence across all disciplines. Historic campus.',
        website: 'https://www.princeton.edu',
        location: 'Princeton, New Jersey, USA',
        students: '8,500+'
    },
    'Central European University': {
        founded: 1991,
        description: 'CEU. Graduate research university. Founded by George Soros. Excellence in social sciences, humanities, and public policy. Highly international.',
        website: 'https://www.ceu.edu',
        location: 'Vienna, Austria',
        students: '1,500+'
    },
    'Medical University of Vienna': {
        founded: 1365,
        description: 'One of world\'s oldest medical schools. Separated from University of Vienna in 2004. Excellence in medical research and education. Rich tradition.',
        website: 'https://www.meduniwien.ac.at',
        location: 'Vienna, Austria',
        students: '8,000+'
    },
    'Vienna University of Technology': {
        founded: 1815,
        description: 'TU Wien. Austria\'s largest technical university. Excellence in engineering, architecture, and natural sciences. Strong research and innovation.',
        website: 'https://www.tuwien.at',
        location: 'Vienna, Austria',
        students: '27,000+'
    },
    'London School of Economics': {
        founded: 1895,
        description: 'LSE. World-leading social science university. 19 Nobel laureates in Economics. Excellence in economics, politics, law, and sociology.',
        website: 'https://www.lse.ac.uk',
        location: 'London, United Kingdom',
        students: '12,000+'
    },
    'Norwegian University of Life Sciences': {
        founded: 1859,
        description: 'NMBU. Norwegian university specializing in life sciences. Excellence in veterinary medicine, agriculture, and environmental sciences.',
        website: 'https://www.nmbu.no',
        location: 'As, Norway',
        students: '6,000+'
    },
    'University of Oslo': {
        founded: 1811,
        description: 'Norway\'s oldest and highest-ranked university. Excellence in law, medicine, natural sciences, and humanities. 5 Nobel laureates.',
        website: 'https://www.uio.no',
        location: 'Oslo, Norway',
        students: '28,000+'
    },
    'University of Algarve': {
        founded: 1979,
        description: 'Portuguese university in Algarve region. Excellence in marine sciences, tourism, and health. Beautiful coastal location.',
        website: 'https://www.ualg.pt',
        location: 'Faro, Portugal',
        students: '9,000+'
    },
    'University of Gottingen': {
        founded: 1734,
        description: 'Georg August University Gottingen. Historic German research university. 45 Nobel laureates. Excellence in sciences, mathematics, and humanities.',
        website: 'https://www.uni-goettingen.de',
        location: 'Gottingen, Germany',
        students: '31,000+'
    },
    'UCLouvain': {
        founded: 1425,
        description: 'Catholic University of Louvain. Belgium\'s largest French-speaking university. Excellence in sciences, humanities, and medicine. Historic tradition.',
        website: 'https://www.uclouvain.be',
        location: 'Louvain-la-Neuve, Belgium',
        students: '32,000+'
    },
    'University of Lille': {
        founded: 1559,
        description: 'Major French research university. Merged 2018 from three institutions. Excellence in sciences, humanities, health, and engineering.',
        website: 'https://www.univ-lille.fr',
        location: 'Lille, France',
        students: '72,000+'
    },
    'Friedrich-Alexander University Erlangen-Nuremberg': {
        founded: 1743,
        description: 'FAU. Large German research university. Excellence in engineering, sciences, medicine, and humanities. Strong innovation culture.',
        website: 'https://www.fau.eu',
        location: 'Erlangen/Nuremberg, Germany',
        students: '39,000+'
    },
    'University of Milan': {
        founded: 1924,
        description: 'Universita degli Studi di Milano. Italy\'s largest public university by enrollment. Excellence in sciences, humanities, and health.',
        website: 'https://www.unimi.it',
        location: 'Milan, Italy',
        students: '64,000+'
    },
    'Kyoto University': {
        founded: 1897,
        description: 'Japan\'s second-oldest university. 19 Nobel laureates (most in Asia). Excellence in sciences, engineering, and humanities. Elite research institution.',
        website: 'https://www.kyoto-u.ac.jp',
        location: 'Kyoto, Japan',
        students: '22,000+'
    },
    'Politecnico di Milano': {
        founded: 1863,
        description: 'Milan Polytechnic. Italy\'s leading technical university. Excellence in engineering, architecture, and design. Strong industry connections.',
        website: 'https://www.polimi.it',
        location: 'Milan, Italy',
        students: '47,000+'
    },
    'University of Basel': {
        founded: 1460,
        description: 'Switzerland\'s oldest university. Excellence in life sciences, medicine, and humanities. 10 Nobel laureates including Erasmus of Rotterdam.',
        website: 'https://www.unibas.ch',
        location: 'Basel, Switzerland',
        students: '13,000+'
    },
    'University of Exeter': {
        founded: 1955,
        description: 'Russell Group university in southwest England. Excellence in sciences, humanities, business, and medicine. Beautiful campus locations.',
        website: 'https://www.exeter.ac.uk',
        location: 'Exeter, United Kingdom',
        students: '28,000+'
    },
    'University of San Francisco': {
        founded: 1855,
        description: 'Jesuit university in San Francisco. Excellence in business, law, nursing, and education. Strong social justice focus and diverse student body.',
        website: 'https://www.usfca.edu',
        location: 'San Francisco, California, USA',
        students: '11,000+'
    },
    // Universities 221-280 (batches 10 & 11 combined)
    'University of Toronto': {
        founded: 1827,
        description: 'Canada\'s leading university. Excellence across all disciplines. 10 Nobel laureates. Consistently ranked top 20 globally. Major research powerhouse.',
        website: 'https://www.utoronto.ca',
        location: 'Toronto, Canada',
        students: '95,000+'
    },
    'University of British Columbia': {
        founded: 1908,
        description: 'UBC. Canada\'s top research university. Excellence in sciences, engineering, and humanities. 8 Nobel laureates. Beautiful Vancouver campus.',
        website: 'https://www.ubc.ca',
        location: 'Vancouver, Canada',
        students: '70,000+'
    },
    'Universite de Picardie Jules Verne': {
        founded: 1970,
        description: 'University of Picardy Jules Verne. French university in Amiens. Excellence in sciences, humanities, and health. Strong regional focus.',
        website: 'https://www.u-picardie.fr',
        location: 'Amiens, France',
        students: '32,000+'
    },
    'University Politehnica of Bucharest': {
        founded: 1818,
        description: 'Polytechnic University of Bucharest. Romania\'s leading technical university. Excellence in engineering, technology, and applied sciences.',
        website: 'https://www.upb.ro',
        location: 'Bucharest, Romania',
        students: '25,000+'
    },
    'University of KwaZulu-Natal': {
        founded: 2004,
        description: 'UKZN. South African university formed by merger. Excellence in health sciences, agriculture, and humanities. Multiple campuses in KwaZulu-Natal.',
        website: 'https://www.ukzn.ac.za',
        location: 'Durban, South Africa',
        students: '45,000+'
    },
    'Bogazici University': {
        founded: 1863,
        description: 'Bogazici University. Turkey\'s top-ranked university. Excellence in engineering, sciences, and economics. Historic Bosphorus campus location.',
        website: 'https://www.boun.edu.tr',
        location: 'Istanbul, Turkey',
        students: '20,000+'
    },
    'University of East Anglia': {
        founded: 1963,
        description: 'UEA. UK research university. Excellence in environmental sciences, literature, and health. Strong research culture and beautiful campus.',
        website: 'https://www.uea.ac.uk',
        location: 'Norwich, United Kingdom',
        students: '17,000+'
    },
    'University of Nottingham': {
        founded: 1948,
        description: 'Russell Group university. Excellence in sciences, engineering, medicine, and humanities. Campuses in UK, China, and Malaysia.',
        website: 'https://www.nottingham.ac.uk',
        location: 'Nottingham, United Kingdom',
        students: '48,000+'
    },
    'Institute of Science and Technology Austria': {
        founded: 2009,
        description: 'IST Austria. Elite graduate research institute. Excellence in natural sciences, mathematics, and computer science. Highly selective and international.',
        website: 'https://www.ist.ac.at',
        location: 'Klosterneuburg, Austria',
        students: '400+'
    },
    'Johns Hopkins University': {
        founded: 1876,
        description: 'World\'s first research university. #1 in research spending. 39 Nobel laureates. Excellence in medicine, engineering, and international studies.',
        website: 'https://www.jhu.edu',
        location: 'Baltimore, Maryland, USA',
        students: '28,000+'
    },
    'University of California Los Angeles': {
        founded: 1919,
        description: 'UCLA. Leading public research university. 15 Nobel laureates. Excellence across all disciplines. Major research powerhouse in Los Angeles.',
        website: 'https://www.ucla.edu',
        location: 'Los Angeles, California, USA',
        students: '47,000+'
    },
    'IQS Barcelona': {
        founded: 1905,
        description: 'IQS School of Engineering. Private technical university in Barcelona. Excellence in chemistry, engineering, and business. Strong industry connections.',
        website: 'https://www.iqs.edu',
        location: 'Barcelona, Spain',
        students: '1,500+'
    },
    'University of Bath': {
        founded: 1966,
        description: 'UK research university. Excellence in engineering, management, sciences, and social sciences. Strong industry partnerships.',
        website: 'https://www.bath.ac.uk',
        location: 'Bath, United Kingdom',
        students: '18,000+'
    },
    'Universidad Carlos III de Madrid': {
        founded: 1989,
        description: 'Carlos III University of Madrid. Young Spanish research university. Excellence in social sciences, engineering, and humanities. Strong international focus.',
        website: 'https://www.uc3m.es',
        location: 'Madrid, Spain',
        students: '20,000+'
    },
    'Ecole Normale Superieure': {
        founded: 1794,
        description: 'Ecole Normale Superieure. Elite French Grande Ecole. 14 Fields Medal winners, 13 Nobel laureates. Excellence in sciences and humanities.',
        website: 'https://www.ens.psl.eu',
        location: 'Paris, France',
        students: '2,400+'
    },
    'University of Pavia': {
        founded: 1361,
        description: 'One of world\'s oldest universities. Historic Italian institution. Alessandro Volta taught here. Excellence in sciences, medicine, and humanities.',
        website: 'https://www.unipv.it',
        location: 'Pavia, Italy',
        students: '24,000+'
    },
    'NOVA University Lisbon': {
        founded: 1973,
        description: 'New University of Lisbon. Major Portuguese research university. Excellence in sciences, economics, law, and social sciences.',
        website: 'https://www.unl.pt',
        location: 'Lisbon, Portugal',
        students: '20,000+'
    },
    'University of Pretoria': {
        founded: 1908,
        description: 'South Africa\'s largest contact university. Excellence in veterinary science, engineering, law, and health sciences. Strong research tradition.',
        website: 'https://www.up.ac.za',
        location: 'Pretoria, South Africa',
        students: '55,000+'
    },
    'Camilo Jose Cela University': {
        founded: 2000,
        description: 'Private Spanish university in Madrid. Excellence in health sciences, communication, and technology. Modern campus and innovative teaching.',
        website: 'https://www.ucjc.edu',
        location: 'Madrid, Spain',
        students: '9,000+'
    },
    'University of Bristol': {
        founded: 1876,
        description: 'Russell Group university. Excellence in sciences, engineering, and arts. 13 Nobel laureates. Historic red-brick university.',
        website: 'https://www.bristol.ac.uk',
        location: 'Bristol, United Kingdom',
        students: '28,000+'
    },
    'University of Southern Denmark': {
        founded: 1966,
        description: 'SDU. Major Danish research university. Excellence in engineering, health sciences, and humanities. Multiple campuses across southern Denmark.',
        website: 'https://www.sdu.dk',
        location: 'Odense, Denmark',
        students: '28,000+'
    },
    
    // ============================================
    // PHASE 2 ADDITIONS - Missing Universities
    // Added February 2026 to fix 31 alumni without modals
    // ============================================
    
    'King\'s College London': {
        founded: 1829,
        description: 'One of England\'s oldest and most prestigious universities. Part of the University of London. 12 Nobel laureates. Excellence in medicine, law, humanities, and sciences.',
        website: 'https://www.kcl.ac.uk',
        location: 'London, United Kingdom',
        students: '35,000+'
    },
    'Université Paris-Saclay': {
        founded: 2019,
        description: 'Major French research university formed by merger of prestigious institutions. Combines universities and grandes écoles. Excellence in sciences, engineering, and technology. Located in Europe\'s leading technology hub.',
        website: 'https://www.universite-paris-saclay.fr',
        location: 'Paris, France',
        students: '48,000+'
    },
    'Université Libre de Bruxelles': {
        founded: 1834,
        description: 'ULB. Major Belgian research university with strong European focus. Five Nobel laureates. Excellence in sciences, medicine, and social sciences. Bilingual French-English programmes.',
        website: 'https://www.ulb.be',
        location: 'Brussels, Belgium',
        students: '32,000+'
    },
    'Pompeu Fabra University': {
        founded: 1990,
        description: 'Young Spanish university that rapidly achieved international recognition. Named after linguist Pompeu Fabra. Excellence in economics, political science, health sciences, and communication.',
        website: 'https://www.upf.edu',
        location: 'Barcelona, Spain',
        students: '16,000+'
    },
    'University of Barcelona': {
        founded: 1450,
        description: 'Catalonia\'s oldest and Spain\'s second largest university. Long tradition of academic excellence. Strong in sciences, medicine, humanities, and social sciences.',
        website: 'https://www.ub.edu',
        location: 'Barcelona, Spain',
        students: '63,000+'
    },
    'Charité - Universitätsmedizin Berlin': {
        founded: 1710,
        description: 'One of Europe\'s largest university hospitals. Joint medical faculty of Freie Universität and Humboldt University. More than half of German Nobel Prize winners in medicine worked here. World leader in medical research.',
        website: 'https://www.charite.de',
        location: 'Berlin, Germany',
        students: '8,000+'
    },
    'Weizmann Institute of Science': {
        founded: 1934,
        description: 'Israel\'s premier research institution dedicated solely to graduate studies and research. Excellence in physics, chemistry, biology, and mathematics. Home to numerous Turing and Nobel laureates.',
        website: 'https://www.weizmann.ac.il',
        location: 'Rehovot, Israel',
        students: '2,500+'
    },
    'Technische Universität Wien': {
        founded: 1815,
        description: 'TU Wien. Austria\'s largest technical university. Excellence in engineering, technology, and natural sciences. Strong tradition in architecture and urban planning.',
        website: 'https://www.tuwien.at',
        location: 'Vienna, Austria',
        students: '27,000+'
    },
    'Universidad Autónoma de Madrid': {
        founded: 1968,
        description: 'UAM. One of Spain\'s leading public research universities. Excellence in sciences, medicine, law, and humanities. Consistently ranked among Spain\'s top universities.',
        website: 'https://www.uam.es',
        location: 'Madrid, Spain',
        students: '33,000+'
    },
    
    // ============================================
    // PHASE 4 ADDITIONS - Long Tail Universities
    // Added February 2026 for remaining alumni
    // Only genuinely new universities (no duplicates)
    // ============================================
    
    'Tel Aviv University': {
        founded: 1956,
        description: 'Israel\'s largest university. Excellence in sciences, engineering, humanities, and social sciences. Strong research output and innovation.',
        website: 'https://www.tau.ac.il',
        location: 'Tel Aviv, Israel',
        students: '30,000+'
    },
    'Singapore Management University': {
        founded: 2000,
        description: 'SMU. Leading Asian university modeled on Wharton School. Excellence in business, economics, social sciences, and law. Strong industry connections.',
        website: 'https://www.smu.edu.sg',
        location: 'Singapore',
        students: '12,000+'
    },
    'Nanyang Technological University': {
        founded: 1991,
        description: 'NTU Singapore. Young university that rapidly achieved world-class status. Excellence in engineering, sciences, business, and humanities. Smart campus pioneer.',
        website: 'https://www.ntu.edu.sg',
        location: 'Singapore',
        students: '33,000+'
    },
    'Autonomous University of Barcelona': {
        founded: 1968,
        description: 'UAB. Leading Spanish research university. Excellence in sciences, health, humanities, and social sciences. Beautiful campus near Barcelona.',
        website: 'https://www.uab.cat',
        location: 'Barcelona, Spain',
        students: '40,000+'
    },
    'Complutense University of Madrid': {
        founded: 1293,
        description: 'One of world\'s oldest universities. Spain\'s largest university. Long tradition in humanities, sciences, and health sciences.',
        website: 'https://www.ucm.es',
        location: 'Madrid, Spain',
        students: '86,000+'
    },
    'Sapienza University of Rome': {
        founded: 1303,
        description: 'One of world\'s oldest universities. Europe\'s largest university. Excellence across all disciplines with historic presence in Rome.',
        website: 'https://www.uniroma1.it',
        location: 'Rome, Italy',
        students: '112,000+'
    },
    'Polytechnic University of Milan': {
        founded: 1863,
        description: 'Politecnico di Milano. Italy\'s leading technical university. Excellence in engineering, architecture, and design. Strong industry connections.',
        website: 'https://www.polimi.it',
        location: 'Milan, Italy',
        students: '47,000+'
    },
    'Free University of Berlin': {
        founded: 1948,
        description: 'Freie Universität Berlin. Major research university founded during Cold War. Excellence in humanities, social sciences, and sciences.',
        website: 'https://www.fu-berlin.de',
        location: 'Berlin, Germany',
        students: '33,000+'
    },
    'University of Freiburg': {
        founded: 1457,
        description: 'One of Germany\'s oldest universities. Excellence in sciences, medicine, humanities, and law. Beautiful Black Forest location.',
        website: 'https://www.uni-freiburg.de',
        location: 'Freiburg, Germany',
        students: '25,000+'
    },
    'University of Göttingen': {
        founded: 1737,
        description: 'Historic German research university. 44 Nobel laureates. Excellence in mathematics, sciences, and humanities.',
        website: 'https://www.uni-goettingen.de',
        location: 'Göttingen, Germany',
        students: '31,000+'
    },
    'Lancaster University': {
        founded: 1964,
        description: 'Leading research university. Excellence in sciences, social sciences, and management. Beautiful campus setting.',
        website: 'https://www.lancaster.ac.uk',
        location: 'Lancaster, United Kingdom',
        students: '20,000+'
    },
    'Yale University': {
        founded: 1701,
        description: 'Ivy League university. Third-oldest higher education institution in US. Excellence in law, medicine, arts, and sciences.',
        website: 'https://www.yale.edu',
        location: 'New Haven, Connecticut, USA',
        students: '14,000+'
    }
};

// Backward compatibility
const UNIVERSITY_LOGOS = UNI_LOGO_FILES;

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COUNTRY_DETAILS, MSP_DATA, UNIVERSITY_LOGOS, COUNTRY_FACTS, UNI_LOGO_FILES, UNIVERSITY_INFO, UNIVERSITY_ALIASES };
}
