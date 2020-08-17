export default {
  checkPermissions: ({ ...rest }, { permissions, auth }) => {
    try {
      const hasPermissions = permissions.every(perm => auth.permissions.some(v => v === perm))
      return hasPermissions
        ? { next: true, redirectPath: null, ...rest }
        : { next: false, component: null, redirectPath: '/fetch', redirectReason: 'Already Logged In' }
    } catch (err) {
      console.error(err)
    }
  },

  // Aplica a vistas que no queremos que el usuario visite una vez que este logueado (Ej: signup o login)
  alreadyLoggedIn: ({ ...rest }, { auth }) => {
    try {
      return !!localStorage.getItem('crushiumjwt')
        ? { next: false, component: null, redirectPath: '/fetch' }
        : { next: true, redirectPath: null, ...rest }
    } catch (err) {
      console.error(err)
    }
  },
  // Aplica a vistas que requieren que el usuario este logueado
  privateRoute: ({ ...rest }, { auth }) => {
    try {
      return !!localStorage.getItem('crushiumjwt')
        ? { next: true, redirectPath: null, ...rest }
        : { next: false, component: null, redirectPath: '/fetch' }
    } catch (err) {
      console.error(err)
    }
  },
}
