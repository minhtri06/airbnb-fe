const pickFields = (obj: { [key: string]: any }, ...fields: string[]) => {
  const pickedObj: { [key: string]: any } = {}
  if (obj) {
    for (let field of fields) {
      if (obj[field] !== undefined && obj[field] !== null) {
        pickedObj[field] = obj[field]
      }
    }
  }
  return pickedObj
}

export default pickFields
