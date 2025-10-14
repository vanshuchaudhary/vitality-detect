import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer"; // Optional
import { Helmet } from "react-helmet";
import { supabase } from "@/lib/supabase";

const Index = () => {
  const [stats, setStats] = useState<any>(null); // Optional Supabase data

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase.from("site_stats").select("*");
      if (data) setStats(data);
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Lovable Health | AI-Powered Wellness</title>
        <meta
          name="description"
          content="Get personalized health insights, AI consultations, and report analysis with Lovable Health."
        />
      </Helmet>

      <Navigation />

      <main className="container px-4 py-8 mx-auto">
        <section id="hero">
          <Hero />
        </section>

        <section id="features" className="mt-16">
          <Features />
        </section>

        <section id="how-it-works" className="mt-16">
          <HowItWorks />
        </section>

        <section id="call-to-action" className="mt-16">
          <CallToAction />
        </section>

        {/* Optional: Display Supabase stats */}
        {stats && (
          <div className="mt-12 text-center text-muted-foreground">
            <p>Users helped: {stats.users_helped}</p>
            <p>Reports analyzed: {stats.reports_analyzed}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
