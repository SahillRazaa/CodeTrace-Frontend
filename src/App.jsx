import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DryRunVisualizer from "./pages/services/DryRunVisualizer";
import CodeOptimizer from "./pages/services/CodeOptimizer";
import RelateRealLife from "./pages/services/RelateRealLife";
import FixBugGame from "./pages/services/FixBugGame";
import {ToastContainer} from 'react-toastify';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.6;
    background: ${props => props.theme[props.themeMode].background};
    color: ${props => props.theme[props.themeMode].text};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 600;
    line-height: 1.2;
  }
`;

// Theme definition
export const theme = {
  light: {
    primary: '#1f2937', 
    background: '#FFFFFF',
    text: '#000000', 
    subtleText: '#6b7280', 
    glass: 'rgba(255, 255, 255, 0.8)',
    border: '#e5e7eb', 
    hover: '#f9fafb', 
    card: '#ffffff',
  },
  dark: {
    primary: '#f9fafb',
    background: '#111827', 
    text: '#f9fafb', 
    subtleText: '#9ca3af',
    glass: 'rgba(17, 24, 39, 0.8)',
    border: '#374151',
    hover: '#1f2937',
    card: '#1a1a1a',
  }
};

// Main App Container
const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${props => props.theme[props.themeMode].background};
  color: ${props => props.theme[props.themeMode].text};
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const themeMode = isDarkMode ? 'dark' : 'light';
  const user = useSelector(state => state.auth);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} themeMode={themeMode} />
      <AppContainer themeMode={themeMode}>
        <Router>
          <Routes>
            <Route 
              exact path="/" 
              element={
                <Home 
                  themeMode={themeMode} 
                  setIsDarkMode={setIsDarkMode}
                />
              } 
            />
            <Route 
              exact path="/login" 
              element={<Login themeMode={themeMode} />} 
            />
            <Route 
              exact path="/register" 
              element={<Register themeMode={themeMode} />} 
            />
            <Route 
              exact path="/service/dry-run-visualizer" 
              element={<DryRunVisualizer themeMode={themeMode} />} 
            />
            <Route 
              exact path="/service/code-optimizer" 
              element={<CodeOptimizer themeMode={themeMode} />} 
            />
            <Route 
              exact path="/service/relate-real-life" 
              element={<RelateRealLife themeMode={themeMode} />} 
            />
            <Route 
              exact path="/service/fix-bug-game" 
              element={<FixBugGame themeMode={themeMode} />} 
            />
          </Routes>
          <ToastContainer />
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;