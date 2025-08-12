import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { authConfig } from './authConfig.js'
import { AuthProvider } from 'react-oauth2-code-pkce'

const root = createRoot(document.getElementById('root'))
root.render(
  <AuthProvider authConfig={authConfig} loadingComponent={<div>Loading...</div>}>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
)