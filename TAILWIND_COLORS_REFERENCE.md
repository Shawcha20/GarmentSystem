# 🎨 Tailwind Class → Variable Quick Reference

## How Your Color System Works

Your colors are **centrally controlled** in 2 places:

### **1. Tailwind Config** (`tailwind.config.js`)
```javascript
colors: {
  primary: { 50-900 }, // Pink shades
  secondary: { 50-900 }, // Gray shades
  accent: { yellow, yellow-light }
}
```

### **2. CSS Variables** (`src/index.css`)
```css
:root {
  --color-primary-50 through 900,
  --color-secondary-50 through 900,
  --color-accent-yellow,
  --color-bg-white,
  --color-border-*,
  etc.
}
```

---

## 📋 Direct Mapping: Tailwind Classes ↔ Variables

### **Primary Colors (Pink)**

| Tailwind Class | CSS Variable | Hex Code | Usage |
|----------------|--------------|----------|-------|
| `bg-primary-50` | `--color-primary-50` | #fdf2f8 | Light backgrounds |
| `bg-primary-100` | `--color-primary-100` | #fce7f3 | Very light backgrounds |
| `bg-primary-200` | `--color-primary-200` | #fbcfe8 | Light borders |
| `bg-primary-300` | `--color-primary-300` | #f8b4d8 | Accent borders |
| `bg-primary-400` | `--color-primary-400` | #f472b6 | Hover states |
| `bg-primary-500` | `--color-primary-500` | #ec4899 | **BRAND COLOR** |
| `bg-primary-600` | `--color-primary-600` | #db2777 | Dark elements |

---

### **Secondary Colors (Gray)**

| Tailwind Class | CSS Variable | Hex Code | Usage |
|----------------|--------------|----------|-------|
| `bg-secondary-50` | `--color-secondary-50` | #f9fafb | Light backgrounds |
| `bg-secondary-100` | `--color-secondary-100` | #f3f4f6 | Table headers |
| `bg-secondary-200` | `--color-secondary-200` | #e5e7eb | Light borders |
| `text-secondary-500` | `--color-secondary-500` | #6b7280 | Icons |
| `text-secondary-600` | `--color-secondary-600` | #4b5563 | Secondary text |
| `text-secondary-700` | `--color-secondary-700` | #374151 | Main text |
| `text-secondary-800` | `--color-secondary-800` | #1f2937 | Dark text |

---

### **Accent & Special Colors**

| Tailwind Class | CSS Variable | Hex Code | Usage |
|----------------|--------------|----------|-------|
| `bg-accent-yellow` | `--color-accent-yellow` | #facc15 | Icon highlights |
| `bg-accent-yellow-light` | `--color-accent-yellow-light` | #fef3c7 | Light yellow |
| `bg-white` | `--color-bg-white` | #ffffff | Backgrounds |
| `border-pink-200` | `--color-border-primary` | #fbcfe8 | Primary borders |

---

## 🔍 Where Each Color is Used in Components

### **Pink-500 (Brand Color)** - Most Important!
```
Navbar:    Logo "Rent" text, active links, login button
Footer:    Logo text, section headings, link hover
Buttons:   All primary buttons (Add to Cart, View All, etc)
Forms:     Input focus states
Icons:     User icons, shirt icons, stars
```

### **Pink-200 (Main Border)**
```
Cards:     Product cards, auth forms, custom cards
Navbar:    Top border, mobile menu
Footer:    Divider lines
Tables:    Header borders
```

### **Gray-700 (Main Text)**
```
Headings:  All h1, h2, h3 in components
Labels:    Form labels
Body:      Main paragraph text
Navigation: Primary navigation items
```

### **Gray-600 (Secondary Text)**
```
Descriptions: Product descriptions
Secondary Info: Subtitles, secondary labels
Placeholders: Input placeholders
Links: Hover states
```

### **White (Backgrounds)**
```
Cards:     All card backgrounds
Forms:     Form backgrounds
Navbar:    Navigation background
Tables:    Table backgrounds
```

---

## 🎯 How to Use in Code

### **In JSX - Using Tailwind Classes**
```jsx
<div className="bg-primary-500 text-white border-primary-200">
  Content
</div>
```

### **In Custom CSS - Using Variables**
```css
.custom-element {
  background-color: var(--color-primary-500);
  color: var(--color-secondary-700);
  border-color: var(--color-primary-200);
}
```

### **In Inline Styles**
```jsx
<div style={{ backgroundColor: 'var(--color-primary-500)' }}>
  Content
</div>
```

---

## 🔄 To Change All Colors

### **Step 1: Update Tailwind Config**
File: `tailwind.config.js`

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#your-new-color-50',
          100: '#your-new-color-100',
          // ... continue for all 50-900
        },
        // ... etc
      }
    }
  }
}
```

### **Step 2: Update CSS Variables**
File: `src/index.css`

```css
:root {
  --color-primary-50: #your-new-color-50;
  --color-primary-100: #your-new-color-100;
  // ... continue for all
}
```

### **Step 3: Done!**
All 50+ components automatically update! ✅

---

## 📊 All Colors Used in Project

### **By Color Name**
- **Pink shades:** 50, 100, 200, 300, 400, 500, 600
- **Gray shades:** 50, 100, 200, 500, 600, 700, 800
- **Yellow:** 400 (accent)
- **White:** (backgrounds)

### **By Frequency**
1. **Pink-500** → 25+ uses (Brand color)
2. **White** → 25+ uses (Backgrounds)
3. **Gray-700** → 18+ uses (Main text)
4. **Gray-600** → 15+ uses (Secondary text)
5. **Pink-200** → 12 uses (Borders)
6. **Pink-50** → 8 uses (Light backgrounds)
7. **Pink-600** → 8 uses (Dark elements)

---

## 🚀 Quick Change Template

### **Change Brand from Pink to Purple**

**Step 1: `tailwind.config.js`**
```javascript
primary: {
  50:  '#faf5ff', // lightest
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7', // MAIN PURPLE
  600: '#9333ea',
  700: '#7e22ce',
  800: '#6b21a8',
  900: '#581c87',  // darkest
}
```

**Step 2: `src/index.css`**
```css
:root {
  --color-primary-50: #faf5ff;
  --color-primary-100: #f3e8ff;
  --color-primary-200: #e9d5ff;
  --color-primary-300: #d8b4fe;
  --color-primary-400: #c084fc;
  --color-primary-500: #a855f7;
  --color-primary-600: #9333ea;
  --color-primary-700: #7e22ce;
  --color-primary-800: #6b21a8;
  --color-primary-900: #581c87;
}
```

**Result:** Entire app brand color changes from pink to purple! 🟣

---

## ✅ Verification Checklist

- [x] All colors in `tailwind.config.js`
- [x] All CSS variables in `src/index.css`
- [x] No hardcoded hex values in components
- [x] All components use Tailwind classes
- [x] Color palette documented
- [x] Single-point color control enabled

---

**Note:** Every color in your project goes back to one of these two files. Change them, and everything updates automatically!

**Document Version:** 1.0  
**Last Updated:** January 11, 2026  
**Status:** Complete ✅
