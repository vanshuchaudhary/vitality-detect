import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          {/* Card */}
          <div className="relative bg-gradient-primary rounded-3xl p-8 md:p-12 shadow-glow overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-6 animate-scale-in">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Shield className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Secure & Confidential</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Ready to Transform Your Healthcare Experience?
              </h2>

              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Join thousands who are experiencing better health outcomes through AI-powered early detection and accessible care.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 shadow-medium group"
                >
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  Schedule a Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-6 pt-8 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <span>End-to-End Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
