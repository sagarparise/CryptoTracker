import React from "react";
import "./home.scss";
import phone from "../images/phone.png";
import { Button, Flex } from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate()
// Function to handle the share button click
const handleShare = async () => {
  console.log('share')
  try {
    // Check if the Web Share API is supported by the browser
    if (navigator.share) {
      // Call the share method with the content you want to share
      await navigator.share({
        title: "Check out this crypto tracker!",
        text: "Track crypto through a public API in real time.",
        url: window.location.href // Share the current URL
      });
      console.log("Content shared successfully!");
    } else {
      // Web Share API not supported, handle accordingly
      alert("Web Share API is not supported in this browser.");
    }
  } catch (error) {
    console.error("Error sharing content:", error);
  }
};

  return (
    <div className="homeContainer">
      <div className="right">
        <motion.h1
          className="cryptoHead"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Track Coin
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
          Track coin through a public api in real time. Visit the dashboard to
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
          <Button ghost type="primary" id="share" shape="round" size="large" onClick={handleShare}>
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
