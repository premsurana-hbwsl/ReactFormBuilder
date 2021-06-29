import ReactDOM from "react-dom";
import BaseComponent from "./components/BaseComponent";
import { ListContextProvider } from "./components/ListContext";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import './style.scss';

const App = () => {
  return (
    <ListContextProvider>
     <DndProvider backend={HTML5Backend}>
        <BaseComponent />
      </DndProvider>
    </ListContextProvider>
  );
}

ReactDOM.render( <App />, document.getElementById( 'root' ) );
