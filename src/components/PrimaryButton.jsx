import React from 'react'

/**
 * PrimaryButton
 * OHCTECH brand CTA button.
 *
 * @param {Function}  onClick
 * @param {boolean}   disabled
 * @param {ReactNode} children
 * @param {string}    type      - "button" | "submit"
 * @param {string}    variant   - "primary" | "outline"
 * @param {string}    id        - For automated testing
 */
export default function PrimaryButton({
  onClick,
  disabled = false,
  children,
  type = 'button',
  variant = 'primary',
  id,
}) {
  const base = [
    'inline-flex items-center justify-center gap-2',
    'px-6 py-2.5 rounded-[10px]',
    'text-sm font-semibold font-[inherit]',
    'transition-all duration-150 cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E9E8E] focus-visible:ring-offset-2',
    'active:scale-[0.98]',
    disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : '',
  ].join(' ')

  const variants = {
    primary: 'bg-[#0E9E8E] text-white hover:bg-[#0A8578] shadow-md',
    outline: 'bg-white text-[#0E9E8E] border-2 border-[#0E9E8E] hover:bg-[#E6F7F5]',
  }

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant] ?? variants.primary}`}
    >
      {children}
    </button>
  )
}
