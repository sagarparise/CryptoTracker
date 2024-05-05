import React, { useContext, useState } from "react";
import "./tabs.scss";
import { store } from "../../Store/Store";
import { Card, Pagination } from "antd";
import { RiseOutlined, StarOutlined, FallOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { WatchlistStore } from "../../Store/WatchlistStore";
function Grid({ coins }) {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const pageSize = 10;



  // Calculate start and end index for pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Filter coins to display on the current page
  const coinsOnPage = coins.slice(startIndex, endIndex);
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Adjust the delay between each card
      },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
   
  };

  return (
    <>
      <motion.div
        className="grid"  
        variants={staggerVariants}  
        initial="hidden"
        animate="visible"  
      
      >
        {coins &&
          coinsOnPage.map((coin, index) => (
          <motion.div variants={cardVariants} >
              <Coincard coin={coin} key={index} />
          </motion.div>
          ))}
      </motion.div>
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

export default Grid;

export function Coincard({ coin }) {
  const navigate = useNavigate();
  const{state,dispatch} = useContext(WatchlistStore)
  const check = coin && coin.price_change_percentage_24h < 0;
  const [load, setLoad] = useState(true);
  const [hoverBorder, setHoverBorder] = useState(false);
  const [hoverBg, setHoverBg] = useState(false);

 

  const style = {
    star: {
      color: check ? "var(--red)" : "var(--green)",
      borderColor: check ? "var(--red)" : "var(--green)",
    },
    hoverBorder: {
      borderColor: check && hoverBorder ? "var(--red)" : "var(--green)",
    },
    hoverBg: {
      borderColor: check && hoverBg ? "var(--red)" : "var(--green)",
      backgroundColor: check && hoverBg ? "var(--red)" : "var(--green)",
      color: "white",
    },
  };

  setTimeout(() => {
    setLoad(false);
  }, 600);

  const getCoinPage = () => {
    console.log("coin page loaded");
    navigate(`/coin/${coin.id}`);
  };

  const addedInWatchList = (event) => {

    // const starIc = event.currentTarget.closest('.star-ic');
  
    // if (starIc) {
    //   starIc.classList.toggle('favorite');
    // }

    if(!state.includes(coin)) {
        // idArr.push(coin);
        dispatch({type: 'ADD_COIN', payload: coin})
        localStorage.setItem('idArray', JSON.stringify(state))
  }
  else{
    // idArr = idArr.filter(item => item.id !== coin.id);
    dispatch({type: 'REMOVE_COIN', payload: coin})
    localStorage.setItem('idArray', JSON.stringify(state))
  }
 // 
  }
  return (
 
     <Card
      hoverable
      loading={load}
      className="card"
   
      onMouseEnter={() => {
        setHoverBorder(true);
      }}
      onMouseLeave={() => setHoverBorder(false)}
      style={style.hoverBorder}
    >
      <div className="card-info">
        <img src={coin.image} />
        <div className="grid-title-content">
          <div>
            <h2 >{coin.symbol}-usd</h2>
            <p >{coin.name}</p>
          </div>
          <div className={`star-ic`} style={style.star} onClick={addedInWatchList}>
            <StarOutlined />
          </div>
        </div>
      </div>

    <div onClick={getCoinPage}>
    <div className="percent-container">
        <p
          onMouseEnter={() => setHoverBg(true)}
          onMouseLeave={() => setHoverBg(false)}
          style={hoverBg ? style.hoverBg : style.star}
        >
          {coin.price_change_percentage_24h.toFixed(2)} %
        </p>
        <div
          className="treding-icon"
          onMouseEnter={() => setHoverBg(true)}
          onMouseLeave={() => setHoverBg(false)}
          style={hoverBg ? style.hoverBg : style.star}
        >
          {check ? <FallOutlined /> : <RiseOutlined />}
        </div>
      </div>
      <p
        className="price"
        style={{ color: check ? "var(--red)" : "var(--green)" }}
      >{`$${coin.current_price.toFixed(2)}`}</p>
      <p className="marketPrice">{`Total volume : $${coin.total_volume.toLocaleString()}`}</p>
      <p className="marketPrice">{`Market Cap : $${coin.market_cap.toLocaleString()}`}</p>
    </div>
    </Card>

  );
}
