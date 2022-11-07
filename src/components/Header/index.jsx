import { RiShutDownLine } from 'react-icons/ri'
import { useAuth } from '../../hooks/auth'; // precivso importar meu hook referente ao login e parecidos

import { api } from '../../services/api';
import avatarPlaceholder from '../../assets/avatar_placeholder.png'

import { Container, Profile, Logout } from "./styles";

export function Header() {
    const { singOut, user } = useAuth() // esqueceu de cxecutar o useAuth kkkkk porra

    const avatarUrl = user.avatar? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder // estou dizendo que, se tiver um avatar, ele vai renderizar o link do avatar do usuario, se nao, ele vai mostrar a imagem padrao. dentro dos ``, eu preciso buscar as informacoes de imagem de dentro da api. entao preciso importar as configs da api pra nao precisar ficar escrevendo o endereco.

    return(
        <Container>
            <Profile to='/profile'>
                <img
                    src={avatarUrl}
                    alt={user.name}
                />
                <div>
                    <span>Bem-vindo</span>
                    <strong>{user.name}</strong>
                </div>
            </Profile>
            <Logout onClick={singOut} >
                <RiShutDownLine />
            </Logout>
        </Container>
    )

}
