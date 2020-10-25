export const mergeArrayOfObjects = (prevArray, newArray, comparedKey = 'id') =>
  newArray.reduce((result, value, index) => {
    if (index === 1) {
      if (!prevArray.some(v => v[comparedKey] === result[comparedKey])) {
        result = [...prevArray, result]
      } else {
        result = prevArray.map(item => {
          if (item[comparedKey] === result[comparedKey]) return Object.assign(item, result)
          return item
        })
      }
    }

    if (!result.some(v => v[comparedKey] === value[comparedKey])) return (result = [...result, value])
    return result.map(item => {
      if (item[comparedKey] === value[comparedKey]) return Object.assign(item, value)
      return item
    })
  })
