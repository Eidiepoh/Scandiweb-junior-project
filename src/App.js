import React from 'react';
import Header from './componeents/header/Header';
import ProductListPage from './pages/product-list-page/ProductListPage';
import ProductDescriptionPage from './pages/product-description-page/ProductDescriptionPage'
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css'

class App extends React.Component {

  render() {

    return(
      <div className="app-container">
        <Header/>
        <Switch>
        <Route path="/:category">
            <ProductListPage/>
        </Route>
            
          
          <Route path="/product/:id">
            <ProductDescriptionPage/>
          </Route>

        </Switch>
    </div>
    )
  }
}

export default App;
