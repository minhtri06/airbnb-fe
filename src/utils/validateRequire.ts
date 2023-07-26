const validateRequire = (obj: { [key: string]: any }, ...fields: string[]) => {
  const errors: { [key: string]: string } = {}
  let isValid = true

  for (let field of fields) {
    const value = obj[field]
    if (value === null || value === undefined || value === '') {
      isValid = false
      errors[field] = 'This field is required'
    }
  }

  return isValid ? null : errors
}

export default validateRequire
