// retorna el payload del JWT
export const parseJwt = token => {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

// retorna true si el JWT esta vigente y false si expiro
export const checkJwtExpiration = (payload, preventTime = 30) => {
  const now = parseInt(Date.now() / 1000) // transforma de milisegundos a segundos

  return now < payload.exp - preventTime
}
