import React from "react";
import { Route, Routes, BrowserRouter, Link } from "react-router-dom";
import CityForm from "./components/CityForm";
import CityList from "./components/CityManagement";
import SignIn from "./components/Login";
import Navigation from "./components/Navigation";
import SignUp from "./components/Signup";
import BusManagement from "./components/BusManagement";
import DashboardLayout from "./components/dashboard";
import Error from "./components/Error";
import UserManagement from "./components/UserManagement";
import CityManagement from "./components/CityManagement";
function App() {
  return (
    <div className="App">
      <header className="App-header">
          
      
   
      </header>
      <div className="App-body">
       
    
      <BrowserRouter>
     
      <Routes>
        
        <Route path='/' element={<SignIn/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/dashboard' element={<DashboardLayout/>}/>
        <Route path="/citymanagement" element={<CityManagement />} />
        <Route path="/busmanagement" element={<BusManagement/>} />
        <Route path="/usermanagement" element={<UserManagement/>} />
        <Route path="*"  element={<Error/>} />
       
      </Routes>
     
    </BrowserRouter>
    
            </div>
            
    </div>

  );
}



export default App;
