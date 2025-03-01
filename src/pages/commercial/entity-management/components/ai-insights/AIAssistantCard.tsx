
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Send, User, Bot, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Hello! I'm your Entity Management AI assistant. I can help you with financial analysis, entity compliance checks, and provide insights based on your integrated data sources. How can I assist you today?",
    timestamp: new Date(Date.now() - 60000).toISOString(),
  }
];

const suggestedQueries = [
  "Analyze our cash flow based on the latest ERP data",
  "Identify tax optimization opportunities for this entity",
  "Check if we have any compliance issues based on current regulations",
  "Compare our financial performance to industry benchmarks",
  "Summarize the recent banking transactions for this entity"
];

export function AIAssistantCard() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: "user",
      content: inputValue,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on the data from your SAP ERP and banking integrations, I've analyzed the cash flow trends. Over the past quarter, there's been a 12% increase in operating cash flows, primarily driven by improved accounts receivable collection efficiency. However, I've also noticed a 15% increase in supplier payments that isn't fully explained by increased sales volumes. You might want to review your procurement processes for potential inefficiencies.",
        "I've reviewed the entity's financial structure and identified several tax optimization opportunities. Given your operations across multiple jurisdictions, you could benefit from a more efficient transfer pricing strategy. Additionally, based on recent changes to tax regulations in your primary jurisdiction, you may qualify for R&D tax credits that aren't currently being utilized. Would you like me to provide more specific recommendations?",
        "After reviewing your latest filings and integrated compliance data, I've identified two potential compliance issues: 1) Your FATCA reporting for Q2 appears to be incomplete, missing information about certain offshore investments. 2) Based on recent regulatory changes, you'll need to update your AML procedures by the end of the quarter. I'd recommend addressing these issues promptly to avoid potential penalties.",
        "Comparing your financial performance to industry benchmarks, your entity is outperforming the industry average in profit margins (18% vs. 12% industry average) and operational efficiency. However, your cash conversion cycle is longer than the industry benchmark (45 days vs. 30 days), suggesting potential improvements in working capital management. Your debt-to-equity ratio is also slightly higher than peers, which may impact future financing flexibility.",
        "I've analyzed the recent banking transactions from your integrated accounts. Over the past month, there were 156 transactions totaling $1.23M in inflows and $980K in outflows. The largest category of transactions was customer payments (52%), followed by supplier payments (38%). I noticed an unusual pattern of small, recurring transfers to an unclassified account that might warrant review for potential subscription services that could be consolidated.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        role: "assistant",
        content: randomResponse,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };
  
  const handleSuggestedQuery = (query: string) => {
    setInputValue(query);
  };
  
  return (
    <Card className="border border-blue-100 dark:border-blue-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Brain className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            AI Financial Assistant
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 h-[300px] overflow-y-auto flex flex-col space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-2",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <div className="bg-violet-100 dark:bg-violet-900/30 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "rounded-lg p-3 max-w-[80%]",
                      message.role === "user"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    )}
                  >
                    <div className="text-sm">{message.content}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  
                  {message.role === "user" && (
                    <div className="bg-blue-500 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-3.5 w-3.5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-2">
                  <div className="bg-violet-100 dark:bg-violet-900/30 h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                  </div>
                </div>
              )}
            </div>
            
            {suggestedQueries.length > 0 && messages.length <= 3 && (
              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Suggested questions:</div>
                <div className="flex flex-wrap gap-2">
                  {suggestedQueries.map((query, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      size="sm" 
                      className="text-xs py-1 h-auto"
                      onClick={() => handleSuggestedQuery(query)}
                    >
                      {query}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex gap-2 items-center">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about this entity..."
                className="min-h-[60px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                onClick={handleSendMessage} 
                size="icon" 
                className="h-[60px] w-[60px] flex-shrink-0"
                disabled={!inputValue.trim() || isLoading}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="text-xs text-center text-muted-foreground">
              AI assistant has access to entity data and your connected data sources.
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
