import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const store = createContext();

const Storeprovider = ({children})=>{

 const [coins, setCoins] = useState([]);

  useEffect(()=>{
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
  .then((response)=>setCoins(response.data))
  .catch((error)=> console.log('Error', error))
 },[])

  return (
    <store.Provider value={{ coins}}>
      {children}
    </store.Provider>
  )
}

export default Storeprovider;