import React from "react";
import { ConfigProvider } from "antd";

function ConfigPro({ childeren }) {
  return <ConfigProvider theme={{
    components: {
      Menu: {
        /* here is your component tokens */
        activeBarHeight: 0,                   
      },
    },
  }}>{childeren}</ConfigProvider>;
}

export default ConfigPro;
