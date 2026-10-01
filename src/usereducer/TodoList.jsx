import React, { useReducer, useEffect, useState } from 'react';


// 1. État initial du reducer
const initialState = {
  todos: [],
  loading: true,
  error: null
};


const todoReducer = (state, action) => {//action={type,payload}
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        todos: action.payload,
        error: null
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: 'Erreur lors du chargement des tâches'
      };
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos,{id:Date.now(), title: action.payload, completed: false}]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };
    default:
      return state;
  }
}

//créer le composant TodoApp
 const TodoApp = () => {
  // Initialisation de useReducer
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodoText, setNewTodoText] = useState('');

  // 3. useEffect pour récupérer les données de l'API
  useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5').then(response => response.json()).then(data => {
          dispatch({ type: 'FETCH_SUCCESS', payload: data });
        }).catch(err => {
          dispatch({ type: 'FETCH_ERROR' });
        });


  
  }, []);

  // Handler pour l'ajout d'une tâche
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodoText.trim() === '') return;

    /*const newTodo = {
      id: Date.now(), // ID unique temporaire
      title: newTodoText,
      completed: false
    };*/

    dispatch({ type: 'ADD_TODO', payload: newTodoText });
    setNewTodoText('');
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white text-center">
          <h2>Ma Liste de Tâches</h2>
        </div>
        
        <div className="card-body">
          {/* Formulaire d'ajout */}
          <form onSubmit={handleAddTodo} className="mb-4">
            <div className="mb-3  d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Ajouter une nouvelle tâche..."
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
              />
              <button className="btn btn-primary" >
                Ajouter
              </button>
            </div>
          </form>

          {/* Affichage du chargement ou de l'erreur */}
          {state.loading && (
            <div className="text-center my-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          )}

          {state.error && (
            <div className="alert alert-danger" role="alert">
              {state.error}
            </div>
          )}

          {/* Liste des tâches */}
          {!state.loading && !state.error && (
            <ul className="list-group">
              {state.todos.length === 0 ? (
                <li className="list-group-item text-center text-muted">
                  Aucune tâche disponible.
                </li>
              ) : (
                state.todos.map((todo) => (
                  <li
                    key={todo.id}
                    className={`list-group-item d-flex justify-content-between align-items-center ${
                      todo.completed ? 'list-group-item-light' : ''
                    }`}
                  >
                    <span
                      onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                      style={{
          
                        textDecoration: todo.completed ? 'line-through' : 'none',
                        color: todo.completed ? '#6c757d' : '#000'
                      }}
                    >
                      {todo.title}
                    </span>
                    <button  type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                    >
                      Supprimer
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
export default TodoApp;