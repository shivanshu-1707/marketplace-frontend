import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Orders from "./components/Orders";
import Products from "./components/Products";
import React from "react";

function App() {
    return (
        <Router>
            <div>
                <h1>Marketplace</h1>
                <Switch>
                    <Route exact path="/" component={Products} />
                    <Route exact path="/orders" component={Orders} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
