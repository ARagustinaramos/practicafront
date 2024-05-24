import axios from "axios";
import { GET_DETAIL, GET_PRODUCTS, GET_BY_NAME, GET_TYPES,FILTERDBAPI,FILTER_TYPE,ORDER_NAME,ORDER_ATTACK,CLEAN_DETAIL,SET_FILTER, ADD_TO_CART, REMOVE_FROM_CART,} from "./types";

export const getProducts = () => {
    return async (dispatch) => {
        
        try {
            const { data } = await axios.get("http://localhost:3001/products");


            return dispatch({
                type: GET_PRODUCTS,
                payload: data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}
export const addToCart = (product) => {
    return {
      type: ADD_TO_CART,
      payload: product
    };
  };

  export const removeFromCart = (itemId) => ({
    type: REMOVE_FROM_CART,
    payload: itemId
});



export const getDetail = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`http://localhost:3001/products/${id}`);

            return dispatch({
                type: GET_DETAIL,
                payload: data
            })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const getByName = (nombre) => {
    return async (dispatch) => {
        try {

            const { data } = await axios.get(`http://localhost:3001/pokemons?nombre=${nombre}`);

            return dispatch({
                type: GET_BY_NAME,
                payload: data
            });
        } catch (error) {
            console.log(error.message)
        }
    }

}

export const getTypes = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('http://localhost:3001/types/', {});
            return dispatch({
                type: GET_TYPES,
                payload: data
            });
        } catch (error) {
            console.log(error.message)
        }
    }
}
export const filterDbApi = (value) => {
    
    return {
        type: FILTERDBAPI,
        payload : value
    }
}

export const filterType = (payload) => {
    return {
        type: FILTER_TYPE,
        payload
    };
};

export const orderName = (order) =>{
    return {
        type:ORDER_NAME,
        payload: order
    }
}

export const orderAttack = (payload) => {
    return {
        type: ORDER_ATTACK,
        payload
    };
};

export const cleanDetail = () =>{
    return {
        type: CLEAN_DETAIL,
       
    }
}
export const setFilter = (filter) => ({
    type: SET_FILTER,
    payload: filter,
  });

// export const createPokemon = (info) => {
//     return async (dispatch) => {
//         try {
//             const response = await axios.post('http://localhost:3001/pokemons/', info)
//             dispatch({
//                 type: CREATE_POKEMON,
//                 payload: response.data
//             });
//             alert("Pokemon creado con exito");
//             return response;
//         } catch (error) {
//             console.log(error.message)
//         }
//     }
// }

