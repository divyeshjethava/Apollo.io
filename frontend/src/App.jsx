import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import People from './components/People'
import Email from './components/Email'
import CompanySearch from './components/company'
import DataEnrichmentPage from './components/DataEnrich'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="people" element={<People />} />
          <Route path="email" element={<Email />} />
          <Route path="company" element={<CompanySearch/>} />
          <Route path="DataEnrichmentPage" element={<DataEnrichmentPage/>} />
          
        </Route>
      </Routes>
    </Router>
  )
}

export default App
