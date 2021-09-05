import Home from "./Home"
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import DoctorInformation from "./Components/DoctorInformation"

const App = ()=>{
  return(
    <div>
    <BrowserRouter>
      <Switch>
       <Route exact path="/" component={Home} />
        <Route path="/information" component={DoctorInformation} />
      </Switch>
    </BrowserRouter>
    </div>
  
  )
}
export default App
