import { isValidNumber, parsePhoneNumberFromString } from 'libphonenumber-js'
import { CountryOption } from '@/types/request/request'

/**
 * Valida un número de teléfono según el país seleccionado
 */
export function validatePhoneNumber(phone: string, country?: CountryOption) {
  if (!country || !phone) return 'El número de teléfono es obligatorio'

  try {
    // Limpiamos el input de cualquier carácter no numérico
    const cleanPhone = phone.replace(/\D/g, '')

    // Armamos el número completo con el código del país
    const fullNumber = `${country.callingCode}${cleanPhone}`

    const parsed = parsePhoneNumberFromString(fullNumber)
    if (!parsed) return 'Número inválido'

    if (!parsed.isValid()) return 'Introduce un número válido para el país seleccionado'

    // Opcional: también podrías validar el tipo (móvil, fijo, etc.)
    // if (parsed.getType() !== 'MOBILE') return 'Debe ser un número de celular'

    return true
  } catch {
    return 'Número inválido'
  }
}
