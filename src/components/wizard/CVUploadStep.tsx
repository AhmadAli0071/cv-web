
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, X, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { WizardData } from "../StepWizard";

interface CVUploadStepProps {
  data: WizardData;
  updateData: (data: Partial<WizardData>) => void;
  onNext: () => void;
}

const CVUploadStep = ({ data, updateData, onNext }: CVUploadStepProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = useCallback((file: File) => {
    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      updateData({ cv: file });
      setIsUploading(false);
      toast({
        title: "CV Uploaded Successfully! 🎉",
        description: `${file.name} has been uploaded and is ready to use.`,
      });
    }, 1500);
  }, [updateData]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const removeFile = () => {
    updateData({ cv: undefined });
  };

  return (
    <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
          Upload Your CV
        </CardTitle>
        <p className="text-gray-600 text-lg">
          Let's start by uploading your resume in PDF format
        </p>
      </CardHeader>
      
      <CardContent className="p-8">
        {!data.cv ? (
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              isDragOver
                ? "border-blue-400 bg-blue-50 scale-105"
                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              id="cv-upload"
              disabled={isUploading}
            />
            
            <label htmlFor="cv-upload" className="cursor-pointer block">
              {isUploading ? (
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                  <p className="text-blue-600 text-lg font-medium">Uploading your CV...</p>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Drag and drop your CV here
                  </h3>
                  <p className="text-gray-600 mb-4">
                    or click to browse your files
                  </p>
                  <p className="text-sm text-gray-500">
                    PDF files only, up to 10MB
                  </p>
                </>
              )}
            </label>
          </div>
        ) : (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-green-800 mb-2">
              CV Uploaded Successfully!
            </h3>
            
            <div className="bg-white rounded-xl p-4 mb-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-6 h-6 text-green-600 mr-3" />
                  <div className="text-left">
                    <h4 className="font-medium text-gray-900">{data.cv.name}</h4>
                    <p className="text-sm text-gray-500">
                      {(data.cv.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeFile}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-green-700">
              Your CV is ready! Let's move to the next step.
            </p>
          </div>
        )}

        {data.cv && (
          <div className="flex justify-center mt-8">
            <Button
              onClick={onNext}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              size="lg"
            >
              Continue to Cover Letter
              <CheckCircle className="ml-2 w-5 h-5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CVUploadStep;
