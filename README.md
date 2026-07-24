# OHCTECH Feedback Form UI

<p align="center">
  <img src="public/ohctech-logo.png" alt="OHCTECH – Corporate Wellness Simplified" height="52" />
</p>

<p align="center">
  <strong>Multi-step client feedback form — React + Vite + Tailwind CSS</strong><br/>
  Built to Figma · Fully Responsive · Backend Integration Ready
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white&style=flat-square" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white&style=flat-square" />
  <img src="https://img.shields.io/badge/Status-Frontend_Complete-0E9E8E?style=flat-square" />
</p>

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first styling |
| react-icons | 5 | Icon library |
| Plus Jakarta Sans | — | Brand typography (Google Fonts) |

---

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Open → [http://localhost:5173](http://localhost:5173)

## Production Build

```bash
npm run build
```

---

## Form Flow

```
Step 1 → Client Information
Step 2 → Ratings
Step 3 → Experience
Step 4 → Suggestions
Step 5 → Thank You
```

Each step is a separate React component under `src/components/`.  
All step state is centralized in `src/pages/FeedbackForm.jsx`.

---

## Project Structure

```
OHCTECH-Feedback-UI/
│
├── public/
│   ├── ohctech-logo.png        Official OHCTECH logo (used in header, sidebar, footer)
│   ├── favicon.svg             Browser tab icon
│   └── icons.svg               SVG sprite (if used)
│
├── src/
│   │
│   ├── components/             Reusable UI components
│   │   ├── ClientInformation.jsx   Step 1 — Company name, contact, designation, email, phone
│   │   ├── Ratings.jsx             Step 2 — Star rating cards (Overall, Support, Product, Value)
│   │   ├── Experience.jsx          Step 3 — Free-text experience field
│   │   ├── Suggestions.jsx         Step 4 — Free-text suggestions field
│   │   ├── ThankYou.jsx            Step 5 — Confirmation screen shown on submit
│   │   │
│   │   ├── Sidebar.jsx             Left branding panel (desktop only, hidden on mobile)
│   │   ├── Header.jsx              Page header with title + security badge
│   │   ├── Footer.jsx              Company contact details footer
│   │   ├── ProgressBar.jsx         Animated step progress bar
│   │   ├── StepIndicator.jsx       Step number tracker with icons
│   │   │
│   │   ├── InputField.jsx          Reusable accessible labeled input (text, email, etc.)
│   │   ├── PhoneInputField.jsx     International phone input with country selector + Portal dropdown
│   │   └── PrimaryButton.jsx       Primary (filled) and outline button variants
│   │
│   ├── pages/
│   │   └── FeedbackForm.jsx        ⭐ Main orchestrator — all form state lives here
│   │                               → Replace handleSubmit() here for backend integration
│   │
│   ├── utils/
│   │   └── phoneValidation.js      Phone number digit-length validator
│   │
│   ├── App.jsx                 Root component
│   ├── main.jsx                React entry point
│   └── index.css               Global styles + Tailwind + phone input styles
│
├── index.html                  HTML shell (loads Plus Jakarta Sans font)
├── package.json
├── package-lock.json
├── vite.config.js              Vite configuration
├── tailwind.config.js          Tailwind content paths
├── postcss.config.js           PostCSS plugins (autoprefixer)
├── .gitignore
└── README.md
```

---

## Backend Integration

### Single Integration Point

Find `handleSubmit()` in [`src/pages/FeedbackForm.jsx`](./src/pages/FeedbackForm.jsx).

Replace the simulation block with your API call:

```js
// src/pages/FeedbackForm.jsx — handleSubmit function
const handleSubmit = useCallback(async () => {
  setErrors({})

  // Replace everything below with your API call:
  try {
    const payload = {
      companyName:  formData.companyName,
      contactName:  formData.contactName,
      designation:  formData.designation,
      email:        formData.email,

      // Phone — full international number with dial code:
      phone: formData.phone
        ? `+${formData.phoneMeta?.dialCode ?? '91'}${formData.phone}`
        : null,
      phoneCountry: formData.phoneMeta?.country?.code ?? 'IN',

      // Ratings (1–5, 0 = not rated):
      ratings: {
        overall: formData.ratings.overall,
        support: formData.ratings.support,
        product: formData.ratings.product,
        value:   formData.ratings.value,
      },

      experience:  formData.experience,
      suggestion:  formData.suggestion,
    }

    const res = await fetch('/api/feedback', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    })

    if (!res.ok) throw new Error('Server error')

    // Show Thank You screen:
    setIsComplete(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })

  } catch (err) {
    // Handle error — e.g. show a toast notification:
    console.error('Submit failed:', err)
  }
}, [formData])
```

### Form Data Shape

```js
// Complete formData object (from FeedbackForm.jsx state):
{
  // Step 1 — Client Information
  companyName:  'Acme Corp',           // string, required
  contactName:  'John Smith',          // string, required
  designation:  'HR Manager',          // string, required
  email:        'john@acme.com',       // string, required, validated
  phone:        '9876543210',          // string, optional (raw digits, no dial code)
  phoneMeta: {
    dialCode: '91',                    // string — for building +91XXXXXXXXXX
    country:  { code: 'IN', name: 'India', dial: '91', flag: '🇮🇳', min: 10, max: 10 }
  },

  // Step 2 — Ratings (1–5 scale; 0 = not yet rated)
  ratings: {
    overall: 4,
    support: 5,
    product: 4,
    value:   3,
  },

  // Step 3 — Experience
  experience: 'Great product and support team.',    // string, required

  // Step 4 — Suggestions
  suggestion: 'Would love a mobile app version.',   // string, optional
}
```

---

## Responsive Breakpoints

| Screen | Behavior |
|---|---|
| `< 640px` Mobile | Single column, sidebar hidden, compact spacing |
| `640px–1024px` Tablet | Two-column grid, sidebar hidden |
| `> 1024px` Desktop | Full layout with branded sidebar |

---

## Validation Rules

| Field | Rule |
|---|---|
| Company Name | Required, non-empty |
| Contact Name | Required, non-empty |
| Designation | Required, non-empty |
| Email | Required, valid email format |
| Phone | Optional — if entered, digit count must match country rules |
| Ratings | All 4 ratings required before Step 2 → Step 3 |
| Experience | Required minimum 1 character |
| Suggestion | Optional |

Validation logic: `src/pages/FeedbackForm.jsx` → `validateStep()`  
Phone validation: `src/utils/phoneValidation.js` → `validatePhone(digits, countryObj)`

---

## Component Reference

| Component | File | Description |
|---|---|---|
| `FeedbackForm` | `src/pages/FeedbackForm.jsx` | Main state manager, step router, validation |
| `ClientInformation` | `src/components/ClientInformation.jsx` | Step 1 form fields |
| `Ratings` | `src/components/Ratings.jsx` | Star rating UI for 4 categories |
| `Experience` | `src/components/Experience.jsx` | Freetext experience input |
| `Suggestions` | `src/components/Suggestions.jsx` | Freetext suggestion input |
| `ThankYou` | `src/components/ThankYou.jsx` | Submission confirmation screen |
| `PhoneInputField` | `src/components/PhoneInputField.jsx` | 51-country phone input, Portal dropdown |
| `InputField` | `src/components/InputField.jsx` | Accessible labeled input with icon + error |
| `ProgressBar` | `src/components/ProgressBar.jsx` | Animated step progress |
| `StepIndicator` | `src/components/StepIndicator.jsx` | Step bubble indicator |
| `Sidebar` | `src/components/Sidebar.jsx` | Desktop branding panel |
| `Header` | `src/components/Header.jsx` | Form header |
| `Footer` | `src/components/Footer.jsx` | Company contact footer |
| `PrimaryButton` | `src/components/PrimaryButton.jsx` | Reusable CTA button |

---

## Notes

- ✅ **Frontend UI only** — no backend, database, or API
- ✅ **Single integration point** — only `handleSubmit()` in `FeedbackForm.jsx` needs to change
- ✅ **Fully responsive** — tested at 320px (mobile) through 1920px (desktop)
- ✅ **Built to approved Figma** — exact colors, spacing, typography, and layout
- ✅ **No page reloads** — pure React SPA, all routing via state
- ✅ **Data preserved** — Back/Next navigation retains all entered data
- ✅ **Accessible** — ARIA labels, focus rings, keyboard navigation, screen-reader hints
- ✅ **International phone** — 51 countries, searchable by name/code/dial, per-country validation
- ✅ **Typography** — Plus Jakarta Sans (matches OHCTECH brand letterforms)
- ✅ **Zero console errors** — production-clean codebase

---

<p align="center">
  Built for <strong>OHCTECH – Corporate Wellness Simplified</strong>
</p>
