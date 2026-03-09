import { Admin } from "./pages/admin";
import Home from "./pages/home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/signup";
import AllBikes from "./pages/AllBikes";
import ContactUs from "./pages/Contact";
import SingleBike from './pages/SingleBike';
import BookBike from "./pages/Book";
import GetBooking from "./pages/Boooing";
import ViewSingleBooking from "./pages/ViewSingleBooking"
import {Profile} from "./pages/profile";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

const App = () => {
  return ( 
    <Router>
      <div className="bg-slate-400">
        <Routes>
          <Route exact path = '/' element = {<Home/>}></Route>
          <Route path = '/login' element = {<Login/>}></Route>
          <Route path = '/signup' element = {<Signup/>}></Route>
          <Route path = '/Admin' element = {<Admin/>}></Route>
          <Route path='/ContactUs' element={<ContactUs/>}></Route>
          <Route path="/AllBikes" element={<AllBikes />} />
          <Route path="/bike/:id" element={<SingleBike />} />
          <Route path="/book/:id" element={<BookBike />} />
          <Route path="/Booking" element={<GetBooking />} />
          <Route path="/ViewSingleBooking" element={<ViewSingleBooking/>} />
          <Route path = '/Profile' element = {<Profile/>}></Route>

        </Routes>
      </div>
    </Router>
   );
}












 
export default App;