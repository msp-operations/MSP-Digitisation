// ============================================
// CE ALUMNI DATA - SINGLE SOURCE OF TRUTH
// ============================================
// Last updated: October 2026
//
// ONE POPULATION: the 82 CE graduates of the classes of 2024, 2025 and 2026 (13 + 32 + 37).
// The class of 2026 was folded in on 29 Oct 2026 from the FSE master file (graduation form,
// 34 of 37 responded) and the AY25-26 diploma export. One graduate the old figures counted
// in the class of 2025 graduated in 2026, so the 2025 class is 32 and the total 82, not 83.
// Not every graduate answered every question: shares below are of all 82, so a section
// can add up to less than 100% (e.g. 4 concentrations unknown, 6 locations unknown).
// The 2024-2025 figures were kept as curated in September; the 2026 class was added on top.
//
// HOW TO UPDATE:
// 1. Scroll to the section you need to update
// 2. Change the numbers
// 3. Save the file
// 4. All pages will automatically reflect the changes
//
// NOTE: Also update the meta description in index.html
//       (line 8) when you change the summary numbers.
// ============================================


// ================================================================
//                                                                
//              UPDATE THESE NUMBERS ANNUALLY                     
//                                                                
// ================================================================

const CE_DATA = {

    // Shown in the footer line under the map.
    lastUpdated: "October 2026",

    // =========================================
    // SECTION 1: SUMMARY STATISTICS
    // =========================================
    // These appear in the hero sections across all pages
    
    summary: {
        totalAlumni: 82,           // Every CE graduate: 13 + 32 + 37
        profiledAlumni: 82,        // All three classes now have destinations on file
        nationalities: 21,         // Number of different nationalities
        countriesLivingIn: 13,     // Countries where alumni currently live
        universitiesAttended: 28,  // Master's universities attended (matches topUniversities)
        programmeStartYear: 2021,  // Year CE programme started
        firstGraduationYear: 2024  // Year of first graduating class
    },


    // =========================================
    // SECTION 2: GRADUATION BY YEAR
    // =========================================
    // Add new years as cohorts graduate
    
    graduationByYear: [
        { year: 2024, count: 13 },
        { year: 2025, count: 32 },  // 33 until Oct 2026; one graduate belongs to 2026
        { year: 2026, count: 37 }   // AY25-26 diploma export + FSE master file
        // { year: 2027, count: ?? },  // <-- Add future years here
    ],


    // =========================================
    // SECTION 3: GENDER BREAKDOWN
    // =========================================
    // Updates the donut chart on the dashboard
    
    gender: {
        male: 39,
        malePercent: 47,
        female: 40,
        femalePercent: 49,
        notDisclosed: 3,
        notDisclosedPercent: 4
    },


    // =========================================
    // SECTION 4: CONCENTRATION BREAKDOWN
    // =========================================
    // Update the count and percentage for each track
    
    concentrations: [
        {
            name: "Sustainable Biotechnology",
            shortName: "Biotech",
            count: 20,           // <-- Update this
            percentage: 24,      // <-- Update this (share of all 82)
            icon: "flask-conical",
            color: "#10B981",
            description: "Explore how cells, genes, enzymes, and microbes can be engineered to produce food, materials, energy, and pharmaceuticals sustainably.",
            fullDescription: "Build a strong foundation in molecular and cellular biology, and gain hands-on experience with biotechnological tools, fermentation, and bioprocess design. Emphasis is placed on the development of scalable, low-impact biotechnologies that close resource loops and reduce dependence on fossil-based systems.",
            careers: ["Life sciences", "Bio-based industries", "Environmental biotechnology", "Pharmaceutical production"],
            courses: ["Gene Technology", "Plant Biotechnology", "Bioreactors", "Microbiology & Fermentations", "Biotechnology for Sustainable Processes"]
        },
        {
            name: "Circular Chemical Engineering",
            shortName: "Chemical",
            count: 25,           // <-- Update this
            percentage: 30,      // <-- Update this (share of all 82)
            icon: "atom",
            color: "#14B8A6",
            description: "Develop a deep understanding of how energy and materials flow through chemical systems, and how these systems can be redesigned for efficiency.",
            fullDescription: "Learn to model, analyse, and optimise industrial processes, from molecular-level transformations to full-scale production systems, while gaining practical skills in system design, operational control, and sustainability assessment. This track prepares you to lead change in the chemical industry and beyond.",
            careers: ["Chemical industry", "Process engineering", "Sustainability consulting", "Industrial optimization"],
            courses: ["Chemical Engineering Thermodynamics", "Reactor Engineering", "Separations Processes", "Chemical Plant Design", "Circular Process Design"]
        },
        {
            name: "Engineering Physics for Sustainable Manufacturing",
            shortName: "Physics",
            count: 18,           // <-- Update this
            percentage: 22,      // <-- Update this (share of all 82)
            icon: "cpu",
            color: "#0EA5E9",
            description: "Design and optimise technologies that make production more efficient, intelligent, and circular.",
            fullDescription: "Build strong foundations in mechanics, materials, and electronics, learning how to sense, measure, and control physical systems with precision. Through applied design and advanced technical skills, you develop the capacity to engineer sustainable products and processes that reduce waste, extend product lifecycles, and enable smarter use of resources.",
            careers: ["Sensor-driven manufacturing", "Sustainable product development", "Smart systems", "Industrial automation"],
            courses: ["Mechanical Physics", "Sensors & Instrumentation", "Advanced Electronics", "Materials Engineering", "Product & Process Design"]
        },
        {
            name: "Sustainable Mechanical Engineering",
            shortName: "Mechanical",
            count: 15,           // first graduates: class of 2026
            percentage: 18,      // share of all 82 (4 graduates' concentration unknown)
            icon: "cog",
            color: "#8B5CF6",
            description: "Focus on the physical performance, durability, and redesign of products and processes for reuse, repair, and material recovery.",
            fullDescription: "Develop deep expertise in mechanics, structural analysis, and mechanical design, with a strong emphasis on manufacturability and lifecycle thinking. Through applied skills in simulation, materials selection, and system-level design, you will learn to engineer solutions that extend product lifespans and reduce environmental impact.",
            careers: ["Product design", "Lifecycle engineering", "Remanufacturing", "Structural analysis"],
            courses: ["Mechanics", "Structural Analysis", "Mechanical Design", "Materials Selection", "Lifecycle Assessment"]
        }
    ],


    // =========================================
    // SECTION 5: TOP MASTER'S UNIVERSITIES
    // =========================================
    // Reorder by count (highest first), update counts
    // logo: null means no logo file (will show placeholder)
    
    topUniversities: [
        { name: "TU Delft", count: 11, country: "Netherlands", logo: "tu-delft.png" },
        { name: "KTH Royal Institute of Technology", count: 8, country: "Sweden", logo: "kth-royal-institute-of-technology.png" },
        { name: "Eindhoven University of Technology", count: 5, country: "Netherlands", logo: "eindhoven-university.png" },
        { name: "Wageningen University & Research", count: 3, country: "Netherlands", logo: "wageningen-university.png" },
        { name: "Technical University of Denmark", count: 3, country: "Denmark", logo: "technical-university-of-denmark.png" },
        { name: "Maastricht University", count: 2, country: "Netherlands", logo: "maastricht-university.png" },
        { name: "NOVA School of Business & Economics", count: 2, country: "Portugal", logo: "nova-logo.png" },
        { name: "Leiden University", count: 2, country: "Netherlands", logo: "leiden-university.png" },
        { name: "Politecnico di Milano", count: 2, country: "Italy", logo: "politecnico-di-milano.png" },
        { name: "Imperial College London", count: 2, country: "United Kingdom", logo: "imperial-college-london.png" },
        { name: "KU Leuven", count: 2, country: "Belgium", logo: "ku-leuven.png" },
        { name: "Technical University of Munich", count: 1, country: "Germany", logo: "technical-university-of-munich.png" },
        { name: "RWTH Aachen University", count: 1, country: "Germany", logo: "aachen-university.png" },
        { name: "University of Southern Denmark", count: 1, country: "Denmark", logo: "university-of-southern-denmark.png" },
        { name: "Instituto Superior Tecnico Lisboa", count: 1, country: "Portugal", logo: "instituto-superior-tecnico-lisboae.png" },
        { name: "Universite Libre de Bruxelles", count: 1, country: "Belgium", logo: "universite-libre-de-bruxelles.png" },
        { name: "MCI - The Entrepreneurial School", count: 1, country: "Austria", logo: "mci.png" },
        { name: "Universidad Politecnica de Madrid", count: 1, country: "Spain", logo: "universidad-de-madrid.png" },
        { name: "University of Seoul", count: 1, country: "South Korea", logo: "University-of-Seoul.png" },
        { name: "University of Groningen", count: 1, country: "Netherlands", logo: "university-of-groningen.png" },
        { name: "University of Liege", count: 1, country: "Belgium", logo: "university-of-liege.png" },
        { name: "Institute for Advanced Architecture of Catalonia", count: 1, country: "Spain", logo: "institute-architecture-catalonia.jpg" },
        { name: "EU-CONEXUS", count: 1, country: "France", logo: "eu-conexus.png" },
        { name: "Utrecht University", count: 1, country: "Netherlands", logo: "utrecht-university.png" },
        { name: "EPFL", count: 1, country: "Switzerland", logo: "epfl.png" },
        { name: "NOVA University Lisbon", count: 1, country: "Portugal", logo: "nova-university-lisbon.png" },
        { name: "Universitat Politecnica de Catalunya", count: 1, country: "Spain", logo: "universitat-politecnica-de-catalunya.png" },
        { name: "University of the Basque Country", count: 1, country: "Spain", logo: null }
    ],


    // =========================================
    // SECTION 5B: UNIVERSITY DETAILS DATABASE
    // =========================================
    // Detailed info for "All Universities" section
    
    universityDetails: {
        "TU Delft": {
            fullName: "Delft University of Technology",
            city: "Delft",
            country: "Netherlands",
            founded: 1842,
            funFact: "Europe's largest technical university and birthplace of innovations like Bluetooth and countless sustainable technologies. The campus has its own nuclear reactor for research!",
            website: "https://www.tudelft.nl",
            logo: "tu-delft.png"
        },
        "KTH Royal Institute of Technology": {
            fullName: "KTH Royal Institute of Technology",
            city: "Stockholm",
            country: "Sweden",
            founded: 1827,
            funFact: "Sweden's largest technical university, founded by King Karl XIV Johan. One-third of Sweden's engineering research happens here, and it has produced groundbreaking inventions like the computer mouse and Skype.",
            website: "https://www.kth.se",
            logo: "kth-royal-institute-of-technology.png"
        },
        "Wageningen University & Research": {
            fullName: "Wageningen University & Research",
            city: "Wageningen",
            country: "Netherlands",
            founded: 1876,
            funFact: "World's #1 university for agriculture and forestry. Their motto is 'To explore the potential of nature to improve the quality of life' - and they helped feed the Netherlands during WWII occupation.",
            website: "https://www.wur.nl",
            logo: "wageningen-university.png"
        },
        "Eindhoven University of Technology": {
            fullName: "Eindhoven University of Technology",
            city: "Eindhoven",
            country: "Netherlands",
            founded: 1956,
            funFact: "Located in Europe's smartest region (Brainport), home to Philips and ASML. TU/e graduates founded companies generating over 60 billion euros in annual revenue - more per student than MIT!",
            website: "https://www.tue.nl",
            logo: "eindhoven-university.png"
        },
        "Maastricht University": {
            fullName: "Maastricht University",
            city: "Maastricht",
            country: "Netherlands",
            founded: 1976,
            funFact: "The Netherlands' most international university (over 50% international students) and pioneer of Problem-Based Learning. The city is where the European Union was born with the Maastricht Treaty in 1992!",
            website: "https://www.maastrichtuniversity.nl",
            logo: "maastricht-university.png"
        },
        "NOVA School of Business & Economics": {
            fullName: "NOVA School of Business & Economics",
            city: "Lisbon",
            country: "Portugal",
            founded: 1978,
            funFact: "Portugal's top business school with triple accreditation (AACSB, AMBA, EQUIS) - only 1% of business schools worldwide achieve this. Their beachfront campus overlooks the Atlantic Ocean!",
            website: "https://www.novasbe.unl.pt",
            logo: "nova-logo.png"
        },
        "Leiden University": {
            fullName: "Leiden University",
            city: "Leiden",
            country: "Netherlands",
            founded: 1575,
            funFact: "The Netherlands' oldest university, founded during the Dutch Revolt as a gift from William of Orange. Sixteen Nobel Prize winners studied or taught here, including Einstein as a visiting professor!",
            website: "https://www.universiteitleiden.nl",
            logo: "leiden-university.png"
        },
        "Technical University of Munich": {
            fullName: "Technical University of Munich",
            city: "Munich",
            country: "Germany",
            founded: 1868,
            funFact: "Germany's #1 technical university with 17 Nobel laureates. The only German university to be named 'University of Excellence' three times. Famous alumni include Rudolf Diesel (inventor of the diesel engine)!",
            website: "https://www.tum.de",
            logo: "technical-university-of-munich.png"
        },
        "Technical University of Denmark": {
            fullName: "Technical University of Denmark",
            city: "Kongens Lyngby",
            country: "Denmark",
            founded: 1829,
            funFact: "DTU invented the Bluetooth technology that connects your devices! The university collaborates with over 200 companies and produces more patents per researcher than any other Danish university.",
            website: "https://www.dtu.dk",
            logo: "technical-university-of-denmark.png"
        },
        "RWTH Aachen University": {
            fullName: "RWTH Aachen University",
            city: "Aachen",
            country: "Germany",
            founded: 1870,
            funFact: "Europe's largest technical university in terms of students and Germany's #1 engineering school. RWTH receives more industry research funding than any other German university - over 400 million euros annually!",
            website: "https://www.rwth-aachen.de",
            logo: "aachen-university.png"
        },
        "University of Southern Denmark": {
            fullName: "University of Southern Denmark",
            city: "Odense",
            country: "Denmark",
            founded: 1966,
            funFact: "Home to Denmark's only space research center and the birthplace of the humanoid robot 'iCub'. Located in Hans Christian Andersen's hometown of Odense!",
            website: "https://www.sdu.dk",
            logo: "university-of-southern-denmark.png"
        },
        "Instituto Superior Tecnico Lisboa": {
            fullName: "Instituto Superior Tecnico",
            city: "Lisbon",
            country: "Portugal",
            founded: 1911,
            funFact: "Portugal's largest engineering school and the country's most prestigious technical institution. IST manages one of Europe's largest solar power test facilities and runs its own nuclear reactor for research!",
            website: "https://tecnico.ulisboa.pt",
            logo: "instituto-superior-tecnico-lisboae.png"
        },
        "Universite Libre de Bruxelles": {
            fullName: "Universite Libre de Bruxelles",
            city: "Brussels",
            country: "Belgium",
            founded: 1834,
            funFact: "Belgium's largest French-speaking university with 5 Nobel Prize winners! Located in the EU capital, ULB has strong ties to European institutions and trains many EU policymakers.",
            website: "https://www.ulb.be",
            logo: "universite-libre-de-bruxelles.png"
        },
        "MCI - The Entrepreneurial School": {
            fullName: "MCI Management Center Innsbruck",
            city: "Innsbruck",
            country: "Austria",
            founded: 1995,
            funFact: "Austria's leading entrepreneurial university, ranked #1 in Austria for student satisfaction. Located in the heart of the Alps with stunning mountain views from classrooms - study and ski in the same day!",
            website: "https://www.mci.edu",
            logo: "mci.png"
        },
        "Universidad Politecnica de Madrid": {
            fullName: "Universidad Politecnica de Madrid",
            city: "Madrid",
            country: "Spain",
            founded: 1971,
            funFact: "Spain's largest technical university with alumni including 15% of Spanish engineers. UPM led the design of Madrid's impressive metro system and Spain's high-speed rail network!",
            website: "https://www.upm.es",
            logo: "universidad-de-madrid.png"
        },
        "University of Seoul": {
            fullName: "University of Seoul",
            city: "Seoul",
            country: "South Korea",
            founded: 1918,
            funFact: "One of Korea's leading public universities, originally founded as the Kyungsung Public Agriculture and Commerce School. Located in the world's most wired city with average internet speeds of 29 Mbps!",
            website: "https://www.uos.ac.kr",
            logo: "University-of-Seoul.png"
        },
        "University of Groningen": {
            fullName: "University of Groningen",
            city: "Groningen",
            country: "Netherlands",
            founded: 1614,
            funFact: "The Netherlands' second-oldest university with 4 Nobel Prize winners, including the first female Nobel laureate in chemistry (2009). Half the city's population are students - true college town vibes!",
            website: "https://www.rug.nl",
            logo: "university-of-groningen.png"
        },
        "KU Leuven": {
            fullName: "KU Leuven",
            city: "Leuven",
            country: "Belgium",
            founded: 1425,
            funFact: "Belgium's oldest and largest university, and consistently Europe's most innovative university (Reuters ranking). The Stella Artois brewery was founded by KU Leuven students in 1366!",
            website: "https://www.kuleuven.be",
            logo: "ku-leuven.png"
        },
        "University of Liege": {
            fullName: "University of Liege",
            city: "Liege",
            country: "Belgium",
            founded: 1817,
            funFact: "Belgium's first public university, known as 'the university of revolution' for its role in Belgian independence. Home to Europe's strongest electromagnet and pioneering research in astrophysics!",
            website: "https://www.uliege.be",
            logo: "university-of-liege.png"
        },
        "Institute for Advanced Architecture of Catalonia": {
            fullName: "Institute for Advanced Architecture of Catalonia",
            city: "Barcelona",
            country: "Spain",
            founded: 2001,
            funFact: "IAAC pioneered digital fabrication in architecture and created the world's first 3D-printed building in Barcelona. They're pushing the boundaries of ecological buildings and biocities!",
            website: "https://iaac.net",
            logo: "institute-architecture-catalonia.jpg"
        },
        "EU-CONEXUS": {
            fullName: "European University for Smart Urban Coastal Sustainability",
            city: "La Rochelle",
            country: "France",
            founded: 2019,
            funFact: "A unique alliance of 10 universities across Europe focused on smart, sustainable coastal cities. Students can study at multiple universities and earn joint degrees - truly European education!",
            website: "https://www.euconexus.eu",
            logo: "eu-conexus.png"
        },
        "Politecnico di Milano": {
            fullName: "Politecnico di Milano",
            city: "Milan",
            country: "Italy",
            founded: 1863,
            funFact: "Italy's largest technical university. Giulio Natta, who taught here, won the 1963 Nobel Prize in Chemistry for the work that gave the world polypropylene.",
            website: "https://www.polimi.it",
            logo: "politecnico-di-milano.png"
        },
        "Imperial College London": {
            fullName: "Imperial College London",
            city: "London",
            country: "United Kingdom",
            founded: 1907,
            funFact: "A university devoted entirely to science, engineering, medicine and business. Penicillin was discovered by Alexander Fleming at St Mary's Hospital Medical School, now part of Imperial.",
            website: "https://www.imperial.ac.uk",
            logo: "imperial-college-london.png"
        },
        "Utrecht University": {
            fullName: "Utrecht University",
            city: "Utrecht",
            country: "Netherlands",
            founded: 1636,
            funFact: "One of the oldest and largest universities in the Netherlands, with a sustainability focus that runs through its science faculty on the Utrecht Science Park.",
            website: "https://www.uu.nl",
            logo: "utrecht-university.png"
        },
        "EPFL": {
            fullName: "École Polytechnique Fédérale de Lausanne",
            city: "Lausanne",
            country: "Switzerland",
            founded: 1969,
            funFact: "One of Switzerland's two federal institutes of technology, on the shore of Lake Geneva, and one of Europe's leading engineering schools.",
            website: "https://www.epfl.ch",
            logo: "epfl.png"
        },
        "NOVA University Lisbon": {
            fullName: "NOVA University Lisbon",
            city: "Lisbon",
            country: "Portugal",
            founded: 1973,
            funFact: "Its school of science and technology sits on the Caparica campus, across the Tagus from Lisbon and a short walk from the Atlantic beaches.",
            website: "https://www.unl.pt",
            logo: "nova-university-lisbon.png"
        },
        "Universitat Politecnica de Catalunya": {
            fullName: "Universitat Politècnica de Catalunya",
            city: "Barcelona",
            country: "Spain",
            founded: 1971,
            funFact: "Barcelona's technical university and a partner in EIT InnoEnergy master's programmes, where students spend a year at two different European universities.",
            website: "https://www.upc.edu",
            logo: "universitat-politecnica-de-catalunya.png"
        },
        "University of the Basque Country": {
            fullName: "University of the Basque Country (UPV/EHU)",
            city: "Plentzia",
            country: "Spain",
            founded: 1980,
            funFact: "Its marine station in Plentzia, on the Bay of Biscay, hosts international master's students in marine environment and resources.",
            website: "https://www.ehu.eus",
            logo: null
        }
    },


    // =========================================
    // SECTION 6: MASTER'S PROGRAMMES
    // =========================================
    // What programmes alumni are studying
    
    mastersProgrammes: [
        { name: "Mechanical Engineering", count: 9 },
        { name: "Chemical Engineering for Energy and Environment", count: 5 },
        { name: "Biotechnology", count: 3 },
        { name: "Environmental Engineering", count: 3 },
        { name: "Biobased Materials", count: 2 },
        { name: "Industrial Ecology", count: 2 },
        { name: "Advanced Chemical Engineering", count: 2 },
        { name: "Electrical Engineering (pre-master)", count: 2 },
        { name: "Materials Science and Engineering", count: 1 },
        { name: "Materials and Manufacturing Engineering", count: 1 },
        { name: "Sustainable Materials Engineering", count: 1 },
        { name: "Production Engineering and Management", count: 1 },
        { name: "Machine Design", count: 1 },
        { name: "Engineering Design and Innovation", count: 1 },
        { name: "Energy Engineering", count: 1 },
        { name: "Sustainable Energy Systems", count: 1 },
        { name: "Building Engineering for Sustainability", count: 1 },
        { name: "Sustainable and Circular Chemistry", count: 1 },
        { name: "Chemical Engineering and Biotechnology", count: 1 },
        { name: "Management of Technology", count: 1 },
        { name: "Marine Environment and Resources", count: 1 },
        { name: "Business Analytics", count: 1 },
        { name: "Automotive Engineering", count: 1 },
        { name: "Automation Engineering", count: 1 },
        { name: "Management (Sustainability)", count: 1 },
        { name: "Resilient Farming and Food Systems", count: 1 },
        { name: "Biochemistry and Molecular Biology", count: 1 }
    ],


    // =========================================
    // SECTION 7: COUNTRIES WHERE ALUMNI LIVE
    // =========================================
    // Update counts and cities list
    
    countriesLivingIn: [
        { name: "Netherlands", code: "nl", count: 32, cities: ["Delft", "Maastricht", "Eindhoven", "Wageningen", "Utrecht", "Groningen", "Amsterdam", "Sittard"], coords: [52.1326, 5.2913] },
        { name: "Sweden", code: "se", count: 8, cities: ["Stockholm"], coords: [59.3293, 18.0686] },
        { name: "Spain", code: "es", count: 5, cities: ["Madrid", "Barcelona", "Plentzia", "Murcia"], coords: [40.4637, -3.7492] },
        { name: "Portugal", code: "pt", count: 4, cities: ["Lisbon"], coords: [38.7223, -9.1393] },
        { name: "Denmark", code: "dk", count: 4, cities: ["Copenhagen", "Odense"], coords: [56.2639, 9.5018] },
        { name: "Belgium", code: "be", count: 4, cities: ["Brussels", "Leuven", "Liege"], coords: [50.5039, 4.4699] },
        { name: "Germany", code: "de", count: 2, cities: ["Munich", "Aachen"], coords: [51.1657, 10.4515] },
        { name: "Italy", code: "it", count: 2, cities: ["Milan"], coords: [41.8719, 12.5674] },
        { name: "United Kingdom", code: "gb", count: 2, cities: ["London"], coords: [55.3781, -3.4360] },
        { name: "Switzerland", code: "ch", count: 1, cities: ["Lausanne"], coords: [46.8182, 8.2275] },
        { name: "France", code: "fr", count: 1, cities: ["La Rochelle"], coords: [46.2276, 2.2137] },
        { name: "South Korea", code: "kr", count: 1, cities: ["Seoul"], coords: [37.5665, 126.9780] },
        { name: "Moldova", code: "md", count: 1, cities: ["Chisinau"], coords: [47.4116, 28.3699] }
    ],


    // =========================================
    // SECTION 8: TOP CITIES
    // =========================================
    // Cities with most alumni (for dashboard display)
    
    topCities: [
        { name: "Delft", country: "Netherlands", code: "nl", count: 11 },
        { name: "Maastricht", country: "Netherlands", code: "nl", count: 11 },
        { name: "Stockholm", country: "Sweden", code: "se", count: 8 },
        { name: "Eindhoven", country: "Netherlands", code: "nl", count: 5 },
        { name: "Lisbon", country: "Portugal", code: "pt", count: 4 },
        { name: "Wageningen", country: "Netherlands", code: "nl", count: 3 }
    ],


    // =========================================
    // SECTION 9: NATIONALITIES
    // =========================================
    // Where alumni are originally from (citizenship)
    
    nationalities: [
        { name: "Belgium", code: "be", count: 13 },
        { name: "Germany", code: "de", count: 13 },
        { name: "Netherlands", code: "nl", count: 11 },
        { name: "Italy", code: "it", count: 6 },
        { name: "France", code: "fr", count: 4 },
        { name: "Romania", code: "ro", count: 3 },
        { name: "Spain", code: "es", count: 3 },
        { name: "Portugal", code: "pt", count: 2 },
        { name: "Poland", code: "pl", count: 2 },
        { name: "Ireland", code: "ie", count: 2 },
        { name: "Lebanon", code: "lb", count: 2 },
        { name: "Austria", code: "at", count: 2 },
        { name: "Ecuador", code: "ec", count: 1 },
        { name: "India", code: "in", count: 1 },
        { name: "Hungary", code: "hu", count: 1 },
        { name: "Trinidad and Tobago", code: "tt", count: 1 },
        { name: "Bulgaria", code: "bg", count: 1 },
        { name: "Lithuania", code: "lt", count: 1 },
        { name: "Denmark", code: "dk", count: 1 },
        { name: "Australia", code: "au", count: 1 },
        { name: "Czech Republic", code: "cz", count: 1 }
    ],

    // All nationality flag codes for the flag display
    // Add new codes when new nationalities join
    allNationalityFlags: ["be", "de", "nl", "it", "fr", "ro", "es", "pt", "pl", "ie", "lb", "at", "ec", "in", "hu", "tt", "bg", "lt", "dk", "au", "cz"],


    // =========================================
    // SECTION 10: CONCENTRATION -> UNIVERSITY PATHWAYS
    // =========================================
    // Which Master's universities alumni go to based on their CE concentration
    // Only includes alumni currently pursuing a Master's
    
    concentrationPathways: {
        "Sustainable Biotechnology": {
            total: 13,
            percentOfTrack: 65,  // 13 of 20 biotech grads pursuing Master's
            color: "#10B981",
            universities: [
                { name: "Wageningen University & Research", count: 3, percent: 23, programmes: ["Biotechnology", "Food Systems", "Environmental Management"] },
                { name: "Maastricht University", count: 2, percent: 15, programmes: ["Biobased Materials"] },
                { name: "Instituto Superior Tecnico Lisboa", count: 1, percent: 8, programmes: ["Biotechnology"] },
                { name: "Universite Libre de Bruxelles", count: 1, percent: 8, programmes: ["Biochemistry & Molecular Biology"] },
                { name: "MCI Innsbruck", count: 1, percent: 8, programmes: ["Biotechnology"] },
                { name: "Leiden University", count: 1, percent: 8, programmes: ["Industrial Ecology"] },
                { name: "IAAC Barcelona", count: 1, percent: 8, programmes: ["Ecological Buildings & Biocities"] },
                { name: "EU-CONEXUS", count: 1, percent: 8, programmes: ["Marine Biology"] },
                { name: "Universitat Politecnica de Catalunya", count: 1, percent: 8, programmes: ["Sustainable Energy Systems (with KTH)"] },
                { name: "University of the Basque Country", count: 1, percent: 8, programmes: ["Marine Environment and Resources"] }
            ]
        },
        "Circular Chemical Engineering": {
            total: 21,
            percentOfTrack: 84,  // 21 of 25 chemical grads pursuing Master's
            color: "#14B8A6",
            universities: [
                { name: "KTH Royal Institute of Technology", count: 6, percent: 29, programmes: ["Chemical Engineering for Energy & Environment"] },
                { name: "Imperial College London", count: 2, percent: 10, programmes: ["Advanced Chemical Engineering"] },
                { name: "Eindhoven University of Technology", count: 2, percent: 10, programmes: ["Chemical Engineering", "Process Technology"] },
                { name: "TU Delft", count: 2, percent: 10, programmes: ["Sustainable Energy Technology", "Management of Technology"] },
                { name: "KU Leuven", count: 2, percent: 10, programmes: ["Materials Engineering", "Sustainable Materials Engineering"] },
                { name: "Technical University of Denmark", count: 1, percent: 5, programmes: ["Environmental Engineering"] },
                { name: "NOVA School of Business & Economics", count: 1, percent: 5, programmes: ["Management (Sustainability)"] },
                { name: "University of Southern Denmark", count: 1, percent: 5, programmes: ["Environmental Engineering"] },
                { name: "Universidad Politecnica de Madrid", count: 1, percent: 5, programmes: ["Chemical Engineering"] },
                { name: "University of Seoul", count: 1, percent: 5, programmes: ["Environmental Engineering"] },
                { name: "Utrecht University", count: 1, percent: 5, programmes: ["Sustainable and Circular Chemistry"] },
                { name: "EPFL", count: 1, percent: 5, programmes: ["Chemical Engineering and Biotechnology"] }
            ]
        },
        "Engineering Physics for Sustainable Manufacturing": {
            total: 12,
            percentOfTrack: 67,  // 12 of 18 physics grads pursuing Master's
            color: "#0EA5E9",
            universities: [
                { name: "TU Delft", count: 3, percent: 25, programmes: ["Mechanical Engineering", "Environmental Engineering"] },
                { name: "Eindhoven University of Technology", count: 3, percent: 25, programmes: ["Electrical Engineering (pre-master)", "Mechanical Engineering"] },
                { name: "Technical University of Munich", count: 1, percent: 8, programmes: ["Automotive Engineering"] },
                { name: "NOVA School of Business & Economics", count: 1, percent: 8, programmes: ["Business Analytics"] },
                { name: "RWTH Aachen University", count: 1, percent: 8, programmes: ["Automation Engineering"] },
                { name: "Leiden University", count: 1, percent: 8, programmes: ["Industrial Ecology"] },
                { name: "University of Groningen", count: 1, percent: 8, programmes: ["Mechanical Engineering"] },
                { name: "University of Liege", count: 1, percent: 8, programmes: ["Engineering Physics"] }
            ]
        },
        "Sustainable Mechanical Engineering": {
            total: 13,
            percentOfTrack: 87,  // 13 of 15 mechanical grads (first class, 2026) pursuing Master's
            color: "#8B5CF6",
            universities: [
                { name: "TU Delft", count: 6, percent: 46, programmes: ["Mechanical Engineering", "Materials Science and Engineering"] },
                { name: "Politecnico di Milano", count: 2, percent: 15, programmes: ["Energy Engineering", "Building Engineering for Sustainability"] },
                { name: "KTH Royal Institute of Technology", count: 2, percent: 15, programmes: ["Production Engineering and Management", "Machine Design"] },
                { name: "Technical University of Denmark", count: 2, percent: 15, programmes: ["Materials and Manufacturing Engineering", "Engineering Design and Innovation"] },
                { name: "NOVA University Lisbon", count: 1, percent: 8, programmes: ["Mechanical Engineering"] }
            ]
        }
    },
    
    // Programme categories for display
    programmeCategories: {
        "Chemical Engineering": { icon: "atom", color: "#14B8A6" },
        "Biotechnology": { icon: "flask-conical", color: "#10B981" },
        "Environmental": { icon: "leaf", color: "#22C55E" },
        "Mechanical & Physics": { icon: "cpu", color: "#0EA5E9" },
        "Business": { icon: "briefcase", color: "#8B5CF6" },
        "Other": { icon: "graduation-cap", color: "#6B7280" }
    },


    // =========================================
    // SECTION 10: ORIGIN COUNTRIES
    // =========================================
    // Where alumni lived BEFORE starting CE (for Euregio stats)
    
    originCountries: [
        { name: "Belgium", code: "be", count: 23 },
        { name: "Netherlands", code: "nl", count: 12 },
        { name: "Germany", code: "de", count: 8 },
        { name: "South Africa", code: "za", count: 6 },
        { name: "USA", code: "us", count: 4 },
        { name: "Italy", code: "it", count: 2 },
        { name: "Moldova", code: "md", count: 2 },
        { name: "Canada", code: "ca", count: 2 },
        { name: "Lebanon", code: "lb", count: 2 },
        { name: "Luxembourg", code: "lu", count: 2 },
        { name: "Portugal", code: "pt", count: 2 },
        { name: "Spain", code: "es", count: 2 },
        { name: "Ecuador", code: "ec", count: 1 },
        { name: "Chile", code: "cl", count: 1 },
        { name: "India", code: "in", count: 1 },
        { name: "Switzerland", code: "ch", count: 1 },
        { name: "United Arab Emirates", code: "ae", count: 1 },
        { name: "Austria", code: "at", count: 1 },
        { name: "United Kingdom", code: "gb", count: 1 },
        { name: "Lithuania", code: "lt", count: 1 },
        { name: "Peru", code: "pe", count: 1 },
        { name: "Poland", code: "pl", count: 1 },
        { name: "China", code: "cn", count: 1 },
        { name: "Australia", code: "au", count: 1 },
        { name: "Czech Republic", code: "cz", count: 1 }
    ],


    // =========================================
    // SECTION 11: REGIONAL / EUREGIO DATA
    // =========================================
    // Talent flow and regional impact statistics
    // 
    // DEFINITIONS:
    // - Limburg: Dutch province of Limburg (Maastricht, Sittard, etc.)
    // - Euregio Meuse-Rhine: Cross-border region including Dutch Limburg, 
    //   Belgian areas (Liège, Hasselt), and German areas (Aachen)
    // - These numbers count ALL alumni currently living in these regions,
    //   regardless of where they originally came from
    
    regionalData: {
        // Maastricht city specifically
        // Percentages are of all 82 graduates. Class of 2026 added Oct 2026:
        // 1 in Maastricht, 14 of Euregio origin, 0 retained, 13 in the Netherlands.
        stayInMaastricht: 11,
        stayInMaastrichtPercent: 13,

        // Province of Limburg (Netherlands)
        limburgImpact: 12,
        limburgImpactPercent: 15,

        // Euregio Meuse-Rhine region (cross-border)
        euregioOrigin: 33,
        euregioOriginPercent: 40,
        euregioImpact: 14,              // strict Euregio Meuse-Rhine (Leuven and Brussels not counted)
        euregioImpactPercent: 17,

        // Alumni who came FROM Euregio and STAYED in Euregio
        euregioRetention: 7,
        euregioRetentionPercent: 9,

        // Netherlands overall
        stayInNetherlands: 36,
        stayInNetherlandsPercent: 44
    },


    // =========================================
    // SECTION 12: EMPLOYMENT DATA
    // =========================================
    // Alumni working vs. studying
    
    employment: {
        // Class of 2026 added Oct 2026: 28 in a master's, 3 working or interning;
        // 2 gap years and 4 unknown are left out of both.
        studying: 58,
        working: 18,
        workingPercent: 22         // of all 82, as before
    },

    // Notable employers (for considering-ce page)
    notableEmployment: [
        { company: "Lithium Ark", role: "Junior Engineer", sector: "Energy/Sustainability" },
        { company: "BASF", role: "Intern", sector: "Chemical Industry" },
        { company: "Verdalia Bioenergy", role: "Process Engineer", sector: "Renewable Energy" },
        { company: "Innosolids BS", role: "Research Fellow", sector: "Research" },
        { company: "dnata", role: "Sustainability Adviser", sector: "Aviation" },
        { company: "Maastricht University", role: "Research Intern", sector: "Academia" },
        { company: "EuroVertice", role: "Energy Consultant", sector: "Energy/Sustainability" },
        { company: "Aetheria", role: "Mechanical Engineer", sector: "Engineering" }
    ],


// ================================================================
//                                                                
//     REFERENCE DATA (Rarely needs updating)                     
//                                                                
// ================================================================


    // =========================================
    // PROGRAMME INFORMATION
    // =========================================
    // General info about the CE programme
    
    programmeInfo: {
        name: "Circular Engineering",
        faculty: "Faculty of Science and Engineering",
        university: "Maastricht University",
        degree: "Bachelor of Science",
        duration: "3 years",
        startYear: 2021,
        website: "https://www.maastrichtuniversity.nl/education/bachelor/circular-engineering",
        email: "fse-admissions@maastrichtuniversity.nl",
        alumniEmail: "fse-alumni@maastrichtuniversity.nl",
        
        highlights: [
            "Problem-Based Learning (PBL) in small groups of ~15 students",
            "Research-Based Learning (RBL) with real engineering challenges",
            "Collaboration with Brightlands innovation campuses",
            "State-of-the-art engineering laboratories",
            "Three specialisation concentrations in Year 3",
            "Design projects with industry partners"
        ],
        
        brightlandsCampuses: [
            {
                name: "Brightlands Chemelot Campus",
                location: "Geleen",
                focus: "Chemistry, materials, and circular economy"
            },
            {
                name: "Brightlands Maastricht Health Campus",
                location: "Maastricht",
                focus: "Health, life sciences, and biotechnology"
            },
            {
                name: "Brightlands Smart Services Campus",
                location: "Heerlen",
                focus: "Digital services and smart technology"
            }
        ],
        
        circularPrinciples: ["Reduce", "Reuse", "Remake", "Repair", "Recycle"]
    },


    // =========================================
    // REAL-LIFE CHALLENGES
    // =========================================
    // Example projects for prospective students page
    
    realLifeChallenges: [
        {
            title: "Disposable Medical Sensors",
            description: "Analyse pressure sensors used in Intensive Care units from a circularity perspective. Determine which parts can be reused, remade, or recycled - and design a technical solution to increase their circularity.",
            icon: "heart-pulse",
            tag: "Healthcare x Sustainability"
        },
        {
            title: "Plastic Food Packaging",
            description: "Analyse the entire packaging chain of a food product, identify all stakeholders, and determine sustainable alternatives. Help solve the plastic soup problem through engineering.",
            icon: "package",
            tag: "Circular Chemical Engineering"
        },
        {
            title: "Replacing Fossil Feedstock",
            description: "Select which biomass and technologies can replace fossil resources in chemical production. Optimise process design to minimise energy consumption across an entire production cluster.",
            icon: "factory",
            tag: "Chemical Industry"
        },
        {
            title: "Smart Food Production",
            description: "Design greenhouse systems using sensors and AI to optimise growing conditions. Apply engineering physics to solve challenges in sustainable agriculture.",
            icon: "sprout",
            tag: "Sustainable Biotechnology"
        }
    ],


    // =========================================
    // CAREER SECTORS
    // =========================================
    // Potential career paths for CE graduates
    
    careerSectors: [
        { 
            name: "Sustainable Technology Development", 
            icon: "leaf",
            description: "SMEs focused on innovative sustainable product and process development"
        },
        { 
            name: "Biotechnology", 
            icon: "flask-conical",
            description: "Plant breeding, biological/chemical suppliers, biotech applications"
        },
        { 
            name: "Chemical Industry", 
            icon: "atom",
            description: "Chemical processes, process equipment design, circular transitions"
        },
        { 
            name: "Sustainability Consulting", 
            icon: "briefcase",
            description: "Consultancy firms focused on circularity and sustainability"
        },
        { 
            name: "Research & Academia", 
            icon: "graduation-cap",
            description: "PhD programmes and academic research positions"
        },
        { 
            name: "Renewable Energy", 
            icon: "zap",
            description: "Solar, biomethane, and sustainable energy systems"
        }
    ],


    // =========================================
    // MASTER'S PATHWAYS BY CONCENTRATION
    // =========================================
    // Suggested Master's programmes for each track
    
    mastersPathways: {
        "Sustainable Biotechnology": [
            "Biotechnology",
            "Biobased Materials",
            "Biochemistry and Molecular Biology",
            "Resilient Farming and Food Systems"
        ],
        "Circular Chemical Engineering": [
            "Chemical Engineering",
            "Environmental Engineering",
            "Industrial Ecology",
            "Sustainable Energy Technology"
        ],
        "Engineering Physics for Sustainable Manufacturing": [
            "Mechanical Engineering",
            "Automation Engineering",
            "Applied Physics",
            "Business Analytics"
        ],
        "Sustainable Mechanical Engineering": [
            "Mechanical Engineering",
            "Materials and Manufacturing Engineering",
            "Production Engineering and Management",
            "Energy Engineering"
        ]
    },


    // =========================================
    // STUDENT STORIES
    // =========================================
    // Featured alumni stories displayed on the map
    // 
    // HOW TO ADD A NEW STORY:
    // 1. Get photo from alumnus (square format, 400x400px recommended)
    // 2. Save as: assets/stories/firstname-lastname.jpg
    // 3. Add entry below with their information
    // 4. Coordinates should match their current city
    
    studentStories: [
        {
            id: "story-sarvesh",
            name: "Sarvesh Kumar",
            photo: "assets/images/Kumar.jpg",
            concentration: "Sustainable Biotechnology",
            concentrationColor: "#10B981",
            graduated: 2025,
            location: {
                city: "Wageningen",
                country: "Netherlands",
                coords: [51.9692, 5.6654]
            },
            currentStatus: "MSc Biotechnology",
            university: "Wageningen University & Research",

            // Story details
            favoriteCoursesAtCE: null,
            whyCircularEngineering: "The integration of science, technology and sustainability was a big reason I chose Circular Engineering. The world is shifting towards sustainability, and I wanted to combine science with circular economy principles to stay ahead of the curve. I also loved that you explore everything in year 1 before specialising. I couldn't decide between chemistry and biotechnology, so I ended up focusing on biotech.",
            thesisTitle: null,

            // Short quote for preview
            quote: "More than enough. I'm actually revisiting topics we already studied in detail during Circular Engineering.",

            // External link to the complete testimonial on the FSE alumni website.
            testimonialUrl: "https://www.maastrichtuniversity.nl/nl/fse-alumni"
        },
        {
            id: "story-clara",
            name: "Clara Benthien",
            photo: "assets/images/Clara 2.jpeg",
            concentration: "Circular Chemical Engineering",
            concentrationColor: "#14B8A6",
            graduated: 2025,
            location: {
                city: "Stockholm",
                country: "Sweden",
                coords: [59.3293, 18.0686]
            },
            currentStatus: "MSc Chemical Engineering for Energy & Environment",
            university: "KTH Royal Institute of Technology",

            // Full testimonial not yet added — link out to the published story for now.
            favoriteCoursesAtCE: null,
            whyCircularEngineering: "I wanted to study engineering but wasn't sure which path to take. Circular Engineering is perfect. In the first year the programme provides you with a strong foundation in mathematics, physics, chemical engineering and biotechnology. Only after your first year you choose a specialisation.",
            thesisTitle: null,

            quote: "I think of circularity in everything I do — CE taught me life cycle thinking and how to approach everything from a sustainability angle.",

            // External link to the complete testimonial on the FSE alumni website.
            testimonialUrl: "https://www.maastrichtuniversity.nl/nl/fse-alumni"
        },
        {
            id: "story-thijs",
            name: "Thijs Vogely",
            photo: "assets/images/Vogely.jpg",
            concentration: "Engineering Physics for Sustainable Manufacturing",
            concentrationColor: "#0EA5E9",
            graduated: 2024,
            location: {
                city: "Delft",
                country: "Netherlands",
                coords: [52.0116, 4.3571]
            },
            currentStatus: "MSc Mechanical Engineering",
            university: "Delft University of Technology",

            favoriteCoursesAtCE: null,
            whyCircularEngineering: "I was looking for a programme centred on sustainability. Someone told me about the new Circular Engineering programme, an engineering degree taught through the lens of sustainability. It covers a broad range of subjects across both sustainability and technical skills, and that broad foundation naturally leads you to a master's that suits you. For me, that was Mechanical Engineering, specialising in fluid dynamics and heat transfer.",
            thesisTitle: null,

            quote: "Am I a Circular Engineer? Well, yes, I focus much more on sustainability than peers who did different bachelor's programmes.",

            // External link to the complete testimonial on the FSE alumni website.
            testimonialUrl: "https://www.maastrichtuniversity.nl/nl/fse-alumni"
        }
    ]
};


// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get percentage of total alumni
 */
function getPercentage(count) {
    return Math.round((count / CE_DATA.summary.totalAlumni) * 100);
}

/**
 * Get top N items from an array
 */
function getTopN(array, n) {
    return array.slice(0, n);
}

/**
 * Format number with locale
 */
function formatNumber(num) {
    return num.toLocaleString();
}

/**
 * Calculate SVG stroke-dashoffset for donut charts
 * circumference = 2 * PI * radius (for r=40, circumference is about 251.2)
 */
function getDonutOffset(percent, circumference = 251.2) {
    return circumference - (percent / 100) * circumference;
}
