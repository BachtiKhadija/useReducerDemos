import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TodoList from './TodoList.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import Panier from './usereducer/panier.jsx'
import Compteur from "./usereducer/CompteurUseReducer.jsx";
import Formulaire from './usereducer/Form.jsx';
import ShoppingCart from './usereducer/ShoppingCart.jsx';
import TodoApp from './usereducer/TodoList.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoApp />
  </StrictMode>,
)
