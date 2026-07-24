import React from 'react'
import { OHCTechLogo } from './Sidebar'
import { HiOutlineGlobe, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi'

/**
 * Footer
 * OHCTECH branding footer. Text/contact details match Figma exactly.
 * Do not edit company information below.
 */
const CONTACTS = [
  {
    Icon: HiOutlineGlobe,
    items: [{ label: 'www.ohctech.com', href: 'https://www.ohctech.com', external: true }],
  },
  {
    Icon: HiOutlinePhone,
    items: [
      { label: '+91 98734 84963' },
      { label: '+91 77966 99941' },
    ],
  },
  {
    Icon: HiOutlineMail,
    items: [{ label: 'info@ohctech.com', href: 'mailto:info@ohctech.com', external: false }],
  },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E7EB]" role="contentinfo">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <OHCTechLogo size="sm" />

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 gap-y-2">
            {CONTACTS.map(({ Icon, items }) => (
              <div key={items[0].label} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-[#0E9E8E] flex-shrink-0" aria-hidden="true" />
                <div className="flex gap-2 flex-wrap">
                  {items.map(({ label, href, external }) =>
                    href ? (
                      <a
                        key={label}
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        className="text-xs text-[#6B7280] hover:text-[#0E9E8E] transition-colors duration-150"
                      >
                        {label}
                      </a>
                    ) : (
                      <span key={label} className="text-xs text-[#6B7280]">{label}</span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
