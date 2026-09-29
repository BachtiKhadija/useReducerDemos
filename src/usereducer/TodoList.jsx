import { useReducer } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// ==========================
// État initial
// ==========================

const initialState = {
  tasks: []
};

// ==========================
// Reducer
// ==========================

function reducer(state, action) {
  switch (action.type) {

    // Ajouter une tâche
    case "ADD_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            title: action.payload,
            completed: false
          }
        ]
      };

    // Terminer / réactiver une tâche
    case "TOGGLE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? {
                ...task,
                completed: !task.completed
              }
            : task
        )
      };

    // Supprimer une tâche
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(
          task => task.id !== action.payload
        )
      };

    // Supprimer toutes les tâches terminées
    case "CLEAR_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.filter(
          task => !task.completed
        )
      };

    default:
      return state;
  }
}

// ==========================
// Application
// ==========================

function App() {

  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  const addTask = (e) => {
    e.preventDefault();

    const title = e.target.task.value.trim();

    if (!title) return;

    dispatch({
      type: "ADD_TASK",
      payload: title
    });

    e.target.reset();
  };

  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-8">

          {/* Titre */}

          <div className="text-center mb-4">

            <h1 className="fw-bold">
              Todo List
            </h1>

            <p className="text-muted">
              Gestion des tâches avec useReducer
            </p>

          </div>

          {/* Formulaire */}

          <form
            onSubmit={addTask}
            className="d-flex gap-2 mb-4"
          >

            <input
              type="text"
              name="task"
              className="form-control"
              placeholder="Ajouter une tâche..."
            />

            <button
              type="submit"
              className="btn btn-primary"
            >
              Ajouter
            </button>

          </form>

          {/* Nombre de tâches */}

          <div className="alert alert-info">

            <strong>
              {state.tasks.length}
            </strong>{" "}
            tâche(s)

          </div>

          {/* Liste des tâches */}

          <div className="card shadow-sm">

            <div className="card-body">

              {state.tasks.length === 0 ? (

                <div className="text-center py-4">

                  <p className="text-muted mb-0">
                    Aucune tâche pour le moment.
                  </p>

                </div>

              ) : (

                state.tasks.map(task => (

                  <div
                    key={task.id}
                    className="d-flex justify-content-between align-items-center border-bottom py-3"
                  >

                    {/* Nom de la tâche */}

                    <div>

                      <span
                        className={
                          task.completed
                            ? "text-decoration-line-through text-muted"
                            : ""
                        }
                      >
                        {task.title}
                      </span>

                    </div>

                    {/* Boutons */}

                    <div className="d-flex gap-2">

                      <button
                        className={
                          task.completed
                            ? "btn btn-warning btn-sm"
                            : "btn btn-success btn-sm"
                        }
                        onClick={() =>
                          dispatch({
                            type: "TOGGLE_TASK",
                            payload: task.id
                          })
                        }
                      >
                        {task.completed
                          ? "Réactiver"
                          : "Terminer"}
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          dispatch({
                            type: "DELETE_TASK",
                            payload: task.id
                          })
                        }
                      >
                        Supprimer
                      </button>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

          {/* Supprimer les tâches terminées */}

          {state.tasks.some(task => task.completed) && (

            <button
              className="btn btn-outline-danger w-100 mt-3"
              onClick={() =>
                dispatch({
                  type: "CLEAR_COMPLETED"
                })
              }
            >
              Supprimer les tâches terminées
            </button>

          )}

        </div>

      </div>

    </div>
  );
}

export default App;