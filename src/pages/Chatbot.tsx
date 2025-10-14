import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User } from "lucide-react";
import Navigation from "@/components/Navigation";
import supabase from "../supabaseClient";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface Patient {
  id: string;
  name: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string>("");
  const { toast } = useToast();

  // Load patients on mount
  useEffect(() => {
    async function fetchPatients() {
      const { data, error } = await supabase.from("patients").select("id, name");
      if (error) console.error(error);
      else setPatients(data || []);
    }
    fetchPatients();
  }, []);

  // Load chat logs for selected patient
  useEffect(() => {
    if (!selectedPatient) {
      setMessages([]);
      return;
    }

    async function fetchChatLogs() {
      const { data, error } = await supabase
        .from("chat_logs")
        .select("*")
        .eq("patient_id", selectedPatient)
        .order("timestamp", { ascending: true });
      if (error) console.error(error);
      else
        setMessages(
          data.map((log, index) => ({
            id: index + 1,
            text: log.message,
            sender: "user",
            timestamp: new Date(log.timestamp),
          }))
        );
    }
    fetchChatLogs();
  }, [selectedPatient]);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!selectedPatient) {
      toast({
        title: "Select a patient",
        description: "Please select a patient to continue",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    // Store user message in Supabase
    const { error: userError } = await supabase.from("chat_logs").insert([
      {
        patient_id: selectedPatient,
        message: input,
        response: "", // bot response will update later
        timestamp: new Date(),
      },
    ]);
    if (userError) console.error(userError);

    setInput("");

    // Simulate AI response
    setTimeout(async () => {
      const botResponseText =
        "I understand your concern. Based on the symptoms you've described, I recommend consulting with a healthcare professional. Would you like me to help you find a specialist or schedule a teleconsultation?";

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Update Supabase log with bot response
      const { error: botError } = await supabase
        .from("chat_logs")
        .update({ response: botResponseText })
        .eq("patient_id", selectedPatient)
        .order("timestamp", { ascending: false })
        .limit(1); // update latest log
      if (botError) console.error(botError);
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

        {/* Patient Selector */}
        <div className="mb-4">
          <select
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
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
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.sender === "bot" ? "bg-gradient-primary" : "bg-secondary"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>

                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.sender === "bot" ? "bg-muted text-foreground" : "bg-gradient-primary text-white"
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
              <Button onClick={handleSend} variant="hero" size="icon" className="flex-shrink-0">
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
          {["Symptom checker", "Find a doctor", "Medication info", "Schedule call"].map((action, index) => (
            <Button key={index} variant="outline" className="w-full" onClick={() => setInput(action)}>
              {action}
            </Button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
