'use client';

import { useCallback, useRef, useState } from 'react';
import { fetchEventSource } from '@microsoft/fetch-event-source';

export interface SSEMessage {
    event: 'token' | 'status' | 'error' | 'end';
    data: string;
}

export interface UseSSEStreamOptions {
    apiUrl: string;
    onToken?: (token: string) => void;
    onStatus?: (status: { message: string }) => void;
    onError?: (error: { error: string }) => void;
    onEnd?: () => void;
    onStart?: () => void;
}

export interface StreamParams {
    query: string;
    activeAgent?: string;
    file?: File | null;
}

export function useSSEStream(options: UseSSEStreamOptions) {
    const { apiUrl, onToken, onStatus, onError, onEnd, onStart } = options;

    const [isStreaming, setIsStreaming] = useState(false);
    const [streamedContent, setStreamedContent] = useState('');
    const [error, setError] = useState<string | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);
    const isStreamingRef = useRef(false);

    const startStream = useCallback(
        async ({ query, activeAgent, file }: StreamParams) => {
            // Prevent duplicate streams
            if (isStreamingRef.current) {
                return;
            }

            // Abort any existing stream
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            // Create new abort controller
            abortControllerRef.current = new AbortController();

            // Reset state
            isStreamingRef.current = true;
            setIsStreaming(true);
            setStreamedContent('');
            setError(null);
            onStart?.();

            // Build form data
            const formData = new FormData();
            formData.append('query', query);

            if (activeAgent) {
                formData.append('active_agent', activeAgent);
            }

            if (file) {
                formData.append('file', file);
            }

            try {
                await fetchEventSource(apiUrl, {
                    method: 'POST',
                    body: formData,
                    signal: abortControllerRef.current.signal,
                    openWhenHidden: true, // Keep stream alive when tab is hidden

                    onopen: async (response) => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                    },

                    onmessage: (event) => {
                        const { event: eventType, data } = event;

                        switch (eventType) {
                            case 'token':
                                // Decode escaped newlines from SSE
                                const decodedData = data.replace(/\\n/g, '\n');
                                setStreamedContent((prev) => prev + decodedData);
                                onToken?.(decodedData);
                                break;

                            case 'status':
                                try {
                                    const statusData = JSON.parse(data);
                                    onStatus?.(statusData);
                                } catch {
                                    console.warn('Failed to parse status data:', data);
                                }
                                break;

                            case 'error':
                                try {
                                    const errorData = JSON.parse(data);
                                    setError(errorData.error);
                                    onError?.(errorData);
                                } catch {
                                    setError(data);
                                    onError?.({ error: data });
                                }
                                break;

                            case 'end':
                                isStreamingRef.current = false;
                                setIsStreaming(false);
                                onEnd?.();
                                break;
                        }
                    },

                    onerror: (err) => {
                        // Don't treat abort as an error
                        if (err.name === 'AbortError') {
                            return;
                        }

                        console.error('SSE Error:', err);
                        setError(err.message || 'Stream connection failed');
                        isStreamingRef.current = false;
                        setIsStreaming(false);
                        onError?.({ error: err.message || 'Stream connection failed' });

                        // Don't retry on error
                        throw err;
                    },

                    onclose: () => {
                        isStreamingRef.current = false;
                        setIsStreaming(false);
                    },
                });
            } catch (err) {
                // Ignore abort errors
                if (err instanceof Error && err.name === 'AbortError') {
                    return;
                }

                console.error('Stream error:', err);
                setError(err instanceof Error ? err.message : 'Stream failed');
                isStreamingRef.current = false;
                setIsStreaming(false);
            }
        },
        [apiUrl, onToken, onStatus, onError, onEnd, onStart]
    );

    const stopStream = useCallback(() => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        isStreamingRef.current = false;
        setIsStreaming(false);
    }, []);

    const resetStream = useCallback(() => {
        stopStream();
        setStreamedContent('');
        setError(null);
    }, [stopStream]);

    return {
        isStreaming,
        streamedContent,
        error,
        startStream,
        stopStream,
        resetStream,
    };
}
