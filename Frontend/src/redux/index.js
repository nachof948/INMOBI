import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default: localStorage
import {thunk} from 'redux-thunk';
import { reducers } from './reducers';

// Configura la persistencia para el reducer que deseas persistir
const persistConfig = {
  key: 'root', // la clave para el almacenamiento en localStorage
  storage, // el tipo de almacenamiento (puede ser localStorage o AsyncStorage para React Native)
/*   blacklist:['listing'] */
  // Puedes configurar opciones adicionales aquí, como el whitelist o el blacklist de reducers
};

// Crea un reducer persistente
const persistedReducer = persistReducer(persistConfig, reducers);

// Crea el store de Redux
const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
const persistor = persistStore(store); // Crea el persistor

export { store, persistor };
