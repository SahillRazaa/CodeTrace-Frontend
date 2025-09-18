import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LuxurySection = styled.section`
  width: 100vw;
  min-height: calc(100vh - 3rem);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
  background: ${({ themeMode, theme }) => 
    themeMode === 'dark' 
      ? '#0f0f0f' 
      : '#fcfcfc'};
  position: relative;
  overflow: hidden;
`;

const SectionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HeroContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const TextContent = styled.div`
  width: 100%;
  animation: ${fadeIn} 0.8s ease-out forwards;

  h1 {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 3.5rem;
    color: ${({ themeMode, theme }) => theme[themeMode].text};
    margin-bottom: 1.8rem;
    line-height: 1.15;
    font-weight: 500;
    letter-spacing: -0.5px;
    
    span {
      color: ${({ themeMode, theme }) => theme[themeMode].primary};
      font-weight: 600;
      background: ${({ themeMode, theme }) => 
        `linear-gradient(120deg, ${theme[themeMode].primary}20 0%, ${theme[themeMode].primary}10 100%)`};
      padding: 0 8px;
      border-radius: 4px;
    }
  }

  p {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 1.25rem;
    color: ${({ themeMode, theme }) => themeMode === 'dark' ? '#a0a0a0' : '#666'};
    line-height: 1.6;
    margin-bottom: 2.8rem;
    font-weight: 400;
    max-width: 580px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
    
    p {
      font-size: 1.1rem;
    }
  }
`;

const AuthButton = styled.button`
  padding: 1.1rem 2.4rem;
  border-radius: 6px;
  border: none;
  background: ${({ themeMode, theme }) => theme[themeMode].primary};
  color: ${({ themeMode }) => themeMode === 'dark' ? '#0a0a0a' : '#fff'};
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.23s ease;
  display: inline-flex;
  gap: 10px;
  align-items: center;
  font-size: 1rem;
  box-shadow: 0 4px 14px ${({ themeMode, theme }) => theme[themeMode].primary}30;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ themeMode, theme }) => theme[themeMode].primary}40;
  }

  &:active {
    transform: translateY(0);
  }
`;

const SubtleGrid = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
  opacity: ${({ themeMode }) => themeMode === 'dark' ? 0.03 : 0.06};
  background-image: 
    linear-gradient(${({ themeMode }) => themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} 1px, transparent 1px),
    linear-gradient(90deg, ${({ themeMode }) => themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} 1px, transparent 1px);
  background-size: 40px 40px;
`;

export default function LuxuryHeroSection({ themeMode, theme }) {
  return (
    <LuxurySection themeMode={themeMode} theme={theme}>
      <SubtleGrid themeMode={themeMode} />
      <SectionContainer>
        <HeroContent>
          <TextContent themeMode={themeMode} theme={theme}>
            <h1>
              <span>Code Analytics</span> for<br />
              Modern Developers
            </h1>
            <p>
              Gain deep insights into your coding patterns, optimize workflows with precision, 
              and collaborate effectively with our intelligent development analytics platform.
            </p>
            <Link to='/register'>
              <AuthButton themeMode={themeMode} theme={theme}>
                Start Tracing Now
              </AuthButton>
            </Link> 
          </TextContent>
        </HeroContent>
      </SectionContainer>
    </LuxurySection>
  );
}