'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ToolCall {
    id: string;
    name: string;
    status: 'running' | 'completed' | 'error';
    description?: string;
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    toolCalls?: ToolCall[];
}

const suggestedPrompts = [
    { icon: '🔍', text: 'Common reentrancy vulnerabilities' },
    { icon: '⚡', text: 'Flash loan attack prevention' },
    { icon: '🛡️', text: 'Access control best practices' },
    { icon: '📝', text: 'Review my smart contract' },
];

// Tool call display component
function ToolCallsDisplay({ toolCalls, isExpanded, onToggle }: {
    toolCalls: ToolCall[];
    isExpanded: boolean;
    onToggle: () => void;
}) {
    if (!toolCalls || toolCalls.length === 0) return null;

    const completedCount = toolCalls.filter(t => t.status === 'completed').length;
    const hasRunning = toolCalls.some(t => t.status === 'running');

    return (
        <div className="mt-3 pt-3 border-t border-white/5">
            <button
                onClick={onToggle}
                className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-400 transition-colors"
            >
                {hasRunning ? (
                    <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
                        Processing...
                    </span>
                ) : (
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {completedCount} tool{completedCount !== 1 ? 's' : ''} used
                    </span>
                )}
                <svg
                    className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isExpanded && (
                <div className="mt-2 space-y-1.5">
                    {toolCalls.map((tool) => (
                        <div
                            key={tool.id}
                            className="flex items-center gap-2 text-xs py-1.5 px-2 bg-white/[0.02] rounded-lg"
                        >
                            {tool.status === 'running' ? (
                                <span className="w-3 h-3 border border-lime-400 border-t-transparent rounded-full animate-spin"></span>
                            ) : tool.status === 'completed' ? (
                                <svg className="w-3 h-3 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                            <span className="text-gray-400 font-mono">{tool.name}</span>
                            {tool.description && (
                                <span className="text-gray-600">— {tool.description}</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Input Box Component (reusable)
function ChatInputBox({
    input,
    setInput,
    isLoading,
    onSubmit,
    textareaRef,
    agentsRef,
    agentsDrawerOpen,
    setAgentsDrawerOpen,
    activeAgents,
    toggleAgent,
    selectAgent,
    availableAgents,
    compact = false
}: {
    input: string;
    setInput: (value: string) => void;
    isLoading: boolean;
    onSubmit: (e: React.FormEvent) => void;
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
    agentsRef: React.RefObject<HTMLDivElement | null>;
    agentsDrawerOpen: boolean;
    setAgentsDrawerOpen: (open: boolean) => void;
    activeAgents: string[];
    toggleAgent: (id: string) => void;
    selectAgent: (id: string) => void;
    availableAgents: { id: string; name: string; icon: string; description: string }[];
    compact?: boolean;
}) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    return (
        <div className={`w-full ${compact ? 'max-w-5xl 2xl:max-w-6xl' : 'max-w-3xl'} mx-auto`}>
            <form onSubmit={onSubmit}>
                <div className="relative bg-white/[0.03] border border-white/10 rounded-2xl focus-within:border-lime-400/50 transition-colors">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about smart contract security..."
                        rows={1}
                        className="w-full bg-transparent text-white placeholder-gray-500 px-5 py-4 pr-14 resize-none focus:outline-none text-base"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-3 bottom-3 w-10 h-10 bg-lime-400 text-black rounded-xl flex items-center justify-center hover:bg-lime-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Agent Selection Bar */}
                <div className="flex items-center gap-2 mt-3" ref={agentsRef}>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setAgentsDrawerOpen(!agentsDrawerOpen)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-all ${agentsDrawerOpen
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-400 hover:bg-white/[0.05] hover:text-gray-300'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            <span>Agents</span>
                            <svg className={`w-3 h-3 transition-transform ${agentsDrawerOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {agentsDrawerOpen && (
                            <div className="absolute bottom-full left-0 mb-2 w-64 bg-[#0d1320] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                                <div className="p-2 border-b border-white/5">
                                    <span className="text-xs text-gray-500 px-2">Available Agents</span>
                                </div>
                                <div className="p-1">
                                    {availableAgents.map((agent) => (
                                        <button
                                            key={agent.id}
                                            type="button"
                                            onClick={() => selectAgent(agent.id)}
                                            className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all ${activeAgents.includes(agent.id)
                                                    ? 'bg-lime-400/10 border border-lime-400/30'
                                                    : 'hover:bg-white/[0.05]'
                                                }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activeAgents.includes(agent.id) ? 'bg-lime-400/20' : 'bg-white/5'
                                                }`}>
                                                <svg className={`w-4 h-4 ${activeAgents.includes(agent.id) ? 'text-lime-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={`text-sm font-medium ${activeAgents.includes(agent.id) ? 'text-lime-400' : 'text-white'}`}>
                                                    {agent.name}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-0.5">{agent.description}</div>
                                            </div>
                                            {activeAgents.includes(agent.id) && (
                                                <svg className="w-4 h-4 text-lime-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {activeAgents.map((agentId) => {
                        const agent = availableAgents.find(a => a.id === agentId);
                        if (!agent) return null;
                        return (
                            <div
                                key={agentId}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs bg-lime-400/20 text-lime-400 border border-lime-400/50 rounded-full"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                {agent.name}
                                <button
                                    type="button"
                                    onClick={() => toggleAgent(agentId)}
                                    className="hover:bg-lime-400/20 rounded-full p-0.5 transition-colors"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </form>
            <p className="text-center text-xs text-gray-600 mt-3">
                HexiChat may produce inaccurate information. Always verify security advice.
            </p>
        </div>
    );
}

export default function HexiChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [expandedToolCalls, setExpandedToolCalls] = useState<Record<string, boolean>>({});
    const [activeAgents, setActiveAgents] = useState<string[]>([]);
    const [agentsDrawerOpen, setAgentsDrawerOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const agentsRef = useRef<HTMLDivElement>(null);

    const availableAgents = [
        { id: 'deep-audit', name: 'Deep Audit', icon: 'shield', description: 'Comprehensive smart contract security analysis' },
    ];

    const toggleAgent = (agentId: string) => {
        setActiveAgents(prev =>
            prev.includes(agentId)
                ? prev.filter(id => id !== agentId)
                : [...prev, agentId]
        );
    };

    const selectAgent = (agentId: string) => {
        if (!activeAgents.includes(agentId)) {
            setActiveAgents(prev => [...prev, agentId]);
        }
        setAgentsDrawerOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (agentsRef.current && !agentsRef.current.contains(event.target as Node)) {
                setAgentsDrawerOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
        }
    }, [input]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "Thanks for your question! HexiChat is currently in beta and will be fully operational soon. 🚀\n\nIn the meantime, try our **Free Audit Tool** on the homepage for instant smart contract security analysis.",
                timestamp: new Date(),
                toolCalls: [
                    { id: '1', name: 'search_vulnerabilities', status: 'completed', description: 'Searched CVE database' },
                    { id: '2', name: 'analyze_context', status: 'completed', description: 'Analyzed query context' },
                ],
            };
            setMessages((prev) => [...prev, assistantMessage]);
            setIsLoading(false);
        }, 1200);
    };

    const renderContent = (content: string) => {
        let processed = content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
        processed = processed.replace(/\n/g, '<br />');
        return <span dangerouslySetInnerHTML={{ __html: processed }} />;
    };

    const isNewChat = messages.length === 0;

    return (
        <div className="h-screen bg-[#0a0f1a] flex flex-col overflow-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 1; transform: translateY(100%); }
        }
        .message-enter { animation: fadeIn 0.25s ease-out; }
        .typing span {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #a3e635;
          border-radius: 50%;
          animation: typing 1.2s infinite ease-in-out;
        }
        .typing span:nth-child(1) { animation-delay: 0s; }
        .typing span:nth-child(2) { animation-delay: 0.2s; }
        .typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}} />

            {/* Header */}
            <header className="flex-shrink-0 border-b border-white/5 bg-[#0a0f1a]/80 backdrop-blur-xl z-10">
                <div className="px-6 lg:px-10 xl:px-16 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
                            <Image src="/logo.svg" alt="Logo" width={18} height={18} />
                        </div>
                        <span className="text-lg font-semibold text-white">HexiChat</span>
                        <span className="text-xs bg-lime-400/20 text-lime-400 px-2 py-0.5 rounded font-medium">BETA</span>
                    </Link>
                    <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            {isNewChat ? (
                /* New Chat: Input in center */
                <main className="flex-1 flex flex-col items-center justify-center px-6 lg:px-8">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-lime-400 to-lime-500 rounded-3xl flex items-center justify-center mb-6">
                        <svg className="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-semibold text-white mb-2">How can I help you today?</h1>
                    <p className="text-gray-400 text-center max-w-md mb-8">
                        Ask about smart contract security, vulnerabilities, or get code reviewed.
                    </p>

                    {/* Input Box - Centered */}
                    <div className="w-full max-w-3xl mb-8">
                        <ChatInputBox
                            input={input}
                            setInput={setInput}
                            isLoading={isLoading}
                            onSubmit={handleSubmit}
                            textareaRef={textareaRef}
                            agentsRef={agentsRef}
                            agentsDrawerOpen={agentsDrawerOpen}
                            setAgentsDrawerOpen={setAgentsDrawerOpen}
                            activeAgents={activeAgents}
                            toggleAgent={toggleAgent}
                            selectAgent={selectAgent}
                            availableAgents={availableAgents}
                        />
                    </div>

                    {/* Suggested Prompts */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-3xl">
                        {suggestedPrompts.map((prompt, i) => (
                            <button
                                key={i}
                                onClick={() => setInput(prompt.text)}
                                className="text-left p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-lime-400/30 transition-all group"
                            >
                                <span className="text-xl mb-1 block">{prompt.icon}</span>
                                <span className="text-xs lg:text-sm text-gray-400 group-hover:text-gray-300 leading-snug">{prompt.text}</span>
                            </button>
                        ))}
                    </div>
                </main>
            ) : (
                /* Active Chat: Messages + Input at bottom */
                <>
                    <main className="flex-1 overflow-y-auto">
                        <div className="max-w-5xl 2xl:max-w-6xl mx-auto px-6 lg:px-8 py-8">
                            <div className="space-y-6">
                                {messages.map((message) => (
                                    <div key={message.id} className="message-enter">
                                        {message.role === 'user' ? (
                                            <div className="flex justify-end">
                                                <div className="max-w-[75%] lg:max-w-[60%] bg-white/10 border border-white/10 text-white rounded-2xl rounded-br-md px-5 py-4">
                                                    <p className="text-sm lg:text-base leading-relaxed">{message.content}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex gap-4">
                                                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-lime-400 to-lime-500 rounded-xl flex items-center justify-center">
                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1 max-w-[85%] lg:max-w-[70%] bg-white/[0.03] border border-white/5 rounded-2xl rounded-tl-md px-5 py-4">
                                                    <p className="text-sm lg:text-base text-gray-300 leading-relaxed">{renderContent(message.content)}</p>
                                                    {message.toolCalls && message.toolCalls.length > 0 && (
                                                        <ToolCallsDisplay
                                                            toolCalls={message.toolCalls}
                                                            isExpanded={expandedToolCalls[message.id] || false}
                                                            onToggle={() => setExpandedToolCalls(prev => ({ ...prev, [message.id]: !prev[message.id] }))}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex gap-4 message-enter">
                                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-lime-400 to-lime-500 rounded-xl flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                        <div className="bg-white/[0.03] border border-white/5 rounded-2xl rounded-tl-md px-5 py-5">
                                            <div className="typing flex gap-2">
                                                <span></span><span></span><span></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                    </main>

                    {/* Input at Bottom */}
                    <div className="flex-shrink-0 border-t border-white/5 bg-[#0a0f1a] px-6 lg:px-8 py-4">
                        <ChatInputBox
                            input={input}
                            setInput={setInput}
                            isLoading={isLoading}
                            onSubmit={handleSubmit}
                            textareaRef={textareaRef}
                            agentsRef={agentsRef}
                            agentsDrawerOpen={agentsDrawerOpen}
                            setAgentsDrawerOpen={setAgentsDrawerOpen}
                            activeAgents={activeAgents}
                            toggleAgent={toggleAgent}
                            selectAgent={selectAgent}
                            availableAgents={availableAgents}
                            compact
                        />
                    </div>
                </>
            )}
        </div>
    );
}
