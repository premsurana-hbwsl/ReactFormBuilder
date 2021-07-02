import ReactDOM from "react-dom";
import { ListContextProvider } from "./components/ListContext";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import loadable from "loadable-components";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import './style.scss';

const Loading = () => {
  return(
    <h1 style={{fontSize: '200px'}} className="loading">......Loading</h1>
  )
}

const BaseComponent = loadable(() => import("./components/BaseComponent"), {
  fallback: <Loading />
});

const App = () => {
  return (

    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
          
          </Route>
          <Route path="/about">
            <div className="About">About</div>
          </Route>
          <Route path="/dashboard">
            <div className="dashboard">Dashboard</div>
          </Route>
        </Switch>
        <ListContextProvider>
          <DndProvider backend={HTML5Backend}>
              <BaseComponent />
            </DndProvider>
        </ListContextProvider>
      </div>
    </Router>
  );
}

ReactDOM.render( <App />, document.getElementById( 'root' ) );
