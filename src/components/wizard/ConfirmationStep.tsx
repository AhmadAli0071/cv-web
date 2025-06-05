
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Send, CheckCircle, Mail, Sparkles, Heart, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { WizardData } from "../StepWizard";

interface ConfirmationStepProps {
  data: WizardData;
  onPrevious: () => void;
}

const ConfirmationStep = ({ data, onPrevious }: ConfirmationStepProps) => {
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dailyJobs, setDailyJobs] = useState(false);
  const [weeklyTips, setWeeklyTips] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSend = async () => {
    if (!agreeTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    
    // Simulate sending
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      toast({
        title: "Application Sent Successfully! 🎉",
        description: "Your application has been sent to the employer. Good luck!",
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-blue-50">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Application Sent Successfully! 🎉
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              Your application has been sent to{" "}
              <span className="font-medium text-blue-600">{data.recipientEmail}</span>.
              Good luck with your job application!
            </p>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: Heart,
                  title: "Personalized",
                  description: "AI-crafted for this specific role",
                  color: "text-red-500"
                },
                {
                  icon: Sparkles,
                  title: "Professional",
                  description: "Industry-standard formatting",
                  color: "text-purple-500"
                },
                {
                  icon: Trophy,
                  title: "Optimized",
                  description: "Higher chance of getting noticed",
                  color: "text-yellow-500"
                }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <benefit.icon className={`w-8 h-8 ${benefit.color} mx-auto mb-2`} />
                  <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Link to="/dashboard">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  Create Another Application
                </Button>
              </Link>
              
              <Link to="/">
                <Button variant="outline" className="w-full py-3 rounded-xl hover:shadow-md transition-all">
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Application Review */}
      <div className="lg:col-span-2">
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-bold text-gray-900">
              <Mail className="w-6 h-6 mr-3 text-blue-600" />
              Final Review
            </CardTitle>
            <p className="text-gray-600">
              Review your application details before sending
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Email Preview */}
            <div className="bg-gray-50 rounded-xl p-6 border">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">To:</p>
                    <p className="font-medium text-gray-900">{data.recipientEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Attachments:</p>
                    <p className="text-sm text-blue-600">CV + Cover Letter</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Subject:</p>
                  <p className="font-medium text-gray-900">{data.subject}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-2">Message:</p>
                  <div className="bg-white rounded-lg p-4 border max-h-32 overflow-y-auto">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {data.emailBody}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Email Preferences</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="daily-jobs"
                    checked={dailyJobs}
                    onCheckedChange={(checked) => setDailyJobs(checked === true)}
                  />
                  <label htmlFor="daily-jobs" className="text-sm text-gray-700">
                    Send me daily job recommendations
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="weekly-tips"
                    checked={weeklyTips}
                    onCheckedChange={(checked) => setWeeklyTips(checked === true)}
                  />
                  <label htmlFor="weekly-tips" className="text-sm text-gray-700">
                    Send me weekly career tips and advice
                  </label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="agree-terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked === true)}
                  />
                  <label htmlFor="agree-terms" className="text-sm text-gray-700">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                      Terms of Service
                    </a>
                    {" "}and{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Panel */}
      <div className="space-y-6">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900">
              Ready to Send!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm">
              Your application package includes:
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Professional CV ({data.cv?.name})</span>
              </div>
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Personalized cover letter</span>
              </div>
              <div className="flex items-center text-green-600 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Professional email message</span>
              </div>
            </div>
            
            <Button
              onClick={handleSend}
              disabled={isSending || !agreeTerms}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              size="lg"
            >
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending Application...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Send Application
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-yellow-900">
              💡 Pro Tip
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-yellow-800">
            <p>
              Applications sent on Tuesday through Thursday typically have higher response rates. 
              Follow up within 1-2 weeks if you don't hear back!
            </p>
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
          Back to Email Details
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
