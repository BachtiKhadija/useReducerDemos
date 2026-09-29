import { useReducer } from "react";

const initialState = {
  name: "",
  email: "",

  data:null

};

const reducer=(state, action)=> {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.payload
      };

    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload
      };

  

      case "SUBMIT":
           return {
          ...state,
              data : {...action.payload}};
   


    default:
      return state;
  }
}

const Formulaire=() =>{
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    <form>
      <input
        value={state.name}
        onChange={(e) =>dispatch({ type: "SET_NAME",payload: e.target.value})
        }
      />

      <input
        value={state.email}
        onChange={(e) =>dispatch({type: "SET_EMAIL",payload: e.target.value  })
        }
      />

      <button type="button" onClick={() => dispatch({ type: "SUBMIT",payload:{name:state.name,email:state.email} })}>
        Envoyer
      </button>

     

    </form>

    {
        state.data?(

           <ul>
           <li> nom :{state.data.name}</li>
           <li>email : {state.data.email}</li>
           </ul>

        ):<span>loading ....</span>
    }
    </>
  );
}
export default Formulaire;