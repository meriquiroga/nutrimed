import "./App.css"
import Home from "./pages/Home";
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignUpPat from "./components/SignUpPat"

const App = () => {
  return (
      <BrowserRouter>
        <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path='/signup' component={SignUpPat}/>
          </Switch>
        <Footer />
      </BrowserRouter>
  );
};
export default App;