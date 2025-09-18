import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import ReactFlow, { 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  ReactFlowProvider
} from "reactflow";
import "reactflow/dist/style.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaPlay, FaList, FaSitemap, FaExpand, FaCompress } from "react-icons/fa";

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

const GlassPanel = styled.div`
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: ${({ themeMode }) => 
    themeMode === 'dark' 
      ? '0 20px 40px rgba(0, 0, 0, 0.3)' 
      : '0 20px 40px rgba(0, 0, 0, 0.08)'};
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'};
  margin: 0 auto 2rem;
  max-width: 1000px;
`;

const Title = styled.h2`
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.2rem;
  font-weight: 600;
  font-family: 'Georgia', serif;
`;

const CodeInput = styled.textarea`
  width: 100%;
  resize: none;
  margin: 0 auto;
  display: block;
  padding: 1.5rem;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 12px;
  font-family: 'Fira Code', monospace;
  font-size: 0.95rem;
  min-height: 200px;
  margin-bottom: 2rem;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
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

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto 2rem;
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

const LoadingSpinner = styled.div`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  border: 3px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
  border-top: 3px solid #1f2937;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 1rem auto;
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
  padding: 1rem 1.5rem;
  border-radius: 10px;
  margin: 1rem 0;
  border: 1px solid rgba(239, 68, 68, 0.2);
  text-align: center;
`;

const VisualizationType = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const VisualizationTitle = styled.h3`
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? '#f9fafb' : '#1f2937'};
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

const VisualizationChange = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  align-items: center;
`;

const VisualizationButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ active, themeMode }) => 
    active ? '#1f2937' : 'transparent'};
  color: ${({ active, themeMode }) => 
    active ? 'white' : (themeMode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)')};
  border: 1.5px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: ${props => props.active ? '500' : '400'};

  &:hover {
    background: ${({ themeMode }) => 
      themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
    border-color: #1f2937;
  }
`;

const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'};
  border: 1.5px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
  padding: 0.8rem 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ themeMode }) => 
      themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
    border-color: #1f2937;
  }
`;

const FlowContainer = styled.div`
  height: ${({ isExpanded }) => isExpanded ? '70vh' : '50vh'};
  width: 100%;
  margin-top: 1rem;
  border-radius: 12px;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  overflow: hidden;
  transition: height 0.3s ease;
  position: relative;
`;

const ResultContainer = styled.div`
  margin-top: 2rem;
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'};
  max-height: ${({ isExpanded }) => isExpanded ? '70vh' : '50vh'};
  overflow-y: auto;
  transition: max-height 0.3s ease;
`;

const NodeCard = styled.div`
  background: ${({ themeMode }) => 
    themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'};
  border-left: 4px solid #1f2937;
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 8px;
  position: relative;
`;

const StepNumber = styled.div`
  position: absolute;
  top: -12px;
  left: -12px;
  background: #1f2937;
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
`;

const nodeStyle = {
  background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,249,255,0.95) 100%)',
  border: '1.5px solid rgba(31, 41, 55, 0.1)',
  borderRadius: '16px',
  padding: '1.5rem',
  minWidth: '300px',
  maxWidth: '400px',
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
  fontFamily: '"Fira Code", monospace',
  fontSize: '0.9rem',
  lineHeight: '1.5',
  wordWrap: 'break-word',
  overflow: 'hidden',
};

const CustomNode = ({ data }) => (
  <div style={nodeStyle}>
    <div style={{ 
      position: 'absolute',
      top: '-12px',
      left: '-12px',
      background: '#1f2937',
      color: 'white',
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '600',
      fontSize: '0.9rem'
    }}>
      {data.stepNumber}
    </div>
    <div style={{ 
      whiteSpace: 'pre-wrap',
      fontFamily: '"Fira Code", monospace',
      lineHeight: '1.5',
      fontSize: '0.9rem',
      color: '#1f2937',
      maxHeight: '200px',
      overflowY: 'auto'
    }}>
      {data.label}
    </div>
  </div>
);

const nodeTypes = {
  custom: CustomNode,
};

const DryRunVisualizer = ({ themeMode = 'light' }) => {
    const [userCode, setUserCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [visualType, setVisualType] = useState(1);
    const [isExpanded, setIsExpanded] = useState(false);

    const navigate = useNavigate();

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    useEffect(() => {
        if (nodes.length > 0 && reactFlowInstance) {
            setTimeout(() => {
                reactFlowInstance.fitView({ padding: 0.3, duration: 800 });
            }, 100);
        }
    }, [nodes, reactFlowInstance, isExpanded]);

    const toggleVisualization = (type) => {
        setVisualType(type);
    };

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const fetchDryRun = async () => {
        if (!userCode.trim()) {
            setError("Please enter some code to analyze.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setNodes([]);
        setEdges([]);
        setIsExpanded(false);

        try {
            const response = await fetch("http://localhost:8000/api/gemini/dry-run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: userCode }),
            });

            if (!response.ok) {
              const errData = await response.json();
              throw new Error(errData.error || "API request failed");
            }

            const result = await response.json();

            const steps = result.data
                .split(/\*\*Step \d+:\*\*|\n\nStep \d+:|\n\n/g)
                .map(step => step.trim())
                .filter(step => step && !step.toLowerCase().startsWith("assuming an input"));

            // Calculate dynamic positions based on content length
            const newNodes = steps.map((step, index) => {
                const row = Math.floor(index / 2);
                const col = index % 2;
                const x = col * 450 + 100;
                const y = row * 250 + 50;
                
                return {
                    id: `node-${index}`,
                    type: 'custom',
                    position: { x, y },
                    data: {
                        label: step,
                        stepNumber: index + 1
                    }
                };
            });

            const newEdges = steps.slice(0, -1).map((_, index) => ({
                id: `edge-${index}`,
                source: `node-${index}`,
                target: `node-${index + 1}`,
                animated: true,
                markerEnd: { type: 'arrowclosed', color: '#1f2937' },
                style: { stroke: '#1f2937', strokeWidth: 2 }
            }));

            setNodes(newNodes);
            setEdges(newEdges);

        } catch (err) {
            console.error("Dry run error:", err);
            setError(err.message || "Failed to fetch dry run.");
        } finally {
            setIsLoading(false);
        }
    };

    const sampleCode = `// Try this sample code or write your own
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

const result = factorial(5);
console.log("Factorial of 5 is:", result);`;

    return (
        <Container themeMode={themeMode}>
          <FloatingNavButton 
            onClick={() => navigate('/')} 
            themeMode={themeMode}
            title="Return Home"
          >
            <FaHome />
          </FloatingNavButton>

          <GlassPanel themeMode={themeMode}>
            <Title themeMode={themeMode}>Dry Run Visualizer</Title>

            <CodeInput
              themeMode={themeMode}
              placeholder={sampleCode}
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
            />

            <Button 
              onClick={fetchDryRun} 
              disabled={isLoading}
              themeMode={themeMode}
            >
              <FaPlay /> {isLoading ? "Analyzing..." : "Visualize Execution"}
            </Button>
            
            {isLoading && <LoadingSpinner themeMode={themeMode} />}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            {nodes.length > 0 && (
                <VisualizationType>
                    <VisualizationTitle themeMode={themeMode}>
                        Visualization Mode
                    </VisualizationTitle>
                    <VisualizationChange>
                        <VisualizationButton
                            onClick={() => toggleVisualization(1)}
                            active={visualType === 1}
                            themeMode={themeMode}
                        >
                            <FaSitemap /> Flow Chart
                        </VisualizationButton>
                        <VisualizationButton
                            onClick={() => toggleVisualization(2)}
                            active={visualType === 2}
                            themeMode={themeMode}
                        >
                            <FaList /> Step List
                        </VisualizationButton>
                        <ExpandButton 
                          onClick={toggleExpand} 
                          themeMode={themeMode}
                        >
                          {isExpanded ? <FaCompress /> : <FaExpand />}
                          {isExpanded ? 'Collapse' : 'Expand'}
                        </ExpandButton>
                    </VisualizationChange>
                </VisualizationType>
            )}

            {nodes.length > 0 && (
                visualType === 1 ? (
                    <FlowContainer 
                      themeMode={themeMode} 
                      isExpanded={isExpanded}
                    >
                        <ReactFlowProvider>
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                onConnect={onConnect}
                                nodeTypes={nodeTypes}
                                onInit={setReactFlowInstance}
                                fitView
                                minZoom={0.1}
                                maxZoom={2}
                            >
                                <Background 
                                    color={themeMode === 'dark' ? '#374151' : '#e5e7eb'} 
                                    gap={25} 
                                />
                                <Controls
                                    style={{
                                        backgroundColor: themeMode === 'dark' ? '#1a1a1a' : 'white',
                                        border: `1px solid ${themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                                    }}
                                />
                            </ReactFlow>
                        </ReactFlowProvider>
                    </FlowContainer>
                ) : (
                    <ResultContainer 
                      themeMode={themeMode} 
                      isExpanded={isExpanded}
                    >
                        <VisualizationTitle themeMode={themeMode}>
                            Execution Steps
                        </VisualizationTitle>
                        {nodes.map((node, index) => (
                            <NodeCard key={index} themeMode={themeMode}>
                                <StepNumber>{index + 1}</StepNumber>
                                <div style={{
                                    whiteSpace: 'pre-wrap',
                                    fontFamily: '"Fira Code", monospace',
                                    lineHeight: '1.6',
                                    fontSize: '0.9rem',
                                    color: themeMode === 'dark' ? '#f9fafb' : '#1f2937'
                                }}>
                                    {node.data.label}
                                </div>
                            </NodeCard>
                        ))}
                    </ResultContainer>
                )
            )}
          </GlassPanel>
        </Container>
    );
};

export default DryRunVisualizer;