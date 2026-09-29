import { useReducer } from "react";

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



const initialState = {
  cart: []
};



const reducer=(state, action)=> {
  switch (action.type) {

    // Ajouter un produit
    case "ADD_TO_CART": {
      const product = action.payload;

      const existingProduct = state.cart.find(
        item => item.id === product.id
      );
      // Si le produit existe déjà
      if (existingProduct) {
        return {
          ...state,

          cart: state.cart.map(item =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1
                }
              : item
          )
        };
      }

      // Sinon, ajouter le produit
      return {
        ...state,

        cart: [
          ...state.cart,
          {
            ...product,
            quantity: 1
          }
        ]
      };
    }

    // Augmenter la quantité
    case "INCREMENT": {
      return {
        ...state,

        cart: state.cart.map(item =>
          item.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      };
    }

    // Diminuer la quantité
    case "DECREMENT": {
      return {
        ...state,

        cart: state.cart
          .map(item =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1
                }
              : item
          )
          .filter(item => item.quantity > 0)
      };
    }

    // Supprimer complètement
    case "REMOVE_FROM_CART": {
      return {
        ...state,

        cart: state.cart.filter(
          item => item.id !== action.payload
        )
      };
    }

    // Vider le panier
    case "CLEAR_CART": {
      return {
        ...state,
        cart: []
      };
    }

    default:
      return state;
  }
}



const Panier=()=> {

  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Calcul du nombre total d'articles
  const totalItems = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calcul du prix total
  const totalPrice = state.cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div className="container py-5">

    
      <div className="d-flex justify-content-between align-items-center mb-5">

        <h1 className="fw-bold">
             Store
        </h1>

        <button
          className="btn btn-primary position-relative"
        >
          Panier

          <span className="position-absolute top-0 start-100  badge rounded bg-danger">
            {totalItems}
          </span>
        </button>

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
                            {item.name}
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


                  <div className="d-flex justify-content-between fs-5 fw-bold">

                    <span>
                      Total
                    </span>

                    <span className="text-primary">
                      {totalPrice} 
                    </span>

                  </div>

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

                  <button
                    className="btn btn-success w-100 mt-2"
                    onClick={() =>
                      alert("Commande validée !")
                    }
                  >
                    Commander
                  </button>

                </>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Panier;