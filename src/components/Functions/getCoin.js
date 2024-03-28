import axios from "axios";

export const getCoin = (id)=>{
 const myCoinData =  axios
  .get(`https://api.coingecko.com/api/v3/coins/${id}`)
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    console.log("Error", error);
  });
  return myCoinData;
}