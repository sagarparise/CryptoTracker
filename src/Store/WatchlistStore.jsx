import { createContext, useReducer, useState } from "react";


export const WatchlistStore = createContext();

//pure reducer function

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_COIN":
      const a =  [...state, action.payload];
      localStorage.setItem("idArray", JSON.stringify(a));
      return a;
    case "REMOVE_COIN":
        const arr = state.filter((coin) => coin.id!== action.payload.id)
        localStorage.setItem("idArray", JSON.stringify(arr));
      return arr;
    default:
      return state;
  }
};

const WatchlistProvider = ({ children }) => {
  const idArr = JSON.parse(localStorage.getItem('idArray')) ?? [];
  const[flag, setFlag] = useState(false);
 const[state, dispatch]= useReducer(reducer, idArr)





  return(
    <WatchlistStore.Provider value={{state, dispatch, setFlag}} >
      {children}
    </WatchlistStore.Provider>
  )
}

export default WatchlistProvider;