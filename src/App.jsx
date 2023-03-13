import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './routes/Home'
import NotFound from './routes/NotFound'
import AppLayout from './components/AppLayout'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
