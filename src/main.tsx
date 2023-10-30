import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AxiosInterceptor } from './interceptor/axios.interceptor';
import { Provider } from 'react-redux';
import store from './redux/store';

AxiosInterceptor();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>  
    <React.StrictMode>
    <App />
    </React.StrictMode>,
  </Provider>
)
