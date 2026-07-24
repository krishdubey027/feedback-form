/**
 * Phone validation utility.
 * Used by FeedbackForm.jsx to validate the phone number before advancing Step 1.
 *
 * @param {string} value        - Full value from react-phone-input-2 (includes dial code)
 * @param {object} countryData  - Country object from react-phone-input-2 onChange callback
 * @returns {string}            - '' if valid, error message if invalid
 */
export function validatePhone(value, countryData) {
  if (!value) return ''

  const dialCode    = countryData?.dialCode || ''
  const national    = value.slice(dialCode.length).replace(/\D/g, '')

  // Nothing typed beyond the dial code — optional field, OK to continue
  if (!national || national.length === 0) return ''

  // Derive expected length from the library's format mask ("." = one digit)
  const format          = countryData?.format || ''
  const dotCount        = (format.match(/\./g) || []).length
  const dialDigits      = dialCode.replace(/\D/g, '').length
  const expectedNational = dotCount - dialDigits

  if (expectedNational > 0) {
    if (national.length < expectedNational) {
      return `${countryData?.name || 'Phone number'} requires ${expectedNational} digits — ${national.length} entered.`
    }
    if (national.length > expectedNational) {
      return `Too many digits for ${countryData?.name || 'this country'} (+${dialCode}).`
    }
  } else {
    // Fallback: ITU range 5–15 digits for unknown formats
    if (national.length < 5)  return 'Phone number is too short.'
    if (national.length > 15) return 'Phone number is too long.'
  }
  return ''
}
