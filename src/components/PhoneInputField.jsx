import React, { useState, useRef, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'

/* ─── 150+ Country Database ─────────────────────────────────────────
   Fields: code (ISO), name, dial, flag, min, max digits, aliases
   ──────────────────────────────────────────────────────────────────── */
const COUNTRIES = [
  // ── South Asia ─────────────────────────────────────────────────────
  { code:'IN', name:'India',               dial:'91',   flag:'🇮🇳', min:10, max:10, aliases:['bharat','hindustan','ind'] },
  { code:'PK', name:'Pakistan',            dial:'92',   flag:'🇵🇰', min:10, max:10, aliases:['islamabad','karachi'] },
  { code:'BD', name:'Bangladesh',          dial:'880',  flag:'🇧🇩', min:10, max:10, aliases:['dhaka'] },
  { code:'LK', name:'Sri Lanka',           dial:'94',   flag:'🇱🇰', min:9,  max:9,  aliases:['ceylon','colombo'] },
  { code:'NP', name:'Nepal',               dial:'977',  flag:'🇳🇵', min:10, max:10, aliases:['kathmandu'] },
  { code:'BT', name:'Bhutan',              dial:'975',  flag:'🇧🇹', min:8,  max:8,  aliases:['thimphu'] },
  { code:'MV', name:'Maldives',            dial:'960',  flag:'🇲🇻', min:7,  max:7,  aliases:['male'] },
  { code:'AF', name:'Afghanistan',         dial:'93',   flag:'🇦🇫', min:9,  max:9,  aliases:['kabul'] },
  // ── East & South-East Asia ─────────────────────────────────────────
  { code:'CN', name:'China',               dial:'86',   flag:'🇨🇳', min:11, max:11, aliases:['prc','beijing','zhongguo'] },
  { code:'JP', name:'Japan',               dial:'81',   flag:'🇯🇵', min:10, max:11, aliases:['nippon','tokyo'] },
  { code:'KR', name:'South Korea',         dial:'82',   flag:'🇰🇷', min:9,  max:10, aliases:['korea','seoul'] },
  { code:'ID', name:'Indonesia',           dial:'62',   flag:'🇮🇩', min:7,  max:12, aliases:['jakarta'] },
  { code:'VN', name:'Vietnam',             dial:'84',   flag:'🇻🇳', min:9,  max:10, aliases:['viet','hanoi'] },
  { code:'TH', name:'Thailand',            dial:'66',   flag:'🇹🇭', min:8,  max:9,  aliases:['thai','bangkok'] },
  { code:'PH', name:'Philippines',         dial:'63',   flag:'🇵🇭', min:10, max:10, aliases:['phils','manila'] },
  { code:'MY', name:'Malaysia',            dial:'60',   flag:'🇲🇾', min:7,  max:10, aliases:['kuala lumpur'] },
  { code:'SG', name:'Singapore',           dial:'65',   flag:'🇸🇬', min:8,  max:8,  aliases:[] },
  { code:'MM', name:'Myanmar',             dial:'95',   flag:'🇲🇲', min:8,  max:10, aliases:['burma','yangon'] },
  { code:'KH', name:'Cambodia',            dial:'855',  flag:'🇰🇭', min:8,  max:9,  aliases:['phnom penh'] },
  { code:'LA', name:'Laos',                dial:'856',  flag:'🇱🇦', min:8,  max:9,  aliases:['vientiane'] },
  { code:'MN', name:'Mongolia',            dial:'976',  flag:'🇲🇳', min:8,  max:8,  aliases:['ulaanbaatar'] },
  { code:'TW', name:'Taiwan',              dial:'886',  flag:'🇹🇼', min:9,  max:10, aliases:['taipei'] },
  { code:'HK', name:'Hong Kong',           dial:'852',  flag:'🇭🇰', min:8,  max:8,  aliases:[] },
  { code:'MO', name:'Macau',               dial:'853',  flag:'🇲🇴', min:8,  max:8,  aliases:['macao'] },
  { code:'BN', name:'Brunei',              dial:'673',  flag:'🇧🇳', min:7,  max:7,  aliases:['bandar seri begawan'] },
  { code:'TL', name:'Timor-Leste',         dial:'670',  flag:'🇹🇱', min:8,  max:8,  aliases:['east timor'] },
  // ── Middle East ─────────────────────────────────────────────────────
  { code:'AE', name:'UAE',                 dial:'971',  flag:'🇦🇪', min:9,  max:9,  aliases:['united arab emirates','dubai','abu dhabi','emirates'] },
  { code:'SA', name:'Saudi Arabia',        dial:'966',  flag:'🇸🇦', min:9,  max:9,  aliases:['ksa','saudi','riyadh'] },
  { code:'QA', name:'Qatar',               dial:'974',  flag:'🇶🇦', min:8,  max:8,  aliases:['doha'] },
  { code:'KW', name:'Kuwait',              dial:'965',  flag:'🇰🇼', min:8,  max:8,  aliases:['kuwait city'] },
  { code:'BH', name:'Bahrain',             dial:'973',  flag:'🇧🇭', min:8,  max:8,  aliases:['manama'] },
  { code:'OM', name:'Oman',                dial:'968',  flag:'🇴🇲', min:8,  max:8,  aliases:['muscat'] },
  { code:'YE', name:'Yemen',               dial:'967',  flag:'🇾🇪', min:9,  max:9,  aliases:['sanaa'] },
  { code:'IQ', name:'Iraq',                dial:'964',  flag:'🇮🇶', min:10, max:10, aliases:['baghdad'] },
  { code:'IR', name:'Iran',                dial:'98',   flag:'🇮🇷', min:10, max:10, aliases:['persia','tehran'] },
  { code:'JO', name:'Jordan',              dial:'962',  flag:'🇯🇴', min:9,  max:9,  aliases:['amman'] },
  { code:'LB', name:'Lebanon',             dial:'961',  flag:'🇱🇧', min:7,  max:8,  aliases:['beirut'] },
  { code:'SY', name:'Syria',               dial:'963',  flag:'🇸🇾', min:9,  max:9,  aliases:['damascus'] },
  { code:'IL', name:'Israel',              dial:'972',  flag:'🇮🇱', min:9,  max:9,  aliases:['tel aviv','jerusalem'] },
  { code:'PS', name:'Palestine',           dial:'970',  flag:'🇵🇸', min:9,  max:9,  aliases:['ramallah','gaza'] },
  { code:'TR', name:'Turkey',              dial:'90',   flag:'🇹🇷', min:10, max:10, aliases:['turkiye','ankara','istanbul'] },
  // ── Europe ──────────────────────────────────────────────────────────
  { code:'GB', name:'United Kingdom',      dial:'44',   flag:'🇬🇧', min:10, max:11, aliases:['uk','britain','england','scotland','wales'] },
  { code:'DE', name:'Germany',             dial:'49',   flag:'🇩🇪', min:10, max:12, aliases:['deutschland','berlin'] },
  { code:'FR', name:'France',              dial:'33',   flag:'🇫🇷', min:9,  max:9,  aliases:['paris'] },
  { code:'IT', name:'Italy',               dial:'39',   flag:'🇮🇹', min:9,  max:11, aliases:['italia','rome'] },
  { code:'ES', name:'Spain',               dial:'34',   flag:'🇪🇸', min:9,  max:9,  aliases:['espana','madrid'] },
  { code:'PT', name:'Portugal',            dial:'351',  flag:'🇵🇹', min:9,  max:9,  aliases:['lisbon'] },
  { code:'NL', name:'Netherlands',         dial:'31',   flag:'🇳🇱', min:9,  max:9,  aliases:['holland','dutch','amsterdam'] },
  { code:'BE', name:'Belgium',             dial:'32',   flag:'🇧🇪', min:8,  max:9,  aliases:['brussels'] },
  { code:'CH', name:'Switzerland',         dial:'41',   flag:'🇨🇭', min:9,  max:9,  aliases:['swiss','zurich'] },
  { code:'AT', name:'Austria',             dial:'43',   flag:'🇦🇹', min:7,  max:13, aliases:['vienna'] },
  { code:'SE', name:'Sweden',              dial:'46',   flag:'🇸🇪', min:7,  max:9,  aliases:['sverige','stockholm'] },
  { code:'NO', name:'Norway',              dial:'47',   flag:'🇳🇴', min:8,  max:8,  aliases:['norge','oslo'] },
  { code:'DK', name:'Denmark',             dial:'45',   flag:'🇩🇰', min:8,  max:8,  aliases:['copenhagen'] },
  { code:'FI', name:'Finland',             dial:'358',  flag:'🇫🇮', min:5,  max:10, aliases:['suomi','helsinki'] },
  { code:'IE', name:'Ireland',             dial:'353',  flag:'🇮🇪', min:7,  max:9,  aliases:['eire','dublin'] },
  { code:'PL', name:'Poland',              dial:'48',   flag:'🇵🇱', min:9,  max:9,  aliases:['warsaw'] },
  { code:'CZ', name:'Czech Republic',      dial:'420',  flag:'🇨🇿', min:9,  max:9,  aliases:['czechia','prague'] },
  { code:'SK', name:'Slovakia',            dial:'421',  flag:'🇸🇰', min:9,  max:9,  aliases:['bratislava'] },
  { code:'HU', name:'Hungary',             dial:'36',   flag:'🇭🇺', min:8,  max:9,  aliases:['budapest'] },
  { code:'RO', name:'Romania',             dial:'40',   flag:'🇷🇴', min:9,  max:10, aliases:['bucharest'] },
  { code:'BG', name:'Bulgaria',            dial:'359',  flag:'🇧🇬', min:9,  max:9,  aliases:['sofia'] },
  { code:'HR', name:'Croatia',             dial:'385',  flag:'🇭🇷', min:8,  max:9,  aliases:['zagreb'] },
  { code:'RS', name:'Serbia',              dial:'381',  flag:'🇷🇸', min:8,  max:9,  aliases:['belgrade'] },
  { code:'SI', name:'Slovenia',            dial:'386',  flag:'🇸🇮', min:8,  max:8,  aliases:['ljubljana'] },
  { code:'GR', name:'Greece',              dial:'30',   flag:'🇬🇷', min:10, max:10, aliases:['athens'] },
  { code:'CY', name:'Cyprus',              dial:'357',  flag:'🇨🇾', min:8,  max:8,  aliases:['nicosia'] },
  { code:'MT', name:'Malta',               dial:'356',  flag:'🇲🇹', min:8,  max:8,  aliases:['valletta'] },
  { code:'LU', name:'Luxembourg',          dial:'352',  flag:'🇱🇺', min:4,  max:9,  aliases:[] },
  { code:'LT', name:'Lithuania',           dial:'370',  flag:'🇱🇹', min:8,  max:8,  aliases:['vilnius'] },
  { code:'LV', name:'Latvia',              dial:'371',  flag:'🇱🇻', min:8,  max:8,  aliases:['riga'] },
  { code:'EE', name:'Estonia',             dial:'372',  flag:'🇪🇪', min:7,  max:8,  aliases:['tallinn'] },
  { code:'UA', name:'Ukraine',             dial:'380',  flag:'🇺🇦', min:9,  max:9,  aliases:['kyiv'] },
  { code:'RU', name:'Russia',              dial:'7',    flag:'🇷🇺', min:10, max:10, aliases:['moscow','russian federation'] },
  { code:'BY', name:'Belarus',             dial:'375',  flag:'🇧🇾', min:9,  max:9,  aliases:['minsk'] },
  { code:'MD', name:'Moldova',             dial:'373',  flag:'🇲🇩', min:8,  max:8,  aliases:['chisinau'] },
  { code:'AL', name:'Albania',             dial:'355',  flag:'🇦🇱', min:9,  max:9,  aliases:['tirana'] },
  { code:'MK', name:'North Macedonia',     dial:'389',  flag:'🇲🇰', min:8,  max:8,  aliases:['skopje'] },
  { code:'BA', name:'Bosnia & Herzegovina',dial:'387',  flag:'🇧🇦', min:8,  max:8,  aliases:['sarajevo'] },
  { code:'ME', name:'Montenegro',          dial:'382',  flag:'🇲🇪', min:8,  max:8,  aliases:['podgorica'] },
  { code:'IS', name:'Iceland',             dial:'354',  flag:'🇮🇸', min:7,  max:7,  aliases:['reykjavik'] },
  { code:'GE', name:'Georgia',             dial:'995',  flag:'🇬🇪', min:9,  max:9,  aliases:['tbilisi'] },
  { code:'AM', name:'Armenia',             dial:'374',  flag:'🇦🇲', min:8,  max:8,  aliases:['yerevan'] },
  { code:'AZ', name:'Azerbaijan',          dial:'994',  flag:'🇦🇿', min:9,  max:9,  aliases:['baku'] },
  { code:'KZ', name:'Kazakhstan',          dial:'7',    flag:'🇰🇿', min:10, max:10, aliases:['almaty','astana'] },
  // ── North America ───────────────────────────────────────────────────
  { code:'US', name:'United States',       dial:'1',    flag:'🇺🇸', min:10, max:10, aliases:['usa','america','united states of america','am'] },
  { code:'CA', name:'Canada',              dial:'1',    flag:'🇨🇦', min:10, max:10, aliases:['can','toronto','ottawa'] },
  { code:'MX', name:'Mexico',              dial:'52',   flag:'🇲🇽', min:10, max:10, aliases:['mexico city'] },
  // ── Central America & Caribbean ─────────────────────────────────────
  { code:'GT', name:'Guatemala',           dial:'502',  flag:'🇬🇹', min:8,  max:8,  aliases:['guatemala city'] },
  { code:'HN', name:'Honduras',            dial:'504',  flag:'🇭🇳', min:8,  max:8,  aliases:['tegucigalpa'] },
  { code:'SV', name:'El Salvador',         dial:'503',  flag:'🇸🇻', min:8,  max:8,  aliases:['san salvador'] },
  { code:'NI', name:'Nicaragua',           dial:'505',  flag:'🇳🇮', min:8,  max:8,  aliases:['managua'] },
  { code:'CR', name:'Costa Rica',          dial:'506',  flag:'🇨🇷', min:8,  max:8,  aliases:['san jose'] },
  { code:'PA', name:'Panama',              dial:'507',  flag:'🇵🇦', min:8,  max:8,  aliases:['panama city'] },
  { code:'CU', name:'Cuba',                dial:'53',   flag:'🇨🇺', min:8,  max:8,  aliases:['havana'] },
  { code:'DO', name:'Dominican Republic',  dial:'1',    flag:'🇩🇴', min:10, max:10, aliases:['santo domingo'] },
  { code:'JM', name:'Jamaica',             dial:'1',    flag:'🇯🇲', min:10, max:10, aliases:['kingston'] },
  { code:'TT', name:'Trinidad & Tobago',   dial:'1',    flag:'🇹🇹', min:10, max:10, aliases:['trinidad','tobago','port of spain'] },
  { code:'BB', name:'Barbados',            dial:'1',    flag:'🇧🇧', min:10, max:10, aliases:['bridgetown'] },
  { code:'HT', name:'Haiti',               dial:'509',  flag:'🇭🇹', min:8,  max:8,  aliases:['port au prince'] },
  // ── South America ───────────────────────────────────────────────────
  { code:'BR', name:'Brazil',              dial:'55',   flag:'🇧🇷', min:10, max:11, aliases:['brasil','sao paulo','rio'] },
  { code:'AR', name:'Argentina',           dial:'54',   flag:'🇦🇷', min:10, max:10, aliases:['buenos aires'] },
  { code:'CO', name:'Colombia',            dial:'57',   flag:'🇨🇴', min:10, max:10, aliases:['bogota'] },
  { code:'CL', name:'Chile',               dial:'56',   flag:'🇨🇱', min:9,  max:9,  aliases:['santiago'] },
  { code:'PE', name:'Peru',                dial:'51',   flag:'🇵🇪', min:9,  max:9,  aliases:['lima'] },
  { code:'VE', name:'Venezuela',           dial:'58',   flag:'🇻🇪', min:10, max:10, aliases:['caracas'] },
  { code:'EC', name:'Ecuador',             dial:'593',  flag:'🇪🇨', min:9,  max:9,  aliases:['quito'] },
  { code:'BO', name:'Bolivia',             dial:'591',  flag:'🇧🇴', min:8,  max:8,  aliases:['la paz'] },
  { code:'PY', name:'Paraguay',            dial:'595',  flag:'🇵🇾', min:9,  max:9,  aliases:['asuncion'] },
  { code:'UY', name:'Uruguay',             dial:'598',  flag:'🇺🇾', min:9,  max:9,  aliases:['montevideo'] },
  // ── Africa ──────────────────────────────────────────────────────────
  { code:'ZA', name:'South Africa',        dial:'27',   flag:'🇿🇦', min:9,  max:9,  aliases:['rsa','johannesburg','cape town'] },
  { code:'NG', name:'Nigeria',             dial:'234',  flag:'🇳🇬', min:8,  max:10, aliases:['lagos','abuja'] },
  { code:'EG', name:'Egypt',               dial:'20',   flag:'🇪🇬', min:10, max:10, aliases:['cairo'] },
  { code:'KE', name:'Kenya',               dial:'254',  flag:'🇰🇪', min:9,  max:9,  aliases:['nairobi'] },
  { code:'GH', name:'Ghana',               dial:'233',  flag:'🇬🇭', min:9,  max:9,  aliases:['accra'] },
  { code:'ET', name:'Ethiopia',            dial:'251',  flag:'🇪🇹', min:9,  max:9,  aliases:['addis ababa'] },
  { code:'TZ', name:'Tanzania',            dial:'255',  flag:'🇹🇿', min:9,  max:9,  aliases:['dar es salaam','dodoma'] },
  { code:'UG', name:'Uganda',              dial:'256',  flag:'🇺🇬', min:9,  max:9,  aliases:['kampala'] },
  { code:'RW', name:'Rwanda',              dial:'250',  flag:'🇷🇼', min:9,  max:9,  aliases:['kigali'] },
  { code:'SN', name:'Senegal',             dial:'221',  flag:'🇸🇳', min:9,  max:9,  aliases:['dakar'] },
  { code:'CI', name:'Ivory Coast',         dial:'225',  flag:'🇨🇮', min:10, max:10, aliases:['cote divoire','abidjan'] },
  { code:'CM', name:'Cameroon',            dial:'237',  flag:'🇨🇲', min:9,  max:9,  aliases:['yaounde','douala'] },
  { code:'MA', name:'Morocco',             dial:'212',  flag:'🇲🇦', min:9,  max:9,  aliases:['rabat','casablanca'] },
  { code:'TN', name:'Tunisia',             dial:'216',  flag:'🇹🇳', min:8,  max:8,  aliases:['tunis'] },
  { code:'DZ', name:'Algeria',             dial:'213',  flag:'🇩🇿', min:9,  max:9,  aliases:['algiers'] },
  { code:'LY', name:'Libya',               dial:'218',  flag:'🇱🇾', min:9,  max:9,  aliases:['tripoli'] },
  { code:'SD', name:'Sudan',               dial:'249',  flag:'🇸🇩', min:9,  max:9,  aliases:['khartoum'] },
  { code:'ZM', name:'Zambia',              dial:'260',  flag:'🇿🇲', min:9,  max:9,  aliases:['lusaka'] },
  { code:'ZW', name:'Zimbabwe',            dial:'263',  flag:'🇿🇼', min:9,  max:9,  aliases:['harare'] },
  { code:'MZ', name:'Mozambique',          dial:'258',  flag:'🇲🇿', min:9,  max:9,  aliases:['maputo'] },
  { code:'AO', name:'Angola',              dial:'244',  flag:'🇦🇴', min:9,  max:9,  aliases:['luanda'] },
  { code:'MG', name:'Madagascar',          dial:'261',  flag:'🇲🇬', min:9,  max:9,  aliases:['antananarivo'] },
  { code:'BW', name:'Botswana',            dial:'267',  flag:'🇧🇼', min:8,  max:8,  aliases:['gaborone'] },
  { code:'NA', name:'Namibia',             dial:'264',  flag:'🇳🇦', min:9,  max:9,  aliases:['windhoek'] },
  { code:'MU', name:'Mauritius',           dial:'230',  flag:'🇲🇺', min:7,  max:8,  aliases:['port louis'] },
  { code:'MW', name:'Malawi',              dial:'265',  flag:'🇲🇼', min:9,  max:9,  aliases:['lilongwe'] },
  { code:'SO', name:'Somalia',             dial:'252',  flag:'🇸🇴', min:8,  max:9,  aliases:['mogadishu'] },
  // ── Oceania ─────────────────────────────────────────────────────────
  { code:'AU', name:'Australia',           dial:'61',   flag:'🇦🇺', min:9,  max:9,  aliases:['aussie','oz','sydney','melbourne'] },
  { code:'NZ', name:'New Zealand',         dial:'64',   flag:'🇳🇿', min:8,  max:10, aliases:['kiwi','auckland','wellington'] },
  { code:'FJ', name:'Fiji',                dial:'679',  flag:'🇫🇯', min:7,  max:7,  aliases:['suva'] },
  { code:'PG', name:'Papua New Guinea',    dial:'675',  flag:'🇵🇬', min:8,  max:8,  aliases:['port moresby'] },
]

const DEFAULT_COUNTRY = COUNTRIES[0] // India (+91)

/* ─── Fast search ───────────────────────────────────────────────────── */
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

/* ─── Portal Dropdown ───────────────────────────────────────────────── */
function CountryDropdown({ anchor, country, search, onSearch, onSelect, onClose, searchRef }) {
  const [style, setStyle] = useState({})

  const updatePos = useCallback(() => {
    if (!anchor?.current) return
    const r   = anchor.current.getBoundingClientRect()
    const spaceBelow = window.innerHeight - r.bottom
    const dropH = 400
    const top = spaceBelow > dropH
      ? r.bottom + window.scrollY + 6
      : r.top   + window.scrollY  - dropH - 6
    setStyle({
      position: 'absolute',
      top,
      left:  Math.max(8, r.left + window.scrollX),
      width: Math.min(360, window.innerWidth - 16),
      zIndex: 99999,
    })
  }, [anchor])

  useEffect(() => {
    updatePos()
    window.addEventListener('scroll', updatePos, true)
    window.addEventListener('resize', updatePos)
    return () => {
      window.removeEventListener('scroll', updatePos, true)
      window.removeEventListener('resize', updatePos)
    }
  }, [updatePos])

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

      {/* Search */}
      <div className="ohc-dd-search-wrap">
        <div className="ohc-dd-search-row">
          <svg className="ohc-dd-search-ico" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            ref={searchRef} type="text" value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search country..."
            className="ohc-dd-search-input"
            autoComplete="off"
          />
          {search && (
            <button type="button"
              onMouseDown={e => { e.preventDefault(); onSearch('') }}
              className="ohc-dd-clear">✕</button>
          )}
        </div>
      </div>

      {/* Country count */}
      {search && (
        <p className="ohc-dd-count">
          {list.length} {list.length === 1 ? 'country' : 'countries'} found
        </p>
      )}

      {/* Country list */}
      <ul role="listbox" className="ohc-dd-list">
        {list.length === 0 ? (
          <li className="ohc-dd-empty">No results for &ldquo;{search}&rdquo;</li>
        ) : list.map(c => {
          const active = c.code === country.code
          return (
            <li key={c.code} role="option" aria-selected={active}
              onMouseDown={e => { e.preventDefault(); onSelect(c) }}
              className={`ohc-dd-row${active ? ' ohc-dd-row--sel' : ''}`}>
              {/* ISO code — left */}
              <span className="ohc-dd-iso">{c.code}</span>
              {/* Country name — middle */}
              <span className="ohc-dd-name">{c.name}</span>
              {/* Dial code — right */}
              <span className="ohc-dd-code">+{c.dial}</span>
              {/* Checkmark for selected */}
              {active && (
                <svg className="ohc-dd-check" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
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

/* ─── Main Component ─────────────────────────────────────────────────
   Pure default export — Vite Fast Refresh compatible.
   ────────────────────────────────────────────────────────────────── */
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

        {/* Country trigger — shows: 🇮🇳 IN +91 ▾ */}
        <button ref={btnRef} type="button"
          aria-haspopup="listbox" aria-expanded={open}
          aria-label={`Country: ${country.name}, +${country.dial}`}
          onClick={() => setOpen(v => !v)}
          className="ohc-trigger">
          <span className="ohc-trigger-flag">{country.flag}</span>
          <span className="ohc-trigger-iso">{country.code}</span>
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
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
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
