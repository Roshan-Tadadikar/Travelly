import logo from './logo.svg';
import './App.css';
import Home from './Components/HomePage/Home';
import {Route,Routes} from "react-router-dom"
import SinglePost from './Components/Post/SinglePost';
import Profile from './Components/Profile/Profile';
import RequiresAuth from './Components/Authentication/RequiresAuth';
import Login from './Components/Authentication/Login';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/signup" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
      <Route path='/' element={<RequiresAuth><Home/></RequiresAuth>} />
      <Route path='/explore' element={<RequiresAuth><Home/></RequiresAuth>} />
        <Route path='/bookmark' element={<RequiresAuth><Home/></RequiresAuth>} />
        <Route path='/post' element={<RequiresAuth><SinglePost/></RequiresAuth>} />
        <Route path='/profile' element={<RequiresAuth><Profile/></RequiresAuth>} />
      </Routes>
    </div>
  );
}

export default App;
