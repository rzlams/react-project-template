import { useRef, useEffect } from 'react'
import { deepEqual } from '../utils'

export const useCompareEffect = (fn, deps, compareType = 'simple') => {
  const isFirst = useRef(true)
  const prevDeps = useRef(deps)

  useEffect(() => {
    let isSame

    if (compareType === 'deep') {
      isSame = prevDeps.current.every((prevDep, index) => deepEqual(prevDep, deps[index]))
    }
    if (compareType === 'simple') {
      isSame = prevDeps.current.every((prevDep, index) => JSON.stringify(prevDep) === JSON.stringify(deps[index]))
    }

    if (isFirst.current || !isSame) {
      fn()
    }

    isFirst.current = false
    prevDeps.current = deps
  })
  // opcionalmente puedo agregar 'deps' como segundo argumento pero me parecio innecesario
  // sin el segundo argumento evito que react haga cualquier comprobacion y yo me encargo totalmente de eso
}
