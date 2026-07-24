import React from 'react'
import {
  HiOutlineUser,
  HiOutlineStar,
  HiOutlineEmojiHappy,
  HiOutlineChatAlt2,
  HiCheck,
} from 'react-icons/hi'

/**
 * StepIndicator
 * Horizontal step tracker. Shows completed ✓, active (teal), future (grey).
 *
 * @param {number} currentStep - 1 to 4
 */
const STEPS = [
  { id: 1, label: 'Client Information', Icon: HiOutlineUser      },
  { id: 2, label: 'Ratings',            Icon: HiOutlineStar      },
  { id: 3, label: 'Experience',         Icon: HiOutlineEmojiHappy },
  { id: 4, label: 'Suggestions',        Icon: HiOutlineChatAlt2  },
]

export default function StepIndicator({ currentStep }) {
  return (
    <nav aria-label="Form steps" className="flex items-start justify-between w-full">
      {STEPS.map((step, index) => {
        const done   = currentStep > step.id
        const active = currentStep === step.id

        return (
          <React.Fragment key={step.id}>
            {/* Step node */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div
                aria-current={active ? 'step' : undefined}
                className={[
                  'w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200',
                  done || active
                    ? 'bg-[#0E9E8E] text-white'
                    : 'bg-[#F3F4F6] text-[#9CA3AF] border border-[#E5E7EB]',
                ].join(' ')}
              >
                {done
                  ? <HiCheck className="w-4 h-4" />
                  : <step.Icon className="w-4 h-4" />
                }
              </div>

              <div className="text-center">
                <p className={[
                  'text-[11px] font-medium leading-tight',
                  'max-w-[60px] sm:max-w-[72px]',
                  'hidden xs:block',
                  done || active ? 'text-[#0E9E8E]' : 'text-[#9CA3AF]',
                ].join(' ')}>
                  {step.label}
                </p>
              </div>
            </div>

            {/* Connector line */}
            {index < STEPS.length - 1 && (
              <div className="flex-1 h-[1.5px] mx-1 mt-[18px]">
                <div
                  className={[
                    'h-full rounded-full transition-colors duration-250',
                    currentStep > step.id ? 'bg-[#0E9E8E]' : 'bg-[#E5E7EB]',
                  ].join(' ')}
                />
              </div>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
