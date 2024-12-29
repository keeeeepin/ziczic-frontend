import { Route, Routes } from 'react-router-dom'

import Login from './auth/Login.jsx'
import Signup from './auth/Signup.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App