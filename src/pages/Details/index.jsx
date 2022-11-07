import { useState, useEffect } from 'react'
import { Container, Links, Content } from './styles' // aqui eu importo para o arquivo .js, os estilos desse arquivo
import { useParams, useNavigate } from 'react-router-dom'

import { api } from '../../services/api'

import { Header } from '../../components/Header'
import { Button } from '../../components/Button' // estou trazendo o botão para o arquivo de details
import { ButtonText } from '../../components/ButtonText' // estou trazendo o botão para o arquivo de details
import { Section } from '../../components/Section'
import { Tag } from '../../components/Tag'


export function Details() { // sempre que eu for fazer uma função, eu devo colocar o nome dessa função igual o nome do arquivo e com a primeira letra maiuscula. eu posso exportar sem usar o export default exportado a função diretamente.
  const [data, setData] = useState(null) // criando um data começando em nulo, sem nada dentro

  const params = useParams() // quero usar os parametros dps.
  const navigate = useNavigate() // funcao de voltar

  function handleBack() { // funcao de voltar 
    navigate(-1) // com o -1, voltamos de fato no historico.
  }

  async function handleRemove() { // funcao para excluir notas
    const confirm = window.confirm('Tem certeza?') // p window.confirm é uma parada de confirmacao do navegador. ele devolve um true false
    
    if(confirm) { // se ele me der um valor verdadeiro, fazer essa funcao
      await api.delete(`/notes/${params.id}`) // fazendo a funcao de deletar e mandar o ID da nota que eu quero deletar
      handleBack()
    }
  }

  useEffect(() => { // fazer um useEffect para poder carregar uma funcao.nao colocar nenum parametro para atualizacao, pois quero que ela seja executada uma unica vez
    async function fetchNote() { // funcao acincrona para poder esperar os dados chegarem do servidor
      const response = await api.get(`/notes/${params.id}`) // voiu mandar uma requisicao para a API, passando o ID das notas
      setData(response.data) // passando apra o setData, os dados de respostas da requisicao feita para a API
    }
    fetchNote() // preciso chamar a funcao 
  }, [])

  return ( // sempre tem que ter um return. esse return vai retornar minha pagina
    <Container>
      <Header />
      {/* vou envolver o main dentro de um conhetes pra poder usar codigo nele, e passar informacoes de IF nele. */}
      {
        data && //estou dizend que, se tiver alguma coisa dentro de data, vou mostrar o conteudo dentro.
        <main>
          <Content>
            <ButtonText title='Excluir nota' onClick={handleRemove} />
            <h1>
              {data.title}
            </h1>
            <p>
              {data.description}
            </p>
            {
              data.links && // só vai renderizar essa secao se tiver alguma coisa dentro dos links
              <Section title='Links úteis'>
                <Links>
                  {
                    data.links.map(link => ( // para cada item que tiver no array pego dentro do link, vou passar essas informacoes
                      <li key={String(link.id)}>
                        <a href={link.url} target='_blank' >{link.url}</a>
                      </li>
                    ))

                  }
                </Links>
              </Section>
            }
            {
              data.tags && // só vou renderizar o section, caso tinha algo dentro de tags
              <Section title='Marcadores'>
                {
                  data.tags.map(tag => (
                    <Tag key={String(tag.id)} title={tag.name} />
                  ))
                }
              </Section>
            }
            <Button title='Voltar' onClick={handleBack} />
          </Content>
        </main>
      }


    </Container>
  )
}
