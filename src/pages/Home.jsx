import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ServiceSection from '../components/ServiceSection';
import { useSelector } from 'react-redux';
import Footer from './Footer';

const MainContent = styled.main`
  width: 100%;
`;

const Home = ({ themeMode, setIsDarkMode }) => {
  const user = useSelector(state => state.auth);

  return (
    <>
      <Navbar
        themeMode={themeMode}
        isLoggedIn={user.currentUser !== null}
        setIsDarkMode={setIsDarkMode}
      />
      <MainContent>
        {!user.currentUser ? (
          <HeroSection themeMode={themeMode} />
        ) : (
          <ServiceSection themeMode={themeMode} />
        )}
      </MainContent>
      <Footer themeMode={themeMode} />
    </>
  );
};

export default Home;