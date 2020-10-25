export const arrayToObject = (arrayOfObjects) => (
  arrayOfObjects.reduce((previous, current) => {...previous, ...current} )
)
