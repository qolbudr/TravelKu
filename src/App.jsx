import { lazy } from "solid-js";
import { Routes, Route, Link } from "@solidjs/router"
import { globalCss } from "@hope-ui/solid";
const Home = lazy(() => import("./pages/Home"));
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
    </Routes>
  )
}

export default App;
