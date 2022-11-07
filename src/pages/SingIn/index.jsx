import  { useState } from 'react' // preciso importar o useState para poder guardar o estado do login e senha nesse momento. ele nao serve somente para login e senha, mas para qualquer coisa que vc queira guardar como um estado.
import { FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'; // voce precisa importar o link do router dom para poder colocar os links para suas rotas

import { useAuth } from '../../hooks/auth';

import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import { Container, Form, Background } from "./styles";
import logo from '../../assets/carpi-server-blog.png'

export function SingIn() {
    const [email, setEmail] = useState('') // a criacao de um estado e dada dessa forma. primeiro, o retorno do estado, dps o que vc quer colocar no estado segundo com o set antes do nome. vc pode comecar o estado com um nada dentro.
    const [password, setPassword] = useState('') // as funcoes que atualizao o estado, eu vou passar para o imput da pagina.

    const { singIn } = useAuth() // recebendo a funcao singIn  do auth.

    function handleSingIn() { // eu preciso criar uma funcao para lidar com o singIn que eu importei. -- quando essa funcao ser executada, ela vai chamar o singIn e passar o login e a senha para a funcao 
        singIn({email, password}) // entao eu chamo o singin e passo as informacoes que eu preciso para o singIn funcionar. no caso, o login e senha
    }

    return(
        <Container>
            <Form>
                <img src={logo} alt="" />
                <p>Aplicação para salvar e gerenciar seus links</p>

                <h2>Faça seu login</h2>

                <Input placeholder='E-mail' type='text' icon={ FiMail } onChange={ e => setEmail(e.target.value)} /> {/* para colocar algo dentro do estado, é necessario executar a funcao de set. ea vai receber algo vindo do tarfetr.value*/}
                <Input placeholder='Senha' type='password' icon={ FiLock } onChange={ e => setPassword(e.target.value)} /> { /* aqui, estou usando uma funcao para poder pegar o estado anterior e atualizar. o onChange server para ele capturar tova vez que o conteudo de algo for alteradoß */}

                <Button title='Entrar' onClick={ handleSingIn }/> { /* agora, para que os valores sejam mandados para o hook de autenticacao, é só executar a funcao de handleSingIn */ }
                <Link to='/register'>
                    Criar conta
                </Link> {/* voce não vai mais precisar colocar o a href="" para gerar seus links. com o link do router dom, voce passa somente o Link e ja era*/}
            </Form>
            <Background />
        </Container>
    )
}