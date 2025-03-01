
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Bot, ChevronUp, ChevronDown, SendHorizontal, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Message = {
  id: string;
  content: string;
  role: "assistant" | "user";
  timestamp: Date;
};

export function AIAssistant() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm Chad, your AI assistant. How can I help you with the treasury platform today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    // If we're opening the chat, scroll to bottom
    if (isMinimized) {
      setTimeout(() => scrollToBottom(), 100);
    }
  };

  const handleClose = () => {
    setIsMinimized(true);
    setIsExpanded(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const responses = [
        "I can help you with cash flow analysis, treasury operations, payment processing, and more. What specific information are you looking for?",
        "You can navigate to Treasury & Cash Management section from the main menu to access liquidity forecasting, cash pooling, and investment management tools.",
        "To analyze risk exposure, try using our Risk Management module which offers real-time metrics and compliance monitoring.",
        "For payment processing, you can use our secure payment gateway with multi-currency support and real-time fraud detection.",
        "Our AI-powered analytics tools can help you identify patterns in your financial data to optimize decision making.",
        "You can generate custom reports from any module by clicking the Export or Download button in the top right corner."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  if (isMinimized) {
    return (
      <Button
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg z-50"
        onClick={toggleMinimize}
      >
        <Bot className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card
      className={cn(
        "fixed bottom-6 right-6 shadow-lg transition-all duration-300 z-50",
        isExpanded ? "w-[450px] h-[600px]" : "w-[350px] h-[450px]"
      )}
    >
      <CardHeader className="border-b p-4 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-500" />
          Chad AI Assistant
        </CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={toggleExpand} className="h-8 w-8">
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col max-w-[80%] rounded-lg p-3",
                message.role === "assistant"
                  ? "bg-muted self-start rounded-tl-none"
                  : "bg-primary text-primary-foreground self-end rounded-tr-none"
              )}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 self-end">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {isLoading && (
            <div className="flex flex-col max-w-[80%] rounded-lg p-3 bg-muted self-start rounded-tl-none">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-3">
        <form onSubmit={handleSend} className="flex w-full items-center space-x-2">
          <Input
            placeholder="Ask about treasury features..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button size="icon" type="submit" disabled={isLoading}>
            <SendHorizontal className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
