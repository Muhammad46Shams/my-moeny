import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const {authIsReady, user } = useAuthContext()
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {/* Navigation */}
          <Navbar/>

          {/* Routes */}
          <Routes>
            <Route path="/" element={user ?  <Home /> : <Navigate to="/login" /> } />
            <Route path="/signup" element={!user ?  <Signup /> : <Navigate to="/" /> } />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
