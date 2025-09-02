// Funciones de validación comunes

export const isRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined;
};

export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const isMinLength = (value: string, minLength: number): boolean => {
  return value.length >= minLength;
};

export const isMaxLength = (value: string, maxLength: number): boolean => {
  return value.length <= maxLength;
};

export const isNumeric = (value: string): boolean => {
  return /^\d+$/.test(value);
};

export const isDecimal = (value: string): boolean => {
  return /^\d+(\.\d+)?$/.test(value);
};

export const isDate = (date: string): boolean => {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

export const isFutureDate = (date: string): boolean => {
  const dateObj = new Date(date);
  const now = new Date();
  return dateObj > now;
};

export const isPastDate = (date: string): boolean => {
  const dateObj = new Date(date);
  const now = new Date();
  return dateObj < now;
};

export const isUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isStrongPassword = (password: string): boolean => {
  // Mínimo 8 caracteres, al menos una mayúscula, una minúscula, un número y un carácter especial
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const isCedula = (cedula: string): boolean => {
  // Validación básica de cédula ecuatoriana (10 dígitos)
  if (!/^\d{10}$/.test(cedula)) {
    return false;
  }
  
  // Algoritmo de validación de cédula ecuatoriana
  const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let suma = 0;
  
  for (let i = 0; i < 9; i++) {
    let producto = parseInt(cedula[i]) * coeficientes[i];
    if (producto >= 10) {
      producto = Math.floor(producto / 10) + (producto % 10);
    }
    suma += producto;
  }
  
  const digitoVerificador = parseInt(cedula[9]);
  const modulo = suma % 10;
  const resultado = modulo === 0 ? 0 : 10 - modulo;
  
  return resultado === digitoVerificador;
};

export const isRuc = (ruc: string): boolean => {
  // Validación básica de RUC ecuatoriano (13 dígitos)
  if (!/^\d{13}$/.test(ruc)) {
    return false;
  }
  
  // Los primeros 10 dígitos deben ser una cédula válida
  const cedula = ruc.substring(0, 10);
  if (!isCedula(cedula)) {
    return false;
  }
  
  // El tipo de contribuyente debe ser válido (dígito 11)
  const tipoContribuyente = parseInt(ruc[10]);
  if (![6, 9].includes(tipoContribuyente)) {
    return false;
  }
  
  // Los últimos 2 dígitos deben ser válidos
  const establecimiento = ruc.substring(11, 13);
  return parseInt(establecimiento) > 0;
};

// Función para validar un formulario completo
export interface ValidationRule {
  field: string;
  validators: Array<{
    validator: (value: any) => boolean;
    message: string;
  }>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string[]>;
}

export const validateForm = (
  data: Record<string, any>,
  rules: ValidationRule[]
): ValidationResult => {
  const errors: Record<string, string[]> = {};
  let isValid = true;

  rules.forEach((rule) => {
    const value = data[rule.field];
    const fieldErrors: string[] = [];

    rule.validators.forEach((validator) => {
      if (!validator.validator(value)) {
        fieldErrors.push(validator.message);
        isValid = false;
      }
    });

    if (fieldErrors.length > 0) {
      errors[rule.field] = fieldErrors;
    }
  });

  return { isValid, errors };
};

// Ejemplo de uso:
// const rules: ValidationRule[] = [
//   {
//     field: 'email',
//     validators: [
//       { validator: isRequired, message: 'El email es requerido' },
//       { validator: isEmail, message: 'El email no es válido' }
//     ]
//   }
// ];
