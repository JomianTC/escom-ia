import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
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
