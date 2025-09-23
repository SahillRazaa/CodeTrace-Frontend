import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/authSlice';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 5%;
  position: fixed;
  width: 100%;
  top: 0;
  background: ${({ themeMode }) =>
    themeMode === 'dark' ? 'rgba(17, 24, 39, 0.85)' : 'rgba(255, 255, 255, 0.85)'};
  backdrop-filter: blur(16px);
  z-index: 1000;
  border-bottom: 1px solid ${({ themeMode }) =>
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'};
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme, themeMode }) => theme[themeMode].text};
  text-decoration: none;
  font-family: 'Georgia', serif;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme, themeMode }) => theme[themeMode].subtleText};
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuIcon = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme, themeMode }) => theme[themeMode].text};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    position: relative;
    z-index: 1200;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? '0' : '-100%')};
  width: 75%;
  height: 100vh;
  background: ${({ themeMode }) =>
    themeMode === 'dark' ? '#111827' : '#ffffff'};
  transition: right 0.3s ease-in-out;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.5rem;
`;

const CloseIcon = styled.button`
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  background: transparent;
  border: none;
  color: ${({ theme, themeMode }) => theme[themeMode].text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1201;
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
  color: ${({ theme, themeMode }) => theme[themeMode].text};
  transition: all 0.2s ease;
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
  border: 1px solid
    ${({ filled, themeMode }) =>
      filled
        ? 'transparent'
        : themeMode === 'dark'
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(0, 0, 0, 0.12)'};
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
  border: none;
  cursor: pointer;
  color: ${({ theme, themeMode }) => theme[themeMode].text};
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: ${({ show }) => (show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const ModalCard = styled.div`
  background: ${({ themeMode }) => themeMode === 'dark' ? '#1a1a1a' : '#fff'};
  color: ${({ themeMode }) => themeMode === 'dark' ? '#fff' : '#000'};
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const ModalButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  background: ${({ primary, themeMode }) => primary ? (themeMode === 'dark' ? '#ef4444' : '#ef4444') : 'transparent'};
  color: ${({ primary, themeMode }) => primary ? '#fff' : (themeMode === 'dark' ? '#fff' : '#000')};
  border: ${({ primary, themeMode }) => primary ? 'none' : `1px solid ${themeMode === 'dark' ? '#fff' : '#000'}`};
`;

export default function Navbar({ themeMode, isLoggedIn, setIsLoggedIn, setIsDarkMode, theme }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    setShowLogoutModal(false);
    setIsLoggedIn(false);
    setMobileOpen(false);
  };

  return (
    <>
      <Nav themeMode={themeMode}>
        <Logo to="/" theme={theme} themeMode={themeMode}>
          CodeTrace
        </Logo>
        <NavRight>
          <ThemeToggle onClick={() => setIsDarkMode((prev) => !prev)} themeMode={themeMode} theme={theme}>
            {themeMode === 'dark' ? '🌙' : '☀️'}
          </ThemeToggle>
          {isLoggedIn && user.currentUser ? (
            <UserProfile>
              <UserCircle theme={theme} themeMode={themeMode}>
                {user.currentUser.username[0].toUpperCase()}
              </UserCircle>
              <LogoutButton theme={theme} themeMode={themeMode} onClick={() => setShowLogoutModal(true)}>
                <FaSignOutAlt />
              </LogoutButton>
            </UserProfile>
          ) : (
            <>
              <AuthButton to="/login" themeMode={themeMode} theme={theme}>
                Sign In
              </AuthButton>
              <AuthButton to="/register" filled="true" themeMode={themeMode} theme={theme}>
                Get Started
              </AuthButton>
            </>
          )}
        </NavRight>
        <MobileMenuIcon onClick={() => setMobileOpen(true)} theme={theme} themeMode={themeMode}>
          <FaBars />
        </MobileMenuIcon>
      </Nav>

      <MobileMenu open={mobileOpen} themeMode={themeMode}>
        <CloseIcon onClick={() => setMobileOpen(false)} theme={theme} themeMode={themeMode}>
          <FaTimes />
        </CloseIcon>
        <ThemeToggle onClick={() => setIsDarkMode((prev) => !prev)} themeMode={themeMode} theme={theme}>
          {themeMode === 'dark' ? '🌙' : '☀️'}
        </ThemeToggle>
        {isLoggedIn && user.currentUser ? (
          <UserProfile>
            <UserCircle theme={theme} themeMode={themeMode}>
              {user.currentUser.username[0].toUpperCase()}
            </UserCircle>
            <LogoutButton theme={theme} themeMode={themeMode} onClick={() => setShowLogoutModal(true)}>
              <FaSignOutAlt /> Logout
            </LogoutButton>
          </UserProfile>
        ) : (
          <>
            <AuthButton to="/login" themeMode={themeMode} theme={theme} onClick={() => setMobileOpen(false)}>
              Sign In
            </AuthButton>
            <AuthButton to="/register" filled="true" themeMode={themeMode} theme={theme} onClick={() => setMobileOpen(false)}>
              Get Started
            </AuthButton>
          </>
        )}
      </MobileMenu>

      <ModalOverlay show={showLogoutModal}>
        <ModalCard themeMode={themeMode}>
          <h3>Confirm Logout</h3>
          <p>Are you sure you want to log out?</p>
          <ModalButtons>
            <ModalButton themeMode={themeMode} onClick={() => setShowLogoutModal(false)}>
              Cancel
            </ModalButton>
            <ModalButton primary themeMode={themeMode} onClick={handleLogout}>
              Logout
            </ModalButton>
          </ModalButtons>
        </ModalCard>
      </ModalOverlay>
    </>
  );
}
