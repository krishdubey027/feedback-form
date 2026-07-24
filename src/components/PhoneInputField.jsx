import React, { useState, useRef, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'

/* ─── Country database ─────────────────────────────────────────────── */
const COUNTRIES = [
  { code: 'IN', name: 'India',            dial: '91',  flag: '🇮🇳', min: 10, max: 10, aliases: ['bharat','ind','hindustan'] },
  { code: 'US', name: 'United States',    dial: '1',   flag: '🇺🇸', min: 10, max: 10, aliases: ['usa','america','am','united states of america'] },
  { code: 'CA', name: 'Canada',           dial: '1',   flag: '🇨🇦', min: 10, max: 10, aliases: ['can'] },
  { code: 'GB', name: 'United Kingdom',   dial: '44',  flag: '🇬🇧', min: 10, max: 11, aliases: ['uk','britain','england','scotland','wales','northern ireland'] },
  { code: 'AU', name: 'Australia',        dial: '61',  flag: '🇦🇺', min: 9,  max: 9,  aliases: ['aussie','oz'] },
  { code: 'NZ', name: 'New Zealand',      dial: '64',  flag: '🇳🇿', min: 8,  max: 10, aliases: ['kiwi'] },
  { code: 'AE', name: 'UAE',              dial: '971', flag: '🇦🇪', min: 9,  max: 9,  aliases: ['united arab emirates','dubai','abu dhabi','emirates','gulf'] },
  { code: 'SA', name: 'Saudi Arabia',     dial: '966', flag: '🇸🇦', min: 9,  max: 9,  aliases: ['ksa','saudi','riyadh','jeddah'] },
  { code: 'QA', name: 'Qatar',            dial: '974', flag: '🇶🇦', min: 8,  max: 8,  aliases: ['doha'] },
  { code: 'KW', name: 'Kuwait',           dial: '965', flag: '🇰🇼', min: 8,  max: 8,  aliases: [] },
  { code: 'OM', name: 'Oman',             dial: '968', flag: '🇴🇲', min: 8,  max: 8,  aliases: ['muscat'] },
  { code: 'BH', name: 'Bahrain',          dial: '973', flag: '🇧🇭', min: 8,  max: 8,  aliases: ['manama'] },
  { code: 'SG', name: 'Singapore',        dial: '65',  flag: '🇸🇬', min: 8,  max: 8,  aliases: [] },
  { code: 'MY', name: 'Malaysia',         dial: '60',  flag: '🇲🇾', min: 7,  max: 10, aliases: ['msia','kuala lumpur'] },
  { code: 'ID', name: 'Indonesia',        dial: '62',  flag: '🇮🇩', min: 7,  max: 12, aliases: ['jakarta'] },
  { code: 'TH', name: 'Thailand',         dial: '66',  flag: '🇹🇭', min: 8,  max: 9,  aliases: ['thai','bangkok'] },
  { code: 'PH', name: 'Philippines',      dial: '63',  flag: '🇵🇭', min: 10, max: 10, aliases: ['phils','manila'] },
  { code: 'VN', name: 'Vietnam',          dial: '84',  flag: '🇻🇳', min: 9,  max: 10, aliases: ['viet','hanoi'] },
  { code: 'JP', name: 'Japan',            dial: '81',  flag: '🇯🇵', min: 10, max: 11, aliases: ['nippon','tokyo'] },
  { code: 'KR', name: 'South Korea',      dial: '82',  flag: '🇰🇷', min: 9,  max: 10, aliases: ['korea','seoul'] },
  { code: 'CN', name: 'China',            dial: '86',  flag: '🇨🇳', min: 11, max: 11, aliases: ['prc','beijing'] },
  { code: 'LK', name: 'Sri Lanka',        dial: '94',  flag: '🇱🇰', min: 9,  max: 9,  aliases: ['ceylon','colombo'] },
  { code: 'PK', name: 'Pakistan',         dial: '92',  flag: '🇵🇰', min: 10, max: 10, aliases: ['islamabad','karachi'] },
  { code: 'BD', name: 'Bangladesh',       dial: '880', flag: '🇧🇩', min: 10, max: 10, aliases: ['dhaka'] },
  { code: 'NP', name: 'Nepal',            dial: '977', flag: '🇳🇵', min: 10, max: 10, aliases: ['kathmandu'] },
  { code: 'DE', name: 'Germany',          dial: '49',  flag: '🇩🇪', min: 10, max: 12, aliases: ['deutschland','berlin'] },
  { code: 'FR', name: 'France',           dial: '33',  flag: '🇫🇷', min: 9,  max: 9,  aliases: ['paris'] },
  { code: 'IT', name: 'Italy',            dial: '39',  flag: '🇮🇹', min: 9,  max: 11, aliases: ['italia','rome'] },
  { code: 'ES', name: 'Spain',            dial: '34',  flag: '🇪🇸', min: 9,  max: 9,  aliases: ['espana','madrid'] },
  { code: 'NL', name: 'Netherlands',      dial: '31',  flag: '🇳🇱', min: 9,  max: 9,  aliases: ['holland','dutch','amsterdam'] },
  { code: 'BE', name: 'Belgium',          dial: '32',  flag: '🇧🇪', min: 8,  max: 9,  aliases: ['brussels'] },
  { code: 'CH', name: 'Switzerland',      dial: '41',  flag: '🇨🇭', min: 9,  max: 9,  aliases: ['swiss','zurich'] },
  { code: 'SE', name: 'Sweden',           dial: '46',  flag: '🇸🇪', min: 7,  max: 9,  aliases: ['sverige','stockholm'] },
  { code: 'NO', name: 'Norway',           dial: '47',  flag: '🇳🇴', min: 8,  max: 8,  aliases: ['norge','oslo'] },
  { code: 'DK', name: 'Denmark',          dial: '45',  flag: '🇩🇰', min: 8,  max: 8,  aliases: ['copenhagen'] },
  { code: 'FI', name: 'Finland',          dial: '358', flag: '🇫🇮', min: 5,  max: 10, aliases: ['suomi','helsinki'] },
  { code: 'IE', name: 'Ireland',          dial: '353', flag: '🇮🇪', min: 7,  max: 9,  aliases: ['eire','dublin'] },
  { code: 'PT', name: 'Portugal',         dial: '351', flag: '🇵🇹', min: 9,  max: 9,  aliases: ['lisbon'] },
  { code: 'AT', name: 'Austria',          dial: '43',  flag: '🇦🇹', min: 7,  max: 13, aliases: ['vienna'] },
  { code: 'GR', name: 'Greece',           dial: '30',  flag: '🇬🇷', min: 10, max: 10, aliases: ['athens'] },
  { code: 'PL', name: 'Poland',           dial: '48',  flag: '🇵🇱', min: 9,  max: 9,  aliases: ['warsaw'] },
  { code: 'RU', name: 'Russia',           dial: '7',   flag: '🇷🇺', min: 10, max: 10, aliases: ['moscow'] },
  { code: 'ZA', name: 'South Africa',     dial: '27',  flag: '🇿🇦', min: 9,  max: 9,  aliases: ['rsa','johannesburg'] },
  { code: 'NG', name: 'Nigeria',          dial: '234', flag: '🇳🇬', min: 8,  max: 10, aliases: ['lagos'] },
  { code: 'KE', name: 'Kenya',            dial: '254', flag: '🇰🇪', min: 9,  max: 9,  aliases: ['nairobi'] },
  { code: 'GH', name: 'Ghana',            dial: '233', flag: '🇬🇭', min: 9,  max: 9,  aliases: ['accra'] },
  { code: 'EG', name: 'Egypt',            dial: '20',  flag: '🇪🇬', min: 10, max: 10, aliases: ['cairo'] },
  { code: 'BR', name: 'Brazil',           dial: '55',  flag: '🇧🇷', min: 10, max: 11, aliases: ['brasil','sao paulo'] },
  { code: 'MX', name: 'Mexico',           dial: '52',  flag: '🇲🇽', min: 10, max: 10, aliases: ['mexico city'] },
  { code: 'AR', name: 'Argentina',        dial: '54',  flag: '🇦🇷', min: 10, max: 10, aliases: ['buenos aires'] },
  { code: 'CO', name: 'Colombia',         dial: '57',  flag: '🇨🇴', min: 10, max: 10, aliases: ['bogota'] },
]

const DEFAULT_COUNTRY = COUNTRIES[0] // India (+91)

function filterCountries(q) {
  const query = q.trim().toLowerCase()
  if (!query) return COUNTRIES
  const digits = query.replace(/\D/g, '')
  return COUNTRIES.filter(c => {
    if (c.name.toLowerCase().includes(query))       return true
    if (c.code.toLowerCase().startsWith(query))     return true
    if (c.aliases.some(a => a.includes(query)))     return true
    if (digits && c.dial.startsWith(digits))        return true
    return false
  })
}

/* ─── Portal Dropdown Component ────────────────────────────────────── */
function CountryDropdown({ anchor, country, search, onSearch, onSelect, onClose, searchRef }) {
  const [style, setStyle] = useState({})

  const updatePosition = useCallback(() => {
    if (!anchor?.current) return
    const r   = anchor.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - r.bottom
    const dropH = Math.min(400, window.innerHeight * 0.55)
    const top   = spaceBelow > dropH
                    ? r.bottom + window.scrollY + 8
                    : r.top + window.scrollY - dropH - 8
    setStyle({
      position: 'absolute',
      top,
      left:  Math.max(8, r.left + window.scrollX),
      width: Math.min(340, window.innerWidth - 16),
      zIndex: 99999,
    })
  }, [anchor])

  useEffect(() => {
    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [updatePosition])

  useEffect(() => {
    const onOut = (e) => {
      const el = document.getElementById('ohc-phone-portal')
      if (!el?.contains(e.target) && !anchor?.current?.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', onOut)
    return () => document.removeEventListener('mousedown', onOut)
  }, [anchor, onClose])

  useEffect(() => { setTimeout(() => searchRef?.current?.focus(), 20) }, [searchRef])

  const list = filterCountries(search)

  return ReactDOM.createPortal(
    <div id="ohc-phone-portal" style={style} className="ohc-dd">

      {/* ── Search ── */}
      <div className="ohc-dd-search-wrap">
        <div className="ohc-dd-search-row">
          <svg className="ohc-dd-search-ico" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            ref={searchRef}
            type="text" value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search country..."
            className="ohc-dd-search-input"
            aria-label="Search country"
            autoComplete="off"
          />
          {search && (
            <button type="button" onMouseDown={e => { e.preventDefault(); onSearch('') }}
              className="ohc-dd-clear" aria-label="Clear">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Country list ── */}
      <ul role="listbox" className="ohc-dd-list">
        {list.length === 0 ? (
          <li className="ohc-dd-empty">No results for &ldquo;{search}&rdquo;</li>
        ) : list.map(c => {
          const active = c.code === country.code
          return (
            <li key={c.code} role="option" aria-selected={active}
              onMouseDown={e => { e.preventDefault(); onSelect(c) }}
              className={`ohc-dd-row${active ? ' ohc-dd-row--sel' : ''}`}>
              <span className="ohc-dd-flag">{c.flag}</span>
              <span className="ohc-dd-name">{c.name}</span>
              <span className="ohc-dd-code">+{c.dial}</span>
              {active && (
                <svg className="ohc-dd-check" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </li>
          )
        })}
      </ul>
    </div>,
    document.body
  )
}

/* ─── Main Component ───────────────────────────────────────────────── */
/**
 * PhoneInputField
 * Premium international phone input with Portal dropdown.
 * Pure default export — Vite Fast Refresh safe.
 */
export default function PhoneInputField({ value, onChange, error, id = 'phone' }) {
  const [country, setCountry] = useState(DEFAULT_COUNTRY)
  const [open,    setOpen]    = useState(false)
  const [search,  setSearch]  = useState('')
  const btnRef    = useRef(null)
  const searchRef = useRef(null)
  const hasError  = Boolean(error)
  const digits    = (value ?? '').replace(/\D/g, '')

  const selectCountry = useCallback((c) => {
    setCountry(c)
    setOpen(false)
    setSearch('')
    onChange('', { dialCode: c.dial, country: c })
  }, [onChange])

  const closeDropdown = useCallback(() => { setOpen(false); setSearch('') }, [])

  const handleDigits = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, country.max)
    onChange(raw, { dialCode: country.dial, country })
  }

  return (
    <div className="flex flex-col gap-1">

      {/* Label */}
      <label htmlFor={id}
        className="flex flex-wrap items-center gap-1 text-sm font-medium text-[#1A2B3C]">
        Mobile Number
        <span className="text-xs font-normal text-[#9CA3AF]">(Optional)</span>
      </label>

      {/* Input row */}
      <div className={`ohc-pf${hasError ? ' ohc-pf--err' : ''}${open ? ' ohc-pf--open' : ''}`}>

        {/* Country trigger */}
        <button ref={btnRef} type="button"
          aria-haspopup="listbox" aria-expanded={open}
          aria-label={`Country: ${country.name}, +${country.dial}`}
          onClick={() => setOpen(v => !v)}
          className="ohc-trigger">
          <span className="ohc-trigger-flag">{country.flag}</span>
          <span className="ohc-trigger-dial">+{country.dial}</span>
          <svg viewBox="0 0 24 24" fill="none" aria-hidden
            className={`ohc-trigger-chev${open ? ' ohc-trigger-chev--up' : ''}`}>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Divider */}
        <span className="ohc-divider" aria-hidden/>

        {/* Number input */}
        <input id={id} name={id} type="tel" inputMode="numeric"
          value={digits} onChange={handleDigits}
          placeholder={`${country.min === country.max ? country.max : country.min + '–' + country.max} digit number`}
          autoComplete="tel-national"
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className="ohc-num-input"/>
      </div>

      {/* Error */}
      {hasError && (
        <p id={`${id}-error`} role="alert"
          className="flex items-center gap-1 text-xs text-red-500 mt-0.5">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
            aria-hidden className="flex-shrink-0">
            <circle cx="6" cy="6" r="6" fill="#EF4444"/>
            <path d="M6 3.5V6.5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
            <circle cx="6" cy="8.5" r="0.65" fill="white"/>
          </svg>
          {error}
        </p>
      )}

      {/* Portal dropdown */}
      {open && (
        <CountryDropdown
          anchor={btnRef} country={country}
          search={search} onSearch={setSearch}
          onSelect={selectCountry} onClose={closeDropdown}
          searchRef={searchRef}
        />
      )}
    </div>
  )
}
