import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Send, Sparkles, Terminal, CheckCircle2, ShieldCheck, 
  RefreshCw, Cpu, Layers, ExternalLink, Code2, AlertTriangle, 
  Play, Copy, Check, ChevronRight, Zap, Server
} from 'lucide-react';
import { mcpClient, MCPTool, ChatResponse } from '../services/mcpClient';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  toolInvoked?: string;
  toolOutput?: any;
  timestamp: string;
}

export const CopilotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      content: "### WhisperLedger Autonomous MCP Operator Active\n\nI have indexed all repositories across the organization: `whisperledger-backend`, `whisperledger-frontend`, `whisperledger-web`, and `pitcher-console`.\n\nAsk me anything about our architecture (3-Way Outflow Ledger, Go debt graph solver, Kotlin SMS bridge), query live cloud telemetry, audit security, or trigger deployment PRs.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState<boolean>(false);
  const [tools, setTools] = useState<MCPTool[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [expandedToolOutput, setExpandedToolOutput] = useState<string | null>(null);
  const [activeOrg, setActiveOrg] = useState<string>(mcpClient.getActiveOrg());
  const [orgInput, setOrgInput] = useState<string>('');
  const [isChangingOrg, setIsChangingOrg] = useState(false);
  const [orgReposCount, setOrgReposCount] = useState<number>(5);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    checkConnection();
    mcpClient.getTools().then(setTools);
    mcpClient.getOrgData().then(data => {
      setActiveOrg(data.active_organization);
      setOrgReposCount(data.repositories.length);
    });
  }, []);

  const handleConnectOrg = async (targetOrg: string) => {
    if (!targetOrg.trim()) return;
    setLoading(true);
    try {
      const res = await mcpClient.connectOrg(targetOrg.trim());
      setActiveOrg(res.organization);
      setOrgReposCount(res.repositories.length);
      setIsChangingOrg(false);
      setOrgInput('');

      const assistantMessage: Message = {
        id: `org-connect-${Date.now()}`,
        sender: 'assistant',
        content: `### Organization Connected: \`${res.organization}\`\n\nSuccessfully linked organization. Discovered **${res.repositories.length}** repositories ready for autonomous management:\n` +
          res.repositories.map((r: any) => `- \`${typeof r === 'string' ? r : r.name}\``).join('\n') +
          `\n\nI am now configured as the single-stop operator for **${res.organization}**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      // error handling
    } finally {
      setLoading(false);
    }
  };

  const checkConnection = async () => {
    const res = await mcpClient.checkHealth();
    setConnected(res.connected);
  };

  const handleSend = async (textToSend?: string) => {
    const prompt = (textToSend || inputValue).trim();
    if (!prompt || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const resp: ChatResponse = await mcpClient.sendChat(prompt);
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        content: resp.message,
        toolInvoked: resp.tool_invoked,
        toolOutput: resp.tool_output,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        content: "Error communicating with WhisperLedger MCP Server. Please ensure the daemon is running on port 5005.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      checkConnection();
    }
  };

  const copyClaudeConfig = () => {
    const config = JSON.stringify({
      "mcpServers": {
        "whisperledger": {
          "command": "python3",
          "args": ["/Users/tanmayagarwal/TanmayProjects/whisperledger-mcp/mcp_server.py"]
        }
      }
    }, null, 2);
    navigator.clipboard.writeText(config);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const quickPrompts = [
    "Explain 3-Way Outflow Ledger & Go Domain logic",
    "Check Fleet Telemetry & Neon PG status",
    "Audit Branch Protection & Secrets",
    "Automate Pull Request for Staging",
    "Explain Minimum Cash Flow Debt Solver"
  ];

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#0d1424] border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                WhisperLedger MCP Copilot
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  MCP 2.0
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Autonomous Organization Operator · Codebase Knowledge · CI/CD & Deployments
              </p>
            </div>
          </div>
        </div>

        {/* Organization Switcher & Daemon Connection Status */}
        <div className="flex flex-wrap items-center gap-3 z-10">
          
          {/* Active Organization Pill & Connector */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs">
            <span className="text-slate-400 font-medium">Org:</span>
            {!isChangingOrg ? (
              <button
                onClick={() => setIsChangingOrg(true)}
                className="font-bold text-white hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                title="Click to switch connected organization"
              >
                <span>{activeOrg}</span>
                <span className="text-[10px] text-cyan-400 font-mono">({orgReposCount} repos)</span>
                <span className="text-[10px] text-slate-500 underline ml-1">switch</span>
              </button>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleConnectOrg(orgInput || activeOrg);
                }}
                className="flex items-center gap-1.5"
              >
                <input
                  type="text"
                  value={orgInput}
                  onChange={(e) => setOrgInput(e.target.value)}
                  placeholder="e.g. WhisperLedger"
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-0.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-32"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2 py-0.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold"
                >
                  Link
                </button>
                <button
                  type="button"
                  onClick={() => setIsChangingOrg(false)}
                  className="text-[11px] text-slate-400 hover:text-slate-200"
                >
                  ✕
                </button>
              </form>
            )}
          </div>

          {/* Connection Status */}
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold ${
            connected 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span>{connected ? 'Daemon Online (:5005)' : 'Standby / Client Fallback'}</span>
          </div>

          <button
            onClick={checkConnection}
            title="Refresh Connection"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-slate-700"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Chat + Tools Arsenal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chat / Execution Console (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col h-[650px] bg-[#0d1424] border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          
          {/* Terminal Header */}
          <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span>mcp://whisperledger.local:5005/operator</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500 font-mono">JSON-RPC 2.0</span>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {msg.sender === 'user' ? 'Operator' : 'WhisperLedger MCP'}
                  </span>
                  <span className="text-[10px] text-slate-600 font-mono">{msg.timestamp}</span>
                </div>

                <div className={`p-4 rounded-2xl max-w-[90%] text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10 rounded-tr-sm'
                    : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-sm shadow-md'
                }`}>
                  {/* Markdown formatted content */}
                  <div className="whitespace-pre-wrap font-sans space-y-2">
                    {msg.content}
                  </div>

                  {/* Tool Call Invocation Badge */}
                  {msg.toolInvoked && (
                    <div className="mt-3 pt-3 border-t border-slate-800/80">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md border border-cyan-500/20">
                          <Zap className="w-3 h-3" />
                          <span>Tool: {msg.toolInvoked}</span>
                        </div>
                        {msg.toolOutput && (
                          <button
                            onClick={() => setExpandedToolOutput(expandedToolOutput === msg.id ? null : msg.id)}
                            className="text-[10px] font-mono text-slate-400 hover:text-slate-200 underline"
                          >
                            {expandedToolOutput === msg.id ? 'Hide Output' : 'Inspect Payload'}
                          </button>
                        )}
                      </div>

                      {expandedToolOutput === msg.id && msg.toolOutput && (
                        <pre className="mt-2 p-2.5 rounded-lg bg-black/60 border border-slate-800 text-[10px] font-mono text-emerald-400 overflow-x-auto">
                          {JSON.stringify(msg.toolOutput, null, 2)}
                        </pre>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2.5 text-xs text-slate-400 p-4 bg-slate-900/60 rounded-xl border border-slate-800 w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                <span>Executing MCP tool dispatch across WhisperLedger...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-5 py-2 border-t border-slate-800/60 bg-slate-900/30 overflow-x-auto flex items-center gap-2 scrollbar-none">
            {quickPrompts.map((qp, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(qp)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/70 hover:bg-slate-700/70 text-slate-300 border border-slate-700/60 hover:border-slate-600 whitespace-nowrap transition-colors shrink-0"
              >
                {qp}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-slate-800 bg-slate-900/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Go backend, native SMS bridge, trigger PR, or check fleet status..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors font-sans"
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 text-white disabled:text-slate-600 transition-colors shadow-md shadow-blue-600/20"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: MCP Operator Capabilities & Integration */}
        <div className="space-y-6">
          
          {/* Registered MCP Tools */}
          <div className="p-5 rounded-2xl bg-[#0d1424] border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Registered MCP Tools ({tools.length})
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                ACTIVE
              </span>
            </div>

            <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
              {tools.map((tool) => (
                <div 
                  key={tool.name}
                  onClick={() => handleSend(`Run tool ${tool.name}`)}
                  className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/40 cursor-pointer transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold text-blue-400 group-hover:text-cyan-300 transition-colors">
                      {tool.name}
                    </span>
                    <Play className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Claude Desktop & Cursor Integration */}
          <div className="p-5 rounded-2xl bg-[#0d1424] border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Claude & Cursor Setup
                </h3>
              </div>
              <button
                onClick={copyClaudeConfig}
                className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 hover:text-white transition-colors px-2 py-1 rounded-md bg-slate-800 border border-slate-700"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Add to Claude Desktop configuration (`claude_desktop_config.json`) to use WhisperLedger tools anywhere:
            </p>

            <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300 overflow-x-auto">
{`{
  "mcpServers": {
    "whisperledger": {
      "command": "python3",
      "args": ["/Users/tanmayagarwal/TanmayProjects/whisperledger-mcp/mcp_server.py"]
    }
  }
}`}
            </pre>
          </div>

          {/* Quick Local Daemon Launch */}
          <div className="p-5 rounded-2xl bg-[#0d1424] border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Run Local MCP Daemon
              </h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              To keep the REST & JSON-RPC gateway active on port 5005:
            </p>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-400 flex items-center justify-between">
              <span>./start.sh</span>
              <span className="text-[10px] text-slate-500">Port 5005</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
