import { Container } from "./styles";

export function Button({ title, loading = false, ...rest /* estou passando para o loading que se ele não for informado, ele vai ser falso como padrão */ }) { // aqui eu estou desestruturando o que vem de dentro de props... o props é a forma que vc usa caso não queira usar { }
    return(  
        <Container
            type="button"
            disabled={loading /* o loading é uma propriedade boleana. o que eu estou dizendo aqui é: se o loading estiver verdadeiro, ative o disabeled, se for falso, desa */}
            {...rest}
        >
            { loading ? 'Carregando...' : title /* estou dizendo que, para as informações de texto, se o loading estiver verdadeiro, ele vai colocar o texto Carregado... se estiver falso, vai colocar o texto que eu passei na propriedade dele */} 
        </Container>
    )
}