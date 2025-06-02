
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Mail, FileText, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { WizardData } from "../StepWizard";

interface SendApplicationStepProps {
  data: WizardData;
  updateData: (data: Partial<WizardData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const SendApplicationStep = ({ data, updateData, onNext, onPrevious }: SendApplicationStepProps) => {
  const [recipientEmail, setRecipientEmail] = useState(data.recipientEmail || "");
  const [subject, setSubject] = useState(data.subject || "Job Application - [Your Name]");
  const [emailBody, setEmailBody] = useState(data.emailBody || `Dear Hiring Manager,

I am writing to express my interest in the position at your company. Please find my CV and cover letter attached for your review.

I am excited about the opportunity to contribute to your team and would welcome the chance to discuss my qualifications further.

Thank you for your consideration.

Best regards,
[Your Name]`);

  const handleContinue = () => {
    if (!recipientEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter the recipient's email address.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipientEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    updateData({
      recipientEmail,
      subject,
      emailBody
    });
    
    onNext();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Email Form */}
      <div className="lg:col-span-2">
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
              <Mail className="w-6 h-6 mr-3 text-blue-600" />
              Email Details
            </CardTitle>
            <p className="text-gray-600">
              Compose your email to send the application
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-gray-700 font-medium">
                Recipient Email *
              </Label>
              <Input
                id="recipient"
                type="email"
                placeholder="hr@company.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="py-3 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-gray-700 font-medium">
                Subject Line
              </Label>
              <Input
                id="subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="py-3 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body" className="text-gray-700 font-medium">
                Email Body
              </Label>
              <Textarea
                id="body"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="min-h-[200px] resize-none rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Summary */}
      <div className="space-y-6">
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              Application Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">CV Ready</p>
                <p className="text-sm text-green-600 truncate">
                  {data.cv?.name || "CV uploaded"}
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-800">Cover Letter Ready</p>
                <p className="text-sm text-green-600">
                  {data.coverLetter ? `${data.coverLetter.substring(0, 50)}...` : "Generated"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-blue-900">
              Pre-Send Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>CV is current and complete</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Cover letter personalized</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Email is professional</span>
              </div>
              <div className="flex items-center text-blue-600">
                <div className="w-4 h-4 border-2 border-blue-600 rounded mr-2"></div>
                <span>Recipient email verified</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-purple-900">
              Success Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-purple-800">
            <ul className="space-y-2">
              <li>• Double-check the recipient's email</li>
              <li>• Mention the specific position</li>
              <li>• Follow up in 1-2 weeks</li>
              <li>• Keep your email concise</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="lg:col-span-3 flex justify-between items-center mt-8">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="px-6 py-3 rounded-xl hover:shadow-md transition-all"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cover Letter
        </Button>
        
        <Button
          onClick={handleContinue}
          disabled={!recipientEmail.trim()}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          Review & Send
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default SendApplicationStep;
