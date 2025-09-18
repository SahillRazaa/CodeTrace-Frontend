import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/authSlice';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 5%;
  position: fixed;
  width: 100vw;
  top: 0;
  background: ${({ themeMode, theme }) =>
    themeMode === 'dark' ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(16px);
  z-index: 1000;
  border-bottom: 1px solid ${({ themeMode }) =>
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'};
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;


const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ themeMode, theme }) => theme[themeMode].text}; /* Changed to text color */
  text-decoration: none;
  letter-spacing: -0.5px;
  font-family: 'Georgia', serif;
  transition: color 0.2s ease; /* Added transition */

  &:hover {
    color: ${({ themeMode, theme }) => theme[themeMode].subtleText}; /* FIX: Explicitly set hover color */
  }
`;

const ThemeToggle = styled.button`
  background: transparent;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid ${({ themeMode }) =>
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${({ themeMode, theme }) => theme[themeMode].text};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ themeMode, theme }) => theme[themeMode].hover};
    border-color: ${({ themeMode, theme }) =>
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  }
`;

const AuthButton = styled(Link)`
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  background: ${({ filled, theme, themeMode }) =>
    filled ? theme[themeMode].primary : 'transparent'};
  color: ${({ filled, theme, themeMode }) =>
    filled ? theme[themeMode].background : theme[themeMode].text};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-size: 0.95rem;
  box-shadow: ${({ filled, themeMode, theme }) =>
    filled ? `0 4px 14px rgba(0, 0, 0, 0.05)` : 'none'};
  border: 1px solid ${({ filled, themeMode }) =>
    filled ? 'transparent' : (themeMode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)')};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ filled }) =>
      filled ? `0 6px 20px rgba(0, 0, 0, 0.08)` : `0 4px 12px rgba(0, 0, 0, 0.05)`};
    background: ${({ filled, theme, themeMode }) =>
      filled ? (themeMode === 'dark' ? '#e5e7eb' : '#374151') : theme[themeMode].hover};
    color: ${({ filled, theme, themeMode }) =>
      filled ? (themeMode === 'dark' ? '#111827' : '#f9fafb') : theme[themeMode].text}; /* FIX: Explicitly set hover color */
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const UserCircle = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: ${({ theme, themeMode }) => theme[themeMode].primary};
  color: ${({ theme, themeMode }) => theme[themeMode].background};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 1rem;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  cursor: pointer;
  color: ${({ themeMode, theme }) => theme[themeMode].text};
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ themeMode, theme }) => theme[themeMode].hover};
    border-color: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
    color: ${({ themeMode, theme }) => theme[themeMode].text};
  }
`;

const ConfirmationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  backdrop-filter: blur(4px);
`;

const ConfirmationDialog = styled.div`
  background: ${({ themeMode, theme }) => themeMode === 'dark' ? '#1a1a1a' : '#ffffff'};
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  width: 90%;
`;

const DialogMessage = styled.p`
  color: ${({ themeMode, theme }) => theme[themeMode].text};
  margin-bottom: 1.5rem;
  font-size: 1rem;
  line-height: 1.5;
`;

const DialogButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
`;

const DialogButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  border: ${({ variant, themeMode }) => 
    variant === 'confirm' ? 'none' : `1px solid ${themeMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`};
  background: ${({ themeMode, theme, variant }) => 
    variant === 'confirm' ? theme[themeMode].primary : 'transparent'};
  color: ${({ themeMode, theme, variant }) => 
    variant === 'confirm' ? theme[themeMode].background : theme[themeMode].text};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ variant, themeMode, theme }) => 
      variant === 'confirm' ? `0 4px 14px rgba(0, 0, 0, 0.1)` : '0 4px 12px rgba(0, 0, 0, 0.05)'};
    background: ${({ themeMode, theme, variant }) => 
      variant === 'confirm' ? (themeMode === 'dark' ? '#e5e7eb' : '#374151') : theme[themeMode].hover};
     color: ${({ themeMode, theme, variant }) => 
      variant === 'confirm' ? (themeMode === 'dark' ? '#111827' : '#f9fafb') : theme[themeMode].text};
  }
`;

export default function Navbar({ themeMode, isLoggedIn, setIsLoggedIn, setIsDarkMode, theme }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
    const handleLogout = (e) => {
      e.preventDefault();
      setShowLogoutConfirm(false);
      dispatch(logOut());
      setIsLoggedIn(false);
    };
  
    return (
      <>
        <Nav themeMode={themeMode} theme={theme}>
          <NavLeft>
            <Logo to="/" themeMode={themeMode} theme={theme}>CodeTrace</Logo>
          </NavLeft>
          <NavRight>
            <ThemeToggle 
              onClick={() => setIsDarkMode(prev => !prev)}
              themeMode={themeMode}
              theme={theme}
            >
              {themeMode === 'dark' ? '🌙' : '☀️'}
            </ThemeToggle>
            {isLoggedIn && user.currentUser ? (
              <UserProfile>
                <UserCircle theme={theme} themeMode={themeMode}>
                  {user.currentUser.username[0].toUpperCase()}
                </UserCircle>
                <LogoutButton 
                  theme={theme} 
                  themeMode={themeMode}
                  onClick={() => setShowLogoutConfirm(true)}
                  title="Logout"
                >
                  <FaSignOutAlt />
                </LogoutButton>
              </UserProfile>
            ) : (
              <>
                <AuthButton to='/login' themeMode={themeMode} theme={theme}>
                  Sign In
                </AuthButton>
                <AuthButton to='/register' filled="true" themeMode={themeMode} theme={theme}>
                  Get Started
                </AuthButton>
              </>
            )}
          </NavRight>
        </Nav>
        {showLogoutConfirm && (
          <ConfirmationOverlay>
            <ConfirmationDialog themeMode={themeMode} theme={theme}>
              <DialogMessage themeMode={themeMode} theme={theme}>
                Are you sure you want to logout?
              </DialogMessage>
              <DialogButtons>
                <DialogButton 
                  themeMode={themeMode}
                  theme={theme}
                  variant="confirm"
                  onClick={handleLogout}
                >
                  Yes, Logout
                </DialogButton>
                <DialogButton 
                  themeMode={themeMode}
                  theme={theme}
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  Cancel
                </DialogButton>
              </DialogButtons>
            </ConfirmationDialog>
          </ConfirmationOverlay>
        )}
      </>
    );
  }