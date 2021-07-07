import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { store, StoreContext } from './stores';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/index.css'


const tokenName = process.env.REACT_APP_TOKEN_NAME;

(async () => {
  if (localStorage.getItem(tokenName)) {
    await store.userStore.userDetail().catch(e => { });
  }

  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <StoreContext.Provider value={store}>
          <App />
        </StoreContext.Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
})()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
