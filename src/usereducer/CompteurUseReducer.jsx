import { useReducer } from "react"


//pour utiliser useReducer je dois créer un reducer
 const initialState={count:0};



const compterReducer=(s,action)=>{
    //action => {type:typeOfAction, payload: donner nécessaires pour éxecuter l'action;et il est facultatif }
    //les actions qu on va avoir dans ce projet sont : {type:"increment"} , {type:"decrement"}
   switch(action.type){
      case "increment":
          return {...s,count:s.count+action.payload};
      case "decrement":
         return {...s,count:s.count-action.payload};
       default: return s;
      
   }

}

const Compteur=()=>{
    const[state,dispatch] =useReducer(compterReducer,initialState)
  return(

  <div>
      <p>Compteur : {state.count}</p>

      <button onClick={() =>dispatch({type:"increment",payload:2})}>
        +1
      </button>

      <button onClick={() =>dispatch({type:"decrement",payload:1})}>
        -1
      </button>
    </div>


  )



}
export default Compteur;