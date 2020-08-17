import { useRef, useState } from 'react'
import { useCompareEffect } from './useCompareEffect'
import axios from 'axios'

export const useFetch = (url, body = {}, method = 'get') => {
  // TODO: evaluar usar cache en el store global
  // TODO: ***revisar si el 'refetchTrigger' lo hace null aun cuando no debe*** ESTO CREO QUE ESTA BIEN ASI
  // TODO: manejar el error de timeout de axios
  const cache = useRef({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [refetchTrigger, setRefetchTrigger] = useState(false)
  // no se usa useRef como en el cache porque si se quiere que 'params' y 'body' disparen el effect
  let params = {}
  if (method === 'get') {
    params = body
    body = {}
  }
  const refetch = () => {
    setRefetchTrigger(true)
  }

  useCompareEffect(() => {
    if (refetchTrigger) {
      cache.current[url] = null
    }
    let cancelRequest = false
    if (!url) return
    setLoading(true)

    const fetchData = async () => {
      if (cache.current[url]) {
        const currentData = cache.current[url]
        setData(currentData)
        setLoading(false)
      } else {
        try {
          if (cancelRequest) return

          const response = await axios.request({
            // baseURL: process.env.REACT_APP_URL,
            url,
            method,
            params,
            body,
            onUploadProgress: function (progressEvent) {
              // Do whatever you want with the native progress event
            },
            onDownloadProgress: function (progressEvent) {
              // Do whatever you want with the native progress event
            },
            headers: {
              // enviar la cookie con el token
              Authorization: 'Bearer token',
              'Content-Type': 'application/json',
            },
            // timeout: 5, // en milisegundos
          })

          cache.current[url] = response.data
          setData(response.data)
          setLoading(false)
          setRefetchTrigger(false)
        } catch (error) {
          if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
            setError(error.response)
          }
          if (error.request) {
            console.log(error.request)
            setError(error.request)
          }
          if (error.message) {
            console.log('Error', error.message)
            setError(error.message)
          }
          console.log(error.config)
          setData(null)
          setLoading(false)
          setRefetchTrigger(false)
        }
      }
    }
    fetchData()

    return function cleanup() {
      cancelRequest = true
    }
  }, [url, method, body, params, refetchTrigger])

  return { loading, error, data, refetch }
}
