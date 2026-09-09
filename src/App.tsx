import React from 'react'
import './App.css'
import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import SignInPage from './routes/SignInPage'
import SignUpPage from './routes/SignUpPage'
import DashboardPage from './routes/Dashboard/Dashboard'
import EntryForm from './routes/EntryForm'
import PastEntriesPage from './routes/PastEntriesPage'
import PomodoroTimerPage from './routes/PomodoroTimerPage'
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
        <Route path="/entries" element={
          <SignedIn>
            <PastEntriesPage />
          </SignedIn>
        } />
        <Route path="/log" element={
          <SignedIn>
            <EntryForm />
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

