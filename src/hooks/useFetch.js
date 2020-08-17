import { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { deepEqual } from '../utils'

export const useFetch = (url, body = {}, method = 'get') => {
  const cache = useRef({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [refetchTrigger, setRefetchTrigger] = useState(false)
  let params = {}
  if (method === 'get') {
    params = body
    body = {}
  }
  // NO SIRVE TODAVIA
  // cuando cambia el refetchTrigger no se recibe el balon fuera de la funcion
  const refetch = () => {
    setRefetchTrigger(!refetchTrigger)
  }

  useEffect(() => {
    console.log('entro en effect')
    if (refetchTrigger) {
      console.log('refetch')
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
