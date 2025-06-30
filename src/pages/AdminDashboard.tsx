
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Plus, 
  Mail, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Calendar,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [newInternEmail, setNewInternEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Mock data
  const stats = {
    totalInterns: 24,
    activeInterns: 18,
    pendingPayments: 6,
    completedTasks: 156
  };

  const recentInterns = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", status: "active", paymentStatus: "verified", joinDate: "2024-01-15" },
    { id: 2, name: "Sarah Williams", email: "sarah@example.com", status: "pending", paymentStatus: "pending", joinDate: "2024-01-18" },
    { id: 3, name: "Mike Chen", email: "mike@example.com", status: "active", paymentStatus: "verified", joinDate: "2024-01-20" },
    { id: 4, name: "Emma Davis", email: "emma@example.com", status: "pending", paymentStatus: "pending", joinDate: "2024-01-22" },
  ];

  const pendingPayments = [
    { id: 1, internName: "Sarah Williams", email: "sarah@example.com", amount: "30,000 RWF", claimDate: "2024-01-23" },
    { id: 2, internName: "Emma Davis", email: "emma@example.com", amount: "30,000 RWF", claimDate: "2024-01-24" },
  ];

  const handleRegisterIntern = async () => {
    if (!newInternEmail) {
      toast.error("Please enter an email address");
      return;
    }

    if (!newInternEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsRegistering(true);
    
    // Simulate API call to register intern and send email
    setTimeout(() => {
      toast.success(`Registration email sent to ${newInternEmail}!`);
      setNewInternEmail("");
      setIsRegistering(false);
      
      // In real app, this would:
      // 1. Add intern to database
      // 2. Send email with portal access link
      console.log(`Intern registered: ${newInternEmail}`);
    }, 1000);
  };

  const handleVerifyPayment = (internName: string, email: string) => {
    toast.success(`Payment verified for ${internName}!`);
    // In real app, this would update payment status in database
    console.log(`Payment verified for ${internName} (${email})`);
  };

  const handleRejectPayment = (internName: string, email: string) => {
    toast.error(`Payment rejected for ${internName}`);
    // In real app, this would update payment status and notify intern
    console.log(`Payment rejected for ${internName} (${email})`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-fluxify rounded-xl shadow-lg">
              <span className="text-xl font-bold text-white">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Fluxify Intern Management Portal</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              Administrator
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Interns</p>
                  <p className="text-3xl font-bold">{stats.totalInterns}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Active Interns</p>
                  <p className="text-3xl font-bold">{stats.activeInterns}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Pending Payments</p>
                  <p className="text-3xl font-bold">{stats.pendingPayments}</p>
                </div>
                <DollarSign className="h-8 w-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Completed Tasks</p>
                  <p className="text-3xl font-bold">{stats.completedTasks}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Register New Intern */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Register New Intern</span>
            </CardTitle>
            <CardDescription>
              Add a new intern to the program and send them access credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="internEmail">Intern Email Address</Label>
                <Input
                  id="internEmail"
                  type="email"
                  placeholder="intern@example.com"
                  value={newInternEmail}
                  onChange={(e) => setNewInternEmail(e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleRegisterIntern}
                  disabled={isRegistering}
                  className="bg-gradient-fluxify hover:opacity-90 h-10"
                >
                  {isRegistering ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Register & Send Email</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              The intern will receive an email with instructions to access their portal and create a password.
            </p>
          </CardContent>
        </Card>

        {/* Pending Payment Requests */}
        {pendingPayments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span>Pending Payment Verifications</span>
              </CardTitle>
              <CardDescription>
                Review and verify intern payment claims
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-yellow-50">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div>
                        <h4 className="font-medium text-gray-900">{payment.internName}</h4>
                        <p className="text-sm text-gray-500">{payment.email}</p>
                        <p className="text-xs text-gray-400">Claimed on: {payment.claimDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                        {payment.amount}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-green-300 text-green-700 hover:bg-green-50"
                          onClick={() => handleVerifyPayment(payment.internName, payment.email)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verify
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-300 text-red-700 hover:bg-red-50"
                          onClick={() => handleRejectPayment(payment.internName, payment.email)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Interns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Recent Interns</span>
            </CardTitle>
            <CardDescription>
              Latest intern registrations and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInterns.map((intern) => (
                <div key={intern.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-fluxify rounded-full flex items-center justify-center text-white font-medium">
                      {intern.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{intern.name}</h4>
                      <p className="text-sm text-gray-500">{intern.email}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-400">Joined: {intern.joinDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge variant={intern.status === 'active' ? 'default' : 'secondary'}>
                      {intern.status === 'active' ? 'Active' : 'Pending'}
                    </Badge>
                    <Badge variant={intern.paymentStatus === 'verified' ? 'default' : 'outline'} 
                           className={intern.paymentStatus === 'verified' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}>
                      {intern.paymentStatus === 'verified' ? 'Paid' : 'Payment Pending'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
