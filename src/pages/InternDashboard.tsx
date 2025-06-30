
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Calendar,
  Award,
  Mail
} from "lucide-react";
import { toast } from "sonner";

const InternDashboard = () => {
  const [hasPaid, setHasPaid] = useState(false);
  const [progress, setProgress] = useState(65);
  const [notifications, setNotifications] = useState(3);

  // Mock intern data
  const internData = {
    name: "Alex Johnson",
    profilePicture: "/api/placeholder/64/64",
    completedTasks: 13,
    totalTasks: 20,
    currentWeek: 3,
    totalWeeks: 8,
  };

  const recentTasks = [
    { id: 1, title: "React Component Development", status: "completed", deadline: "2024-01-15", score: 95 },
    { id: 2, title: "API Integration Project", status: "submitted", deadline: "2024-01-18", score: null },
    { id: 3, title: "Database Design Challenge", status: "pending", deadline: "2024-01-22", score: null },
    { id: 4, title: "UI/UX Mockup Creation", status: "pending", deadline: "2024-01-25", score: null },
  ];

  const handlePaymentClaim = () => {
    // Send email notification (simulate)
    toast.success("Payment verification request sent! We'll review and confirm shortly.");
    
    // Simulate email being sent to infofluxify@gmail.com
    console.log(`Payment claim email sent for: ${internData.name}`);
  };

  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => setProgress(internData.completedTasks / internData.totalTasks * 100), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src={internData.profilePicture}
                  alt={internData.name}
                  className="w-12 h-12 rounded-full border-2 border-purple-200"
                />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Welcome back, {internData.name}! 👋
                  </h1>
                  <p className="text-sm text-gray-500">
                    Week {internData.currentWeek} of {internData.totalWeeks} • {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </Button>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Task Progress</div>
                <div className="w-32">
                  <Progress value={progress} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">
                    {internData.completedTasks}/{internData.totalTasks} completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Payment Status Card - Show only if hasn't paid */}
          {!hasPaid && (
            <Card className="border-l-4 border-l-yellow-500 bg-yellow-50/50 animate-fade-in">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <CardTitle className="text-yellow-800">Payment Required</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-yellow-700">
                  You haven't paid the 30,000 RWF internship fee. Please complete your payment to access all tasks and features.
                </p>
                
                <div className="bg-white rounded-lg p-4 border border-yellow-200">
                  <h4 className="font-medium text-gray-900 mb-2">Payment Details:</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div><strong>MTN Mobile Money:</strong> +250 XXX XXX XXX</div>
                    <div><strong>Bank Account:</strong> Fluxify Ltd - Account #XXXXXXXXX</div>
                    <div><strong>Amount:</strong> 30,000 RWF</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button 
                    onClick={handlePaymentClaim}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    I Have Paid
                  </Button>
                  <p className="text-xs text-yellow-600">
                    <Mail className="w-3 h-3 inline mr-1" />
                    This will notify our team for verification
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Completed Tasks</p>
                    <p className="text-3xl font-bold">{internData.completedTasks}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-cyan-100">Current Week</p>
                    <p className="text-3xl font-bold">{internData.currentWeek}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-cyan-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Average Score</p>
                    <p className="text-3xl font-bold">95%</p>
                  </div>
                  <Award className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Progress</p>
                    <p className="text-3xl font-bold">{Math.round(progress)}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Tasks */}
          {hasPaid && (
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
                <CardDescription>Your latest assignments and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          task.status === 'completed' ? 'bg-green-500' :
                          task.status === 'submitted' ? 'bg-yellow-500' : 'bg-gray-300'
                        }`}></div>
                        <div>
                          <h4 className="font-medium text-gray-900">{task.title}</h4>
                          <p className="text-sm text-gray-500">Due: {task.deadline}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {task.score && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {task.score}%
                          </Badge>
                        )}
                        <Badge variant={
                          task.status === 'completed' ? 'default' :
                          task.status === 'submitted' ? 'secondary' : 'outline'
                        }>
                          {task.status === 'completed' ? 'Completed' :
                           task.status === 'submitted' ? 'Submitted' : 'Pending'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <CheckSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">View All Tasks</h3>
                    <p className="text-sm text-gray-500">See your complete task list and deadlines</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-cyan-100 rounded-lg">
                    <Clock className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibolf text-gray-900">Payment Status</h3>
                    <p className="text-sm text-gray-500">Check your payment and billing information</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InternDashboard;
