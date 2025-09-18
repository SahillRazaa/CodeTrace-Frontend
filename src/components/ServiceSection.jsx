import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
import { FaCode, FaRocket, FaBook, FaBug, FaProjectDiagram, FaRobot, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Container = styled.section`
  width: 100%;
  padding: 5rem 5%;
  background: ${({ themeMode }) => themeMode === 'dark' ? '#0f0f0f' : '#fcfcfc'};
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${({ themeMode }) => themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  font-weight: 600;
  font-family: 'Georgia', serif;
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ themeMode }) => themeMode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const CarouselContainer = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 1000px;
`;

const CarouselTrack = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding: 2rem 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ServiceCard = styled.div`
  flex: 0 0 320px;
  background: ${({ themeMode }) => themeMode === 'dark' ? '#1a1a1a' : '#ffffff'};
  border: 1px solid ${({ themeMode }) => themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'};
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: ${({ themeMode }) => themeMode === 'dark' ? '0 20px 40px rgba(0, 0, 0, 0.2)' : '0 20px 40px rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 380px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ themeMode }) => themeMode === 'dark' ? '0 30px 60px rgba(0, 0, 0, 0.3)' : '0 30px 60px rgba(0, 0, 0, 0.1)'};
  }
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: ${({ themeMode }) => themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ themeMode }) => themeMode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)'};
  font-size: 1.5rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ themeMode }) => themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  margin: 0;
  font-weight: 600;
`;

const ServiceDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ themeMode }) => themeMode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
  line-height: 1.6;
  flex-grow: 1;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid ${({ themeMode }) => themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  background: ${({ themeMode }) => themeMode === 'dark' ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${({ themeMode }) => themeMode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: ${({ themeMode }) => themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    border-color: ${({ themeMode }) => themeMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const PrevButton = styled(NavButton)`
  left: -60px;
`;

const NextButton = styled(NavButton)`
  right: -60px;
`;

const features = [
  {
    title: 'Dry Run Visualizer',
    description: 'Step-through code execution with visualization of variables and memory states. Perfect for understanding complex algorithms.',
    icon: <FaCode />,
    to: '/service/dry-run-visualizer',
  },
  {
    title: 'Code Optimizer',
    description: 'AI-powered suggestions for optimizing code performance and efficiency. Analyze and improve your algorithms.',
    icon: <FaRocket />,
    to: '/service/code-optimizer',
  },
  {
    title: 'Real-life Examples',
    description: 'Practical code implementations through real-world scenarios. Bridge theory with practical application.',
    icon: <FaBook />,
    to: '/service/relate-real-life',
  },
  {
    title: 'Bug Fix Game',
    description: 'Learn debugging through interactive challenges and puzzles. Develop problem-solving skills.',
    icon: <FaBug />,
    to: '/service/fix-bug-game',
  },
  {
    title: 'Code Flow Analyzer',
    description: 'Visualize code execution paths and data flow diagrams. Understand program structure and patterns.',
    icon: <FaProjectDiagram />,
    to: '/ollama',
    comingSoon: true,
  },
  {
    title: 'AI Chat Assistant',
    description: '24/7 programming help and conceptual explanations. Get instant answers to coding questions.',
    icon: <FaRobot />,
    to: '/ollama',
    comingSoon: true,
  },
];

export default function ServiceSection({ themeMode }) {
  const userName = useSelector(state => state.auth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = React.useRef(null);

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const card = carouselRef.current.children[index];
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    setCurrentIndex(index);
  };

  const next = () => {
    const nextIndex = (currentIndex + 1) % features.length;
    scrollToIndex(nextIndex);
  };

  const prev = () => {
    const prevIndex = (currentIndex - 1 + features.length) % features.length;
    scrollToIndex(prevIndex);
  };

  return (
    <Container themeMode={themeMode}>
      <SectionContainer>
        <HeroSection>
          <HeroTitle themeMode={themeMode}>
            Welcome, {userName.currentUser.username}
          </HeroTitle>
          <HeroSubtitle themeMode={themeMode}>
            Explore our suite of advanced development tools designed to enhance your coding experience
          </HeroSubtitle>
        </HeroSection>

        <CarouselContainer>
          <PrevButton themeMode={themeMode} onClick={prev} disabled={currentIndex === 0}>
            <FaChevronLeft />
          </PrevButton>
          
          <CarouselTrack ref={carouselRef}>
            {features.map((feature, index) => (
              <ServiceCard key={index} themeMode={themeMode}>
                <ServiceIcon themeMode={themeMode}>
                  {feature.icon}
                </ServiceIcon>
                <ServiceTitle themeMode={themeMode}>
                  {feature.title}
                </ServiceTitle>
                <ServiceDescription themeMode={themeMode}>
                  {feature.description}
                </ServiceDescription>
                <Link to={feature.to} style={{ textDecoration: 'none' }}>
                  <button style={{
                    padding: '0.8rem 1.5rem',
                    border: '1px solid',
                    borderColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                    borderRadius: '10px',
                    background: 'transparent',
                    color: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}>
                    {feature.comingSoon ? 'Coming Soon' : 'Explore →'}
                  </button>
                </Link>
              </ServiceCard>
            ))}
          </CarouselTrack>

          <NextButton themeMode={themeMode} onClick={next} disabled={currentIndex === features.length - 1}>
            <FaChevronRight />
          </NextButton>
        </CarouselContainer>
      </SectionContainer>
    </Container>
  );
}