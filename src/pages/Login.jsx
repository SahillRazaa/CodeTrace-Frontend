import React, { useState } from 'react';
import styled from 'styled-components';
import { login } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ShowToast } from '../utils/Toaster';

const LoginContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: ${({ themeMode }) =>
    themeMode === 'dark' ? '#0f0f0f' : '#f8fafc'};
`;

const LoginCard = styled.div`
  position: relative;
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
  border: 1px solid
    ${({ themeMode }) =>
      themeMode === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.06)'};
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  z-index: 10;
`;

const Loader = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoaderText = styled.p`
  margin-top: 1rem;
  font-size: 0.95rem;
  color: #ffffff;
  text-align: center;
  animation: fadeIn 0.8s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Logo = styled(Link)`
  display: block;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ themeMode }) =>
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  text-decoration: none;
  margin-bottom: 1.5rem;
  font-family: 'Georgia', serif;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: ${({ themeMode }) =>
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ themeMode }) =>
    themeMode === 'dark'
      ? 'rgba(255, 255, 255, 0.6)'
      : 'rgba(0, 0, 0, 0.6)'};
  font-size: 0.9rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 1rem 1.2rem;
  border: 1px solid
    ${({ themeMode }) =>
      themeMode === 'dark'
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(0, 0, 0, 0.12)'};
  border-radius: 8px;
  font-size: 0.95rem;
  background: ${({ themeMode }) =>
    themeMode === 'dark'
      ? 'rgba(255, 255, 255, 0.04)'
      : 'rgba(0, 0, 0, 0.02)'};
  color: ${({ themeMode }) =>
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1f2937;
    box-shadow: 0 0 0 3px rgba(31, 41, 55, 0.1);
  }

  &::placeholder {
    color: ${({ themeMode }) =>
      themeMode === 'dark'
        ? 'rgba(255, 255, 255, 0.4)'
        : 'rgba(0, 0, 0, 0.4)'};
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
    themeMode === 'dark'
      ? 'rgba(255, 255, 255, 0.6)'
      : 'rgba(0, 0, 0, 0.6)'};
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

const Login = ({ themeMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { currentUser, isFetching } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (currentUser === null) {
      if (!email || !password) {
        ShowToast({
          type: 'error',
          title: 'Error',
          message: 'Please Enter everything!!',
        });
        return;
      } else {
        const success = await login(dispatch, {
          email: email,
          password: password,
        });

        if (success) {
          ShowToast({
            type: 'success',
            title: 'Success',
            message: 'Successfully Logged In!',
          });
          setEmail('');
          setPassword('');
          navigate('/');
        } else {
          ShowToast({
            type: 'error',
            title: 'Error',
            message: 'Error while loggin in!!',
          });
        }
      }
    }
  };

  return (
    <LoginContainer themeMode={themeMode}>
      <LoginCard themeMode={themeMode}>
        {isFetching && (
          <Overlay>
            <Loader />
            <LoaderText>
              Please be patient while our server is getting ready!
            </LoaderText>
          </Overlay>
        )}

        <Logo to="/" themeMode={themeMode}>
          CodeTrace
        </Logo>
        <Title themeMode={themeMode}>Welcome Back</Title>
        <Subtitle themeMode={themeMode}>Sign in to your account</Subtitle>

        <Form onSubmit={handleLogin}>
          <InputGroup>
            <Input
              themeMode={themeMode}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email address"
              required
            />
          </InputGroup>

          <InputGroup>
            <Input
              themeMode={themeMode}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
            />
          </InputGroup>

          <Button type="submit" disabled={isFetching}>
            Sign In
          </Button>
        </Form>

        <FooterText themeMode={themeMode}>
          Don't have an account? <FooterLink to="/register">Sign up</FooterLink>
        </FooterText>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
