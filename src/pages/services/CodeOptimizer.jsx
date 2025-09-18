import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import { FaHome, FaCode, FaCheckCircle, FaCopy, FaLightbulb, FaCog } from "react-icons/fa";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? '#0f0f0f' : '#f8fafc'};
  display: flex;
  gap: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
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

const SplitContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;

  @media (max-width: 968px) {
    flex-direction: column;
  }
`;

const EditorPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? '#1a1a1a' : '#ffffff'};
  padding: 2rem;
  border-right: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  overflow: hidden;
`;

const ResultPanel = styled.div`
  flex: 1;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? '#1a1a1a' : '#ffffff'};
  padding: 2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
`;

const PanelTitle = styled.h2`
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  font-weight: 600;
`;

const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
  border-radius: 12px;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  overflow: hidden;
  position: relative;
`;

const CodeTextarea = styled.textarea`
  width: 100%;
  flex: 1;
  padding: 1.5rem;
  border: none;
  background: transparent;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  resize: none;
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  outline: none;

  &::placeholder {
    color: ${({ themeMode }) => 
      themeMode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)'};
  }
`;

const LanguageSelector = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 8px;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  margin-left: auto;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #1f2937;
  }
`;

const OptimizeButton = styled.button`
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
  margin-top: 1.5rem;
  align-self: flex-start;
  animation: ${pulse} 2s infinite;

  &:hover {
    background: #374151;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(31, 41, 55, 0.2);
    animation: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    animation: none;
  }
`;

const ResultContainer = styled.div`
  flex: 1;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
  border-radius: 12px;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  overflow: hidden;
  position: relative;
`;

const CodeDisplay = styled.pre`
  margin: 0;
  padding: 1.5rem;
  height: 100%;
  overflow: auto;
  background: transparent !important;
  code {
    font-family: 'Fira Code', monospace !important;
    font-size: 0.9rem !important;
    line-height: 1.6 !important;
    background: transparent !important;
  }
`;

const CopyButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${({ themeMode }) => 
      themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
    color: #1f2937;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  z-index: 10;
  backdrop-filter: blur(5px);
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
  border-top: 3px solid #1f2937;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)'};
  font-size: 1rem;
  margin: 0;
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  margin-top: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
  font-size: 0.9rem;
  animation: ${fadeIn} 0.3s ease;
`;

const SuccessMessage = styled.div`
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  margin-top: 1rem;
  border: 1px solid rgba(34, 197, 94, 0.2);
  font-size: 0.9rem;
  animation: ${fadeIn} 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const sampleCodes = {
  javascript: `// Sample JavaScript code
function calculateSum(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

const numbers = [1, 2, 3, 4, 5];
console.log(calculateSum(numbers));`,
  python: `# Sample Python code
def calculate_sum(arr):
    total = 0
    for num in arr:
        total += num
    return total

numbers = [1, 2, 3, 4, 5]
print(calculate_sum(numbers))`,
  java: `// Sample Java code
public class Main {
    public static int calculateSum(int[] arr) {
        int total = 0;
        for (int i = 0; i < arr.length; i++) {
            total += arr[i];
        }
        return total;
    }
    
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println(calculateSum(numbers));
    }
}`,
  c: `// Sample C code
#include <stdio.h>

int calculateSum(int arr[], int size) {
    int total = 0;
    for (int i = 0; i < size; i++) {
        total += arr[i];
    }
    return total;
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    int size = sizeof(numbers) / sizeof(numbers[0]);
    printf("%d\\n", calculateSum(numbers, size));
    return 0;
}`
};

const CodeOptimizer = ({ themeMode = 'light' }) => {
    const [userCode, setUserCode] = useState("");
    const [optimizedCode, setOptimizedCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [language, setLanguage] = useState("javascript");
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    const languages = [
        { value: "javascript", label: "JavaScript" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "typescript", label: "TypeScript" },
    ];

    useEffect(() => {
        setUserCode(sampleCodes[language] || "");
    }, [language]);

    const copyToClipboard = () => {
        const codeToCopy = optimizedCode.replace(/```(javascript|python|java|c|cpp|typescript)\n|```/g, '');
        navigator.clipboard.writeText(codeToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const extractCodeBlock = (response) => {
      const codeBlockRegex = new RegExp("```" + language + "\\n([\\s\\S]*?)\\n```");
      const match = response.match(codeBlockRegex);
      return match ? match[1] : response;
    };

    const optimizeCode = async () => {
        if (!userCode.trim()) {
            setError("Please enter some code to optimize");
            return;
        }

        setIsLoading(true);
        setError(null);
        setOptimizedCode("");

        try {
            const response = await fetch(`${process.env.VITE_API_URL}/api/gemini/optimize`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    code: userCode,
                    language: language,
                }),
            });

            if (!response.ok) {
              const errData = await response.json();
              throw new Error(errData.error || "API request failed");
            }

            const result = await response.json();
            const cleanedCode = extractCodeBlock(result.data);
            setOptimizedCode(cleanedCode);

        } catch (err) {
            console.error("Optimization error:", err);
            setError(err.message || "Failed to optimize code.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (optimizedCode) {
            Prism.highlightAll();
        }
    }, [optimizedCode]);

    return (
        <Container themeMode={themeMode}>
            <FloatingNavButton 
                onClick={() => navigate('/')} 
                themeMode={themeMode}
                title="Return Home"
            >
                <FaHome />
            </FloatingNavButton>

            <SplitContainer>
                <EditorPanel themeMode={themeMode}>
                    <PanelHeader>
                        <PanelTitle themeMode={themeMode}>
                            <FaCode /> Code Input
                        </PanelTitle>
                        <LanguageSelector
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            themeMode={themeMode}
                        >
                            {languages.map((lang) => (
                                <option key={lang.value} value={lang.value}>
                                    {lang.label}
                                </option>
                            ))}
                        </LanguageSelector>
                    </PanelHeader>

                    <EditorContainer themeMode={themeMode}>
                        <CodeTextarea
                            themeMode={themeMode}
                            value={userCode}
                            onChange={(e) => setUserCode(e.target.value)}
                            placeholder="Enter your code here..."
                            spellCheck="false"
                        />
                    </EditorContainer>

                    <OptimizeButton 
                        onClick={optimizeCode} 
                        disabled={isLoading}
                    >
                        <FaLightbulb /> {isLoading ? "Optimizing..." : "Optimize Code"}
                    </OptimizeButton>

                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {copied && (
                        <SuccessMessage>
                            <FaCheckCircle /> Code copied to clipboard!
                        </SuccessMessage>
                    )}
                </EditorPanel>

                <ResultPanel themeMode={themeMode}>
                    <PanelHeader>
                        <PanelTitle themeMode={themeMode}>
                            <FaCheckCircle /> Optimized Code
                        </PanelTitle>
                    </PanelHeader>

                    <ResultContainer themeMode={themeMode}>
                        {isLoading && (
                            <LoadingOverlay themeMode={themeMode}>
                                <LoadingSpinner themeMode={themeMode} />
                                <LoadingText themeMode={themeMode}>
                                    Analyzing and optimizing your code...
                                </LoadingText>
                            </LoadingOverlay>
                        )}

                        {optimizedCode && (
                            <>
                                <CopyButton 
                                    onClick={copyToClipboard} 
                                    themeMode={themeMode}
                                >
                                    <FaCopy /> {copied ? "Copied!" : "Copy Code"}
                                </CopyButton>
                                <CodeDisplay>
                                    <code className={`language-${language}`}>
                                        {optimizedCode}
                                    </code>
                                </CodeDisplay>
                            </>
                        )}

                        {!isLoading && !optimizedCode && (
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                height: '100%',
                                color: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                                flexDirection: 'column',
                                gap: '1rem'
                            }}>
                                <FaLightbulb size={48} />
                                <p>Enter code and click "Optimize Code" to see the optimized version</p>
                            </div>
                        )}
                    </ResultContainer>
                </ResultPanel>
            </SplitContainer>
        </Container>
    );
};

export default CodeOptimizer;