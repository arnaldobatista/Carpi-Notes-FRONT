// aqui eu passo as rotas do meu app

import { Routes, Route } from 'react-router-dom' // preciso importar o react router dom. ele vai vir com 2 parametros. o ROUTES E O ROUTE.

import { New } from '../pages/New';
import { Home } from '../pages/Home';
import { Details } from '../pages/Details';
import { Profile } from '../pages/Profile';

export function AppRoutes() { // vamos usar os parametros ROUTES PARA ENVOLVER O ROUTE.
    return(
        <Routes>
            <Route path='/' element={<Home />} /> {/* vamos usar o path para passar o caminho da rota e o element para apontar o que ele vai renderizar */}
            <Route path='/new' element={<New />} />
            <Route path='/details/:id' element={<Details />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
    )
}


