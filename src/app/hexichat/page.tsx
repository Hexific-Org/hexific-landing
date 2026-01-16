'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useSSEStream } from '@/hooks/useSSEStream';

interface ToolCall {
    id: string;
    name: string;
    status: 'running' | 'completed' | 'error';
    description?: string;
}

interface AttachedFile {
    name: string;
    size: number;
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    toolCalls?: ToolCall[];
    attachedFile?: AttachedFile;
}

const suggestedPrompts = [
    { icon: 'search', text: 'Analyze this contract for vulnerabilities' },
    { icon: 'bolt', text: 'Explain flash loan attack vectors' },
    { icon: 'shield', text: 'Best practices for access control' },
    { icon: 'code', text: 'How to prevent reentrancy attacks' },
];

// Icon component for suggested prompts
function PromptIcon({ name }: { name: string }) {
    const iconClass = "w-4 h-4 text-gray-500";

    switch (name) {
        case 'search':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            );
        case 'bolt':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            );
        case 'shield':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            );
        case 'code':
            return (
                <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            );
        default:
            return null;
    }
}

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
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
                        Processing...
                    </span>
                ) : (
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                <span className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                            ) : tool.status === 'completed' ? (
                                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    isStreaming,
    onSubmit,
    textareaRef,
    agentsRef,
    agentsDrawerOpen,
    setAgentsDrawerOpen,
    activeAgents,
    toggleAgent,
    selectAgent,
    availableAgents,
    compact = false,
    selectedFile,
    onFileSelect,
    onFileRemove,
    fileInputRef
}: {
    input: string;
    setInput: (value: string) => void;
    isStreaming: boolean;
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
    selectedFile?: File | null;
    onFileSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileRemove?: () => void;
    fileInputRef?: React.RefObject<HTMLInputElement | null>;
}) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    const [attachMenuOpen, setAttachMenuOpen] = useState(false);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const dropdown = document.getElementById('attach-dropdown');
            if (dropdown && !dropdown.contains(target)) {
                setAttachMenuOpen(false);
            }
        };
        if (attachMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [attachMenuOpen]);

    return (
        <div className={`w-full ${compact ? 'max-w-5xl 2xl:max-w-6xl' : 'max-w-3xl'} mx-auto`}>
            <form onSubmit={onSubmit}>
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl focus-within:border-white/20 transition-all">
                    {/* File Preview */}
                    {selectedFile && (
                        <div className="px-5 pt-3 pb-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-gray-300 truncate max-w-[200px]">{selectedFile.name}</span>
                                <button
                                    type="button"
                                    onClick={onFileRemove}
                                    className="text-gray-500 hover:text-white transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Input row with flexbox alignment */}
                    <div className="flex items-center gap-2 px-3 py-2">
                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => {
                                onFileSelect?.(e);
                                setAttachMenuOpen(false);
                            }}
                            accept=".sol,.txt,.json,.md"
                            className="hidden"
                        />

                        {/* Plus button with dropdown */}
                        <div className="relative flex-shrink-0" id="attach-dropdown">
                            <button
                                type="button"
                                onClick={() => setAttachMenuOpen(!attachMenuOpen)}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${attachMenuOpen
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                                    }`}
                                title="Attach"
                            >
                                <svg
                                    className={`w-5 h-5 transition-transform duration-200 ${attachMenuOpen ? 'rotate-45' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>

                            {/* Dropdown menu */}
                            {attachMenuOpen && (
                                <div className={`absolute left-0 ${compact ? 'bottom-full mb-2' : 'top-full mt-2'} w-48 bg-[#0d1320] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50`}>
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef?.current?.click()}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Upload file
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Textarea */}
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about smart contract security..."
                            rows={1}
                            className="flex-1 bg-transparent text-white placeholder-gray-500 py-2 resize-none focus:outline-none text-base leading-6"
                            disabled={isStreaming}
                        />

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={!input.trim() || isStreaming}
                            className="flex-shrink-0 w-10 h-10 bg-lime-400 text-black rounded-xl flex items-center justify-center hover:bg-lime-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
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
                                className="flex items-center gap-2 px-3 py-1.5 text-xs bg-lime-400/10 text-lime-400 border border-lime-400/30 rounded-full"
                            >
                                <svg className="w-3.5 h-3.5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                {agent.name}
                                <button
                                    type="button"
                                    onClick={() => toggleAgent(agentId)}
                                    className="hover:bg-white/10 rounded-full p-0.5 transition-colors"
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
    const [expandedToolCalls, setExpandedToolCalls] = useState<Record<string, boolean>>({});
    const [activeAgents, setActiveAgents] = useState<string[]>([]);
    const [agentsDrawerOpen, setAgentsDrawerOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [currentAssistantId, setCurrentAssistantId] = useState<string | null>(null);
    const [toolStatus, setToolStatus] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const agentsRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const API_URL = process.env.NEXT_PUBLIC_HEXICHAT_API_URL || 'http://localhost:8000';

    const availableAgents = [
        { id: 'deep_audit_agent', name: 'Deep Audit', icon: 'shield', description: 'Comprehensive smart contract security analysis' },
    ];

    // SSE Stream hook
    const { isStreaming, startStream } = useSSEStream({
        apiUrl: `${API_URL}/stream_agent`,
        onToken: useCallback((token: string) => {
            setMessages((prev) => {
                if (prev.length === 0) return prev;
                const lastMsg = prev[prev.length - 1];
                if (lastMsg && lastMsg.role === 'assistant') {
                    // Create a new array with a new last message object
                    return [
                        ...prev.slice(0, -1),
                        { ...lastMsg, content: lastMsg.content + token }
                    ];
                }
                return prev;
            });
        }, []),
        onStatus: useCallback((status: { message: string }) => {
            setToolStatus(status.message);
        }, []),
        onError: useCallback((error: { error: string }) => {
            console.error('Stream error:', error);
            setMessages((prev) => {
                if (prev.length === 0) return prev;
                const lastMsg = prev[prev.length - 1];
                if (lastMsg && lastMsg.role === 'assistant') {
                    return [
                        ...prev.slice(0, -1),
                        { ...lastMsg, content: lastMsg.content + `\n\n⚠️ Error: ${error.error}` }
                    ];
                }
                return prev;
            });
        }, []),
        onEnd: useCallback(() => {
            setCurrentAssistantId(null);
            setToolStatus(null);
        }, []),
    });

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

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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
        if (!input.trim() || isStreaming) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date(),
            attachedFile: selectedFile ? { name: selectedFile.name, size: selectedFile.size } : undefined,
        };

        const assistantId = (Date.now() + 1).toString();
        const assistantMessage: Message = {
            id: assistantId,
            role: 'assistant',
            content: '',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage, assistantMessage]);
        setCurrentAssistantId(assistantId);

        const queryText = input.trim();
        const fileToSend = selectedFile;

        setInput('');
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        // Determine which agent to use
        const activeAgent = activeAgents.length > 0 ? activeAgents[0] : 'general_agent';

        // Start streaming
        await startStream({
            query: queryText,
            activeAgent,
            file: fileToSend,
        });
    };

    const renderContent = (content: string, isStreamingMessage: boolean = false) => {
        return (
            <div className="markdown-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        // Headers
                        h1: ({ children }) => (
                            <h1 className="text-xl font-bold text-white mt-6 mb-3 first:mt-0 pb-2 border-b border-white/10">
                                {children}
                            </h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className="text-lg font-semibold text-white mt-5 mb-2 first:mt-0">
                                {children}
                            </h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className="text-base font-semibold text-white mt-4 mb-2 first:mt-0">
                                {children}
                            </h3>
                        ),
                        // Paragraphs
                        p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                        // Bold & Italic
                        strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
                        em: ({ children }) => <em className="text-gray-300">{children}</em>,
                        // Lists
                        ul: ({ children }) => (
                            <ul className="mb-4 space-y-2 list-none">
                                {children}
                            </ul>
                        ),
                        ol: ({ children }) => (
                            <ol className="mb-4 space-y-2 list-decimal list-outside ml-5 marker:text-lime-400 marker:font-medium">
                                {children}
                            </ol>
                        ),
                        li: ({ children }) => (
                            <li className="flex items-start gap-2">
                                <span className="text-gray-500 mt-[7px] text-[6px]">●</span>
                                <span className="flex-1">{children}</span>
                            </li>
                        ),
                        // Tables (GFM)
                        table: ({ children }) => (
                            <div className="my-4 overflow-x-auto rounded-lg border border-white/10">
                                <table className="w-full border-collapse text-sm">
                                    {children}
                                </table>
                            </div>
                        ),
                        thead: ({ children }) => (
                            <thead className="bg-white/5 border-b border-white/10">
                                {children}
                            </thead>
                        ),
                        tbody: ({ children }) => <tbody className="divide-y divide-white/5">{children}</tbody>,
                        tr: ({ children }) => <tr className="hover:bg-white/[0.02] transition-colors">{children}</tr>,
                        th: ({ children }) => (
                            <th className="px-4 py-3 text-left font-semibold text-white text-xs uppercase tracking-wider">
                                {children}
                            </th>
                        ),
                        td: ({ children }) => (
                            <td className="px-4 py-3 text-gray-300">
                                {children}
                            </td>
                        ),
                        // Code
                        code: ({ className, children, ...props }) => {
                            const match = className?.match(/language-(\w+)/);
                            const language = match ? match[1] : null;

                            if (language) {
                                const codeString = String(children).replace(/\n$/, '');
                                return (
                                    <SyntaxHighlighter
                                        style={oneDark}
                                        language={language}
                                        PreTag="div"
                                        customStyle={{
                                            margin: 0,
                                            padding: '1rem',
                                            background: '#0d1117',
                                            fontSize: '13px',
                                        }}
                                    >
                                        {codeString}
                                    </SyntaxHighlighter>
                                );
                            }
                            return (
                                <code className="bg-white/10 text-gray-300 px-1.5 py-0.5 rounded text-[13px] font-mono">
                                    {children}
                                </code>
                            );
                        },
                        pre: ({ children, node }) => {
                            // Try to extract language from the code child
                            const codeElement = node?.children?.[0] as { properties?: { className?: string[] } };
                            const className = codeElement?.properties?.className?.[0] || '';
                            const match = className.match(/language-(\w+)/);
                            const language = match ? match[1] : 'code';

                            return (
                                <div className="my-4 rounded-lg overflow-hidden border border-white/10">
                                    <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                                        <span className="text-xs text-gray-400 font-mono">{language}</span>
                                    </div>
                                    {children}
                                </div>
                            );
                        },
                        // Links
                        a: ({ href, children }) => (
                            <a href={href} className="text-blue-400 hover:text-blue-300 underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                                {children}
                            </a>
                        ),
                        // Blockquote
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-2 border-gray-600 pl-4 my-4 text-gray-400 italic">
                                {children}
                            </blockquote>
                        ),
                        // Horizontal rule
                        hr: () => <hr className="border-white/10 my-6" />,
                    }}
                >
                    {content}
                </ReactMarkdown>
                {isStreamingMessage && (
                    <span className="inline-block w-1.5 h-4 bg-gray-400 ml-0.5 animate-pulse rounded-sm" />
                )}
            </div>
        );
    };

    const isNewChat = messages.length === 0;

    return (
        <div className="h-screen bg-[#0a0f1a] flex flex-col overflow-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.05); }
          50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.1); }
        }
        .message-enter { animation: fadeIn 0.3s ease-out; }
        .typing span {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #6b7280;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }
        .typing span:nth-child(1) { animation-delay: 0s; }
        .typing span:nth-child(2) { animation-delay: 0.15s; }
        .typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
          30% { transform: translateY(-4px) scale(1.05); opacity: 1; }
        }
      `}} />

            {/* Header */}
            <header className="flex-shrink-0 border-b border-white/5 bg-[#0a0f1a]/95 backdrop-blur-xl z-10">
                <div className="px-6 lg:px-10 xl:px-16 h-14 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-lime-400 rounded-lg flex items-center justify-center">
                            <Image src="/logo.svg" alt="Logo" width={14} height={14} />
                        </div>
                        <span className="text-base font-medium text-white">HexiChat</span>
                        <span className="text-[10px] bg-white/10 text-gray-400 px-1.5 py-0.5 rounded font-medium">BETA</span>
                    </Link>
                    <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
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
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-lime-400 rounded-xl flex items-center justify-center mb-6">
                        <Image src="/logo.svg" alt="HexiChat" width={24} height={24} className="lg:w-7 lg:h-7" />
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-semibold text-white mb-2">How can I help you today?</h1>
                    <p className="text-gray-400 text-center max-w-md mb-8">
                        Smart contract security, vulnerability analysis, and code review
                    </p>

                    {/* Input Box - Centered */}
                    <div className="w-full max-w-3xl mb-8">
                        <ChatInputBox
                            input={input}
                            setInput={setInput}
                            isStreaming={isStreaming}
                            onSubmit={handleSubmit}
                            textareaRef={textareaRef}
                            agentsRef={agentsRef}
                            agentsDrawerOpen={agentsDrawerOpen}
                            setAgentsDrawerOpen={setAgentsDrawerOpen}
                            activeAgents={activeAgents}
                            toggleAgent={toggleAgent}
                            selectAgent={selectAgent}
                            availableAgents={availableAgents}
                            selectedFile={selectedFile}
                            onFileSelect={handleFileSelect}
                            onFileRemove={removeFile}
                            fileInputRef={fileInputRef}
                        />
                    </div>

                    {/* Suggested Prompts */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-3xl">
                        {suggestedPrompts.map((prompt, i) => (
                            <button
                                key={i}
                                onClick={() => setInput(prompt.text)}
                                className="text-left p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-lime-400/30 transition-all group"
                            >
                                <div className="mb-2 opacity-70 group-hover:opacity-100 transition-opacity">
                                    <PromptIcon name={prompt.icon} />
                                </div>
                                <span className="text-sm text-gray-400 group-hover:text-gray-300 leading-snug">{prompt.text}</span>
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
                                {messages.map((message) => {
                                    const isCurrentStreamingAssistant = isStreaming && message.id === currentAssistantId;

                                    // Skip rendering empty assistant messages, UNLESS it's the current streaming message
                                    if (message.role === 'assistant' && !message.content && !isCurrentStreamingAssistant) {
                                        return null;
                                    }

                                    return (
                                        <div key={message.id} className="message-enter">
                                            {message.role === 'user' ? (
                                                <div className="flex flex-col items-end gap-2">
                                                    {message.attachedFile && (
                                                        <div className="max-w-[80%] lg:max-w-[65%]">
                                                            <div className="bg-white/[0.08] rounded-2xl px-4 py-3 min-w-[180px]">
                                                                <p className="text-[15px] font-medium text-white mb-1.5 truncate max-w-[240px]">
                                                                    {message.attachedFile.name.replace(/\.[^/.]+$/, '')}
                                                                </p>
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-6 h-6 bg-lime-400 rounded flex items-center justify-center flex-shrink-0">
                                                                        <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                                        </svg>
                                                                    </div>
                                                                    <span className="text-sm text-gray-400 uppercase">
                                                                        {message.attachedFile.name.split('.').pop()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="max-w-[80%] lg:max-w-[65%]">
                                                        <div className="bg-white/10 text-white rounded-2xl rounded-br-sm px-4 py-3">
                                                            <p className="text-[15px] leading-relaxed">{message.content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="max-w-[85%]">
                                                    {/* Tool Status - Always on top of content */}
                                                    {isCurrentStreamingAssistant && toolStatus && (
                                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                                                            <span className="w-3 h-3 border border-gray-500 border-t-transparent rounded-full animate-spin"></span>
                                                            <span className="italic">{toolStatus}</span>
                                                        </div>
                                                    )}
                                                    {/* Typing indicator - when no content and no toolStatus */}
                                                    {isCurrentStreamingAssistant && !message.content && !toolStatus && (
                                                        <div className="typing flex gap-1.5">
                                                            <span></span><span></span><span></span>
                                                        </div>
                                                    )}
                                                    {/* Content - only render if there's content */}
                                                    {message.content && (
                                                        <div className="text-[15px] text-gray-200 leading-relaxed">
                                                            {renderContent(message.content, isCurrentStreamingAssistant)}
                                                        </div>
                                                    )}
                                                    {message.toolCalls && message.toolCalls.length > 0 && (
                                                        <ToolCallsDisplay
                                                            toolCalls={message.toolCalls}
                                                            isExpanded={expandedToolCalls[message.id] || false}
                                                            onToggle={() => setExpandedToolCalls(prev => ({ ...prev, [message.id]: !prev[message.id] }))}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                <div ref={messagesEndRef} />
                            </div>
                        </div>
                    </main>

                    {/* Input at Bottom */}
                    <div className="flex-shrink-0 border-t border-white/5 bg-[#0a0f1a] px-6 lg:px-8 py-4">
                        <ChatInputBox
                            input={input}
                            setInput={setInput}
                            isStreaming={isStreaming}
                            onSubmit={handleSubmit}
                            textareaRef={textareaRef}
                            agentsRef={agentsRef}
                            agentsDrawerOpen={agentsDrawerOpen}
                            setAgentsDrawerOpen={setAgentsDrawerOpen}
                            activeAgents={activeAgents}
                            toggleAgent={toggleAgent}
                            selectAgent={selectAgent}
                            availableAgents={availableAgents}
                            selectedFile={selectedFile}
                            onFileSelect={handleFileSelect}
                            onFileRemove={removeFile}
                            fileInputRef={fileInputRef}
                            compact
                        />
                    </div>
                </>
            )}
        </div>
    );
}
