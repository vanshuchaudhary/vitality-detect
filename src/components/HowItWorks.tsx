import { Upload, Brain, FileCheck, Stethoscope } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Medical Data",
    description: "Share your medical reports, images, or symptoms securely through our platform",
    number: "01",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our advanced ML/DL models process and analyze your data using extensive disease datasets",
    number: "02",
  },
  {
    icon: FileCheck,
    title: "Instant Feedback",
    description: "Receive detailed insights, risk assessments, and preliminary diagnoses within minutes",
    number: "03",
  },
  {
    icon: Stethoscope,
    title: "Professional Care",
    description: "Connect with healthcare providers for consultation and personalized treatment plans",
    number: "04",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-lg text-foreground/70 font-medium">
            Simple, fast, and effective healthcare powered by artificial intelligence
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                )}

                {/* Card */}
                <div className="relative bg-card border border-border rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 h-full">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-glow">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-foreground/75 leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
