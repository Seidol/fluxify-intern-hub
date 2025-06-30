
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  CheckSquare, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SidebarProps {
  className?: string;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "My Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Payment", href: "/payment", icon: CreditCard },
  { name: "Help Center", href: "/help", icon: HelpCircle },
];

export const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const SidebarContent = () => (
    <>
      <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
        <div className="flex items-center justify-center w-10 h-10 bg-gradient-fluxify rounded-xl shadow-lg">
          <span className="text-lg font-bold text-white">F</span>
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Fluxify</h2>
          <p className="text-sm text-gray-500">Intern Portal</p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-gray-50",
                isActive
                  ? "bg-gradient-fluxify text-white shadow-lg"
                  : "text-gray-700 hover:text-gray-900"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white/90 backdrop-blur-sm border-gray-200"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile sidebar */}
      <div className={cn(
        "lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <SidebarContent />
      </div>

      {/* Desktop sidebar */}
      <div className={cn("hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200", className)}>
        <SidebarContent />
      </div>
    </>
  );
};
