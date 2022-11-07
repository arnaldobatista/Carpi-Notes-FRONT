import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { NoteItem } from '../../components/NoteItem';
import { TextArea } from '../../components/TextArea';
import { Section } from '../../components/Section'
import { Button } from '../../components/Button'
import { ButtonText } from '../../components/ButtonText'

import { api } from '../../services/api';

import { Container, Form } from "./styles"


export function New() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const [links, setLinks] = useState([]) // armazenar os links em um estado.
    const [newLink, setNewLink] = useState('')
    
    const [tags, setTags] = useState([]) // armazenar os links em um estado.
    const [newTag, setNewTag] = useState('')

    const navigate = useNavigate()

    function handleBack() {
        navigate(-1)
      } 
    
    function handleAddLink() { // funcao para pegar que tenha antes dentro do setLinks. como ele faz isso? vc precisa usar o setLinks, passar uma funcao para dentro dele, onde ele vai entregar para a funcao, o conteudo que existe la dentro. dps disso, vc precisa fazer um array passando as informacores pegas do prevState usando os 3 pontos antes, pra dizer que vc quer tudo o que tinha antes, e apos isso, vc vai passar o newLink, caso vc nao coloque os 3 pontos, ele vai pegar todo o conteudo juntamente com o array que forma esse conteudo. o new link é o estado que vai receber o novo link do front. entao, o primeiro estado, vai pegar o que o conteudo que o segundo estado criou.
        setLinks(prevState => [...prevState, newLink])
        setNewLink('') // vc precisa limpar o que tem dentro do estado que faz a criacao do historico, porque ele vai pegar o historico que vc ja colocou no estado que vai mostrar o conteudo no front
    }

    function handleRemoveLink(deleted) { // funcao para deletar itens. ele vai receber u
        setLinks(prevState => prevState.filter(link => link !== deleted)) // aqui, estou acessando os dados que estao guardados. vou fazer um filtro nele pra saber qual eu quero apagar. dps ele vai me retornar um novo array, sem o que eu pedi. como ele vai fazer isso? essa funcao vai pegar todos os itens do estado setLinks, e vai comprarar um por um, e me devolver todos que sejam diferentes do item que eu passei no deleted da funcao handleRemoveLink.
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag])
        setNewTag('') // vc limpa para nao aparecer o nome que vc tinha digitado antes, para criacao de um novo botao.
    }

    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted))
    }

    async function handleNewNote() { // funcao  para criar uma nova nota. ela vai receber os dados, acessar a api e enviar para a rota informada.
        if(!title) {
            return alert('Add um titulo')
        }
        if(newTag) {
            return alert('Add sua tag')
        }
        if(newLink) {
            return alert('Add seu link')
        }
        
        await api.post('/notes', {
            title,
            description,
            tags,
            links
        })

        alert('Nota criada com sucesso!')
        navigate(-1)
    }

    return(
        <Container>
            <Header />
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText title='Voltar' onClick={handleBack} />
                    </header>
                    <Input placeholder='Título' onChange={e => setTitle(e.target.value)} />
                    <TextArea placeholder='Observações' onChange={e => setDescription(e.target.value)}/>
                    <Section title='Links úteis'>
                        {links.map((link, index) => (
                            <NoteItem key={String(index)} value={link} onClick={() => handleRemoveLink(link)} /> 
                        ))} { /* no onClick, caso vc precise passar uma funcao com um parametro, vc precisa usar uma funcao para ela, caso contrario, a funcao vai ficar sendo executada. */ } {/* para eu poder fazer com que os links aparecao na tela, preciso fazer um map no array links, e pra cada item que tiver la dentro, vou criar um novo botao. vou passar para o click do botao, a funcao de apagar o item filtrado que temos la em cima. vou passar o parametro link, que pegamos individualmente em cada posicao do array */}
                        <NoteItem isNew placeholder='Novo link' value={newLink} onChange={e => setNewLink(e.target.value)} onClick={handleAddLink} /> {/* Preciso dizer que o valor dele vai ser o valor do novo link que eu gerar, no onchange, vou passar o que eu estiver escrevendo no front. no onClick, vou passar a funcao que vai fazer a atualizacao do estado. */}
                    </Section>
                    <Section title='Marcadores'>
                        <div className='tags'>
                            {
                                tags.map((tag, index) => (
                                    <NoteItem key={String(index)} value={tag} onClick={() => handleRemoveTag(tag)} />
                                ))
                                
                            }
                            <NoteItem isNew placeholder='Nova tag' onChange={e => setNewTag(e.target.value)} value={newTag} onClick={handleAddTag} />
                        </div>
                    </Section>
                    <Button title='Salvar' onClick={handleNewNote} />
                </Form>

            </main>
        </Container>
    )
}