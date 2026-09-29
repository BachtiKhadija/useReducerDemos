import { useEffect, useState } from 'react'

function TodoList() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [showCompleted, setShowCompleted] = useState(false)


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(response => response.json())
      .then(data => {
        setTasks(data)
      })
      .catch(error => {
        console.error('Erreur :', error)
      })
  }, [])

  // Ajouter une tâche
  const addTask = (e) => {
    e.preventDefault()

    if (newTask.trim() === '') {
      return
    }

    const task = {
      id: Date.now(),
      title: newTask,
      completed: false
    }

    setTasks([...tasks, task])
    setNewTask('')
  }

  // Modifier l'état d'une tâche
  const toggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  // Supprimer une tâche
  const deleteTask = (id) => {
    setTasks(
      tasks.filter(task => task.id !== id)
    )
  }

  // Filtrer les tâches
  const displayedTasks = showCompleted
    ? tasks.filter(task => task.completed)
    : tasks

  // Nombre de tâches restantes
  const remainingTasks = tasks.filter(
    task => !task.completed
  ).length

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="card shadow">

            <div className="card-header bg-primary text-white text-center">
              <h1>Todo List</h1>
            </div>

            <div className="card-body">

              {/* Formulaire */}
              <form onSubmit={addTask} className="d-flex mb-4">

                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Écrire une nouvelle tâche..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />

                <button
                  type="submit"
                  className="btn btn-success"
                >
                  Ajouter
                </button>

              </form>

              {/* Compteur */}
              <div className="alert alert-info">
                Tâches restantes : <strong>{remainingTasks}</strong>
              </div>

              {/* Boutons de filtre */}
              <div className="mb-3">

                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => setShowCompleted(false)}
                >
                  Toutes
                </button>

                <button
                  className="btn btn-outline-success"
                  onClick={() => setShowCompleted(true)}
                >
                  Terminées
                </button>

              </div>

              {/* Liste des tâches */}
              <ul className="list-group">

                {displayedTasks.map(task => (

                  <li
                    key={task.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >

                    <div>

                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                      />

                      <span
                        className={
                          task.completed
                            ? 'text-decoration-line-through text-muted'
                            : ''
                        }
                      >
                        {task.title}
                      </span>

                    </div>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTask(task.id)}
                    >
                      Supprimer
                    </button>

                  </li>

                ))}

              </ul>

              {displayedTasks.length === 0 && (
                <div className="alert alert-warning mt-3">
                  Aucune tâche à afficher.
                </div>
              )}

            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

export default TodoList