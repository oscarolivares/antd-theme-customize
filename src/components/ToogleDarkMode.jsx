import React from 'react';
import { Switch, Typography, message } from 'antd'

const style = {
  div: {
    padding: '2rem'
  },
  typography: {
    display: 'inline-block',
    marginRight: '10px'
  }
}

export default function ToogleDarkMode({ theme, setTheme, darkVars, lightVars }) {
  const handleChange = (checked) => {
    let darkIsEnabled = checked;
    let themeName = darkIsEnabled ? 'dark' : 'light'

    let vars = darkIsEnabled ? darkVars : lightVars;
    setTheme({ ...theme, vars, themeName });

    localStorage.setItem("app-theme", JSON.stringify(vars));
    localStorage.setItem("theme-name", themeName);
    window.less.modifyVars(vars).catch(error => {
      message.error('Fallo al actualizar el tema');
    });
  }
  return (
    <div style={style.div}>
      <Typography style={style.typography}>Darkmode</Typography>
      {/* <Switch defaultChecked={theme.themeName === 'dark'} onChange={(checked) => { handleChange(checked) }}></Switch> */}
      <Switch checked={theme.themeName === 'dark'} onChange={(checked) => { handleChange(checked) }}></Switch>
    </div>
  );
}