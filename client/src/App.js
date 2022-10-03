import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './components/landingPage/landingPage';
import Home from './components/home/home';
import CreateRecipe from './components/createRecipe/createRecipe';
import Details from './components/details/details';
import NavBar from './components/navBar/navBar';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar></NavBar>
        <Switch>

          <Route exact path='/' component={LandingPage}></Route>
          <Route path='/home' component={Home}></Route>
          <Route path='/detail/:id' component={Details}></Route>
          <Route path='/create' component={CreateRecipe}></Route>


        </Switch>
      </div>

    </BrowserRouter>
  );
}

export default App;
