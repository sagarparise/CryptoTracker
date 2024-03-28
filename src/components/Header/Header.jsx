import React, { useEffect, useState } from "react";
import "./header.scss";
import { Drawer, Switch, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { MenuOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Header() {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate()
  const [open, setOpen] = useState("false");

  const [theme, setTheme] = useState("dark");

  useEffect(()=>{
    themeChanger(localStorage.getItem("theme"))
    setTheme(localStorage.getItem("theme"))
  },[])

  const changeTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    themeChanger(newTheme);
    
  };

  const themeChanger = (appliedTheme)=>{
    console.log(appliedTheme)
    if(appliedTheme === "dark"){
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      toast.success("Dark theme applied",{
        position: "top-left",
        autoClose: 2000,
       theme: appliedTheme,
      })
    }
    else{
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      toast.success("Light theme applied",{
        position: "top-left",
        autoClose: 2000,
        theme: appliedTheme,
      })
    }
  }

  const showerDrawer = () => {
    setOpen((pre) => !pre);
  };

  return (
    <>
      {contextHolder}
      <div className="header">
        <h1>
          CryptoTracker <span style={{ color: "var(--blue)" }}>.</span>
        </h1>
        <div className="right">
          <Switch checked={theme === "dark"} onChange={changeTheme} />
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => isActive && "active"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/compare"
                className={({ isActive }) => isActive && "active"}
              >
                Compare
              </NavLink>
            </li>
            <li>
            <NavLink
                to="/watchlist"
                className={({ isActive }) => isActive && "active"}
              >
               WatchList
              </NavLink>
            </li>
            <li>
              <span onClick={()=>  navigate('/dashboard')}>Dashboard</span>
            </li>
          </ul>

          <MenuOutlined className="menu" onClick={showerDrawer} />
        </div>
      </div>

      <Drawer
      className="drawer"
        title={<span style={{ color: "var(--white)" }}> Crypto Tracker</span>}
        open={open}
        onClose={() => setOpen((pre) => !pre)}
        styles={{
          body: {
            backgroundColor: "var(--black)",
          },
          header: {
            backgroundColor: "var(--black)",
          },
        }}
        closeIcon={<CloseCircleOutlined style={{ color: "var(--white)" }} />}
      >
        <ul className="list">
          <li>
          <NavLink
                to="/"
                className={({ isActive }) => isActive && "active"}
              >
                Home
              </NavLink>
          </li>
          <li>
          <NavLink
                to="/compare"
                className={({ isActive }) => isActive && "active"}
              >
                Compare
              </NavLink>
          </li>
          <li>
          <NavLink
                to="/watchlist"
                className={({ isActive }) => isActive && "active"}
              >
               WatchList
              </NavLink>
          </li>
          <li>
          <NavLink
                to="/dashboard"
                className={({ isActive }) => isActive && "active"}
              >
              Dashboard
              </NavLink>
          </li>
        </ul>
      </Drawer>
    </>
  );
}

export default Header;
