import React, { useState, useEffect } from "react";
import { Layout, Spin, Row, Col, Form, Select, Result, Button } from "antd";
import ToogleDarkMode from './components/ToogleDarkMode'

import darkVars from "./styles/theme/dark.json";
import lightVars from "./styles/theme/light.json";
import "./styles/main.less";

function App() {
  let initialValue = lightVars;
  const Option = Select.Option;
  const FormItem = Form.Item;

  const [theme, setTheme] = useState({
    themeApplied: false,
    themeName: localStorage.getItem("theme-name") || "light",
    vars: {}
  });

  const [error, setError] = useState('');

  useEffect(() => {
    let varsAux = localStorage.getItem("app-theme");

    if (!varsAux) {
      varsAux = initialValue;
    } else {
      varsAux = Object.assign({}, JSON.parse(varsAux));
    }

    window.less
      .modifyVars(varsAux)
      .then(() => {
        setTheme({ ...theme, vars: varsAux, themeApplied: true });
        /* throw new Error('Ocurrió un error al cargar los estilos') */
      })
      .catch((error) => {
        setError(error.message)
      });
  }, []);

  if (!theme.themeApplied && !error) {
    return (
      <>
        <Spin size="large">
          <Layout className="app">
          </Layout>
        </Spin>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Layout className="app">
          <Result
            status="500"
            title="500"
            subTitle={error}
            extra={
              <Button type="primary">
                Recargar
              </Button>
            }
          />
        </Layout>
      </>
    );
  }

  return (
    <>
      <Layout className="app">
        <ToogleDarkMode theme={theme} setTheme={setTheme} darkVars={darkVars} lightVars={lightVars} />
        <Row className="theme-selector-dropdown">
          <Col span={22} offset={1}>
            <FormItem
              label="Choose Theme"
              className="ant-col ant-col-xs-22 ant-col-offset-1 choose-theme"
            >
              <Select
                placeholder="Please select theme"
                value={theme.themeName}
                onSelect={value => {
                  let vars = value === 'light' ? lightVars : darkVars;
                  vars = { ...vars, '@white': '#fff', '@black': '#000' };
                  setTheme({ ...theme, vars, themeName: value });
                  localStorage.setItem("app-theme", JSON.stringify(vars));
                  localStorage.setItem("theme-name", value);
                  window.less.modifyVars(vars).catch(error => {

                  });
                }}
              >
                <Option value="light">Light</Option>
                <Option value="dark">Dark</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Layout>
    </>
  );
}

export default App;
