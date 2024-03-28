import React, { useContext, useEffect, useState } from "react";
import { store } from "../../Store/Store";
import "./compare.scss";
import { Row } from "../Tabs/List";
import { Select, Spin } from "antd";
import { getCoin } from "../Functions/getCoin";
import { getCoinPrice } from "../Functions/getCoinPrice";
import CompareLineChart from "../Chart/CompareLineChart";
import { PriceRadio } from "../CoinPage/CoinPage";

function Compare() {
  const { coins } = useContext(store);
  const [days, setDays] = useState(30);
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [isLoading, setIsLoading] = useState(false);
  const [compareCoin1Data, setCompareCoin1Data] = useState();
  const [compareCoin2Data, setCompareCoin2Data] = useState();
  const [chartData1, setchartData1] = useState();
  const [chartData2, setchartData2] = useState();
  const [priceToggle, setPriceToggle] = useState("prices");

  useEffect(() => {
    getCrypto1();
  }, [crypto1, days]);

  useEffect(() => {
    getCrypto2();
  }, [crypto2, days]);

  const getCrypto1 = async () => {
    setIsLoading(true);
    const data1 = await getCoin(crypto1);
   data1 && setCompareCoin1Data({
      id: data1.id,
      image: data1.image.large,
      name: data1.name,
      symbol: data1.symbol,
      description: data1.description.en,
      price_change_percentage_24h:
        data1.market_data.price_change_percentage_24h,
      total_volume: data1.market_data.total_volume.usd,
      market_cap: data1.market_data.market_cap.usd,
      current_price: data1.market_data.current_price.usd,
    });

    if (data1) {
      const myprice = await getCoinPrice(crypto1, days);
      if (myprice) {
        console.log(myprice)
     
        setchartData1(myprice);
        setIsLoading(false);
      }
    }
  };

  const getCrypto2 = async () => {
    setIsLoading(true);
    const data2 = await getCoin(crypto2);
    
   data2 && setCompareCoin2Data({
      id: data2.id,
      image: data2.image.large,
      name: data2.name,
      symbol: data2.symbol,
      description: data2.description.en,
      price_change_percentage_24h:
        data2.market_data.price_change_percentage_24h,
      total_volume: data2.market_data.total_volume.usd,
      market_cap: data2.market_data.market_cap.usd,
      current_price: data2.market_data.current_price.usd,
    });
    setIsLoading(false);

    if (data2) {
      const myprice = await getCoinPrice(crypto2, days);
      if (myprice) {
        console.log(myprice)
        setchartData2(myprice);
      }
    }
  };

  const setCrypto1Coin = (val) => {
 
    setCrypto1(val);
  };
  const setCrypto2Coin = (val) => {
   
    setCrypto2(val);
  };

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
    <div className="compareContainer">
      <div className="coin-selector-compare">
        <div className="compare-crypto">
          <p>Crypto 1 </p>
          <Select defaultValue={crypto1} onChange={setCrypto1Coin}>
            {coins
              ?.filter((item) => item.id !== crypto2)
              .map((coin) => (
                <Select.Option key={coin.id} value={coin.id}>
                  {coin.name}
                </Select.Option>
              ))}
          </Select>
        </div>

        <div className="compare-crypto">
          <p>Crypto 2 </p>
          <Select defaultValue={crypto2} onChange={setCrypto2Coin}>
            {coins
              ?.filter((item) => item.id !== crypto1)
              .map((coin) => (
                <Select.Option key={coin.id} value={coin.id}>
                  {coin.name}
                </Select.Option>
              ))}
          </Select>
        </div>
        <Select
                  className="days-select"
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

      <div className="coin-row">
        <table>
          <Row coin={compareCoin1Data} />
        </table>
      </div>

      <div className="coin-row">
        <table>
          <Row coin={compareCoin2Data} />
        </table>
      </div>

      <div className="compare-chart">
        <PriceRadio setPriceToggle={setPriceToggle} />
        <CompareLineChart
          chartData1={chartData1}
          chartData2={chartData2}
          priceToggle={priceToggle}
          currancyHead={{ crypto1, crypto2 }}
        />
      </div>
      <CoinPara coin={compareCoin1Data} />
      <CoinPara coin={compareCoin2Data} />
    </div>
  );
}

export default Compare;

const CoinPara = ({ coin }) => {
  const [flag, setFlag] = useState(false);
  const shortDesc =
    coin?.description.slice(0, 210) +
    " <p style='color:var(--text); cursor: pointer;'>Read More...</p>";
  const longDesc =
    coin?.description +
    " <p style='color:var(--text); cursor: pointer;'>Read less...</p>";
  return (
    <div className="coinPara">
      <h2>{coin?.name}</h2>
      {coin?.description.length > 200 ? (
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
            __html: coin?.description,
          }}
        />
      )}
    </div>
  );
};
