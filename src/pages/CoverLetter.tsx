
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Edit, Check, ArrowLeft, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const CoverLetter = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [coverLetter, setCoverLetter] = useState(`Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at your company. With my background in full-stack development and passion for creating innovative solutions, I am excited about the opportunity to contribute to your team.

In my previous role as a Software Developer, I successfully led the development of several web applications using React, Node.js, and Python. My experience includes:

• Developing responsive web applications that increased user engagement by 40%
• Implementing automated testing procedures that reduced bugs by 60%
• Collaborating with cross-functional teams to deliver projects on time and within budget
• Mentoring junior developers and contributing to code reviews

What particularly excites me about this role is your company's commitment to innovation and user-centric design. Your recent project on sustainable technology solutions aligns perfectly with my values and technical expertise.

I am confident that my technical skills, combined with my passion for problem-solving and continuous learning, make me an ideal candidate for this position. I would welcome the opportunity to discuss how I can contribute to your team's success.

Thank you for considering my application. I look forward to hearing from you.

Best regards,
John Doe`);

  const navigate = useNavigate();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Cover Letter Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleProceed = () => {
    navigate("/submission");
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
            <Link to="/dashboard">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Cover Letter</h2>
          <p className="text-gray-600">Review and edit your AI-generated cover letter before submitting</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cover Letter Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Generated Cover Letter
                  </CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center"
                  >
                    {isEditing ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    ) : (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <Textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      className="min-h-[500px] resize-none font-mono text-sm"
                    />
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                        <Check className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                      {coverLetter}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Cover Letter
                </Button>
                
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleProceed}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Proceed to Submit
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800">✓ Strong opening statement</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800">✓ Relevant experience highlighted</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-blue-800">💡 Consider adding specific metrics</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800">✓ Professional closing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Details</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">CV:</span>
                  <span className="font-medium">John_Doe_CV.pdf</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Position:</span>
                  <span className="font-medium">Software Engineer</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Generated:</span>
                  <span className="font-medium">Just now</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoverLetter;
