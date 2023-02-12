import React from 'react';
import Header from './componeents/header/Header';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductDescriptionPage from './pages/ProductDescriptionPage/ProductDescriptionPage';
import CartPage from './pages/CartPage/CartPage';
import ErrorComponent from './componeents/ErrorComponent/ErrorComponent';
import { Route, Switch } from 'react-router-dom';
import './App.css'

class App extends React.Component {

  render() {

    return(
      <div className="app-container">
        <Header/>
        <Switch>
            <Route exact path="/" >
                <ProductListPage/>
            </Route>
            <Route  path="/category/:name/:id" >
                <ProductDescriptionPage/>
            </Route>
            <Route exact path="/category/:name" >
                <ProductListPage/>
            </Route>
            <Route exact path="/cart">
                <CartPage/>
            </Route>
            <Route>
                 <ErrorComponent />
            </Route>
        </Switch>
    </div>
    )
  }
}

export default App;
