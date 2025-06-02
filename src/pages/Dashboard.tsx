
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload, FileCheck, Zap, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: "John_Doe_CV.pdf", uploadDate: "2024-01-15" },
    { id: 2, name: "Software_Engineer_CV.pdf", uploadDate: "2024-01-10" }
  ]);
  const [jobDescription, setJobDescription] = useState("");
  const [selectedCV, setSelectedCV] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const newFile = {
        id: uploadedFiles.length + 1,
        name: file.name,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setUploadedFiles([...uploadedFiles, newFile]);
      toast({
        title: "CV Uploaded Successfully",
        description: `${file.name} has been uploaded and is ready to use.`,
      });
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateCoverLetter = () => {
    if (!selectedCV || !jobDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a CV and enter a job description.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      navigate("/cover-letter");
    }, 3000);
  };

  const handleLogout = () => {
    navigate("/");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">CV Kick</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome back, John!</span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-gray-600">Manage your CVs and generate personalized cover letters</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* CV Management */}
          <div className="space-y-6">
            {/* Upload CV */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload CV
                </CardTitle>
                <CardDescription>
                  Upload your CV in PDF format to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to upload your CV</p>
                    <p className="text-sm text-gray-500">PDF files only, up to 10MB</p>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded CVs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileCheck className="w-5 h-5 mr-2" />
                  Your CVs
                </CardTitle>
                <CardDescription>
                  Select a CV to use for your application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCV === file.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setSelectedCV(file.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{file.name}</h4>
                        <p className="text-sm text-gray-500">Uploaded: {file.uploadDate}</p>
                      </div>
                      <FileText className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Job Description & Generate */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
                <CardDescription>
                  Paste the job description to generate a personalized cover letter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Generate Cover Letter
                </CardTitle>
                <CardDescription>
                  AI will create a personalized cover letter based on your CV and the job description
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleGenerateCoverLetter}
                  disabled={isGenerating || !selectedCV || !jobDescription.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Cover Letter...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate Cover Letter
                    </>
                  )}
                </Button>
                {(!selectedCV || !jobDescription.trim()) && (
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Please select a CV and enter a job description
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
