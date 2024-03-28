import React from "react";
import "./home.scss";
import phone from "../images/phone.png";
import { Button, Flex } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate()


  return (
    <div className="homeContainer">
      <div className="right">
        <motion.h1
          className="cryptoHead"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Track Crypto
        </motion.h1>
        <motion.h1
          className="real-time"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Real Time.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Track crypto through a public api in real time. Visit the dashboard to
          do so!
        </motion.p>
        <Flex gap="large" wrap="wrap">
         <motion.span
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
         >
         <Button type="primary" id="dashboard" shape="round" size="large" onClick={()=> navigate('/dashboard')}>
            Dashboard
          </Button>
         </motion.span>
          <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          >
          <Button ghost type="primary" id="share" shape="round" size="large">
            Share
          </Button>
          </motion.span>
        </Flex>
      </div>
      <div className="left">
        <div className="img">
          <motion.img src={phone} 
          initial={{ y: -8 }}
          animate={{ y: 8 }}
          transition={{
            type: 'smooth',
            repeatType: 'mirror',
            duration: 2, 
           repeat: Infinity }}
          />
        </div>
      
      </div>
    </div>
  );
}

export default Home;
