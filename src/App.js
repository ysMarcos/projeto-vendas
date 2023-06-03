import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/Home';
import { CategoriaPage } from './pages/Categoria';
import { ProdutoPage } from './pages/Produto';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path: '/categoria/:categorias_id',
    element: <CategoriaPage />
  },
  {
    path: '/produto/:id',
    element: <ProdutoPage />
  }
])

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;
