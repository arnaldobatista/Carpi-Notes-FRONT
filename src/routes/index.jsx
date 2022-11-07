// esse arquivo server para fazer a renderização das rotas e separar os permições das rotas.

import { BrowserRouter } from 'react-router-dom' 
import { useAuth } from '../hooks/auth' // importar o useAuth para poder fazer a checagem do usuario

import { AppRoutes } from './app.routes' // aqui vc importa as rotas criadas
import { AuthRoutes } from './auth.routes' 

export function Routes() {
    const { user } = useAuth() //importar o user para poder fazer a checagem de usuario

    return(
        <BrowserRouter> { /* aqui vocevai envolver as rotas importadas */}
            {user ? <AppRoutes /> : <AuthRoutes />} { /* aqui voce vai colcoar as rotas importadas e colocar um IF pra saber se o usuario esta logado ou não, para poder levalo para rotas alternativas */}
        </BrowserRouter>
    )
}

// professor não falou ainda pra que isso serve.. 