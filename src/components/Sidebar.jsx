import React from 'react'
import { HiOutlineUserGroup, HiOutlineChartBar, HiOutlineShieldCheck, HiOutlineClock } from 'react-icons/hi'

/* ─── Official OHCTECH Logo ────────────────────────────────────────────
 * Uses the real uploaded logo PNG — no SVG recreation.
 * Exported so Footer can reuse it.
 * @param {'sm'|'md'|'lg'} size
 */
function OHCTechLogo({ size = 'md' }) {
  const heights = { sm: 28, md: 36, lg: 44 }
  const h = heights[size] ?? heights.md

  return (
    <img
      src="/ohctech-logo.png"
      alt="OHCTECH – Corporate Wellness Simplified"
      height={h * 2}
      style={{ height: h, width: 'auto', display: 'block', objectFit: 'contain' }}
      draggable={false}
    />
  )
}

/* ─── Sidebar Illustration ─────────────────────────────────────────── */
function SidebarIllustration() {
  return (
    <div className="relative flex items-center justify-center py-2" aria-hidden="true">
      {/* Clipboard card */}
      <div className="relative z-10 w-36 h-44 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-center gap-3 p-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4].map(i => (
            <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FBBF24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
          {[5].map(i => (
            <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#E5E7EB">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        <div className="w-full space-y-2">
          {[100, 75, 85].map((w, i) => (
            <div key={i} className="h-2 rounded-full bg-[#E6F7F5]" style={{ width: `${w}%` }} />
          ))}
        </div>

        <div className="w-10 h-10 rounded-full bg-[#E6F7F5] flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" fill="#0E9E8E" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#0E9E8E" fillOpacity="0.4" />
          </svg>
        </div>
      </div>

      {/* Floating teal check */}
      <div className="absolute bottom-3 right-6 w-9 h-9 rounded-full bg-[#0E9E8E] shadow-md flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Floating gold star */}
      <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center shadow-sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    </div>
  )
}

/* ─── Feature bullets ───────────────────────────────────────────────── */
const FEATURES = [
  { Icon: HiOutlineUserGroup,   title: 'Better Experience', desc: 'Helps us improve your overall experience' },
  { Icon: HiOutlineChartBar,    title: 'Quality Services',  desc: 'Helps us deliver quality products and support' },
  { Icon: HiOutlineShieldCheck, title: 'Trusted by Clients',desc: 'We are committed to your success' },
]

/* ─── Sidebar ───────────────────────────────────────────────────────── */
export default function Sidebar() {
  return (
    <aside
      className="hidden lg:flex flex-col w-[280px] xl:w-[300px] flex-shrink-0 min-h-full
                 bg-gradient-to-b from-[#E6F7F5] to-[#F0FAF9] rounded-2xl p-6
                 relative overflow-hidden"
      aria-label="About this form"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-20 pointer-events-none"
           style={{ background: 'radial-gradient(circle, #0E9E8E 0%, transparent 70%)' }}
           aria-hidden="true" />
      <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full opacity-10 pointer-events-none"
           style={{ background: 'radial-gradient(circle, #0E9E8E 0%, transparent 70%)' }}
           aria-hidden="true" />

      <div className="mb-5 relative z-10">
        <OHCTechLogo size="lg" />
      </div>

      <div className="relative z-10 mb-4">
        <SidebarIllustration />
      </div>

      <div className="relative z-10 mb-5">
        <h2 className="text-xl font-bold text-[#1A2B3C] mb-2 leading-tight">Your Feedback Matters</h2>
        <p className="text-xs text-[#6B7280] leading-relaxed">
          Your valuable feedback helps us improve our platform, support and services to build
          healthier and safer workplaces.
        </p>
      </div>

      <ul className="relative z-10 space-y-3 mb-6" role="list">
        {FEATURES.map(({ Icon, title, desc }) => (
          <li key={title} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon className="w-4 h-4 text-[#0E9E8E]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0E9E8E] leading-tight">{title}</p>
              <p className="text-[11px] text-[#6B7280] leading-tight mt-0.5">{desc}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-auto">
        <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm">
          <div className="w-9 h-9 rounded-full bg-[#E6F7F5] flex items-center justify-center flex-shrink-0">
            <HiOutlineClock className="w-5 h-5 text-[#0E9E8E]" />
          </div>
          <p className="text-sm text-[#1A2B3C]">
            It takes less than <strong className="font-bold">5 minutes</strong>
          </p>
        </div>
      </div>
    </aside>
  )
}

export { OHCTechLogo }
