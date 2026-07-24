import React from 'react'

/**
 * Header
 * Renders the security badge, main headline (with teal highlights), and subtitle.
 * Text matches Figma exactly — do not edit strings below.
 */
export default function Header() {
  return (
    <div className="mb-5">
      {/* Security badge */}
      <div className="flex justify-end mb-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2L4 5.5V11C4 16 7.6 20.6 12 22C16.4 20.6 20 16 20 11V5.5L12 2Z"
              stroke="#0E9E8E" strokeWidth="2" strokeLinejoin="round" fill="#E6F7F5"
            />
            <path d="M9 12L11 14L15 10" stroke="#0E9E8E" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="leading-tight">
            <p className="text-[11px] font-semibold text-[#1A2B3C]">Your feedback is 100% secure</p>
            <p className="text-[10px] text-[#6B7280]">We value your privacy</p>
          </div>
        </div>
      </div>

      {/* Main heading — h1 for semantics */}
      <h1 className="text-2xl sm:text-[28px] font-bold text-[#1A2B3C] leading-tight mb-2">
        Help Us Improve <span className="text-[#0E9E8E]">Your</span>
        <br />
        Occupational Health <span className="text-[#0E9E8E]">Experience</span>
      </h1>

      <p className="text-sm text-[#6B7280] leading-relaxed max-w-lg">
        Your feedback helps us deliver better healthcare technology and support to your organization.
      </p>
    </div>
  )
}
