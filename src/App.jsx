import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {
  Home,
  // Settings,
  // Editor,
  // Article,
  // Profile,
  Auth,
} from './pages'
import {
  // AuthRoute,
  GuestRoute,
  Navbar,
} from './components'
import { useAuth } from './hooks'

// import './App.css'

function App() {
  const { loadApp, isAppLoaded } = useAuth()

  useEffect(() => {
    loadApp()
  }, [loadApp])


  if (isAppLoaded) {
    return (
      <Router>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={
                <GuestRoute>
                  <Auth key="register" />
                </GuestRoute>
              }
            />
            <Route
              path="/login"
              element={
                <GuestRoute>
                  <Auth key="login" />
                </GuestRoute>
              }
            />
            {/* 
    
          <AuthRoute path="/settings" element={<Settings />} />
          <AuthRoute path="/editor" element={<Editor />} />
          <Route path="/editor/:slug" element={<Editor />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/profile/:username" element={<Profile />} />
          <AuthRoute path="/@:username" element={<Profile />} /> */}
          </Routes>
        </main>
        <footer>
          <div className="container">
            <Link to="/" className="logo-font">
              conduit
            </Link>
            <span className="attribution">
              An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
              licensed under MIT.
            </span>
          </div>
        </footer>
      </Router>
    )
  }

  return (<></>)
}

export default App
