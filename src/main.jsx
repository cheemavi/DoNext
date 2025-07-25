import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import store from './state/store.js';
import { Provider } from 'react-redux';
import App from './App.jsx';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

//set up and connect persistor for redux 'Store' 
let persistor = persistStore(store);
createRoot(document.getElementById('root')).render(
 <StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App/>
        </PersistGate>
    </Provider>
  </StrictMode>,
)

   