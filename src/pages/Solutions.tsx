
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Banknote, 
  BarChart3, 
  Building, 
  CreditCard, 
  LineChart, 
  Lock, 
  ArrowRight,
  TrendingUp,
  Shield,
  DollarSign,
  Clock,
  Globe,
  PieChart,
  Landmark,
  CloudLightning
} from "lucide-react";

export default function Solutions() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a12] via-[#121228] to-[#0a1a2a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-black/30 border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold">DataCloud AI</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/landing")}
              className="text-white hover:text-blue-300"
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/solutions")}
              className="text-blue-300 hover:text-blue-300 underline"
            >
              {t('nav.solutions')}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/success-stories")}
              className="text-white hover:text-blue-300"
            >
              {t('nav.success')}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/contact")}
              className="text-white hover:text-blue-300"
            >
              {t('nav.contact')}
            </Button>
            <LanguageSelector />
            <Button 
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {t('nav.login')}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-20 bg-cover bg-center"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121228]/80 to-[#121228]"></div>
        
        <div className="container relative mx-auto px-4 flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs rounded-full bg-blue-900/30 text-blue-300 border-blue-700 animate-fade-in">
            Enterprise-Grade Treasury Solutions
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 text-transparent bg-clip-text">
            Treasury Management Solutions
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-3xl text-blue-100/80">
            Comprehensive suite of financial tools designed for enterprise treasury operations, liquidity management, and risk mitigation
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-105">
              {t('hero.cta.demo')} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="text-lg px-8 py-6 bg-white/5 hover:bg-white/10 text-white border-white/20 rounded-xl transition-all duration-300">
              {t('hero.cta.contact')}
            </Button>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121228] to-[#0a101e]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-xs rounded-full bg-indigo-900/30 text-indigo-300 border-indigo-700">
              Comprehensive Solutions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Treasury Suite</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Our integrated platform offers powerful tools to optimize your treasury operations across multiple dimensions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Solution 1 */}
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 overflow-hidden group hover:border-blue-500/50 transition-all duration-300 perspective">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-blue-900/30">
                    <Banknote className="h-6 w-6 text-blue-300" />
                  </div>
                  <CardTitle>Cash Management</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Optimize liquidity and cash flow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Centralize treasury management with real-time visibility into global cash positions, automated reconciliation and AI-powered forecasting.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <span>Real-time cash position monitoring</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <span>Automated reconciliation processes</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <LineChart className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <span>AI-powered cash flow forecasting</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-blue-500/50 text-blue-300 hover:bg-blue-900/30">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Solution 2 */}
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 overflow-hidden group hover:border-purple-500/50 transition-all duration-300 perspective">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-purple-900/30">
                    <BarChart3 className="h-6 w-6 text-purple-300" />
                  </div>
                  <CardTitle>Risk Management</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Identify and mitigate financial risks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Comprehensive risk analysis tools for market, liquidity, credit, and operational risks with sophisticated stress testing capabilities.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Market risk assessment and hedging</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Globe className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Currency and interest rate analysis</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <LineChart className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Advanced scenario and stress testing</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-purple-500/50 text-purple-300 hover:bg-purple-900/30">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Solution 3 */}
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 overflow-hidden group hover:border-green-500/50 transition-all duration-300 perspective">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-green-900/30">
                    <LineChart className="h-6 w-6 text-green-300" />
                  </div>
                  <CardTitle>Investment Management</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Optimize investment portfolios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Sophisticated tools for managing investments, analyzing performance, and making data-driven allocation decisions.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <PieChart className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    <span>Portfolio optimization algorithms</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <DollarSign className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    <span>Yield curve analysis and modeling</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <LineChart className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    <span>Performance attribution and benchmarking</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-green-500/50 text-green-300 hover:bg-green-900/30">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Solution 4 */}
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 overflow-hidden group hover:border-amber-500/50 transition-all duration-300 perspective">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-amber-900/30">
                    <Building className="h-6 w-6 text-amber-300" />
                  </div>
                  <CardTitle>Entity Management</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Streamline corporate structures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Manage complex corporate structures, subsidiaries, and legal entities with integrated governance and compliance tools.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Building className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Multi-entity structure management</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Lock className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Regulatory compliance tracking</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Globe className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                    <span>Cross-border operation management</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-amber-500/50 text-amber-300 hover:bg-amber-900/30">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Solution 5 */}
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 overflow-hidden group hover:border-cyan-500/50 transition-all duration-300 perspective">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-cyan-900/30">
                    <CreditCard className="h-6 w-6 text-cyan-300" />
                  </div>
                  <CardTitle>Payment Processing</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Streamline payment operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  End-to-end payment processing with multi-channel support, fraud detection, and reconciliation automation.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Globe className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Cross-border payment optimization</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Real-time fraud detection and prevention</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Landmark className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>Multi-bank payment netting and pooling</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-cyan-500/50 text-cyan-300 hover:bg-cyan-900/30">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Solution 6 */}
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 overflow-hidden group hover:border-indigo-500/50 transition-all duration-300 perspective">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-violet-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-indigo-900/30">
                    <CloudLightning className="h-6 w-6 text-indigo-300" />
                  </div>
                  <CardTitle>AI & Analytics</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Data-driven financial intelligence
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Advanced analytics and AI-powered insights to optimize financial decisions, detect anomalies, and forecast trends.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <LineChart className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>Predictive cash flow modeling</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <BarChart3 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>Anomaly detection and fraud prevention</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>Market trend analysis and forecasting</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 border-indigo-500/50 text-indigo-300 hover:bg-indigo-900/30">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Integration Capabilities */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a101e] to-[#0a0a18]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-xs rounded-full bg-blue-900/30 text-blue-300 border-blue-700">
              Enterprise Integration
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Seamless Connectivity</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Our platform integrates with your existing infrastructure to provide a unified financial ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            <div className="p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 backdrop-blur-md rounded-3xl border border-white/10 hover-scale">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-purple-300 text-transparent bg-clip-text">
                Enterprise System Integration
              </h3>
              <p className="text-gray-300 mb-6">
                Connect DataCloud AI to your existing ERP, accounting, and banking systems for seamless data flow and consolidated operations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-3">
                    <Building className="h-6 w-6 text-blue-300" />
                  </div>
                  <h4 className="font-semibold mb-1">ERP Systems</h4>
                  <p className="text-xs text-gray-400">SAP, Oracle, Microsoft Dynamics</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-purple-900/30 flex items-center justify-center mb-3">
                    <Landmark className="h-6 w-6 text-purple-300" />
                  </div>
                  <h4 className="font-semibold mb-1">Banking APIs</h4>
                  <p className="text-xs text-gray-400">SWIFT, Open Banking, Direct Connections</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-900/30 flex items-center justify-center mb-3">
                    <DollarSign className="h-6 w-6 text-green-300" />
                  </div>
                  <h4 className="font-semibold mb-1">Accounting</h4>
                  <p className="text-xs text-gray-400">Quickbooks, Xero, NetSuite</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-amber-900/30 flex items-center justify-center mb-3">
                    <Lock className="h-6 w-6 text-amber-300" />
                  </div>
                  <h4 className="font-semibold mb-1">Security</h4>
                  <p className="text-xs text-gray-400">SSO, MFA, End-to-End Encryption</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-indigo-900/20 to-cyan-900/20 backdrop-blur-md rounded-3xl border border-white/10 hover-scale">
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-300 to-cyan-300 text-transparent bg-clip-text">
                Data Exchange & APIs
              </h3>
              <p className="text-gray-300 mb-6">
                Flexible API options and data exchange protocols enable real-time data flows and custom integration scenarios.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-indigo-900/30 flex items-center justify-center">
                      <CloudLightning className="h-5 w-5 text-indigo-300" />
                    </div>
                    <h4 className="font-semibold">REST & GraphQL APIs</h4>
                  </div>
                  <p className="text-sm text-gray-400">
                    Modern API architecture with comprehensive documentation, sandbox environments, and developer tools
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-blue-900/30 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-blue-300" />
                    </div>
                    <h4 className="font-semibold">Global Standards Support</h4>
                  </div>
                  <p className="text-sm text-gray-400">
                    ISO 20022, SWIFT, SEPA, and other global financial messaging standards for seamless communication
                  </p>
                </div>
                
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-cyan-900/30 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-cyan-300" />
                    </div>
                    <h4 className="font-semibold">Secure Data Exchange</h4>
                  </div>
                  <p className="text-sm text-gray-400">
                    End-to-end encryption, secure file transfer protocols, and comprehensive audit trails
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 rounded-xl text-lg">
              Request Integration Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a18] to-[#080814]"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-900/30 to-purple-900/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title')}</h2>
              <p className="text-lg text-gray-300">
                {t('cta.subtitle')}
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate("/")}
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
              >
                {t('cta.demo')} <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="text-lg px-8 py-6 bg-white/5 hover:bg-white/10 text-white border-white/20 rounded-xl">
                {t('cta.contact')}
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-gray-300 text-sm">{t('cta.security')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-400" />
                <span className="text-gray-300 text-sm">{t('cta.support')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">{t('cta.global')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">DataCloud AI</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {t('footer.solutions.treasury')} potenciadas por inteligencia artificial
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">{t('footer.solutions')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.solutions.treasury')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.solutions.cash')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.solutions.risk')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.solutions.investments')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.solutions.fx')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">{t('footer.company')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.company.about')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.company.cases')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.company.press')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.company.careers')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.company.contact')}</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">{t('footer.legal')}</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.legal.terms')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.legal.privacy')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.legal.compliance')}</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.legal.security')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} DataCloud AI. {t('footer.rights')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
