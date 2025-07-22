import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { 
  Cloud, 
  Users, 
  TrendingUp, 
  Target, 
  Handshake, 
  Mail, 
  MapPin, 
  MessageCircle,
  ChevronDown,
  ArrowRight,
  NotebookPen,
  Menu,
  X
} from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setMobileMenuOpen(false);
  };

  return (
    <div className="font-inter text-pure-black">
      {/* Navigation - 60% Neutral, 30% Hunter Green, 10% Emerald */}
      <nav className="fixed top-0 left-0 right-0 bg-pure-white/95 backdrop-blur-sm shadow-lg z-50 border-b border-lightgrey/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-hunter rounded-lg flex items-center justify-center shadow-sm">
                <div className="w-4 h-4 border-2 border-pure-white transform rotate-45"></div>
              </div>
              <span className="font-montserrat font-bold text-2xl text-hunter lowercase">cubiq</span>
            </div>
            
            {/* Center Navigation - Desktop */}
            <div className="hidden lg:flex items-center space-x-1 bg-lightgrey/40 rounded-full px-2 py-2 shadow-sm">
              <button 
                onClick={() => scrollToSection('hero')}
                className="px-6 py-3 text-pure-black hover:text-hunter hover:bg-pure-white/90 rounded-full transition-all duration-200 font-medium"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="px-6 py-3 text-pure-black hover:text-hunter hover:bg-pure-white/90 rounded-full transition-all duration-200 font-medium"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="px-6 py-3 text-pure-black hover:text-hunter hover:bg-pure-white/90 rounded-full transition-all duration-200 font-medium"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 text-pure-black hover:text-hunter hover:bg-pure-white/90 rounded-full transition-all duration-200 font-medium"
              >
                Contact
              </button>
            </div>

            {/* Right Side Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button 
                variant="outline"
                className="border-2 border-lightgrey text-pure-black hover:border-hunter hover:text-hunter bg-pure-white backdrop-blur-sm rounded-full px-6 py-2 font-medium transition-all duration-200 shadow-sm"
              >
                Log In
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-emerald text-pure-white hover:bg-emerald/80 rounded-full px-6 py-2 font-medium transition-all duration-200 shadow-md"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-pure-black hover:text-hunter transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden pb-6 border-t border-lightgrey/50 mt-4">
              <div className="flex flex-col space-y-2 pt-4">
                <button 
                  onClick={() => scrollToSection('hero')}
                  className="text-left px-4 py-3 text-pure-black hover:text-hunter hover:bg-lightgrey/40 rounded-lg transition-all duration-200 font-medium"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-left px-4 py-3 text-pure-black hover:text-hunter hover:bg-lightgrey/40 rounded-lg transition-all duration-200 font-medium"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-left px-4 py-3 text-pure-black hover:text-hunter hover:bg-lightgrey/40 rounded-lg transition-all duration-200 font-medium"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-left px-4 py-3 text-pure-black hover:text-hunter hover:bg-lightgrey/40 rounded-lg transition-all duration-200 font-medium"
                >
                  Contact
                </button>
                
                {/* Mobile Auth Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-lightgrey/50">
                  <Button 
                    variant="outline"
                    className="border-2 border-lightgrey text-pure-black hover:border-hunter hover:text-hunter bg-pure-white rounded-full font-medium transition-all duration-200"
                  >
                    Log In
                  </Button>
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className="bg-emerald text-pure-white hover:bg-emerald/80 rounded-full font-medium transition-all duration-200"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - 60% Neutral whites/greys, 30% Hunter Green, 10% Emerald accent */}
      <section id="hero" className="min-h-screen pt-20 flex items-center bg-pure-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-hunter">
                  Clarity. Trust. <span className="text-emerald">Expertise.</span>
                </h1>
                <p className="text-lg md:text-xl text-black/80 leading-relaxed max-w-lg">
                  Boutique financial solutions for entrepreneurs, professionals & families.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-emerald text-pure-white font-montserrat font-medium hover:bg-emerald/80 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl px-8 py-4 text-base rounded-full"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => scrollToSection('services')}
                  variant="outline"
                  className="border-2 border-hunter text-hunter font-montserrat font-medium hover:bg-hunter hover:text-pure-white bg-pure-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl px-8 py-4 text-base rounded-full"
                >
                  Explore Services
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" 
                alt="Modern professional workspace with clean geometric design" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              
              {/* Decorative geometric elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-khaki/20 rounded-lg transform rotate-12"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-hunter/20 rounded-lg transform -rotate-12"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Light grey background with hunter green headers */}
      <section id="about" className="py-20 bg-lightgrey/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-hunter mb-4">About CUBIQ</h2>
            <div className="w-24 h-1 bg-emerald mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Founders & Company Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-playfair text-2xl text-hunter">Our Story</h3>
                <p className="text-black/80 leading-relaxed">
                  CUBIQ is a boutique accounting firm based in Paarl, founded by Cameron Clarke and Jaime Cupido. 
                  With a passion for clarity and connection, we help clients grow confidently with modern, 
                  relationship-driven financial support.
                </p>
              </div>

              {/* Founders placeholder */}
              <div className="flex space-x-6">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                  alt="Cameron Clarke, Co-founder" 
                  className="w-16 h-16 rounded-full object-cover border-3 border-emerald shadow-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                  alt="Jaime Cupido, Co-founder" 
                  className="w-16 h-16 rounded-full object-cover border-3 border-emerald shadow-lg"
                />
                <div className="space-y-1">
                  <p className="font-montserrat font-medium text-hunter">Cameron Clarke & Jaime Cupido</p>
                  <p className="text-sm text-black/70">Co-founders</p>
                </div>
              </div>
            </div>

            {/* Right: Mission & Values */}
            <div className="space-y-8">
              <Card className="shadow-xl bg-pure-white border-0">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-hunter/10 rounded-xl flex items-center justify-center">
                      <Target className="text-hunter h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-xl text-hunter mb-2">Our Mission</h4>
                      <p className="text-black/80 leading-relaxed">
                        To simplify financial management for clients and creatives through proactive service, 
                        cloud-based systems, and tailored insights.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl bg-pure-white border-0">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center">
                      <Handshake className="text-emerald h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-xl text-hunter mb-2">Our Promise</h4>
                      <p className="text-black/80 leading-relaxed">
                        For entrepreneurs, investors, and families, CUBIQ is the trusted partner that turns 
                        financial complexity into clarity — because your business deserves more than just balance sheets.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Pure white background with hunter green headers */}
      <section id="services" className="py-20 bg-pure-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-hunter mb-4">
              Tailored Services. Measurable Impact.
            </h2>
            <div className="w-24 h-1 bg-emerald mx-auto mb-6"></div>
            <p className="text-xl text-black/70 max-w-2xl mx-auto leading-relaxed">
              We provide comprehensive financial solutions designed to help your business thrive in today's dynamic environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cloud-Based Accounting Card */}
            <Card className="shadow-xl border-0 bg-pure-white hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-hunter/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald/20 transition-colors duration-300">
                  <Cloud className="text-hunter group-hover:text-emerald h-8 w-8 transition-colors duration-300" />
                </div>
                <h3 className="font-montserrat font-semibold text-xl text-hunter mb-4">Cloud-Based Accounting</h3>
                <p className="text-black/80 leading-relaxed">
                  Access your numbers anytime, anywhere — secure, smart, and up-to-date.
                </p>
              </CardContent>
            </Card>

            {/* Financial Partnerships Card */}
            <Card className="shadow-xl border-0 bg-pure-white hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-hunter/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald/20 transition-colors duration-300">
                  <Users className="text-hunter group-hover:text-emerald h-8 w-8 transition-colors duration-300" />
                </div>
                <h3 className="font-montserrat font-semibold text-xl text-hunter mb-4">Financial Partnerships</h3>
                <p className="text-black/80 leading-relaxed">
                  More than accountants — we work alongside you with expert advice and insight.
                </p>
              </CardContent>
            </Card>

            {/* Strategic Tax Services Card */}
            <Card className="shadow-xl border-0 bg-pure-white hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-hunter/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald/20 transition-colors duration-300">
                  <TrendingUp className="text-hunter group-hover:text-emerald h-8 w-8 transition-colors duration-300" />
                </div>
                <h3 className="font-montserrat font-semibold text-xl text-hunter mb-4">Strategic Tax Services</h3>
                <p className="text-black/80 leading-relaxed">
                  Optimized tax planning for your personal and business needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section - Light grey background */}
      <section id="contact" className="py-20 bg-lightgrey/40 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-8">
          <div className="absolute top-20 left-20 w-8 h-8 bg-hunter transform rotate-45"></div>
          <div className="absolute top-40 right-32 w-6 h-6 bg-emerald transform rotate-45"></div>
          <div className="absolute bottom-32 left-40 w-4 h-4 bg-hunter transform rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-8 h-8 bg-emerald transform rotate-45"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-hunter mb-4">Let's Connect</h2>
            <div className="w-24 h-1 bg-emerald mx-auto mb-6"></div>
            <p className="text-xl text-black/70 leading-relaxed">Ready to transform your financial management? Get in touch today.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="shadow-xl border-0 bg-pure-white">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-pure-black mb-2">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-lightgrey rounded-xl focus:ring-2 focus:ring-emerald focus:border-emerald transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-pure-black mb-2">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-lightgrey rounded-xl focus:ring-2 focus:ring-emerald focus:border-emerald transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-pure-black mb-2">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 border border-lightgrey rounded-xl focus:ring-2 focus:ring-emerald focus:border-emerald transition-all duration-200 resize-none"
                      placeholder="Tell us about your financial needs..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-emerald text-pure-white font-montserrat font-medium py-4 px-6 rounded-full hover:bg-emerald/80 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                    <NotebookPen className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-xl border-0 bg-pure-white">
                <CardContent className="p-8">
                  <h3 className="font-montserrat font-semibold text-xl text-hunter mb-6">Get in Touch</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center">
                        <Mail className="text-emerald h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-pure-black">Email</p>
                        <a href="mailto:hello@cubiq.co.za" className="text-emerald hover:text-emerald/80 transition-colors font-medium">
                          hello@cubiq.co.za
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-hunter/10 rounded-xl flex items-center justify-center">
                        <MapPin className="text-hunter h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-pure-black">Location</p>
                        <p className="text-black/70">Paarl, Western Cape</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-emerald/10 rounded-xl flex items-center justify-center">
                        <MessageCircle className="text-emerald h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-pure-black">WhatsApp</p>
                        <p className="text-black/70">Available for quick queries</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="Modern professional office with clean design and natural lighting" 
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Hunter Green background with white text */}
      <footer className="bg-hunter text-pure-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 bg-emerald rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-pure-white transform rotate-45"></div>
              </div>
              <div className="font-montserrat font-bold text-2xl lowercase">cubiq</div>
            </div>
            <div className="w-24 h-0.5 bg-emerald mx-auto"></div>
            <p className="text-pure-white/80">© 2025 CUBIQ. All rights reserved.</p>
            <div className="flex justify-center space-x-8 text-sm">
              <a href="#" className="text-pure-white/70 hover:text-emerald transition-colors duration-200">Terms & Privacy</a>
              <span className="text-pure-white/40">|</span>
              <a href="#" className="text-pure-white/70 hover:text-emerald transition-colors duration-200">Built by Red Cape Intel</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
