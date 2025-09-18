import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import { FaHome, FaCode, FaPlay, FaCheck, FaTrophy, FaCog, FaLightbulb } from "react-icons/fa";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? '#0f0f0f' : '#f8fafc'};
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  box-sizing: border-box;
  position: relative;
`;

const FloatingNavButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: blur(10px);
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 12px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
    background: ${({ themeMode }) => 
      themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

const ConfigContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: ${({ themeMode }) => 
    themeMode === 'dark' 
      ? '0 20px 40px rgba(0, 0, 0, 0.2)' 
      : '0 20px 40px rgba(0, 0, 0, 0.08)'};
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
  backdrop-filter: blur(20px);
`;

const GameContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  min-height: 70vh;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled.div`
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 16px;
  padding: 0;
  box-shadow: ${({ themeMode }) => 
    themeMode === 'dark' 
      ? '0 20px 40px rgba(0, 0, 0, 0.2)' 
      : '0 20px 40px rgba(0, 0, 0, 0.08)'};
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  backdrop-filter: blur(20px);
`;

const PanelHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const PanelTitle = styled.h3`
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  margin: 0;
  font-weight: 600;
`;

const PanelContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const EditorContainer = styled.div`
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
`;

const CodeEditor = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  resize: none;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};

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

const CodeDisplay = styled.pre`
  margin: 0;
  overflow: auto;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'} !important;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};

  code {
    font-family: 'Fira Code', monospace !important;
    font-size: 0.9rem !important;
    line-height: 1.6 !important;
    background: transparent !important;
  }
`;

const ButtonContainer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #1f2937;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: #374151;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(31, 41, 55, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StartButton = styled(Button)`
  background: #1f2937;
  animation: ${pulse} 2s infinite;
  margin-top: 1rem;

  &:hover {
    animation: none;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 10px;
  font-size: 1rem;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  font-family: 'Inter', sans-serif;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #1f2937;
    box-shadow: 0 0 0 3px rgba(31, 41, 55, 0.1);
  }
`;

const ResultCard = styled.div`
  background: ${({ score, themeMode }) =>
    score >= 80 ? 
      (themeMode === 'dark' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.1)') :
    score >= 50 ? 
      (themeMode === 'dark' ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.1)') :
      (themeMode === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.1)')};
  border: 1px solid;
  border-color: ${({ score }) =>
    score >= 80 ? '#86efac' :
    score >= 50 ? '#fde047' :
    '#fca5a5'};
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 1400px;
  animation: ${fadeIn} 0.5s ease;
  backdrop-filter: blur(10px);
`;

const ScoreDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ScoreCircle = styled.div`
  width: 80px;
  border-radius: 50%;
  background: ${({ score }) =>
    score >= 80 ? 'linear-gradient(135deg, #86efac, #4ade80)' :
    score >= 50 ? 'linear-gradient(135deg, #fde047, #facc15)' :
    'linear-gradient(135deg, #fca5a5, #ef4444)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.5rem;
`;

const LoadingSpinner = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 1.2rem 1.5rem;
  border-radius: 12px;
  margin: 1rem 0;
  border: 1px solid rgba(239, 68, 68, 0.2);
  animation: ${fadeIn} 0.3s ease;
`;

const FixBugGame = ({ themeMode = 'light' }) => {
  const [config, setConfig] = useState({
    language: 'javascript',
    category: 'ReactJS',
    difficulty: 'easy'
  });
  const [buggyCode, setBuggyCode] = useState('');
  const [userSolution, setUserSolution] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showGame, setShowGame] = useState(false);
  const navigate = useNavigate();

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' }
  ];

  const categories = {
    javascript: ['ReactJS', 'NodeJS', 'Vanilla JS'],
    python: ['Django', 'Flask', 'Data Analysis'],
    java: ['Spring Boot', 'Android', 'Core Java'],
    c: ['Data Structures', 'Algorithms', 'System Programming'],
    cpp: ['Competitive Programming', 'Game Dev', 'System Design']
  };

  const extractCodeBlock = (response, lang) => {
    const codeBlockRegex = new RegExp("```" + lang + "\\n([\\s\\S]*?)\\n```");
    const match = response.match(codeBlockRegex);
    return match ? match[1] : response;
  };

  const generateBuggyCode = async () => {
    if (!config.language || !config.category) {
      setError('Please select language and category');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setBuggyCode('');
    setUserSolution('');

    try {
      const response = await fetch(`${process.env.VITE_API_URL}/api/gemini/bug-fixer/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to generate problem');
      }

      const data = await response.json();
      const cleanedCode = extractCodeBlock(data.data, config.language);
      setBuggyCode(cleanedCode);
      setUserSolution(cleanedCode);
      setShowGame(true);

    } catch (err) {
      setError(err.message || 'Failed to generate problem');
    } finally {
      setLoading(false);
    }
  };

  const evaluateSolution = async () => {
    if (!userSolution.trim()) {
      setError('Please submit your solution');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${[process.env.VITE_API_URL]}/api/gemini/bug-fixer/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buggyCode: buggyCode,
          userSolution: userSolution
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Evaluation failed');
      }

      const data = await response.json();
      const cleanedJsonString = data.data.replace(/```json\n|```/g, '');
      const parsedResults = JSON.parse(cleanedJsonString);
      setResults(parsedResults);

    } catch (err) {
      setError(err.message || 'Evaluation failed. Please check the format and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (buggyCode || (results && results.correctedCode)) {
       Prism.highlightAll();
    }
  }, [buggyCode, results]);

  return (
    <Container themeMode={themeMode}>
      <FloatingNavButton 
        onClick={() => navigate('/')} 
        themeMode={themeMode}
        title="Return Home"
      >
        <FaHome />
      </FloatingNavButton>

      {!showGame ? (
        <ConfigContainer themeMode={themeMode}>
          <h2 style={{ 
            color: themeMode === 'dark' ? '#f9fafb' : '#1f2937', 
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <FaCog /> Configure Your Challenge
          </h2>
          
          <FormGroup>
            <Label themeMode={themeMode}>
              <FaCode /> Programming Language
            </Label>
            <Select
              value={config.language}
              onChange={e => setConfig({...config, language: e.target.value})}
              themeMode={themeMode}
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label themeMode={themeMode}>
              <FaLightbulb /> Category
            </Label>
            <Select
              value={config.category}
              onChange={e => setConfig({...config, category: e.target.value})}
              disabled={!config.language}
              themeMode={themeMode}
            >
              {config.language && categories[config.language].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label themeMode={themeMode}>
              <FaTrophy /> Difficulty
            </Label>
            <Select
              value={config.difficulty}
              onChange={e => setConfig({...config, difficulty: e.target.value})}
              themeMode={themeMode}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
          </FormGroup>

          <StartButton onClick={generateBuggyCode} disabled={loading}>
            {loading ? <LoadingSpinner /> : <FaPlay />}
            {loading ? 'Generating Challenge...' : 'Start Challenge'}
          </StartButton>
        </ConfigContainer>
      ) : (
        <>
          <GameContainer>
            <Panel themeMode={themeMode}>
              <PanelHeader themeMode={themeMode}>
                <FaCode />
                <PanelTitle themeMode={themeMode}>Buggy Code</PanelTitle>
              </PanelHeader>
              <PanelContent>
                <EditorContainer>
                  <CodeDisplay themeMode={themeMode}>
                    <code className={`language-${config.language}`}>
                      {buggyCode}
                    </code>
                  </CodeDisplay>
                </EditorContainer>
              </PanelContent>
            </Panel>

            <Panel themeMode={themeMode}>
              <PanelHeader themeMode={themeMode}>
                <FaCheck />
                <PanelTitle themeMode={themeMode}>Your Solution</PanelTitle>
              </PanelHeader>
              <PanelContent>
                <EditorContainer>
                  <CodeEditor
                    themeMode={themeMode}
                    value={userSolution}
                    onChange={e => setUserSolution(e.target.value)}
                    placeholder="Write your corrected code here..."
                  />
                </EditorContainer>
                <ButtonContainer themeMode={themeMode}>
                  <Button onClick={evaluateSolution} disabled={loading}>
                    {loading ? <LoadingSpinner /> : <FaCheck />}
                    {loading ? 'Evaluating...' : 'Submit Solution'}
                  </Button>
                </ButtonContainer>
              </PanelContent>
            </Panel>
          </GameContainer>

          {results && (
            <ResultCard score={results.score} themeMode={themeMode}>
              <ScoreDisplay>
                <ScoreCircle score={results.score}>
                  {results.score}
                </ScoreCircle>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: themeMode === 'dark' ? '#f9fafb' : '#1f2937' }}>
                    Evaluation Result
                  </h3>
                  <p style={{ margin: 0, color: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)' }}>
                    {results.feedback}
                  </p>
                </div>
              </ScoreDisplay>
              
              <details>
                <summary style={{ 
                  cursor: 'pointer', 
                  color: themeMode === 'dark' ? '#f9fafb' : '#1f2937',
                  fontWeight: '500'
                }}>
                  View Correct Solution
                </summary>
                <CodeDisplay themeMode={themeMode} style={{ marginTop: '1rem' }}>
                  <code className={`language-${config.language}`}>
                    {results.correctedCode}
                  </code>
                </CodeDisplay>
              </details>
            </ResultCard>
          )}
        </>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default FixBugGame;