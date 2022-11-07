import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { FiPlus, FiSearch } from 'react-icons/fi'

import { api } from '../../services/api';


import { Container, Brand, Menu, Search, Contant, NewNote } from "./styles";

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { Section } from '../../components/Section'
import { ButtonText } from '../../components/ButtonText'
import { Note } from '../../components/Note'
import logo from '../../assets/carpi-server-blog.png'


export function Home() {
    const [search, setSearch] = useState('') // iniciando o estado da pesquisa com uma strig com nada dentro. o setSearch vai receber o que tem detro da pesquisa
    const [tags, setTags] = useState([]) // estado para guardar os itens de tags vindos do backend
    const [tagsSelected, setTagsSelected] = useState([])
    const [notes, setNotes] = useState([]) // estado para guardar as notas respostas do servidor.

    const navigate = useNavigate() // estanciar o useNavigate para poder uzar nas notas.

    function handleTagSelected(tagName) { // funcao para tratar as tags selecionadas
        if(tagName === 'all'){ // estou dizendo que se dentro do tegName estiver com o todos selecionado, eu quero inserir um array vazio. esse array vazio vai limpart todos os valores e consequentimente limpar todas as listas selecionadas
            return setTagsSelected([])
        } 

        const alreadySelected = tagsSelected.includes(tagName)

        if (alreadySelected) {
            const filteredTags = tagsSelected.filter(tag => tag !== tagName)
            setTagsSelected(filteredTags)
        } else {
            setTagsSelected(prevState => [...prevState, tagName]) // aqui, ele vai guardar os itens selecionados.
        }
    }

    function handleDatails(id){ //  função para clicar na nota e levar para outro local. essa função vai receber o id da nota.
        navigate(`/details/${id}`)
    }

    useEffect(() => { // toda vez que a pagina for carregada, vamos...
        async function fetchTags() { // executar uma funcao que...
            const response = await api.get('/tags') // ira fazer uma requisicao a api no caminho das tags
            setTags(response.data) // vou armazenar dentro do meu setTags, os dados retornados da solicitacao feita para a api. 
        }
        fetchTags() // executando minha funcao dentro do useEffect.
    }, [])

    useEffect(() => {
        async function fetchNotes() { // funcao para buscar notas
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`) // pesquisand dentro da api, estou passando pelo link, o que tem dentro da  pesquisa e os itens selecionados nas notas ao lado
            setNotes(response.data) // eu passo a resposta dessa pesquisa para o setNotes
        }
        fetchNotes() // pra funcionar, vc precisa chamar a funcao.
        

    }, [tagsSelected, search]) // esse useEffect vai executar as funcoes dentro dele de acordo com que as selecoes de tags ou o conteudo da pesquisa mudar



    return (
        <Container>
            <Brand>
                <img src={logo} alt="" />
            </Brand>

            <Header />

            <Menu>
                <li><ButtonText title='Todos' isActive={tagsSelected.length === 0} onClick={() => handleTagSelected('all')} /></li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)} ><ButtonText isActive={tagsSelected.includes(tag.name)} title={tag.name} onClick={() => handleTagSelected(tag.name)} /></li>
                    ))
                } { /* estou dizendo que, pra cada item do array tags, vou criar um novo ButtonText. estou executando uma funcao dentro do click que  */}
            </Menu>

            <Search>
                <Input placeholder="Pesquisar pelo titulo" icon={FiSearch} onChange={e => setSearch(e.target.value)} />
            </Search>

            <Contant>
                <Section title='Minhas Notas'>
                    {
                        notes.map(note => (
                            <Note key={String(note.id)} data={note} onClick={() => handleDatails(note.id)} />
                        ))
                    }
                </Section>
            </Contant>

            <NewNote to='/new'>
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    )
}