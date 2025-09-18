import styled from 'styled-components';

export const AuthContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ themeMode, theme }) => 
    themeMode === 'dark' ? '#0f0f0f' : '#fcfcfc'};
  padding: 2rem 5%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const AuthWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  background: ${({ themeMode, theme }) => 
    themeMode === 'dark' ? '#1a1a1a' : '#ffffff'};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'};

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 450px;
  }
`;

export const AuthLeft = styled.div`
  flex: 1;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.bgImage || 'none'});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%);
  }
  
  @media (max-width: 768px) {
    min-height: 200px;
  }
`;

export const AuthRight = styled.div`
  flex: 1;
  padding: 3rem 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const AuthTitle = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 2.5rem;
  color: ${({ themeMode, theme }) => theme[themeMode].text};
  margin-bottom: 2rem;
  font-weight: 600;
  text-align: center;
  
  span {
    color: ${({ themeMode, theme }) => theme[themeMode].primary};
    font-style: italic;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const AuthInput = styled.input`
  width: 100%;
  padding: 1rem 1.2rem;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'};
  border-radius: 8px;
  font-size: 1rem;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${({ themeMode, theme }) => theme[themeMode].text};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ themeMode, theme }) => theme[themeMode].primary};
    box-shadow: 0 0 0 3px ${({ themeMode, theme }) => theme[themeMode].primary}20;
  }

  &::placeholder {
    color: ${({ themeMode }) => 
      themeMode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'};
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.4)'};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ themeMode, theme }) => theme[themeMode].primary};
  }
`;

export const AuthButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  background: ${({ themeMode, theme }) => theme[themeMode].primary};
  color: ${({ themeMode }) => themeMode === 'dark' ? '#0f0f0f' : '#ffffff'};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ themeMode, theme }) => theme[themeMode].primary}40;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const AuthText = styled.p`
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
  text-align: center;
  margin-top: 2rem;
  font-size: 0.95rem;

  a {
    color: ${({ themeMode, theme }) => theme[themeMode].primary};
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const ErrorText = styled.p`
  color: #ef4444;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;
`;