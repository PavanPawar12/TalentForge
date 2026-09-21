import { configureStore, combineReducers} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from './jobSlice';
import companySlice from './companySclice'
import applicationReducer from './applicationSlice'

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
    // Only the login session survives a reload. Jobs, companies and
    // applications are refetched on every page mount — persisting them
    // (and the search filter text) shows stale results and hides newly
    // posted jobs/companies.
    whitelist: ['auth'],
}


const rootReducer = combineReducers({
    auth: authSlice,
    job: jobSlice,
    company:companySlice,
    application: applicationReducer,
    
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


