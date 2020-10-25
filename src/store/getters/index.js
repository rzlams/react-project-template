export const useStore = (state) => ({
  // sirve para comprobar que el usuario actual tenga los permisos que se pasan como argumento
  // recibe un array de strings con el siguiente formato Model.Action- 'post.edit'
    hasPermissions: (permissions) => permissions.every(perm => state.auth.permissions.some(v => v === perm)),
})
