// criacao do contexto.
// para toda que toda nossa aplicacao tenha acesso a esse contexto, preciso importa-lo para o main.jsx, local onde todas as nossas rotas existem
import { createContext, useContext, useState, useEffect } from "react"; // importando o useContext de dentro do react. ele serve para tratar dos contextos. useEffect serve para Você dizer ao Reaßct que o componente precisa fazer algo depois da renderização. Isto é, depois que realizar as atualizações do DOM.

import { api } from '../services/api'

export const AuthContext = createContext({}) // podemos passar para o contexto, um objeto vazio de principio

function AuthProvider({ children }){ // aqui, ele esta recebendo o que tem detro do authProvider no main.jsx
    const [data, setData] = useState({}) // vou usar esse estado para armazenar o usuario e o token. ele vai iniciar como um obj vazio. eu posso compartilhar meu estado data com outras paginas usando o hook

    async function singIn({ email, password }) { // essa funcao assincrona, vai receber email e senha. quado eu passo o { asdasd, asds } eu posso passar o email e senha em qualquer ordem --- essa funcao vai receber o login e senha que sera enviada para essa funcao. por isso, estou passando essa fucnao como valor para o AuthContext.Provider
        try { // aqui ele vai tentar fazer acessar a api e passar o login e a senha. se der certo, ele vai me devolver algo
            const response = await api.post('/sessions', { email, password }) // vou colocar a resposta do post/session dentro do response que esta recebendo o email e a senha
            const { user, token } = response.data // posso desestruturar a resposta do response

            localStorage.setItem('@carpinotes:user', JSON.stringify(user)) // preciso usar o localStorage para guardar as informações de usuario logado ou nao. o  localstorage usa chave valor. pracisamos passar um nome e o valor para armazernar algo la. para podermos salvar algo no nosso local storage, precisamos converter o conteudo do que a gente quer guardar la em texto. como o que tem dentro do USER é um JSON, entao precismos mostrar que é um json e converter em texto
            localStorage.setItem('@carpinotes:token', token) // não preciso converter o token, porque o token ja é um texto.

            api.defaults.headers.common['Authorization'] = `Bearer ${token}` // estou dizendo que em todas os headers, o token padrao é esse. 
            setData({ user, token })
        } catch(e) {
            if(e.response){ // se tiver algum erro do lado do servidor
                alert(e.response.data.message)
            } else { // se ocorrer qualquer outro erro
                alert('Não foi possível entrar!')
            }
        }
    }

    function singOut() {
        localStorage.removeItem('@carpinotes:user') // preciso remover os dados do local storage
        localStorage.removeItem('@carpinotes:token')

        setData({}) // preciso limpar o setData tambem, para que nao tenha os dados de login dentro do meus estado de singIn 
    }

    async function updateProfile({ user, avatarFile }) { // fazendo a funcao de atualizacao de dados de usuario. 
        try {
            if(avatarFile) { // o if vai servir para verificar se existe um arquivo para atualizar vindo do front. caso tenha...
                const fileUploadForm = new FormData() // estou chamando a funcao FormData para eu poder mandar um arquivo para o backend
                fileUploadForm.append('avatar', avatarFile) // com a funcao chamada, eu passo o campo que o backend esta esperando a atualizacao da imagem, e passo a imagem. o append é como se fosse o enviar do array, só que para enviar o arquivo para o backend. nao estou passando para o backend ainda, só preparando o arquivo. 
                
                const response = await api.patch('/users/avatar', fileUploadForm) // após o arquivo ser preparado, vamos chamar a api e passar a rota que estara esperando o arquivo do outro lado.
                user.avatar = response.data.avatar // aqui, estou pegando a resposta e passando para o user.avatar
            
            
            }


            await api.put('/users', user) // mandando para o backend o novo ususario
            localStorage.setItem('@carpinotes:user', JSON.stringify(user)) // preciso atualizar o local storage tambem. -- o setItem serve tambem para atualizar o conteudo atual

            setData({ user, token: data.token }) // preciso atualizar meu setData tambem, passando o usuario e o token, que esta dendo do meu estado.
            alert('Perfil atualizado')
        } catch(e) {
            if(e.response){ // se tiver algum erro do lado do servidor
                alert(e.response.data.message)
            } else { // se ocorrer qualquer outro erro
                alert('Não foi possível entrar!')
            }
        }
    }

    useEffect(() => { // Como funbciona o useEffect. a primeira parte dele é a execucao de uma funcao. a segunda coisa é um estado. toda vez que esse estado mudar, essa funcao vai  ser executada.ß
        const user = localStorage.getItem('@carpinotes:user')
        const token = localStorage.getItem('@carpinotes:token')
        
        if(user && token){
            api.defaults.headers.common['Authorization'] = `Bearer ${token}` // estou dizendo que em todas os headers, o token padrao é esse. 
            
            setData({ token, user: JSON.parse(user)}) // aqui, eu esotu pegando os dados como texto e transformando em parse novamente
        }
    }, []) // se vc deixar o array sem nada, ele vai executar somente uma vez, quando ele for carregado
 
    return (
        <AuthContext.Provider value={{ singIn, singOut, updateProfile, user: data.user }} > { /* passando a funcao de singIn para o AuthContext.Provider para poder recber as informacoes. passando o data.user para outros locais e renomeando como user. preciso compartirar o meu singOut com meu estado tambem.*/}
            {children} 
        </AuthContext.Provider> /* precisamos envonver todas nossas rotas dentro do nosso contexto */
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context
}

export { AuthProvider, useAuth }