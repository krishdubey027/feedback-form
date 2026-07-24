/**
 * Validates a phone number against the selected country's digit rules.
 *
 * @param {string} digits      - Raw digits only (no dial code prefix)
 * @param {object} countryObj  - Country from PhoneInputField { code, name, dial, min, max }
 * @returns {string}           - '' if valid, error string if invalid
 */
export function validatePhone(digits, countryObj) {
  // Optional field — empty is always OK
  if (!digits || digits.length === 0) return ''

  const { name = 'Phone number', min = 5, max = 15 } = countryObj || {}

  if (digits.length < min) {
    return `${name} requires ${min === max ? min : `${min}–${max}`} digits — ${digits.length} entered.`
  }
  if (digits.length > max) {
    return `Too many digits for ${name} — max ${max}.`
  }
  return ''
}
