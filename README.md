# OHCTECH Feedback Form UI

<p align="center">
  <img src="public/ohctech-logo.png" alt="OHCTECH – Corporate Wellness Simplified" height="48" />
</p>

<p align="center">
  <strong>Multi-step feedback form · React + Vite + Tailwind CSS</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Frontend_Complete-0E9E8E" />
</p>

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 19.x | UI framework |
| Vite | 8.x | Build tool & dev server |
| Tailwind CSS | 3.x | Utility-first styling |
| react-phone-input-2 | 2.x | International phone input |
| react-icons | 5.x | Icon library |

---

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Production Build

```bash
npm run build
```

---

## Project Structure

```
src/
├── components/
│   ├── ClientInformation.jsx   Step 1 — company & contact fields
│   ├── Ratings.jsx             Step 2 — star rating cards
│   ├── Experience.jsx          Step 3 — experience textarea
│   ├── Suggestions.jsx         Step 4 — suggestions textarea
│   ├── ThankYou.jsx            Final confirmation screen
│   ├── Sidebar.jsx             Left branding panel (exports OHCTechLogo)
│   ├── Header.jsx              Page heading & security badge
│   ├── ProgressBar.jsx         Step progress indicator
│   ├── StepIndicator.jsx       Step tracker with icons
│   ├── Footer.jsx              Company contact footer
│   ├── InputField.jsx          Reusable accessible input
│   ├── PhoneInputField.jsx     International phone input (react-phone-input-2)
│   └── PrimaryButton.jsx       Primary / outline button
├── pages/
│   └── FeedbackForm.jsx        Main orchestrator — all state managed here
├── utils/
│   └── phoneValidation.js      Phone number validation utility
├── App.jsx
├── main.jsx
└── index.css
public/
├── ohctech-logo.png            Official OHCTECH logo
├── favicon.svg
└── icons.svg
```

---

## Form Data Shape

All form data is managed in a single state object in `FeedbackForm.jsx`:

```js
{
  companyName:  '',           // string — required
  contactName:  '',           // string — required
  designation:  '',           // string — required
  email:        '',           // string — required, validated
  phone:        '',           // string — optional, validated if entered
  phoneMeta:    {             // object — country info for backend
    dialCode: '91',
    countryData: { ... }
  },
  ratings: {
    overall: 0,               // number 1–5
    support: 0,
    product: 0,
    value:   0,
  },
  experience:   '',           // string — required on Step 3
  suggestion:   '',           // string — optional
}
```

---

## Backend Integration

Find `handleSubmit()` in [`src/pages/FeedbackForm.jsx`](./src/pages/FeedbackForm.jsx).

Replace the simulation with your API call:

```js
const handleSubmit = useCallback(async () => {
  setErrors({})
  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        phone: formData.phoneMeta?.dialCode
          ? `+${formData.phoneMeta.dialCode}${formData.phone.slice(formData.phoneMeta.dialCode.length)}`
          : formData.phone,
      }),
    })
    if (res.ok) {
      setIsComplete(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } catch (err) {
    // handle error
  }
}, [formData])
```

---

## Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `< 640px` Mobile | Single column, sidebar hidden |
| `640px – 1024px` Tablet | Two-column grid, sidebar hidden |
| `> 1024px` Desktop | Full layout with sidebar |

---

## Notes

- ✅ **Frontend UI only** — no backend, APIs, or databases
- ✅ **Backend-ready** — `handleSubmit` in `FeedbackForm.jsx` is the single integration point
- ✅ **Fully responsive** — mobile (320px+), tablet, desktop, large monitors
- ✅ **Built to Figma** — pixel-accurate layout, spacing, colors, and typography
- ✅ **Accessible** — ARIA labels, focus rings, keyboard navigation
- ✅ **No page reloads** — pure React state routing
- ✅ **Data preserved** — Back / Next navigation preserves all entered data
- ✅ **International phone** — 250+ countries, searchable, per-country validation
- ✅ **Typography** — Plus Jakarta Sans (matches OHCTECH brand)

---

## Live Preview

🌐 **[https://ohctech-feedback.vercel.app](https://ohctech-feedback.vercel.app)**

---

<p align="center">Built for <strong>OHCTECH – Corporate Wellness Simplified</strong></p>
