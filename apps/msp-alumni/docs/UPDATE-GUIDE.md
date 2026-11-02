# MSP Alumni Website - Update Guide

**For:** Student Assistants & Alumni Officer  
**Time Required:** ~10 minutes  
**Update Frequency:** Twice yearly (January & July)

---

## 🎯 What You'll Update

The entire website reads from **ONE file**: `data.js`

When you update this file, all pages automatically show the new numbers.

---

## 📋 Step-by-Step Update Process

### Step 1: Get the New Numbers

You'll need these statistics from the latest alumni survey/records:

| Statistic | Where to Find It |
|-----------|-----------------|
| Total Alumni | Count of rows in alumni spreadsheet |
| Countries Living In | Unique values in "Current Location (Country)" |
| Universities | Unique values in "Masters University" |
| Nationalities | Unique values in "Nationality" |
| Graduates per Year | Count grouped by "Grad Year" |

### Step 2: Open data.js

Location: `/msp-alumni/data.js`

Use any text editor (VS Code, Notepad++, even regular Notepad).

### Step 3: Update the Key Numbers (Lines 16-23)

Find this section near the top:

```javascript
summary: {
    totalAlumni: 1329,           // ← UPDATE THIS
    countriesLivingIn: 59,       // ← UPDATE THIS
    universitiesAttended: 235,   // ← UPDATE THIS
    nationalities: 87            // ← UPDATE THIS
},
```

Change the numbers to match your new data.

### Step 4: Update the Last Updated Date (Line 14)

```javascript
lastUpdated: "December 2025",    // ← UPDATE THIS (e.g., "July 2026")
```

### Step 5: Update Graduation Numbers (Lines 29-42)

Find the `graduationByYear` section:

```javascript
graduationByYear: [
    { year: 2014, count: 25 },
    { year: 2015, count: 44 },
    // ... more years ...
    { year: 2025, count: 247 }    // ← UPDATE or ADD new year
],
```

To add a new graduation year:
```javascript
    { year: 2025, count: 247 },
    { year: 2026, count: 285 }    // ← ADD new line like this
```

### Step 6: Save the File

Press `Ctrl+S` (or `Cmd+S` on Mac).

### Step 7: Test Locally (Optional)

Open `index.html` in your browser to verify the changes appear correctly.

### Step 8: Upload to GitHub

If using GitHub Pages:
1. Go to your repository
2. Upload the updated `data.js` file
3. Wait 1-2 minutes for GitHub Pages to rebuild

---

## 📊 Optional: Deeper Updates

These are needed less frequently (annually or when significant changes occur):

### Update Top Universities (Line 95+)

If a university moves significantly in rankings:

```javascript
topUniversities: [
    { name: "Maastricht University", country: "Netherlands", code: "nl", count: 121, logo: "maastricht-university.png" },
    // ^ Update the 'count' number
```

### Update Fields of Study (Line 145+)

If the breakdown of Master's programmes changes:

```javascript
fieldsOfStudy: [
    { name: "Life Sciences & Biology", icon: "🧬", count: 262, percent: 31 },
    // ^ Update count and percent
```

### Update Countries Where Alumni Live (Line 75+)

If new countries have 5+ alumni:

```javascript
countriesLiving: [
    { name: "Netherlands", code: "nl", count: 445, coords: [52.1326, 5.2913] },
    // ^ Update count, or add new country
```

---

## ⚠️ Common Mistakes to Avoid

| ❌ Don't Do This | ✅ Do This Instead |
|-----------------|-------------------|
| Delete commas between items | Keep all commas in place |
| Use curly "smart" quotes | Use straight quotes: `"` not `"` |
| Forget to save before uploading | Always save with Ctrl+S |
| Edit the HTML files directly | Only edit `data.js` |

---

## 🆘 If Something Breaks

### Symptom: Page shows no data or errors

**Solution:** You probably have a syntax error. Check:
1. Every `{` has a matching `}`
2. Every `[` has a matching `]`
3. Commas between items (but NOT after the last item)
4. All quotes are straight `"` not curly `"`

### Quick Fix:
Restore the previous version of `data.js` from GitHub history or backup.

---

## 📁 File Structure Reference

```
msp-alumni/
├── data.js              ← THE ONLY FILE YOU EDIT
├── index.html           ← Homepage (reads data.js)
├── considering-msp.html ← Recruitment page (reads data.js)
├── UPDATE-GUIDE.md      ← This file
└── assets/
    ├── msp-logo.png
    └── logos/           ← University logos
```

---

## 📞 Contact

Questions? Contact the Alumni Officer or check the GitHub repository issues.

---

*Last updated: December 2025*
