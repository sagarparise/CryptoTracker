import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const ErrorP = () =>{
  const navigate = useNavigate()
  return (
    <Result
  style={{width: '100%', height: '100vh', background: 'var(--black)'}}
    status="404"
    title={<span style={{color: 'var(--white)'}}>404</span>}
    subTitle= {<span style={{color:'var(--white)'}}>Sorry, the page you visited does not exist.</span>}
    extra={<Button type="primary" onClick={()=>navigate('/')}>Back Home</Button>}
  />
  );
}
export default ErrorP;