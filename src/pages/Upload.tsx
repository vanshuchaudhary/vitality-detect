import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload as UploadIcon, FileText, CheckCircle, AlertCircle, Brain } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResults(null);
    }
  };

  const handleAnalyze = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a medical report first",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      toast({
        title: "Report analyzed",
        description: "Your medical report has been analyzed successfully",
      });
      
      setResults({
        confidence: 94,
        findings: [
          { type: "Normal", label: "Blood Pressure", value: "120/80 mmHg" },
          { type: "Normal", label: "Heart Rate", value: "72 bpm" },
          { type: "Warning", label: "Blood Sugar", value: "115 mg/dL (slightly elevated)" },
          { type: "Normal", label: "Cholesterol", value: "180 mg/dL" },
        ],
        recommendations: [
          "Monitor blood sugar levels regularly",
          "Consider dietary adjustments to manage glucose",
          "Schedule follow-up with your physician in 3 months",
        ],
      });

      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container px-4 py-8 max-w-6xl mx-auto">
        <div className="mb-8 text-center space-y-2 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Upload Medical <span className="text-primary">Report</span>
          </h1>
          <p className="text-foreground/70">AI-powered analysis of your medical documents</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UploadIcon className="w-5 h-5 text-primary" />
                Upload Report
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                />
                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground mt-1">PDF, JPG, PNG (max 10MB)</p>
                  </div>
                </label>
              </div>

              {file && (
                <div className="bg-muted rounded-lg p-4 flex items-center gap-3 animate-fade-in">
                  <FileText className="w-8 h-8 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}

              <Button variant="hero" className="w-full" onClick={handleAnalyze} disabled={!file || analyzing}>
                {analyzing ? (
                  <>
                    <Brain className="w-4 h-4 animate-pulse" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    Analyze & Upload
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!results ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Brain className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Upload and analyze a report to see results</p>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-gradient-primary rounded-lg p-4 text-white">
                    <p className="text-sm opacity-90">AI Confidence</p>
                    <p className="text-3xl font-bold">{results.confidence}%</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Key Findings</h3>
                    {results.findings.map((finding: any, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted">
                        {finding.type === "Normal" ? (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">{finding.label}</p>
                          <p className="text-sm text-foreground/70">{finding.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Recommendations</h3>
                    <ul className="space-y-2">
                      {results.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="text-sm text-foreground/75 flex gap-2">
                          <span className="text-primary">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Upload;

