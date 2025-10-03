import {
    BrowserRouter,
    Route,
    Router,
    Routes
} from 'react-router-dom'

import { Home } from './../pages/Home'
import { Login } from './../pages/Login'
import { Produtos } from './../pages/Produtos'
import { Usuario } from './../pages/Usuarios'
import { Sobre } from './../pages/Sobre'
import { GerenciarUsuarios } from '../pages/Usuarios/Gerenciar'


export const Rotas = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login/:parametro' element={<Login />} />
                <Route path='/produtos' element={<Produtos />} />
                <Route path='/usuarios' element={<Usuario />} />
                <Route path='/sobre/:id' element={<Sobre />} />
                <Route path='/usuarios/:id' element={<GerenciarUsuarios/>}/>

                <Route path='*' element={<h1>Error: 404 Página não encontrada mané</h1>}/>
            </Routes>
        </BrowserRouter>
    )
}

