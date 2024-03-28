import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { store } from "../../Store/Store";
import { Row } from "../Tabs/List";
import "./coinPage.scss";
import { Spin, Select, Radio } from "antd";
import LChart from "../Chart/Line";
import { getCoin } from "../Functions/getCoin";
import { getCoinPrice } from "../Functions/getCoinPrice";
function CoinPage() {
  const { id } = useParams();
  const { coins } = useContext(store);
  const [coinInfo, setCoinInfo] = useState();
  const oneCoin = coins.find((coin) => coin.id === id);
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [days, setDays] = useState(30);
  const [chartData, setchartData] = useState();
 const [priceToggle, setPriceToggle] = useState('prices')

  useEffect(() => {
    if (oneCoin) {
      //api fetch coin info
      coinCall();
    }
  }, [oneCoin, days]);

  const coinCall = async () => {
    setIsLoading(true);
    const data = await getCoin(oneCoin.id);

    if (data) {
      coinDescription(data);
      const myprice = await getCoinPrice(oneCoin.id, days);
      if (myprice) {
     
        setchartData(myprice);
        setIsLoading(false);
      }
    }
  };

  const coinDescription = (data) => {
    setCoinInfo({
      id: data.id,
      name: data.name,
      symbol: data.symbol,
      image: data.image.large,
      description: data.description.en,
      price_change_percentage_24h: data.market_data.price_change_percentage_24h,
      total_volume: data.market_data.current_price.usd,
      market_cap: data.market_data.market_cap.usd,
      current_price: data.market_data.current_price.usd,
    });
  };

  const shortDesc =
    coinInfo?.description.slice(0, 210) +
    " <p style='color:var(--text); cursor: pointer;'>Read More...</p>";
  const longDesc =
    coinInfo?.description +
    " <p style='color:var(--text); cursor: pointer;'>Read less...</p>";

  const selectDays = (val) => {
    console.log("select", val);
    setDays(val);
    // coinCall();
  };




  if (isLoading) {
    return (
      <div className="spinContainer">
        <Spin tip="Loading..." fullscreen size="large" className="spin"></Spin>
      </div>
    );
  }

  return (
    <>
      {coinInfo && (
        <div className="coinPage">
          <div className="coin-row">
            <table style={{ marginBlock: "20px" }}>
              <Row coin={oneCoin} row="row" />
            </table>
          </div>
          <div className="chartContainer">
            <div className="selectContainer">
              <p>Price Change in last : </p>
              <Select
                onChange={selectDays}
                defaultValue={  { value: 30, label: "30 Days" }}
                value={days}
                options={[
                  { value: 7, label: "7 Days" },
                  { value: 30, label: "30 Days" },
                  { value: 60, label: "60 Days" },
                  { value: 90, label: "90 Days" },
                  { value: 120, label: "120 Days" },
                ]}
              />
            </div>
         <PriceRadio setPriceToggle={setPriceToggle} />
            <LChart chartData={chartData} priceToggle={priceToggle}/>
          </div>

          <div className="currancyInfo">
            {coinInfo.description.length > 200 ? (
              <p
                className="coin-des"
                onClick={() => setFlag(!flag)}
                dangerouslySetInnerHTML={{
                  __html: !flag ? shortDesc : longDesc,
                }}
              />
            ) : (
              <p
                className="coin-des"
                dangerouslySetInnerHTML={{
                  __html: coinInfo.description,
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
export default CoinPage;


export const PriceRadio = ({setPriceToggle})=>{
  
  const togglePrices = (e)=>{
    setPriceToggle(e.target.value)
  }
  return(
    <div className="price-radios">
    <Radio.Group defaultValue="prices" onChange={togglePrices}>
      <Radio.Button value="prices">PRICE</Radio.Button>
      <Radio.Button value="market_caps">MKT CAP</Radio.Button>
      <Radio.Button value="total_volumes">VOLUME</Radio.Button>
    </Radio.Group>
  </div>
  )
}