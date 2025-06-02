
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import CVUploadStep from "./wizard/CVUploadStep";
import CoverLetterStep from "./wizard/CoverLetterStep";
import SendApplicationStep from "./wizard/SendApplicationStep";
import ConfirmationStep from "./wizard/ConfirmationStep";

export interface WizardData {
  cv?: File;
  jobDescription?: string;
  coverLetter?: string;
  recipientEmail?: string;
  subject?: string;
  emailBody?: string;
}

const StepWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<WizardData>({});
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    { number: 1, title: "Upload CV", description: "Upload your resume" },
    { number: 2, title: "Cover Letter", description: "Generate or write your cover letter" },
    { number: 3, title: "Send Application", description: "Enter recipient details" },
    { number: 4, title: "Confirmation", description: "Review and send" }
  ];

  const updateWizardData = (data: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CVUploadStep
            data={wizardData}
            updateData={updateWizardData}
            onNext={goToNextStep}
          />
        );
      case 2:
        return (
          <CoverLetterStep
            data={wizardData}
            updateData={updateWizardData}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
          />
        );
      case 3:
        return (
          <SendApplicationStep
            data={wizardData}
            updateData={updateWizardData}
            onNext={goToNextStep}
            onPrevious={goToPreviousStep}
          />
        );
      case 4:
        return (
          <ConfirmationStep
            data={wizardData}
            onPrevious={goToPreviousStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-center text-2xl font-bold text-gray-900">
              Application Wizard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                        currentStep === step.number
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110"
                          : completedSteps.includes(step.number)
                          ? "bg-green-500 text-white shadow-md"
                          : "bg-gray-200 text-gray-600"
                      )}
                    >
                      {completedSteps.includes(step.number) ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <div className="text-center mt-2">
                      <div className={cn(
                        "text-sm font-medium transition-colors",
                        currentStep === step.number ? "text-blue-600" : "text-gray-600"
                      )}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-500 hidden sm:block">
                        {step.description}
                      </div>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "flex-1 h-1 mx-4 rounded-full transition-all duration-300",
                      completedSteps.includes(step.number) ? "bg-green-500" : "bg-gray-200"
                    )} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <div className="animate-fade-in">
          {renderStepContent()}
        </div>
      </div>
    </div>
  );
};

export default StepWizard;
