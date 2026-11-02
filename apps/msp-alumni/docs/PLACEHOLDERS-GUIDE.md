# MSP Alumni Website - Placeholders to Fill In

All placeholders are marked with `XX` in the files. Here's what you need to provide:

---

## 📊 data.js - Main Data File

### ROA Benchmarks (line ~305)
```javascript
roaBenchmarks: {
    programmeSatisfaction: { msp: "XX", um: 79 },  // Replace XX with MSP %
    wouldChooseAgain: { msp: "XX", um: 79 },       // Replace XX with MSP %
}
```

### Regional Retention (line ~312)
```javascript
regionalRetention: {
    within100km: "XX",    // % of alumni within 100km of Maastricht
    inNetherlands: "XX",  // % living in Netherlands
    inLimburg: "XX",      // % in Limburg province
    inEuregio: "XX",      // % in Euregio (NL/BE/DE border)
    brainGain: "XX",      // # of internationals who stayed in NL
}
```

### Employer Categories (line ~320)
```javascript
employerCategories: [
    { category: "Academia & Research", percent: "XX" },
    { category: "Healthcare & Pharma", percent: "XX" },
    { category: "Tech & IT", percent: "XX" },
    { category: "Finance & Consulting", percent: "XX" },
    { category: "Government & NGO", percent: "XX" },
    { category: "Entrepreneurship", count: "XX" },  // Number of founders
]
```

### Top PhD Institutions (line ~330)
```javascript
topPhdInstitutions: [
    { name: "Replace with actual institution", count: "XX" },
    { name: "Replace with actual institution", count: "XX" },
    // ... etc
]
```

---

## 🔍 How to Find This Data

1. **ROA Benchmarks**: Check if you've run an internal satisfaction survey
2. **Regional Retention**: Query your database for:
   - `WHERE current_country = 'Netherlands'`
   - `WHERE current_city IN (cities within 100km of Maastricht)`
3. **Brain Gain**: Count alumni where `nationality != 'Dutch' AND current_country = 'Netherlands'`
4. **Employer Categories**: Categorize `current_employer` field
5. **PhD Institutions**: Query `WHERE status = 'PhD' GROUP BY institution ORDER BY count DESC LIMIT 5`

---

## 📍 Visual Placeholders on Website

On the **Considering MSP** page, you'll see cards with "XX%" that need real data:

| Section | Placeholder | What to provide |
|---------|-------------|-----------------|
| How MSP Compares | Programme Satisfaction | MSP satisfaction % |
| How MSP Compares | Would Choose Again | MSP repeat choice % |
| Regional Impact | Stay in Netherlands | % in NL |
| Regional Impact | Within 100km | % near Maastricht |
| Regional Impact | Brain Gain | # of internationals stayed |
| Career Sectors | Each sector | % per category |

---

## ✅ Already Complete (No Action Needed)

- 91% Master's continuation (vs 77% UM avg) ✓
- 87 nationalities ✓
- 59 countries ✓
- 235+ universities ✓
- 15% PhD rate ✓
- 8/10 World Top 10 ✓

---

## 📝 Quick Search/Replace

To update placeholders:

1. Open `data.js`
2. Search for `"XX"` 
3. Replace with actual values
4. Save and redeploy

For the HTML pages (considering-msp.html), the JavaScript will automatically pull from data.js, so you only need to update data.js for most things.

---

*Created: December 2025*
*For: Martijn Jeurissen, MSP Alumni Officer*
