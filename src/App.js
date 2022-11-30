import './App.css';
import React from 'react';
import {  BrowserRouter as Router,
   useRoutes } from "react-router-dom"
import Form from './components/form';
import Formheader from './components/Formheader';

function App() {

  
  function AppRoutes() {
    const routes = useRoutes([
      {
        path: "/",
        element: <Form />,
      },
      {
        path: "/form/:id",
        element: <Formheader/>,
      },
    ])
    return routes
  }


  return (
    <Router>

      <AppRoutes/>        
    </Router>
    
  );
}

export default App;
