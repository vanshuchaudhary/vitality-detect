import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, Heart, Brain, Calendar, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const healthMetrics = [
    { label: "Health Score", value: "87", unit: "/100", icon: Activity, color: "text-green-500" },
    { label: "Risk Level", value: "Low", unit: "", icon: AlertCircle, color: "text-blue-500" },
    { label: "Reports Analyzed", value: "12", unit: "", icon: Brain, color: "text-purple-500" },
    { label: "Days Active", value: "45", unit: "", icon: Calendar, color: "text-orange-500" },
  ];

  const recentActivity = [
    { date: "2024-01-15", type: "Blood Test", status: "Normal", risk: "Low" },
    { date: "2024-01-10", type: "X-Ray Report", status: "Reviewed", risk: "Low" },
    { date: "2024-01-05", type: "Consultation", status: "Completed", risk: "Medium" },
  ];

  const predictions = [
    {
      condition: "Diabetes Risk",
      probability: 15,
      trend: "stable",
      recommendation: "Maintain current diet and exercise routine",
    },
    {
      condition: "Cardiovascular Health",
      probability: 8,
      trend: "improving",
      recommendation: "Continue regular cardio exercises",
    },
    {
      condition: "Vitamin D Deficiency",
      probability: 35,
      trend: "increasing",
      recommendation: "Increase sun exposure and consider supplements",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Health <span className="text-primary">Dashboard</span>
          </h1>
          <p className="text-foreground/70">
            Your personalized health insights and predictions
          </p>
        </div>

        {/* Health Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {healthMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card
                key={index}
                className="shadow-soft hover:shadow-medium transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">
                      {metric.value}
                      <span className="text-sm text-muted-foreground ml-1">
                        {metric.unit}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">{metric.label}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* AI Predictions */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                AI Health Predictions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {predictions.map((prediction, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg p-4 space-y-3 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">
                      {prediction.condition}
                    </h3>
                    <div className="flex items-center gap-2">
                      <TrendingUp
                        className={`w-4 h-4 ${
                          prediction.trend === "improving"
                            ? "text-green-500"
                            : prediction.trend === "stable"
                            ? "text-blue-500"
                            : "text-yellow-500"
                        }`}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {prediction.probability}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        prediction.probability < 20
                          ? "bg-green-500"
                          : prediction.probability < 40
                          ? "bg-yellow-500"
                          : "bg-orange-500"
                      }`}
                      style={{ width: `${prediction.probability}%` }}
                    ></div>
                  </div>

                  <p className="text-sm text-foreground/70">
                    {prediction.recommendation}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">
                        {activity.type}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {activity.status}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          activity.risk === "Low"
                            ? "bg-green-100 text-green-700"
                            : activity.risk === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {activity.risk} Risk
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health Tips */}
        <Card className="mt-6 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Personalized Health Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  tip: "Stay Hydrated",
                  description: "Drink at least 8 glasses of water daily",
                },
                {
                  tip: "Regular Exercise",
                  description: "30 minutes of activity, 5 days a week",
                },
                {
                  tip: "Sleep Well",
                  description: "Aim for 7-9 hours of quality sleep",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 border border-border"
                >
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.tip}
                  </h3>
                  <p className="text-sm text-foreground/70">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
