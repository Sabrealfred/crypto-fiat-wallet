
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Shield, 
  Globe, 
  Zap, 
  ChevronRight, 
  Star, 
  ArrowRight, 
  Building, 
  LineChart, 
  Lock, 
  TrendingUp,
  Calculator
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    navigate("/");
  };

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
            <Button variant="ghost" className="text-white hover:text-blue-300">Soluciones</Button>
            <Button variant="ghost" className="text-white hover:text-blue-300">Casos de Éxito</Button>
            <Button variant="ghost" className="text-white hover:text-blue-300">Contacto</Button>
            <Button 
              onClick={handleLogin}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-20 bg-cover bg-center"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121228]/80 to-[#121228]"></div>
        
        <div className="container relative mx-auto px-4 py-32 sm:py-40 flex flex-col items-center text-center">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs rounded-full bg-blue-900/30 text-blue-300 border-blue-700 animate-fade-in">
            Revolucionando la Gestión de Tesorería
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 text-transparent bg-clip-text">
            Revoluciona la gestión de tesorería con DataCloud AI
          </h1>
          
          <p className="text-lg md:text-xl mb-8 max-w-3xl text-blue-100/80">
            Soluciones integrales para centralizar tu liquidez, optimizar inversiones y mitigar riesgos
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button onClick={handleLogin} className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-105">
              Solicitar Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="text-lg px-8 py-6 bg-white/5 hover:bg-white/10 text-white border-white/20 rounded-xl transition-all duration-300">
              Contáctanos
            </Button>
          </div>
          
          <div className="mt-24 w-full max-w-5xl mx-auto relative">
            <div className="absolute -top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <div className="glassmorphism rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-white/10 transform perspective">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
                alt="DataCloud AI Dashboard"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 rounded-full text-white text-sm">
              Dashboard Interactivo
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden" id="features">
        <div className="absolute inset-0 bg-gradient-to-b from-[#121228] to-[#0a101e]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-xs rounded-full bg-purple-900/30 text-purple-300 border-purple-700">
              Características Avanzadas
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Soluciones de vanguardia para profesionales financieros</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Nuestras herramientas revolucionan la forma en que gestionas los recursos financieros de tu organización
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {/* Card 1 */}
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-900/30">
                    <BarChart3 className="h-6 w-6 text-blue-300" />
                  </div>
                  <CardTitle>Gestión de Liquidez y FX</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Control integral de flujos financieros
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <span>Monitoreo en tiempo real de posiciones de efectivo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <span>Conciliación automatizada con IA avanzada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <span>Forecasting predictivo para optimizar recursos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 2 */}
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-900/30">
                    <LineChart className="h-6 w-6 text-purple-300" />
                  </div>
                  <CardTitle>Inversiones y Reporting</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Análisis avanzado y visualización de datos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Dashboards personalizados para cada perfil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Reportes exportables en múltiples formatos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                    <span>Herramientas de análisis predictivo y backtesting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Card 3 */}
            <Card className="bg-black/40 backdrop-blur-lg border-white/10 overflow-hidden group hover:border-green-500/50 transition-all duration-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-900/30">
                    <Lock className="h-6 w-6 text-green-300" />
                  </div>
                  <CardTitle>Integraciones y Seguridad</CardTitle>
                </div>
                <CardDescription className="text-gray-400">
                  Conexiones robustas y protección avanzada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    <span>Conectores API robustos para múltiples plataformas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    <span>Autenticación 2FA y verificación KYC completa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                    <span>Cumplimiento normativo con estándares globales</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a101e] to-[#0a0f1c]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-xs rounded-full bg-cyan-900/30 text-cyan-300 border-cyan-700">
              Proceso Simplificado
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Cómo Funciona</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Una experiencia fluida e intuitiva para transformar tu gestión financiera
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-24 left-0 w-full h-1 bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-cyan-500/50"></div>
            
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center z-10">
                <span className="text-white font-bold">1</span>
              </div>
              <div className="pt-16 text-center md:text-left">
                <h3 className="text-xl font-bold mb-3 text-white">Conecta tus cuentas</h3>
                <p className="text-gray-400">
                  Integra tus bancos, ERPs y sistemas financieros a través de nuestras APIs seguras y automatizadas.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative mt-8 md:mt-0">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center z-10">
                <span className="text-white font-bold">2</span>
              </div>
              <div className="pt-16 text-center md:text-left">
                <h3 className="text-xl font-bold mb-3 text-white">Centraliza tu liquidez</h3>
                <p className="text-gray-400">
                  Obtén visibilidad completa de tus fondos y posiciones en tiempo real con dashboards personalizados.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative mt-8 md:mt-0">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center z-10">
                <span className="text-white font-bold">3</span>
              </div>
              <div className="pt-16 text-center md:text-left">
                <h3 className="text-xl font-bold mb-3 text-white">Analiza y toma decisiones</h3>
                <p className="text-gray-400">
                  Aprovecha nuestros modelos de IA para optimizar la gestión de efectivo y mitigar riesgos financieros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1c] to-[#0a0a18]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-xs rounded-full bg-amber-900/30 text-amber-300 border-amber-700">
              Casos de Éxito
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transformando organizaciones</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Conoce cómo nuestros clientes han optimizado su operación financiera
            </p>
          </div>

          <Tabs defaultValue="manufacturing" className="w-full">
            <TabsList className="w-full flex justify-center space-x-2 mb-8 bg-transparent">
              <TabsTrigger value="manufacturing" className="px-6 py-3 data-[state=active]:bg-blue-600">
                Manufactura
              </TabsTrigger>
              <TabsTrigger value="private-equity" className="px-6 py-3 data-[state=active]:bg-blue-600">
                Private Equity
              </TabsTrigger>
              <TabsTrigger value="fintech" className="px-6 py-3 data-[state=active]:bg-blue-600">
                Fintech
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="manufacturing" className="mt-6">
              <Card className="bg-black/40 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-900/50 to-blue-700/30">
                      <Building className="h-8 w-8 text-blue-300" />
                    </div>
                    <div>
                      <CardTitle>Multinacional de Manufactura</CardTitle>
                      <CardDescription className="text-gray-400">
                        Optimización de tesorería en 12 países
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300">
                    Una empresa manufacturera con operaciones en 12 países logró centralizar su gestión de efectivo, reducir costos de transacción y mejorar la visibilidad de su liquidez global.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-900/30">
                      <div className="text-2xl font-bold text-blue-300 mb-1">42%</div>
                      <div className="text-sm text-gray-400">Reducción de costos de transacción</div>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-900/30">
                      <div className="text-2xl font-bold text-blue-300 mb-1">3.2M</div>
                      <div className="text-sm text-gray-400">Ahorro anual en operaciones FX</div>
                    </div>
                    <div className="p-4 rounded-xl bg-blue-900/20 border border-blue-900/30">
                      <div className="text-2xl font-bold text-blue-300 mb-1">89%</div>
                      <div className="text-sm text-gray-400">Mejora en precisión de forecasting</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="private-equity" className="mt-6">
              <Card className="bg-black/40 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-900/50 to-purple-700/30">
                      <Calculator className="h-8 w-8 text-purple-300" />
                    </div>
                    <div>
                      <CardTitle>Firma de Private Equity</CardTitle>
                      <CardDescription className="text-gray-400">
                        Gestión de portafolio con 24 empresas
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300">
                    Una firma de private equity implementó nuestra solución para monitorear el desempeño financiero de sus 24 empresas en cartera, optimizando la asignación de capital.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-purple-900/20 border border-purple-900/30">
                      <div className="text-2xl font-bold text-purple-300 mb-1">56%</div>
                      <div className="text-sm text-gray-400">Mejora en rentabilidad de inversiones</div>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-900/20 border border-purple-900/30">
                      <div className="text-2xl font-bold text-purple-300 mb-1">18x</div>
                      <div className="text-sm text-gray-400">Reducción en tiempo de reporting</div>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-900/20 border border-purple-900/30">
                      <div className="text-2xl font-bold text-purple-300 mb-1">4.8M</div>
                      <div className="text-sm text-gray-400">Optimización de capital de trabajo</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="fintech" className="mt-6">
              <Card className="bg-black/40 backdrop-blur-lg border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-green-900/50 to-green-700/30">
                      <Zap className="h-8 w-8 text-green-300" />
                    </div>
                    <div>
                      <CardTitle>Fintech Startup</CardTitle>
                      <CardDescription className="text-gray-400">
                        Escalabilidad y compliance internacional
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300">
                    Una fintech en rápido crecimiento utilizó nuestra plataforma para escalar sus operaciones a 8 nuevos mercados, manteniendo compliance y optimizando procesos.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-green-900/20 border border-green-900/30">
                      <div className="text-2xl font-bold text-green-300 mb-1">320%</div>
                      <div className="text-sm text-gray-400">Crecimiento en volumen de transacciones</div>
                    </div>
                    <div className="p-4 rounded-xl bg-green-900/20 border border-green-900/30">
                      <div className="text-2xl font-bold text-green-300 mb-1">99.99%</div>
                      <div className="text-sm text-gray-400">Uptime en procesamiento de pagos</div>
                    </div>
                    <div className="p-4 rounded-xl bg-green-900/20 border border-green-900/30">
                      <div className="text-2xl font-bold text-green-300 mb-1">8</div>
                      <div className="text-sm text-gray-400">Nuevos mercados en 6 meses</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 text-center">
            <Button variant="outline" className="bg-white/5 hover:bg-white/10 border-white/20 text-white">
              Ver todos los casos <ArrowRight className="ml-2 h-4 w-4" />
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforma tu gestión financiera con la innovación de DataCloud AI</h2>
              <p className="text-lg text-gray-300">
                Solicita una demo personalizada y descubre cómo podemos optimizar tus operaciones de tesorería
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                onClick={handleLogin}
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl"
              >
                Solicitar Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="text-lg px-8 py-6 bg-white/5 hover:bg-white/10 text-white border-white/20 rounded-xl">
                Contáctanos
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-gray-300 text-sm">Seguridad avanzada</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-400" />
                <span className="text-gray-300 text-sm">Soporte 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300 text-sm">Cobertura global</span>
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
                Soluciones integrales de Treasury Management potenciadas por inteligencia artificial
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
              <h4 className="text-white font-semibold mb-4">Soluciones</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Treasury Management</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cash Management</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Gestión de Riesgos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Inversiones</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Operaciones FX</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sobre Nosotros</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Casos de Éxito</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Prensa</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Carreras</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contacto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Términos de Servicio</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cumplimiento</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Seguridad</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} DataCloud AI. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Fixed floating gradient orbs for futuristic effect */}
      <div className="fixed top-1/4 right-10 w-64 h-64 bg-blue-500/20 rounded-full filter blur-[100px] animate-pulse"></div>
      <div className="fixed bottom-1/3 left-10 w-80 h-80 bg-purple-500/20 rounded-full filter blur-[100px] animate-pulse"></div>
    </div>
  );
}
