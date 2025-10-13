import { Card, CardContent } from "@/components/ui/card";
import detectionImage from "@/assets/feature-detection.jpg";
import chatbotImage from "@/assets/feature-chatbot.jpg";
import scanningImage from "@/assets/feature-scanning.jpg";
import { Brain, MessageSquare, ScanLine, Phone } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Disease Detection",
    description: "Advanced ML/DL algorithms analyze medical datasets to detect diseases early, reducing late diagnosis risks.",
    image: detectionImage,
  },
  {
    icon: MessageSquare,
    title: "Smart Health Chatbot",
    description: "24/7 AI assistant using NLP to provide instant health guidance, answer questions, and offer support.",
    image: chatbotImage,
  },
  {
    icon: ScanLine,
    title: "Report Scanning & Analysis",
    description: "Automated image and document analysis with age detection from reports for comprehensive health insights.",
    image: scanningImage,
  },
  {
    icon: Phone,
    title: "Teleconsultation",
    description: "Connect with healthcare professionals remotely, making quality care accessible even in rural areas.",
    image: detectionImage,
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            Intelligent Healthcare, <span className="text-primary">Simplified</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our AI-powered platform addresses critical healthcare challenges with cutting-edge technology
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-medium transition-all duration-300 overflow-hidden border-border/50 bg-gradient-card animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
