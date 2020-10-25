// maneja errores de renderizado y evita que se sigan propagando al resto de la aplicacion
// evita que react desmonte la aplicacion por completo
// asi que creo que lo mejor es ponerlo alrededor de cada ruta (EVALUAR)
// COMO MANEJAR EL ERROR?
// renderizar un componente de error o redirigir a la ruta de ese componente
// enviar al backend toda la informacion que se pueda del trace del error para que este lo almacene en un log
// Ofrecer al usuario una manera de volver a la ruta donde estaba
import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    static getDerivedStateFromError(error) {
        return { hasError: true }
    }
    render() {
        if(this.state.hasError) {
            return (
                <div>Error occurred.</div>
            )
        } else {
            return this.props.children
        }
    }
}
