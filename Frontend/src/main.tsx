import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import initSW from './sw-helper.js'
import App from './App.js'
import './index.css'
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = document.getElementById('root')!
ReactDOM.createRoot(root).render(
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

initSW()
