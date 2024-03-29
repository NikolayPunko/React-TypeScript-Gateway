import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import Store from "./store/store";
import {Beforeunload} from 'react-beforeunload';

interface IStore {
    store: Store
}

const store = new Store();


export const Context = createContext<IStore>({
    store,
})

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <Beforeunload onBeforeunload={clearLocalStorage}>
        <Context.Provider value={{store}}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Context.Provider>
    // </Beforeunload>
);


