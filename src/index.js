import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react'
import ReactDOM from 'react-dom'
import App from "./App";
import ObituaryCreation from "./pages/ObituaryCreation/ObituaryCreation";
import { createHashHistory } from "history";
import { BrowserRouter, Route } from 'react-router-dom';
import routes from "./routes";
import "./index.css";


const allRoutes = routes;
//const baseUrl = process.env.PUBLIC_URL;
ReactDOM.render(
  allRoutes,
  document.getElementById('root')
);
