import { Routes, Route, Link } from "@solidjs/router"
import { globalCss } from "@hope-ui/solid";
import Home from "./pages/Home"
import Booking from "./pages/Booking"
import './global.css'
import './function/authorization'


const globalStyles = globalCss({
  '*': { 
    fontFamily: 'Rubik'
  },
});

const App = () => {
  globalStyles();
  
  return (
    <Routes>
      <Route path="/" component={Home}/>
      <Route path="/booking" component={Booking}/>
    </Routes>
  )
}

export default App;
