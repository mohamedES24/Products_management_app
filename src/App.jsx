import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Products from './pages/Products';
import Error from './pages/Error';
import ProductDetail from './pages/ProductDetail';
import RootLayout from './pages/Root';
const router = createBrowserRouter([

  {
    path: '/', 
    element: <RootLayout/>,
    errorElement: <Error/>,
    children:[
      {index: true, element: <Home/>},
      {path: 'products',element: <Products/>},
      {path: 'products/:productId',element: <ProductDetail/>}
    ]
  },
])



function App() {
    return <RouterProvider router={router}/>;
}

export default App
