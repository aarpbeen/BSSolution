import React, {ReactNode} from 'react'
import { Provider } from "react-redux";
import { Store } from "@reduxjs/toolkit";


interface ProviderProps {
    children : ReactNode;
    store : Store;
}

export function Providers ({children,store}) {
    return <Provider store={store}>
        {children}
    </Provider>
}