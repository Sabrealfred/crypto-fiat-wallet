
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Wallet, Briefcase, ArrowRight, Code } from "lucide-react";

export default function CommercialPortal() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="h-14 w-14 rounded-lg bg-blue-600 flex items-center justify-center">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-blue-900 dark:text-blue-100">
            Datacloud AI
          </h1>
          <p className="text-lg text-blue-700 dark:text-blue-300 max-w-2xl mx-auto">
            Enterprise financial intelligence platform for modern treasury management
          </p>
        </header>

        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {/* Personal Wallet */}
          <Card 
            className={`cursor-pointer transition-all duration-300 border-2 ${
              hoveredCard === 'wallet' ? 'border-blue-500 shadow-lg transform scale-105' : 'border-transparent'
            }`}
            onMouseEnter={() => setHoveredCard('wallet')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleNavigate('/wallet')}
          >
            <CardContent className="p-8 text-center">
              <div className="bg-blue-100 dark:bg-blue-900 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet className="h-8 w-8 text-blue-600 dark:text-blue-300" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Personal Banking</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Manage your personal finances, payments, and investments
              </p>
              <Button 
                variant="outline" 
                className="mt-4 group"
                onClick={() => handleNavigate('/wallet')}
              >
                Access Wallet
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Business */}
          <Card 
            className={`cursor-pointer transition-all duration-300 border-2 ${
              hoveredCard === 'business' ? 'border-blue-500 shadow-lg transform scale-105' : 'border-transparent'
            }`}
            onMouseEnter={() => setHoveredCard('business')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleNavigate('/business/dashboard')}
          >
            <CardContent className="p-8 text-center">
              <div className="bg-blue-100 dark:bg-blue-900 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-8 w-8 text-blue-600 dark:text-blue-300" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Business Banking</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Tools for small to medium businesses and their financial operations
              </p>
              <Button 
                variant="outline" 
                className="mt-4 group"
                onClick={() => handleNavigate('/business/dashboard')}
              >
                Business Portal
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Commercial */}
          <Card 
            className={`cursor-pointer transition-all duration-300 border-2 ${
              hoveredCard === 'commercial' ? 'border-blue-500 shadow-lg transform scale-105' : 'border-transparent bg-blue-50 dark:bg-blue-900/20'
            }`}
            onMouseEnter={() => setHoveredCard('commercial')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleNavigate('/commercial/dashboard')}
          >
            <CardContent className="p-8 text-center">
              <div className="bg-blue-200 dark:bg-blue-800 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-8 w-8 text-blue-700 dark:text-blue-200" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Commercial Banking</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Advanced treasury, payment, and financial intelligence for enterprises
              </p>
              <Button 
                className="mt-4 group bg-blue-600 hover:bg-blue-700"
                onClick={() => handleNavigate('/commercial/dashboard')}
              >
                Enterprise Portal
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Developers */}
          <Card 
            className={`cursor-pointer transition-all duration-300 border-2 ${
              hoveredCard === 'developers' ? 'border-blue-500 shadow-lg transform scale-105' : 'border-transparent'
            }`}
            onMouseEnter={() => setHoveredCard('developers')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleNavigate('/developer/dashboard')}
          >
            <CardContent className="p-8 text-center">
              <div className="bg-purple-100 dark:bg-purple-900 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="h-8 w-8 text-purple-600 dark:text-purple-300" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Developers</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                API access, documentation, and integration tools for developers
              </p>
              <Button 
                variant="outline" 
                className="mt-4 group border-purple-200 text-purple-700 hover:bg-purple-50"
                onClick={() => handleNavigate('/developer/dashboard')}
              >
                Developer Portal
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold mb-8 text-blue-900 dark:text-blue-100">Enterprise Financial Intelligence</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Multi-Bank Data</h3>
              <p className="text-gray-500 dark:text-gray-400">Aggregate financial data across all your banking partners</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">AI-Powered Insights</h3>
              <p className="text-gray-500 dark:text-gray-400">Leverage machine learning for forecasting and analysis</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">ERP Integration</h3>
              <p className="text-gray-500 dark:text-gray-400">Seamless connections to NetSuite, FloQast, and more</p>
            </div>
          </div>
        </div>

        <footer className="mt-24 text-center text-gray-500 dark:text-gray-400">
          <p>© 2024 Datacloud AI. Enterprise financial intelligence platform.</p>
        </footer>
      </div>
    </div>
  );
}
