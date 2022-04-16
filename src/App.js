import React from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignInSide from './containers/SignInSide'
import Dashboard from './containers/Dashboard'
import Announcements from './containers/Announcements'
import Statistics from './containers/Statistics'
import Website from './containers/Website'
import Content from './containers/Content'
import Register from './containers/Register'
const App = () => {

  return (
      <Router>
        <Routes>
          {/* <Route path="/" element={SignInSide}></Route> */}
          <Route path="/" element={<SignInSide></SignInSide>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path="/dashboard/*" element={<Dashboard></Dashboard>}>
            <Route path="annoucements" element={<Announcements></Announcements>}></Route>  
            <Route path="statistics" element={<Statistics></Statistics>}></Route>
            <Route path="website" element={<Website></Website>}></Route>
            <Route path="content" element={<Content></Content>}></Route>
          </Route>
        </Routes>
      </Router>
  )
}

export default App;
