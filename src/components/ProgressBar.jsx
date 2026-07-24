import React from 'react'

/**
 * ProgressBar
 * Animated horizontal progress bar with ARIA support.
 * Width transitions at 250ms ease via .progress-fill CSS class.
 *
 * @param {number} currentStep - 1 to 4
 * @param {number} totalSteps  - default 4
 */
export default function ProgressBar({ currentStep, totalSteps = 4 }) {
  const pct = Math.round((currentStep / totalSteps) * 100)

  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm font-semibold text-[#0E9E8E] whitespace-nowrap flex-shrink-0">
        Step {currentStep} of {totalSteps}
      </span>

      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Form progress: ${pct}% complete`}
        className="flex-1 h-2 bg-[#E5E7EB] rounded-full overflow-hidden min-w-0"
      >
        <div
          className="progress-fill h-full bg-[#0E9E8E] rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>

      <span className="text-sm font-medium text-[#6B7280] whitespace-nowrap flex-shrink-0">
        {pct}% Complete
      </span>
    </div>
  )
}
