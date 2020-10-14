import React, { useState, useEffect } from "react";
import { Layout, message, Spin } from "antd";
/* import { ButtonPreview } from "./previews";

import darkVars from "./dark.json"; */
import lightVars from "./light.json";
import "./styles/main.less";

function App() {
  let initialValue = lightVars;
  let vars = {};
  let themeName = localStorage.getItem("theme-name") || "light";

  const [theme, setTheme] = useState({
    themeApplied: false,
    size: "default",
    disabled: false,
  });

  vars = localStorage.getItem("app-theme");

  if (!vars) {
    vars = initialValue;
  } else {
    vars = Object.assign({}, JSON.parse(vars));
  }

  useEffect(() => {
    window.less
      .modifyVars(vars)
      .then(() => {
        setTheme({ ...theme, themeApplied: true });
      })
      .catch((error) => {
        message.error(`Failed to update theme`);
      });
  }, []);

  if (!theme.themeApplied) {
    return (
      <Spin size="large">
        <Layout className="app">
          <h1>Ningún tema aplicado</h1>
        </Layout>
      </Spin>
    );
  }

  return (
    <>
      <Layout className="app">
        <h1>Tema aplicado</h1>
      </Layout>
    </>
  );
}

export default App;
