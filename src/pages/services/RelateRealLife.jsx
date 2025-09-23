import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaLightbulb, FaCode } from 'react-icons/fa';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

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

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const HeroSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 1rem;
`;

const Title = styled.h1`
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  font-family: 'Georgia', serif;
  
  span {
    background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-style: italic;
  }
`;

const Subtitle = styled.p`
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const CodeInputWrapper = styled.div`
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
  box-shadow: ${({ themeMode }) => 
    themeMode === 'dark' 
      ? '0 20px 40px rgba(0, 0, 0, 0.2)' 
      : '0 20px 40px rgba(0, 0, 0, 0.08)'};
  backdrop-filter: blur(20px);
`;

const CodeInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  font-weight: 500;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const CodeInput = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  min-height: 200px;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 12px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  resize: vertical;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  padding: 1.5rem;
  transition: all 0.3s ease;

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

const AnalyzeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #1f2937;
  color: white;
  border: none;
  padding: 1.2rem 2.5rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 2rem auto;
  animation: ${pulse} 2s infinite;

  &:hover {
    background: #374151;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(31, 41, 55, 0.2);
    animation: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    animation: none;
  }
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
  margin: 2rem 0;
  text-align: center;
  border: 1px solid rgba(239, 68, 68, 0.2);
  animation: ${fadeIn} 0.3s ease;
`;

const ConceptGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  animation: ${fadeIn} 0.5s ease;
`;

const ConceptCard = styled.div`
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  border-radius: 20px;
  padding: 2rem;
  box-shadow: ${({ themeMode }) => 
    themeMode === 'dark' 
      ? '0 10px 30px rgba(0, 0, 0, 0.2)' 
      : '0 10px 30px rgba(0, 0, 0, 0.08)'};
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ themeMode }) => 
      themeMode === 'dark' 
        ? '0 20px 40px rgba(0, 0, 0, 0.3)' 
        : '0 20px 40px rgba(0, 0, 0, 0.1)'};
  }
`;

const ConceptContent = styled.div`
  padding: 0 0.5rem;
`;

const ConceptTitle = styled.h3`
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ConceptDescription = styled.p`
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'};
  line-height: 1.7;
  font-size: 0.95rem;
`;


const RelateRealLife = ({ themeMode = 'light' }) => {
  const [code, setCode] = useState('');
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const analyzeCode = async () => {
    if (!code.trim()) {
      setError('Please enter some code to analyze');
      return;
    }

    setLoading(true);
    setError(null);
    setConcepts([]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/gemini/real-life-analogy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'API request failed');
      }

      const result = await response.json();
      
      const cleanedJsonString = result.data.replace(/```json\n|```/g, '');
      const parsedConcepts = JSON.parse(cleanedJsonString).analogies;

      setConcepts(parsedConcepts); // Set concepts directly without images

    } catch (err) {
      console.error("Analysis error:", err);
      setError('Failed to analyze code. Please check the format and try again.');
    } finally {
      setLoading(false);
    }
  };

  const sampleCode = `// Example: Function to calculate total price
function calculateTotal(items) {
  let total = 0;
  for (let item of items) {
    total += item.price * item.quantity;
  }
  return total;
}

const shoppingCart = [
  { name: "Book", price: 15, quantity: 2 },
  { name: "Pen", price: 2, quantity: 5 }
];

console.log("Total:", calculateTotal(shoppingCart));`;

  return (
    <Container themeMode={themeMode}>
      <FloatingNavButton 
        onClick={() => navigate('/')} 
        themeMode={themeMode}
        title="Return Home"
      >
        <FaHome />
      </FloatingNavButton>

      <ContentWrapper>
        <HeroSection>
          <Title themeMode={themeMode}>
            Code Explained with <span>Real-Life Analogies</span>
          </Title>
          <Subtitle themeMode={themeMode}>
            Transform complex programming concepts into simple, relatable everyday scenarios. 
            Understand code through intuitive comparisons that make learning natural and engaging.
          </Subtitle>
        </HeroSection>

        <CodeInputWrapper themeMode={themeMode}>
          <CodeInputLabel themeMode={themeMode}>
            <FaCode /> Paste Your Code Here
          </CodeInputLabel>
          <CodeInput
            themeMode={themeMode}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={sampleCode}
          />
        </CodeInputWrapper>

        <AnalyzeButton onClick={analyzeCode} disabled={loading}>
          {loading ? (
            <>
              <LoadingSpinner />
              Analyzing Code...
            </>
          ) : (
            <>
              <FaLightbulb /> Generate Analogies
            </>
          )}
        </AnalyzeButton>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {concepts.length > 0 && (
          <ConceptGrid>
            {concepts.map((concept, index) => (
              <ConceptCard key={index} themeMode={themeMode}>
                {/* Image component and logic removed */}
                <ConceptContent>
                  <ConceptTitle themeMode={themeMode}>
                    <FaLightbulb /> {concept.title}
                  </ConceptTitle>
                  <ConceptDescription themeMode={themeMode}>
                    {concept.explanation}
                  </ConceptDescription>
                </ConceptContent>
              </ConceptCard>
            ))}
          </ConceptGrid>
        )}
      </ContentWrapper>
    </Container>
  );
};

export default RelateRealLife;