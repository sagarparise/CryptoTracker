import React from 'react'
import './footer.scss';
import {InstagramOutlined, FacebookFilled, TwitterOutlined, MailFilled} from '@ant-design/icons'
function Footer() {
  return (
    <div className='footerContainer'>
      <h3>Crypto Tracker.</h3>
      <div className='foot-icon'>
        <FacebookFilled />
        <MailFilled />
        <TwitterOutlined />      
      <InstagramOutlined />
      </div>
    </div>
  )
}

export default Footer