import { useState } from 'react'; // o useState serve para podermos criar estados dentro do react
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'; // o link serve para passarmos um link na pagina, o useNavigate serve para mandarmos o usuario para outro local

import { api } from '../../services/api'

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'
import logo from '../../assets/carpi-server-blog.png'

import { Container, Form, Background } from "./styles";

export function SingUp() {
    const [name, setName] = useState('') // esse é o padão para usar um estado dentro do react. quando eu uso um estado, eu posso informar um valor inicial para esse estado. posso passar 10, alguma string para ele, entre outras coisas. vc pode usar um texto vazio tambem. dentro do array, eu recedo duas informacoes do useState. 1 - o estato atual, onde eu posso acessar o que tem dentro dele, 2 - o segundo eu posso acessar uma funcao para atualizar o estado. -- podemos escolher os nomes de dentro do array. como vou usar isso para o nome do usuario, eu posso colocar nome e setnome para a funcao de atualizat o estado
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate() // para usarmos o useNavigate, precisamos estancialo.

    function handleBack() {
        navigate(-1)
    }

    function handleSingUp() { // funcao para tratar o nome, 
        if(!name || !email || !password) { // verificando se existe algum campo não preenchido.
            return alert('Preencha todos os campos!') //  coloco um return para a funcao parar -- esse alerta vai mandar um popup direto do navegador, mostrando essa mensagem
        }

        api.post('/users', {name, email, password}) // aqui eu estou fazendo uma requisicao post para /users para o meu backend. estou passando o nome, email e senha. variaveis que precisao ser recebidas dessa forma no backend
        .then(() => {
            alert('usuario cadastrado')
            handleBack() // dps que o usuario for criado, vamos levalo para a pagina inicial
        }) // se o cadastro foi feito com sucesso, ele vai retornar aquele alerta dizendo que deu bom
        .catch(e => {
            if(e.response){ // verificar se ele tiver uma resposta de erro do backend
                alert(e.response.data.message) // se tiver um erro vindo do backend, ele vai mostrar o que esta vindo de la
            } else {
                alert('nao foi possivel cadastrar')
            }
        })
    }


    return(
        <Container>
            <Background />
            <Form>
                <img src={logo} alt="" />
                <p>Aplicação para salvar e gerenciar seus links</p>

                <h2>Crie sua conta</h2>

                <Input placeholder='Nome' type='text' icon={ FiUser } onChange={e => setName(e.target.value)} /> { /* o onChange serve para eu poder pedar as informacoes que estiverem sendo alteradas no font. preciso passar uma funcao para ele, que vai me trazer o que esta sendo digitado, e entao  vou acessar o valor dela, e jogar para o meu setName.*/ }
                <Input placeholder='E-mail' type='text' icon={ FiMail } onChange={e => setEmail(e.target.value)} />
                <Input placeholder='Senha' type='password' icon={ FiLock } onChange={e => setPassword(e.target.value)} />

                <Button title='Cadastrar' onClick={handleSingUp} />
                <Link to='/'>Voltar para o login </Link>
            </Form>
        </Container>
    )
} 