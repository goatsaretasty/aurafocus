import React from 'react'
import './App.css'
import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import SignInPage from './routes/SignInPage'
import SignUpPage from './routes/SignUpPage'
import DashboardPage from './routes/Dashboard/Dashboard'
import MoodInputForm from './routes/MoodInputForm'
import PomodoroTimerPage from './routes/PomodoroTimerPage'
import SearchPage from './routes/SearchPage'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={
          <SignedIn>
            <Navigate to="/dashboard" replace />
          </SignedIn>
        } />
        <Route path="/sign-in" element={
          <SignedOut>
            <SignInPage />
          </SignedOut>
        } />
        <Route path="/sign-up" element={
          <SignedOut>
            <SignUpPage />
          </SignedOut>
        } />
        <Route path="/dashboard" element={
          <SignedIn>
            <DashboardPage />
          </SignedIn>
        } />
        <Route path="/search" element={
          <SignedIn>
            <SearchPage />
          </SignedIn>
        } />
        <Route path="/mood-input" element={
          <SignedIn>
            <MoodInputForm />
          </SignedIn>
        } />
        <Route path="/pomodoro-timer" element={
          <SignedIn>
            <PomodoroTimerPage />
          </SignedIn>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App

