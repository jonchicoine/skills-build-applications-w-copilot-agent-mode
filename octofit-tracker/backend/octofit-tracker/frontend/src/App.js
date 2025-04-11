import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.png';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <Link className="navbar-brand" to="/">
                <img src={logo} alt="OctoFit Logo" className="logo" />
                OctoFit Tracker
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/activities">Activities</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/leaderboard">Leaderboard</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/teams">Teams</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/users">Users</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({isActive}) => isActive ? "nav-link active" : "nav-link"} to="/workouts">Workouts</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <div className="container mt-4">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={
              <div className="jumbotron bg-light p-5 rounded welcome-container">
                <h1 className="display-4">Welcome to OctoFit Tracker</h1>
                <p className="lead">Track your fitness goals, compete with friends, and achieve your best self!</p>
                <hr className="my-4" />
                <p>Select a menu option above to get started or check out the leaderboard to see who's on top.</p>
                <Link className="btn btn-primary btn-lg" to="/leaderboard">View Leaderboard</Link>
              </div>
            } />
          </Routes>
        </div>
        
        <footer className="bg-dark text-white text-center py-3 mt-5">
          <div className="container">
            <p className="mb-0">© 2025 OctoFit Tracker - Mergington High School</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
