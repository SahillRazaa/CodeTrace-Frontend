import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/apiCalls';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? '#0f0f0f' : '#f8fafc'};
`;

const RegisterCard = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 2rem 2rem;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? '#1a1a1a' : '#ffffff'};
  border-radius: 16px;
  box-shadow: ${({ themeMode }) => 
    themeMode === 'dark' 
      ? '0 20px 40px rgba(0, 0, 0, 0.2)' 
      : '0 20px 40px rgba(0, 0, 0, 0.06)'};
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'};
`;

const Logo = styled(Link)`
  display: block;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ themeMode }) => themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  text-decoration: none;
  margin-bottom: 1.5rem;
  font-family: 'Georgia', serif;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: ${({ themeMode }) => themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

const Input = styled.input`
  padding: 1rem 1.2rem;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'};
  border-radius: 8px;
  font-size: 0.95rem;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)'};
  color: ${({ themeMode }) => themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  transition: all 0.2s ease;
  padding-right: 3rem;

  &:focus {
    outline: none;
    border-color: #1f2937;
    box-shadow: 0 0 0 3px rgba(31, 41, 55, 0.1);
  }

  &::placeholder {
    color: ${({ themeMode }) => 
      themeMode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'};
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)'};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ themeMode }) => themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  background: #1f2937;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 0.5rem;
  
  &:hover {
    background: #374151;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(31, 41, 55, 0.2);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const FooterText = styled.p`
  text-align: center;
  margin-top: 2rem;
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'};
  font-size: 0.9rem;
`;

const FooterLink = styled(Link)`
  color: #1f2937;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
  text-align: center;
`;

const Register = ({ themeMode }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.auth);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      console.log('Please enter a valid email address');
      return;
    }

    if (!fullName || !email || !password || !confirmPassword) {
      console.log('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      console.log('Passwords do not match!');
      return;
    }

    register(dispatch, { username: fullName, email: email, password: password });

    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');

    navigate('/');
  };

  return (
    <RegisterContainer themeMode={themeMode}>
      <RegisterCard themeMode={themeMode}>
        <Logo to="/" themeMode={themeMode}>CodeTrace</Logo>
        
        <Title themeMode={themeMode}>Create Account</Title>
        <Subtitle themeMode={themeMode}>Get started with your free account</Subtitle>

        {error && (
          <ErrorMessage>
            Registration failed. Please try again.
          </ErrorMessage>
        )}

        <Form onSubmit={handleRegister}>
          <InputGroup>
            <Input
              themeMode={themeMode}
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Input
              themeMode={themeMode}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Input
              themeMode={themeMode}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordToggle 
              themeMode={themeMode}
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
            </PasswordToggle>
          </InputGroup>

          <InputGroup>
            <Input
              themeMode={themeMode}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <PasswordToggle 
              themeMode={themeMode}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              type="button"
            >
              {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
            </PasswordToggle>
          </InputGroup>

          <Button 
            type="submit"
            disabled={isFetching}
          >
            {isFetching ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </Form>

        <FooterText themeMode={themeMode}>
          Already have an account?{' '}
          <FooterLink to="/login">Sign in</FooterLink>
        </FooterText>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;