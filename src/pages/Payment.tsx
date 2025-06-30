
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  CheckCircle, 
  AlertTriangle, 
  Copy, 
  Phone, 
  Building,
  Mail,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

const Payment = () => {
  const [paymentStatus, setPaymentStatus] = useState("pending"); // pending, verified, rejected

  const paymentInfo = {
    amount: "30,000 RWF",
    currency: "RWF",
    description: "Fluxify Internship Program Fee",
    dueDate: "2024-01-10"
  };

  const paymentMethods = [
    {
      type: "MTN Mobile Money",
      icon: <Phone className="h-5 w-5" />,
      details: {
        number: "+250 788 123 456",
        name: "Fluxify Ltd"
      },
      instructions: [
        "Dial *182*7*1#",
        "Enter the phone number: +250 788 123 456",
        "Enter amount: 30000",
        "Confirm transaction with your PIN",
        "Save the transaction ID"
      ]
    },
    {
      type: "Bank Transfer",
      icon: <Building className="h-5 w-5" />,
      details: {
        accountName: "Fluxify Ltd",
        accountNumber: "000123456789",
        bank: "Bank of Kigali",
        swift: "BKRWRWRW"
      },
      instructions: [
        "Visit your bank or use mobile banking",
        "Transfer to account: 000123456789",
        "Bank: Bank of Kigali",
        "Amount: 30,000 RWF",
        "Reference: Your Full Name + Internship Fee"
      ]
    }
  ];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handlePaymentClaim = () => {
    toast.success("Payment verification request sent! We'll review and confirm within 24 hours.");
    // In real app, this would send email to infofluxify@gmail.com
    console.log("Payment claim email sent for verification");
  };

  const getStatusDisplay = () => {
    switch (paymentStatus) {
      case "verified":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle className="h-4 w-4" />,
          text: "Payment Verified"
        };
      case "rejected":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <AlertTriangle className="h-4 w-4" />,
          text: "Payment Rejected"
        };
      default:
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: <AlertTriangle className="h-4 w-4" />,
          text: "Payment Pending"
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Payment Center</h1>
              <p className="text-sm text-gray-500">
                Manage your internship program payment
              </p>
            </div>
            <Badge className={statusDisplay.color}>
              {statusDisplay.icon}
              <span className="ml-1">{statusDisplay.text}</span>
            </Badge>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 space-y-6">
          {/* Payment Summary */}
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Payment Summary</span>
                  </CardTitle>
                  <CardDescription>Fluxify Internship Program Fee</CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{paymentInfo.amount}</div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Due: {new Date(paymentInfo.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-900 mb-2">What's Included:</h4>
                <ul className="space-y-1 text-sm text-purple-800">
                  <li>• 8-week structured internship program</li>
                  <li>• Weekly mentorship sessions</li>
                  <li>• Hands-on project assignments</li>
                  <li>• Certificate upon completion</li>
                  <li>• Career guidance and support</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment Status Card */}
          {paymentStatus === "pending" && (
            <Card className="border-l-4 border-l-yellow-500 bg-yellow-50/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-yellow-800">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Payment Required</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-yellow-700">
                  Your payment is currently pending. Please complete the payment using one of the methods below, 
                  then click "I Have Paid" to notify our team for verification.
                </p>
                <Button 
                  onClick={handlePaymentClaim}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  I Have Paid
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Payment Methods */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {paymentMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {method.icon}
                    <span>{method.type}</span>
                  </CardTitle>
                  <CardDescription>
                    Pay securely using {method.type.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Payment Details */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    {method.type === "MTN Mobile Money" ? (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Phone Number:</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-medium">{method.details.number}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(method.details.number!, "Phone number")}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Account Name:</span>
                          <span className="font-medium">{method.details.name}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Account Name:</span>
                          <span className="font-medium">{method.details.accountName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Account Number:</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono font-medium">{method.details.accountNumber}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(method.details.accountNumber!, "Account number")}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Bank:</span>
                          <span className="font-medium">{method.details.bank}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Instructions */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Payment Instructions:</h4>
                    <ol className="space-y-1 text-sm text-gray-600">
                      {method.instructions.map((instruction, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="bg-purple-100 text-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Help Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Need Help?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  If you encounter any issues with your payment or need assistance, please don't hesitate to contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>Email: info@fluxify.com</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>Phone: +250 788 123 456</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Payment;
