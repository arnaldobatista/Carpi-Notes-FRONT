import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/global'

import { AuthProvider } from './hooks/auth'

import theme from './styles/theme'

import { Routes } from './routes' // eu importo usando o {} porque eu exportei a função direto.

ReactDOM.createRoot(document.getElementById('root')).render( // ele vai renderizar cada componente que eu criar e colocar aqui dentro. eu preciso importar esse componente
  <React.StrictMode> 
    <ThemeProvider theme={ theme }> {/* estou passando as cores tema do sistema */}
      <GlobalStyles /> {/* estou passando as estilizações globais */}
      <AuthProvider>
        <Routes /> {/* estou passando toda a pagina. botoes, textos... tudo */}
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)
