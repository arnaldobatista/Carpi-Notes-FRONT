// aqui eu passo as rotas do meu app

import { Routes, Route } from 'react-router-dom' // preciso importar o react router dom. ele vai vir com 2 parametros. o ROUTES E O ROUTE.

import { SingIn } from '../pages/SingIn';
import { SingUp } from '../pages/SingUp';


export function AuthRoutes() { // vamos usar os parametros ROUTES PARA ENVOLVER O ROUTE.
    return(
        <Routes>
            <Route path='/' element={<SingIn />} /> {/* vamos usar o path para passar o caminho da rota e o element para apontar o que ele vai renderizar */}
            <Route path='/register' element={<SingUp />} />
        </Routes>
    )
}


