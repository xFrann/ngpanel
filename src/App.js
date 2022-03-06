import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignInSide from './containers/SignInSide'
import Dashboard from './containers/Dashboard'
const App = () => {

  return (
      <Router>
        <Routes>
          {/* <Route path="/" element={SignInSide}></Route> */}
          <Route path="/" element={<SignInSide></SignInSide>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        </Routes>
      </Router>
  )
}

export default App;
