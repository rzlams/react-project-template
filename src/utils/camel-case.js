export const removeAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export const camelCaseize = str => {
  if (typeof str !== 'string') return ''
  const charsArrOne = ["'", '|', '°', '¬', '!', '@', '·', '#', '$', '~', '%', '½', '&', '/', '(', ')']
  const charsArrTwo = ['=', '?', '\\', '¿', '¡', '¸', '+', '*', '´', '¨', '{', '}', '[', ']', '^', '`']
  const charsArrThree = ['-', '_', '.', ':', ',', ';', '─', '<', '>']
  const charsToRemove = charsArrOne.concat(charsArrTwo, charsArrThree)
  let result = removeAccents(str)
  // get rid charsToRemove
  result = result.split('').map(char => {
    if (charsToRemove.indexOf(char) > -1) return ' '
    return char
  })
  // set correct casing
  result = result
    .join('')
    .trim()
    .split(' ')
    .map((word, index) => {
      if (index === 0) return word.toLowerCase()
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })

  return result.join('').trim()
}
