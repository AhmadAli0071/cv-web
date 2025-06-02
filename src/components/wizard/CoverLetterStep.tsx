
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Zap, FileText, Bot, Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { WizardData } from "../StepWizard";

interface CoverLetterStepProps {
  data: WizardData;
  updateData: (data: Partial<WizardData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const CoverLetterStep = ({ data, updateData, onNext, onPrevious }: CoverLetterStepProps) => {
  const [jobDescription, setJobDescription] = useState(data.jobDescription || "");
  const [coverLetter, setCoverLetter] = useState(data.coverLetter || "");
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<"input" | "generated">("input");

  const generateCoverLetter = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job Description Required",
        description: "Please enter a job description to generate a cover letter.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the position outlined in your job posting. With my background and experience detailed in my attached CV, I am excited about the opportunity to contribute to your team.

Based on the job requirements you've described, I believe my skills align perfectly with what you're looking for:

• Proven track record in relevant technologies and methodologies
• Strong problem-solving abilities and analytical thinking
• Excellent communication and collaboration skills
• Passion for continuous learning and professional development

What particularly excites me about this role is the opportunity to work with innovative technologies and contribute to meaningful projects. Your company's commitment to excellence and innovation aligns perfectly with my career aspirations and values.

I am confident that my technical expertise, combined with my enthusiasm for tackling challenging problems, makes me an ideal candidate for this position. I would welcome the opportunity to discuss how I can contribute to your team's continued success.

Thank you for considering my application. I look forward to hearing from you soon.

Best regards,
[Your Name]`;

      setCoverLetter(generatedLetter);
      updateData({ jobDescription, coverLetter: generatedLetter });
      setMode("generated");
      setIsGenerating(false);
      
      toast({
        title: "Cover Letter Generated! ✨",
        description: "Your personalized cover letter is ready for review.",
      });
    }, 3000);
  };

  const handleContinue = () => {
    if (!coverLetter.trim()) {
      toast({
        title: "Cover Letter Required",
        description: "Please generate or write a cover letter to continue.",
        variant: "destructive",
      });
      return;
    }
    
    updateData({ coverLetter, jobDescription });
    onNext();
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Job Description Input */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
            <FileText className="w-6 h-6 mr-3 text-blue-600" />
            Job Description
          </CardTitle>
          <p className="text-gray-600">
            Paste the job description to generate a personalized cover letter
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <Textarea
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="min-h-[300px] resize-none rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
          />
          
          <Button
            onClick={generateCoverLetter}
            disabled={isGenerating || !jobDescription.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            size="lg"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Generating with AI...
              </>
            ) : (
              <>
                <Bot className="w-5 h-5 mr-2" />
                Generate Cover Letter with AI
              </>
            )}
          </Button>
          
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Zap className="w-4 h-4 mr-1" />
            Powered by OpenAI
          </div>
        </CardContent>
      </Card>

      {/* Cover Letter */}
      <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
            <Edit className="w-6 h-6 mr-3 text-green-600" />
            Your Cover Letter
          </CardTitle>
          <p className="text-gray-600">
            {mode === "generated" ? "Review and edit your AI-generated cover letter" : "Write your cover letter manually"}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {mode === "input" && !coverLetter ? (
            <div className="min-h-[300px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center">
              <div className="text-center text-gray-500">
                <Bot className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-lg">Generate a cover letter with AI</p>
                <p className="text-sm">or write one manually below</p>
              </div>
            </div>
          ) : (
            <Textarea
              placeholder="Write your cover letter here or generate one with AI..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[300px] resize-none rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
            />
          )}
          
          {mode === "generated" && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center text-green-800 mb-2">
                <Zap className="w-4 h-4 mr-2" />
                <span className="font-medium">AI Generated</span>
              </div>
              <p className="text-sm text-green-700">
                This cover letter was personalized based on your CV and the job description. 
                Feel free to edit it to match your voice!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="lg:col-span-2 flex justify-between items-center mt-8">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="px-6 py-3 rounded-xl hover:shadow-md transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to CV Upload
        </Button>
        
        <Button
          onClick={handleContinue}
          disabled={!coverLetter.trim()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          Continue to Send
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CoverLetterStep;
