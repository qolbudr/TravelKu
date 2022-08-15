import { Routes, Route, Link } from "@solidjs/router"
import { globalCss } from "@hope-ui/solid";
import Home from "./pages/Home"
import Booking from "./pages/Booking"
import Result from "./pages/Result"
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
      <Route path="/check-booking/:bookingId" component={Result}/>
      <Route path="/check-booking/:bookingId/:bookingId2" component={Result}/>
    </Routes>
  )
}

export default App;
