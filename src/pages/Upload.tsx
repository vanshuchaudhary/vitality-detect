import { supabase } from "@/lib/supabase";

const handleAnalyze = async () => {
  if (!file) {
    toast({
      title: "No file selected",
      description: "Please upload a medical report first",
      variant: "destructive",
    });
    return;
  }

  setAnalyzing(true);

  // Upload file to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("medical-reports")
    .upload(`reports/${Date.now()}_${file.name}`, file);

  if (uploadError) {
    toast({
      title: "Upload failed",
      description: uploadError.message,
      variant: "destructive",
    });
    setAnalyzing(false);
    return;
  }

  const publicUrl = supabase.storage
    .from("medical-reports")
    .getPublicUrl(uploadData.path).data.publicUrl;

  // Simulate AI analysis
  setTimeout(async () => {
    const analysis = {
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
    };

    setResults(analysis);

    // Save analysis to Supabase table
    const { error: insertError } = await supabase.from("report_analysis").insert({
      filename: file.name,
      file_url: publicUrl,
      confidence: analysis.confidence,
      findings: analysis.findings,
      recommendations: analysis.recommendations,
    });

    if (insertError) {
      toast({
        title: "Save failed",
        description: insertError.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Report analyzed",
        description: "Your medical report has been analyzed and saved successfully",
      });
    }

    setAnalyzing(false);
  }, 2000);
};
