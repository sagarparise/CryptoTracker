import React from 'react'
import {ConfigProvider} from 'antd'
function AntdProvieder() {
  return (
    <>
    <ConfigProvider theme={{
      primaryColor: '#1890ff',
      secondaryColor: '#87d068',
      layout: 'horizontal',
      contentWidth: 'Fluid',
    }}>

    </ConfigProvider>
    </>
  )
}

export default AntdProvieder