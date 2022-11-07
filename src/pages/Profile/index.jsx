import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'; // serve para usarmos no lugar do href. e ele ainda salva os historicos no botao de voltar 

import { useAuth } from '../../hooks/auth'

import { api } from '../../services/api';
import avatarPlaceholder from '../../assets/avatar_placeholder.png'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container, Form, Avatar } from "./styles";

export function Profile() { // funcao para mostrar/editar os dados do usuario
    const { user, updateProfile } = useAuth() // pegando os dados do usuario do useAuth

    const [name, useName] = useState(user.name) // o nome do usuario que vai aparece, por padrao, é o nome dele mesmo.
    const [email, useEmail] = useState(user.email)
    const [passwordOld, usepasswordOld] = useState() // nao vai aparecer a senha dele. 
    const [passwordNew, usePasswordNew] = useState()

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder // estou dizendo que, se tiver um avatar, ele vai renderizar o link do avatar do usuario, se nao, ele vai mostrar a imagem padrao. dentro dos ``, eu preciso buscar as informacoes de imagem de dentro da api. entao preciso importar as configs da api pra nao precisar ficar escrevendo o endereco.

    const [avatar, setAvatar] = useState(avatarUrl) // o estado que mostra a imagem do perfil. caso ele for atualizado, tambem sera atualizado no front. --- o avatar para o front so conseguira aparecer se ele for um link. um arquivo nao aparece.
    const [avatarFile, setAvatarFile] = useState(null) // esse estado vai pegar a nova imagem caso o front queira subir uma nova imagem --- esse avatarFile, eu vou passar para o backend usando a funcao handleUpdate.

    const navigate = useNavigate()

    function handleBack() {
        navigate(-1)
    }

    async function handleUpdate() { // tratamento do dados para atualizacao. -- para essa funcao ser executada, é só mandar ela pro botao de salvar.
        const updated = { // criando o user para poder mandar pro backend
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }

        const userUpdated = Object.assign(user, updated) // esse object.assign esta vendo o que foi atualizado e vai atualizar somente o que for necessario

        await updateProfile({ user: userUpdated, avatarFile }) // mandamos o obj user e o avatarFile para o useAuth, onde ele fara os processos para atualizacao de dados no backend
    }

    function handleChangeAvatar(event) { // aqui, ele vai receber os dados do event que foram mandados na execucao da fucao pelo botao.
        const file = event.target.files[0] // o event vai te entregar varias paradas, o que vc vai precisar para a atualizacao da imagem de perfil e o que tem dentro do target.files... se vc passar mais de um arquivo, ele vai te entregar um array com esses arquivos.
        setAvatarFile(file) // quando o usuario colocar um novo arquivo, ele vai ser carregado para o serAvatarFile.

        const imagePreview = URL.createObjectURL(file) // estou passando para essa nova constante, a nova URL criada pela funcao createObjectURL. nela, eu passo o arquivo que eu quero criar o link.
        setAvatar(imagePreview) //- O LINK criado eu passo para o setAvatar
    }

    return(
        <Container>
            <header>
                <button type='button' onClick={handleBack} >
                    <FiArrowLeft />
                </button>
            </header>

            <Form>
                <Avatar >
                    <img src={avatar} alt="Foto do usuário" />
                    <label htmlFor='avatar' >
                        <FiCamera />
                        <input id='avatar' type='file' onChange={handleChangeAvatar} /> { /* o onChange vai passar de forma automatica, as informacoes necessarias para o event da funcao.  */ }
                    </label>
                </Avatar>
                <Input placeholder='Nome' type='text' icon={FiUser} value={name} onChange={e => useName(e.target.value)} /> { /* novamente, o onChange serve para podermos pegar o valor do que esta sendo digitado. juntamente com ele, estamos atualizando o useState referente a ele. */ }
                <Input placeholder='E-mail' type='text' icon={FiMail} value={email} onChange={e => useEmail(e.target.value)} />
                <Input placeholder='Senha atual' type='password' icon={FiLock} onChange={e => usepasswordOld(e.target.value)} />
                <Input placeholder='Nova senha' type='password' icon={FiLock} onChange={e => usePasswordNew(e.target.value)} />
                <Button title='Salvar' onClick={handleUpdate} />
            </Form>
        </Container>
    )
}