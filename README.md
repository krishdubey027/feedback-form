# OHCTECH Feedback Form UI

A modern, responsive multi-step feedback form UI developed for **OHCTECH** based on the approved Figma design.

> **Live Demo:** https://ohctech-feedback.vercel.app

---

## Overview

This project contains the frontend implementation of the OHCTECH Feedback Form.

The application is built using **React**, **Vite**, and **Tailwind CSS**, with a focus on a clean user experience, responsive design, and maintainable code.

The project currently includes only the **UI (Frontend)**. Backend integration (API, database, authentication, etc.) will be handled separately.

---

## Features

- Multi-step feedback form (5 steps)
- Fully responsive (Mobile, Tablet & Desktop)
- Professional UI matching the approved Figma
- Smooth page transitions & animations
- Progress indicator with step tracker
- International phone number input with 51-country selector
- Client-side validation on every step
- Modern component-based architecture
- Backend-ready structure with single integration point

---

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 3
- JavaScript (ES6+)
- Plus Jakarta Sans (Typography)
- react-icons

---

## Live Demo

https://ohctech-feedback.vercel.app

---

## Installation

Clone the repository:

```bash
git clone https://github.com/krishdubey027/feedback-form.git
```

Go to the project directory:

```bash
cd ohctech-feedback
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Form Flow

```
Step 1 → Client Information   (Company, Contact, Designation, Email, Phone)
Step 2 → Ratings              (Overall, Support, Product, Value — 1 to 5 stars)
Step 3 → Experience           (Free-text feedback)
Step 4 → Suggestions          (Optional improvement suggestions)
Step 5 → Thank You            (Confirmation screen)
```

---

## Project Structure

```
ohctech-feedback/
│
├── public/
│   ├── ohctech-logo.png        Official OHCTECH logo
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── ClientInformation.jsx   Step 1 — contact fields
│   │   ├── Ratings.jsx             Step 2 — star rating cards
│   │   ├── Experience.jsx          Step 3 — experience textarea
│   │   ├── Suggestions.jsx         Step 4 — suggestions textarea
│   │   ├── ThankYou.jsx            Step 5 — confirmation screen
│   │   ├── Sidebar.jsx             Left branding panel (desktop)
│   │   ├── Header.jsx              Page header
│   │   ├── Footer.jsx              Company contact footer
│   │   ├── ProgressBar.jsx         Step progress bar
│   │   ├── StepIndicator.jsx       Step bubble tracker
│   │   ├── InputField.jsx          Reusable labeled input
│   │   ├── PhoneInputField.jsx     International phone input
│   │   └── PrimaryButton.jsx       Reusable CTA button
│   │
│   ├── pages/
│   │   └── FeedbackForm.jsx    ⭐ Main orchestrator — all state & validation here
│   │                           → Replace handleSubmit() here for backend integration
│   │
│   ├── utils/
│   │   └── phoneValidation.js  Phone number digit-length validator
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               Global styles + Tailwind + component styles
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

---

## Backend Integration

The **only file that needs to be changed** for backend integration is:

```
src/pages/FeedbackForm.jsx  →  handleSubmit() function
```

Replace the simulation with your API call:

```js
const handleSubmit = useCallback(async () => {
  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName:  formData.companyName,
        contactName:  formData.contactName,
        designation:  formData.designation,
        email:        formData.email,
        phone:        formData.phone
          ? `+${formData.phoneMeta?.dialCode}${formData.phone}`
          : null,
        ratings:      formData.ratings,
        experience:   formData.experience,
        suggestion:   formData.suggestion,
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

## Notes

- Frontend UI only — no backend, API, or database included.
- Backend integration is not included.
- Designed according to the approved OHCTECH Figma.
- Optimized for modern browsers.
- Easy to extend and integrate with any backend API.

---

## Deployment

The project is deployed on **Vercel**.

Live URL:

https://ohctech-feedback.vercel.app

To redeploy after changes:

```bash
vercel --prod
```

---

## Author

**Krish Dubey**
Frontend Developer

---

## License

This project was developed for **OHCTECH** and is intended for internal use unless otherwise specified.
