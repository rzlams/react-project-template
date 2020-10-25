// retorna true si ambos valores (incluidos objetos y arrays) son iguales
// si dos objetos tienen las mismas key y valores pero en posiciones diferente, retorna false
export const deepEqual = (a, b) => {
  let keyA, keyB
  if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
    var count = [0, 0]
    for (keyA in a) count[0]++
    for (keyB in b) count[1]++
    if (count[0] - count[1] !== 0) {
      return false
    }
    for (keyA in a) {
      if (!(keyA in b) || !deepEqual(a[keyA], b[keyA])) {
        return false
      }
    }
    for (keyB in b) {
      if (!(keyB in a) || !deepEqual(b[keyB], a[keyB])) {
        return false
      }
    }

    return true
  } else {
    return a === b
  }
}
