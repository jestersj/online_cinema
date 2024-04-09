import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {setupStore} from "@/store";
import "react-range-slider-input/dist/style.css";
import "./globals.css";

const root = document.getElementById('root')

if (!root) {
    throw new Error('root not found')
}

const container = createRoot(root)

container.render(
    <Provider store={setupStore()}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)