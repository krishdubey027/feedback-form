import React from 'react'
import PrimaryButton from './PrimaryButton'

/**
 * ThankYou
 * Final confirmation screen shown after Step 4 submission.
 * Uses .thankyou-enter CSS animation (fade + scale).
 * Text matches Figma exactly — do not edit strings below.
 *
 * @param {Function} onClose - Resets the form to Step 1
 */

const BULLETS = [
  {
    text: 'Thank you for helping us improve our healthcare solutions.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 5.5V11C4 16 7.6 20.6 12 22C16.4 20.6 20 16 20 11V5.5L12 2Z"
          stroke="#0E9E8E" strokeWidth="1.5" fill="#E6F7F5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="#0E9E8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    text: 'Our team truly appreciates your valuable time.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#0E9E8E" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="7" r="4" stroke="#0E9E8E" strokeWidth="1.5" fill="#E6F7F5" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#0E9E8E" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    text: 'Together, we build healthier workplaces!',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          stroke="#0E9E8E" strokeWidth="1.5" fill="#E6F7F5" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" stroke="#0E9E8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const CONFETTI = [
  { style: { top: '-8px',  left: '8px'   }, color: '#FBBF24', size: 8 },
  { style: { top: '4px',   right: '-4px' }, color: '#F87171', size: 6 },
  { style: { bottom: '8px',left: '-8px'  }, color: '#60A5FA', size: 7 },
  { style: { bottom: '-4px',right: '4px' }, color: '#34D399', size: 6 },
  { style: { top: '40%',   left: '-16px' }, color: '#A78BFA', size: 5 },
  { style: { top: '20%',   right: '-14px'}, color: '#FBBF24', size: 5 },
]

export default function ThankYou({ onClose }) {
  return (
    <div className="thankyou-enter flex flex-col items-center text-center py-10 px-6">
      {/* Checkmark illustration */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-[#0E9E8E]/10 scale-150 blur-xl" aria-hidden="true" />
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, #0E9E8E 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div
          className="relative w-28 h-28 rounded-full bg-[#0E9E8E] flex items-center justify-center shadow-xl"
          role="img"
          aria-label="Success checkmark"
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 13l5 5L20 7" stroke="white" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {CONFETTI.map((dot, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute rounded-full"
            style={{ ...dot.style, width: dot.size, height: dot.size, background: dot.color }}
          />
        ))}
      </div>

      <h2 className="text-3xl font-bold text-[#0E9E8E] mb-2">Thank You!</h2>
      <p className="text-base font-semibold text-[#1A2B3C] mb-6">
        Your feedback has been received successfully.
      </p>

      <ul className="flex flex-col gap-3 mb-8 text-left w-full max-w-sm" role="list">
        {BULLETS.map(({ icon, text }) => (
          <li key={text} className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-full bg-[#E6F7F5] flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
              {icon}
            </div>
            <p className="text-sm text-[#1A2B3C] leading-relaxed">{text}</p>
          </li>
        ))}
      </ul>

      <PrimaryButton id="thankyou-close" variant="outline" onClick={onClose}>
        Close
      </PrimaryButton>
    </div>
  )
}
