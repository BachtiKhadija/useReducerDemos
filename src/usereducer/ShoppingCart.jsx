import {useReducer} from "react"
//**********Liste de produits******************** */

const products = [
  {
    id: 1,
    name: "Ordinateur portable",
    price: 700,
    image: "https://placehold.co/300x200?text=Ordinateur"
  },
  {
    id: 2,
    name: "Souris",
    price: 25,
    image: "https://placehold.co/300x200?text=Souris"
  },
  {
    id: 3,
    name: "Clavier",
    price: 45,
    image: "https://placehold.co/300x200?text=Clavier"
  },
  {
    id: 4,
    name: "Casque",
    price: 60,
    image: "https://placehold.co/300x200?text=Casque"
  }
];
//**********Liste de produits******************** */
const initialState={cart:[]}

const reducer=(state,action)=>{
      switch(action.type){
        case "ADD_TO_CART":
            let p=action.payload;
            let exist=state.cart.find(item=>item.id===p.id);
            if(exist){
                 return {...state,cart: state.cart.map(prod=>prod.id===p.id?{...prod,quantity:prod.quantity+1}:prod)}//new state
            }else{
                return {...state,cart:[...state.cart,{...p,quantity:1}]};
            }
        case "REMOVE_FROM_CART":
            let idP=action.payload;
            return {...state,cart:state.cart.filter(p=>p.id!==idP)};

        case "INCREMENT":
             let id=action.payload;
             return {...state,cart:state.cart.map(item=>item.id===id?{...item,quantity:item.quantity+1}:item)};
          
        case "DECREMENT":
             return {...state,cart:state.cart.map(item=>item.id===action.payload?{...item,quantity:item.quantity-1}:item).filter(item=>item.quantity>0)};

        case "CLEAR_CART":
             return {...state,cart:[]};




      }







}




const ShoppingCart=()=>{


     const[state,dispatch]=useReducer(reducer,initialState);






return(
    <div className="container py-5">

    
      <div className="d-flex justify-content-between align-items-center mb-5">

        <h1 className="fw-bold">
             Store
        </h1>

      </div>

      <div className="row">

       

        <div className="col-md-8">

          <h2 className="mb-4">
            Nos produits
          </h2>

          <div className="row">

            {products.map(product => (

              <div
                className="col-md-6 mb-4"
                key={product.id}
              >

                <div className="card h-100 shadow-sm">

                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                  />

                  <div className="card-body d-flex flex-column">

                    <h5 className="card-title">
                      {product.name}
                    </h5>

                    <p className="card-text text-primary fw-bold fs-5">
                      {product.price} 
                    </p>

                    <button
                      className="btn btn-success mt-auto"
                      onClick={() =>
                        dispatch({
                          type: "ADD_TO_CART",
                          payload: product
                        })
                      }
                    >
                      Ajouter au panier
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>


        <div className="col-md-4">

          <div className="card shadow">

            <div className="card-header bg-dark text-white">

              <h4 className="mb-0">
                   my Cart
              </h4>

            </div>

            <div className="card-body">

              {state.cart.length === 0 ? (

                <div className="text-center py-4">

                  <p className="text-muted">
                    Votre panier est vide.
                  </p>

                </div>

              ) : (

                <>

                  {/* Produits du panier */}

                  {state.cart.map(item => (

                    <div
                      key={item.id}
                      className="border-bottom pb-3 mb-3"
                    >

                      <div className="d-flex justify-content-between">

                        <div>

                          <h6 className="mb-1">
                            {item.name} - {item.price}
                          </h6>

                      

                        </div>

                        <strong>
                          {item.price * item.quantity} 
                        </strong>

                      </div>

                   

                      <div className="d-flex align-items-center justify-content-between mt-2">

                        <div className="btn-group">

                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              dispatch({
                                type: "DECREMENT",
                                payload: item.id
                              })
                            }
                          >
                            -
                          </button>

                          <button
                            className="btn btn-outline-secondary btn-sm"
                            disabled
                          >
                            {item.quantity}
                          </button>

                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              dispatch({
                                type: "INCREMENT",
                                payload: item.id
                              })
                            }
                          >
                            +
                          </button>

                        </div>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item.id
                            })
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  ))}


                 

                  <button
                    className="btn btn-danger w-100 mt-3"
                    onClick={() =>
                      dispatch({
                        type: "CLEAR_CART"
                      })
                    }
                  >
                     Vider le panier
                  </button>

             

                </>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
)









}
export default ShoppingCart;