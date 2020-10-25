import { useState } from 'react'
import axios from 'axios'

export const useLazyFetch = (url, onCompleted = null) => {
  // TODO: manejar el error de timeout de axios
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const fetchData = async (body = {}, method = 'get') => {
    if (!url) return
    let params = {}
    if (method === 'get') {
      params = body
      body = {}
    }
    setLoading(true)

    try {
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

      if (onCompleted && typeof onCompleted === 'function') onCompleted(response.data)
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

  return [fetchData, { loading, error, data }]
}
