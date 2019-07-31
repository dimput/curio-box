import React, { Component } from 'react';
// import logo from './logo.jpeg';
// import isi from './ISI.jpg';
// import bg from './bg.jpg';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Child from './Child';
import Tambah from './layouts/Tambah';
// import { Modal, Button, Row, Col } from 'react-materialize';
// import {Layer, Rect, Stage, Group} from 'react-konva';

// function App() {
//   
//   return (
//     
//   );
// }
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/edit/:id" component={Child} />
          <Route path="/dimas" component={Tambah} />
        </Switch>
      </BrowserRouter>
    )
  }

}

export default App;
