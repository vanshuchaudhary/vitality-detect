import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import Navigation from "@/components/Navigation";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI health assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "I understand your concern. Based on the symptoms you've described, I recommend consulting with a healthcare professional. Would you like me to help you find a specialist or schedule a teleconsultation?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container px-4 py-8 max-w-4xl mx-auto">
        <div className="mb-8 text-center space-y-2 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            AI Health <span className="text-primary">Assistant</span>
          </h1>
          <p className="text-foreground/70">
            Get instant health guidance powered by advanced AI
          </p>
        </div>

        <Card className="h-[600px] flex flex-col shadow-medium">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 animate-fade-in ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.sender === "bot"
                      ? "bg-gradient-primary"
                      : "bg-secondary"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.sender === "bot"
                      ? "bg-muted text-foreground"
                      : "bg-gradient-primary text-white"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type your health question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                variant="hero"
                size="icon"
                className="flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This AI assistant provides general health information. Always consult healthcare professionals for medical advice.
            </p>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            "Symptom checker",
            "Find a doctor",
            "Medication info",
            "Schedule call",
          ].map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full"
              onClick={() => setInput(action)}
            >
              {action}
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
