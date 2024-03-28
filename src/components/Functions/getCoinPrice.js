import axios from "axios";
export const getCoinPrice = (id, day)=>{

  const myPrice = axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${day}&interval=daily`)
  .then((response) => {
  return response.data
  })
  .catch((error) => {
    console.log("Error", error);
  });

  return myPrice;
}