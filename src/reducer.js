import { db } from "./config";

//DATA LAYER LOGIC
export const initialState = {
    basket: [],
    userId: null,
    name: '',
    orders: [],
    email: '',


};
export const getBasketTotal = basket =>{
    return  basket?.reduce((sum, item) =>
                                sum + item.price || 0, 0
                            );
}
const reducer = (state, action) => {

    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                userId: action.userId,
                name: action.name,
                basket : action.basket,
                email: action.email,
                orders: action.orders

            }
        case "ADD_TO_BASKET":
            //Logic for adding item to basket
       
            //checking to see if item already in basket
            if (state.basket.some(item => action.item.id == item.id)) {
                // console.log("item already exists");
                return {...state,
                basket: state.basket};

            }

            else{
                if(state.userId){
                    db.collection('users').doc(state.userId).update({
                        basket: [...state.basket, action.item]
                    }).then().catch(err =>{
                        console.log(err);
                    })
                }
                
                return {
                    ...state,
                    basket: [...state.basket, action.item]
                };
            }
            
        case 'REMOVE_FROM_BASKET':
            //Logic for removing item from basket
            if(state.userId){
                db.collection('users').doc(state.userId).update({
                    basket: state.basket.filter(item =>{ return item.id != action.item.id})
                }).then().catch(err =>{
                    console.log(err);
                })
            }
            return {
                ...state,
                basket: state.basket.filter(item =>{ return item.id != action.item.id})
            };
        case 'EMPTY_BASKET':
            
            return {
                ...state,
                basket: [],
                orders: action.orders
            }
            
        case 'REGISTER_USER':
            return {
                ...state,
                userId : action.userId,
                name: action.name,
                email: action.email
            }
        default:
            return state;
    }

};

export default reducer;