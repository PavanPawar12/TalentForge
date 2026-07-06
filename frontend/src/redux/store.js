import { configureStore, combineReducers} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from './jobSlice';
import companySlice from './companySclice'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storageImport from "redux-persist/lib/storage";

const storage = storageImport.default ?? storageImport;
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}


const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company:companySlice
    
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    // reducer: {
    //    auth: authSlice,
    //     job: jobSlice
    // }
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


export const persistor = persistStore(store);
export default store;


