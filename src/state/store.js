import {configureStore  } from '@reduxjs/toolkit';
import taskReducer from '../reducers/TaskSlice.js';
import themeReducer from '../reducers/ThemeSlice.js';
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer ,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist';
const persistConfig = {
    key: 'root',
    storage
};
const reducers = combineReducers({
  taskList:taskReducer,
  currentTheme:themeReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})



export default store