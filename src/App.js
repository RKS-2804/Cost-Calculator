import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CalculatorProvider } from './context/CalculatorContext';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Reports from './components/Reports';
import Documentation from './components/Documentation';

const App = () => {
  return (
    <CalculatorProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/docs" element={<Documentation />} />
        </Routes>
      </Router>
    </CalculatorProvider>
  );
};

export default App;
