
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Calendar, 
  Clock, 
  Github, 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  ExternalLink 
} from "lucide-react";
import { toast } from "sonner";

const Tasks = () => {
  const [submissions, setSubmissions] = useState<Record<string, any>>({});

  const tasks = [
    {
      id: 1,
      week: 1,
      title: "React Fundamentals Challenge",
      description: "Create a responsive React component that displays user profiles with modern styling.",
      deadline: "2024-01-15",
      status: "completed",
      score: 95,
      requirements: [
        "Use React functional components with hooks",
        "Implement responsive design with Tailwind CSS",
        "Add proper TypeScript typing",
        "Include error handling"
      ],
      submissionType: ["github", "docs"]
    },
    {
      id: 2,
      week: 2,
      title: "API Integration Project",
      description: "Build a data dashboard that fetches and displays information from a REST API.",
      deadline: "2024-01-18",
      status: "submitted",
      score: null,
      requirements: [
        "Fetch data from provided API endpoints",
        "Implement loading and error states",
        "Create interactive data visualizations",
        "Add search and filter functionality"
      ],
      submissionType: ["github", "docs"]
    },
    {
      id: 3,
      week: 3,
      title: "Database Design Challenge",
      description: "Design and implement a database schema for an e-commerce platform.",
      deadline: "2024-01-22",
      status: "pending",
      score: null,
      requirements: [
        "Create ER diagrams",
        "Write SQL scripts for table creation",
        "Implement data relationships",
        "Add sample data and queries"
      ],
      submissionType: ["github", "docs", "file"]
    },
    {
      id: 4,
      week: 4,
      title: "UI/UX Mockup Creation",
      description: "Design a complete user interface for a mobile banking application.",
      deadline: "2024-01-25",
      status: "pending",
      score: null,
      requirements: [
        "Create wireframes and mockups",
        "Design user flow diagrams",
        "Implement accessibility guidelines",
        "Present design rationale"
      ],
      submissionType: ["docs", "file"]
    }
  ];

  const handleSubmission = (taskId: number) => {
    const submission = submissions[taskId];
    if (!submission?.github && !submission?.docs && !submission?.file) {
      toast.error("Please provide at least one submission method");
      return;
    }

    toast.success("Task submitted successfully! 🎉");
    
    // Update task status (in real app, this would be an API call)
    console.log(`Task ${taskId} submitted with:`, submission);
  };

  const updateSubmission = (taskId: number, field: string, value: string) => {
    setSubmissions(prev => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        [field]: value
      }
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'submitted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'submitted': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
              <p className="text-sm text-gray-500">
                Complete your weekly assignments and track your progress
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Current Week</div>
              <div className="text-xl font-semibold text-purple-600">Week 3</div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="space-y-6">
            <Accordion type="single" collapsible className="space-y-4">
              {tasks.map((task) => (
                <AccordionItem 
                  key={task.id} 
                  value={`task-${task.id}`}
                  className="border border-gray-200 rounded-lg bg-white shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full text-left">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                            Week {task.week}
                          </Badge>
                          <Badge className={getStatusColor(task.status)}>
                            {getStatusIcon(task.status)}
                            <span className="ml-1 capitalize">{task.status}</span>
                          </Badge>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{task.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                            </div>
                            {task.score && (
                              <div className="flex items-center space-x-1">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="font-medium text-green-600">{task.score}%</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-6">
                      {/* Task Description */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                        <p className="text-gray-600">{task.description}</p>
                      </div>

                      {/* Requirements */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                        <ul className="space-y-1">
                          {task.requirements.map((req, index) => (
                            <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Submission Area - Only show if not completed */}
                      {task.status !== 'completed' && (
                        <Card className="bg-gray-50 border-gray-200">
                          <CardHeader>
                            <CardTitle className="text-lg">Submit Your Work</CardTitle>
                            <CardDescription>
                              Provide your submission through one or more of the following methods
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* GitHub Link */}
                            {task.submissionType.includes('github') && (
                              <div className="space-y-2">
                                <Label htmlFor={`github-${task.id}`} className="flex items-center space-x-2">
                                  <Github className="h-4 w-4" />
                                  <span>GitHub Repository Link</span>
                                </Label>
                                <Input
                                  id={`github-${task.id}`}
                                  placeholder="https://github.com/username/repository"
                                  value={submissions[task.id]?.github || ''}
                                  onChange={(e) => updateSubmission(task.id, 'github', e.target.value)}
                                  className="h-10"
                                />
                              </div>
                            )}

                            {/* Google Docs Link */}
                            {task.submissionType.includes('docs') && (
                              <div className="space-y-2">
                                <Label htmlFor={`docs-${task.id}`} className="flex items-center space-x-2">
                                  <FileText className="h-4 w-4" />
                                  <span>Google Docs / Documentation Link</span>
                                </Label>
                                <Input
                                  id={`docs-${task.id}`}
                                  placeholder="https://docs.google.com/document/..."
                                  value={submissions[task.id]?.docs || ''}
                                  onChange={(e) => updateSubmission(task.id, 'docs', e.target.value)}
                                  className="h-10"
                                />
                              </div>
                            )}

                            {/* File Upload */}
                            {task.submissionType.includes('file') && (
                              <div className="space-y-2">
                                <Label htmlFor={`file-${task.id}`} className="flex items-center space-x-2">
                                  <Upload className="h-4 w-4" />
                                  <span>File Upload (PDF, DOCX)</span>
                                </Label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                                  <p className="text-sm text-gray-600 mb-2">
                                    Drag and drop your files here, or click to browse
                                  </p>
                                  <Button variant="outline" size="sm">
                                    Choose Files
                                  </Button>
                                </div>
                              </div>
                            )}

                            {/* Additional Notes */}
                            <div className="space-y-2">
                              <Label htmlFor={`notes-${task.id}`}>Additional Notes (Optional)</Label>
                              <Textarea
                                id={`notes-${task.id}`}
                                placeholder="Add any additional information about your submission..."
                                value={submissions[task.id]?.notes || ''}
                                onChange={(e) => updateSubmission(task.id, 'notes', e.target.value)}
                                className="min-h-[80px]"
                              />
                            </div>

                            <Button 
                              onClick={() => handleSubmission(task.id)}
                              className="w-full bg-gradient-fluxify hover:opacity-90 transition-all duration-200"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Submit Task
                            </Button>
                          </CardContent>
                        </Card>
                      )}

                      {/* Completed Task Info */}
                      {task.status === 'completed' && (
                        <Card className="bg-green-50 border-green-200">
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <CheckCircle className="h-6 w-6 text-green-600" />
                              <div>
                                <h4 className="font-medium text-green-800">Task Completed!</h4>
                                <p className="text-sm text-green-600">
                                  Great work! You scored {task.score}% on this assignment.
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tasks;
