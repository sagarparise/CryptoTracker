import React, { useState } from "react";
import { Pagination, Tooltip } from "antd";
import './tabs.scss'
import { FallOutlined, RiseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { convertNumber } from "../Functions/numberConvert";
function List({ coins }) {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };
  const pageSize = 10;

  // Calculate start and end index for pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter coins to display on the current page
  const coinsOnPage = coins.slice(startIndex, endIndex);

  const rowClick = ()=>{
    console.log('row click')
  }
  return (
    <>
      <div className="list">
        <table className="table">
          {coins && coinsOnPage.map((coin,i) => <Row style={{borderRadius:'20px'}} key={i} coin={coin} navigateCoin = 'navigate' />)}
        </table>
      </div>
      <div className="pagination">
        <Pagination
          current={currentPage}
          onChange={handlePageChange}
          total={100}
          showSizeChanger
          pageSize={10}
        />
      </div>
    </>
  );
}

export default List;

export function Row({ coin, row ,navigateCoin}) {
 const navigate = useNavigate()
  const check = coin && coin.price_change_percentage_24h < 0;

  const style = {
    star: {
      color: check ? "var(--red)" : "var(--green)",
      borderColor: check ? "var(--red)" : "var(--green)",
    },
    tooltip: {
      fontSize: "12px",
      color: "white",
      padding: "3px !important",
    },
  };

  const getCoinPage = ()=>{
    
   if(navigateCoin){
    navigate(`/coin/${coin.id}`)
   }
  }
  return (
    <>
      {
        coin && 
          <tr  id="RowHover" className={`hr-row ${row && 'row'}`} onClick={getCoinPage} >
        <td className="rowImg" >
          <Tooltip
            title="Logo"
            placement="bottom"
            color="#888888"
            overlayInnerStyle={style.tooltip}
          >
            <img src={coin.image} alt="" />
          </Tooltip>
          <div className="coinInfo">
            <Tooltip
              title="Symbol"
              placement="bottom"
              color="#888888"
              overlayInnerStyle={style.tooltip}
            >
              <h2 className="commonResonsive">{coin.symbol}-USD</h2>
            </Tooltip>
            <Tooltip
              title="Name"
              placement="bottom"
              color="#888888"
              overlayInnerStyle={style.tooltip}
            >
              <p className="commonResonsive">{coin.name}</p>
            </Tooltip>
          </div>
        </td>

        <td>
          <div className="percent ">
            <p style={style.star} className="commonResonsive">
              {coin.price_change_percentage_24h.toFixed(2)} %
            </p>
            <div style={style.star} className="treding-icon commonResonsive">
              {check ? <FallOutlined /> : <RiseOutlined />}
            </div>
          </div>
        </td>

        <td>
          <div className="price-container">
            <Tooltip
              title="current price"
              placement="bottom"
              color="#888888"
              overlayInnerStyle={style.tooltip}
            >
              <p
                style={{ color: check ? "var(--red)" : "var(--green)" }}
                className="price commonResonsive"
              >{`$${coin.current_price.toFixed(2)}`}</p>
            </Tooltip>

            <Tooltip
              title="Total Volume"
              placement="bottom"
              color="#888888"
              overlayInnerStyle={style.tooltip}
            >
              <p className="marketPrice commonResonsive">{convertNumber(coin.total_volume)}</p>
            </Tooltip>

            <Tooltip
              title="Market cap"
              placement="bottom"
              color="#888888"
              overlayInnerStyle={style.tooltip}
            >
              <p className="marketPrice commonResonsive">{convertNumber(coin.market_cap)}</p>
            </Tooltip>
          </div>
        </td>
      </tr>
       
      }
    </>
  );
}
