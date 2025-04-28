import { Route, Routes } from 'react-router-dom'

import Login from './auth/Login.jsx'
import Signup from './auth/Signup.jsx'
import Home from './pages/Home.jsx'
import { Box, ChakraProvider } from '@chakra-ui/react'

import Router from './routers/Router.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient(); 

function App() {

  // TODO : auth data init

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  )
}

export default App
