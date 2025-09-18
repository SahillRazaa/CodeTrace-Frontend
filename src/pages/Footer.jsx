import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  padding: 0.6rem 0rem;
  background: ${({ themeMode, theme }) => 
    themeMode === 'dark' ? '#0a0a0a' : '#f8f8f8'};
  border-top: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

const FooterContent = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Copyright = styled.p`
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#888' : '#666'};
  font-size: 0.95rem;
  margin: 0;
`;

const MadeWithLove = styled.p`
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#888' : '#666'};
  font-size: 0.95rem;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  
  span {
    color: ${({ themeMode, theme }) => theme[themeMode].primary};
  }
`;

const Footer = ({ themeMode, theme }) => {
  return (
    <FooterContainer themeMode={themeMode} theme={theme}>
      <FooterContent>
        <Copyright themeMode={themeMode}>
          © {new Date().getFullYear()} CodeTrace. All rights reserved.
        </Copyright>
        <MadeWithLove themeMode={themeMode} theme={theme}>
          Made with <span>♥</span> by Sahil & Monisha
        </MadeWithLove>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;