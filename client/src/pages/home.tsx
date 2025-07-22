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
    <div className="font-inter text-blackolive">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-lightgrey z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-montserrat font-bold text-2xl text-hunter">CUBIQ</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-blackolive hover:text-hunter transition-colors duration-200"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-blackolive hover:text-hunter transition-colors duration-200"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-blackolive hover:text-hunter transition-colors duration-200"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-blackolive"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-lightgrey">
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-blackolive hover:text-hunter transition-colors duration-200 text-left"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-blackolive hover:text-hunter transition-colors duration-200 text-left"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-blackolive hover:text-hunter transition-colors duration-200 text-left"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen pt-16 flex items-center bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-hunter">
                  Clarity. Trust. <span className="text-khaki">Expertise.</span>
                </h1>
                <p className="text-lg md:text-xl text-blackolive/80 leading-relaxed max-w-lg">
                  Boutique financial solutions for entrepreneurs, professionals & families.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-hunter text-white font-montserrat font-medium hover:bg-hunter/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg px-8 py-4 text-base"
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={() => scrollToSection('services')}
                  variant="outline"
                  className="border-2 border-khaki text-khaki font-montserrat font-medium hover:bg-khaki hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg px-8 py-4 text-base"
                >
                  Explore Services
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
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

      {/* About Section */}
      <section id="about" className="py-20 bg-lightgrey/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-hunter mb-4">About CUBIQ</h2>
            <div className="w-24 h-1 bg-khaki mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Founders & Company Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-playfair text-2xl text-hunter">Our Story</h3>
                <p className="text-blackolive/80 leading-relaxed">
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
                  className="w-16 h-16 rounded-full object-cover border-2 border-khaki"
                />
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b9e65c20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=150&h=150" 
                  alt="Jaime Cupido, Co-founder" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-khaki"
                />
                <div className="space-y-1">
                  <p className="font-montserrat font-medium text-hunter">Cameron Clarke & Jaime Cupido</p>
                  <p className="text-sm text-blackolive/70">Co-founders</p>
                </div>
              </div>
            </div>

            {/* Right: Mission & Values */}
            <div className="space-y-8">
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-hunter/10 rounded-lg flex items-center justify-center">
                      <Target className="text-hunter h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-xl text-hunter mb-2">Our Mission</h4>
                      <p className="text-blackolive/80">
                        To simplify financial management for clients and creatives through proactive service, 
                        cloud-based systems, and tailored insights.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-khaki/10 rounded-lg flex items-center justify-center">
                      <Handshake className="text-khaki h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold text-xl text-hunter mb-2">Our Promise</h4>
                      <p className="text-blackolive/80">
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

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-hunter mb-4">
              Tailored Services. Measurable Impact.
            </h2>
            <div className="w-24 h-1 bg-khaki mx-auto mb-6"></div>
            <p className="text-xl text-blackolive/70 max-w-2xl mx-auto">
              We provide comprehensive financial solutions designed to help your business thrive in today's dynamic environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Cloud-Based Accounting Card */}
            <Card className="shadow-lg border border-lightgrey hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-hunter/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-hunter/20 transition-colors duration-300">
                  <Cloud className="text-hunter h-8 w-8" />
                </div>
                <h3 className="font-montserrat font-semibold text-xl text-hunter mb-4">Cloud-Based Accounting</h3>
                <p className="text-blackolive/80 leading-relaxed">
                  Access your numbers anytime, anywhere — secure, smart, and up-to-date.
                </p>
              </CardContent>
            </Card>

            {/* Financial Partnerships Card */}
            <Card className="shadow-lg border border-lightgrey hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-khaki/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-khaki/20 transition-colors duration-300">
                  <Users className="text-khaki h-8 w-8" />
                </div>
                <h3 className="font-montserrat font-semibold text-xl text-hunter mb-4">Financial Partnerships</h3>
                <p className="text-blackolive/80 leading-relaxed">
                  More than accountants — we work alongside you with expert advice and insight.
                </p>
              </CardContent>
            </Card>

            {/* Strategic Tax Services Card */}
            <Card className="shadow-lg border border-lightgrey hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-hunter/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-hunter/20 transition-colors duration-300">
                  <TrendingUp className="text-hunter h-8 w-8" />
                </div>
                <h3 className="font-montserrat font-semibold text-xl text-hunter mb-4">Strategic Tax Services</h3>
                <p className="text-blackolive/80 leading-relaxed">
                  Optimized tax planning for your personal and business needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-lightgrey/30 relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-8 h-8 bg-hunter transform rotate-45"></div>
          <div className="absolute top-40 right-32 w-6 h-6 bg-khaki transform rotate-45"></div>
          <div className="absolute bottom-32 left-40 w-4 h-4 bg-hunter transform rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-8 h-8 bg-khaki transform rotate-45"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-hunter mb-4">Let's Connect</h2>
            <div className="w-24 h-1 bg-khaki mx-auto mb-6"></div>
            <p className="text-xl text-blackolive/70">Ready to transform your financial management? Get in touch today.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-blackolive mb-2">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-lightgrey rounded-lg focus:ring-2 focus:ring-hunter focus:border-transparent transition-all duration-200"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-blackolive mb-2">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-lightgrey rounded-lg focus:ring-2 focus:ring-hunter focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-blackolive mb-2">Message</Label>
                    <Textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 border border-lightgrey rounded-lg focus:ring-2 focus:ring-hunter focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Tell us about your financial needs..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-hunter text-white font-montserrat font-medium py-4 px-6 rounded-lg hover:bg-hunter/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                    <NotebookPen className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h3 className="font-montserrat font-semibold text-xl text-hunter mb-6">Get in Touch</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-hunter/10 rounded-lg flex items-center justify-center">
                        <Mail className="text-hunter h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-blackolive">Email</p>
                        <a href="mailto:hello@cubiq.co.za" className="text-hunter hover:text-hunter/80 transition-colors">
                          hello@cubiq.co.za
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-khaki/10 rounded-lg flex items-center justify-center">
                        <MapPin className="text-khaki h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-blackolive">Location</p>
                        <p className="text-blackolive/70">Paarl, Western Cape</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-hunter/10 rounded-lg flex items-center justify-center">
                        <MessageCircle className="text-hunter h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-blackolive">WhatsApp</p>
                        <p className="text-blackolive/70">Available for quick queries</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" 
                alt="Professional consultation room with modern furniture" 
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blackolive text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="font-montserrat font-bold text-2xl">CUBIQ</div>
            <div className="w-24 h-0.5 bg-khaki mx-auto"></div>
            <p className="text-white/70">© 2025 CUBIQ. All rights reserved.</p>
            <div className="flex justify-center space-x-8 text-sm">
              <a href="#" className="text-white/70 hover:text-white transition-colors">Terms & Privacy</a>
              <span className="text-white/30">|</span>
              <a href="#" className="text-white/70 hover:text-white transition-colors">Built by Red Cape Intel</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
