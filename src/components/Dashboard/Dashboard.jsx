import React, { useContext, useState } from "react";
import "./dashboard.scss";
import { Tabs ,Input} from "antd";
import Grid from "../Tabs/Grid";
import List from "../Tabs/List";
import { store } from "../../Store/Store";
import {SearchOutlined} from '@ant-design/icons'

function Dashboard() {
  const { coins } = useContext(store);
  const[inputVal, setInputVal] = useState('')

  const newCoins = coins.filter((coin) => (
    coin.name.toLowerCase().includes(inputVal.toLowerCase())
  ));

  
  const items = [
    {
      key: "1",
      label: <div className="tabName">Grid</div>,
      children: <Grid coins={newCoins}/>
    },
    {
      key: "2",
      label: <div className="tabName">List</div>,
      children: <List coins={newCoins} />,
    },
  ];

  return (
    <div className="dash-container">
      <div className="search-container">
      <SearchOutlined/>
      <input type="text" placeholder="Search..." className="search" value={inputVal} onChange={(e)=> setInputVal(e.target.value) } />
      </div>
      <div>
        <Tabs
          items={items}
          centered
        />    
      </div>
    </div>
  );
}

export default Dashboard;
