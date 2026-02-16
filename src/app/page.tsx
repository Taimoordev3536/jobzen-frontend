import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Briefcase, 
  Users, 
  Clock, 
  Shield,
  CheckCircle,
  Zap,
  Star
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Jobzen
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-10">
              <Link href="#features" className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors">
                How it Works
              </Link>
              <Link href="#pricing" className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors">
                Pricing
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-base font-medium">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/30 text-base px-6">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50 text-blue-600 text-base font-semibold mb-8 border border-blue-100">
            <Zap className="h-4 w-4" />
            <span>Modern Workforce Management</span>
          </div>
          <h1 className="display-text text-6xl md:text-7xl lg:text-8xl mb-8 text-gray-900 tracking-tight leading-tight">
            Manage <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Your Workforce</span><br />with Ease
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect employers, workers, and clients in one powerful platform.<br className="hidden sm:block" /> 
            Streamline job assignments, track progress, and scale your business<br className="hidden sm:block" /> effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-2xl shadow-indigo-500/40 text-lg px-8 py-6 h-auto">
                Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#demo">
              <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-gray-400 text-gray-900 text-lg px-8 py-6 h-auto bg-white hover:bg-gray-50">
                Watch Demo
              </Button>
            </Link>
          </div>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 text-base text-gray-600">
            <div className="flex items-center gap-2.5">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">No credit card required</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">14-day free trial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white border-y border-gray-100">
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {[
              { label: "Active Users", value: "50K+", icon: Users },
              { label: "Jobs Completed", value: "1M+", icon: CheckCircle },
              { label: "Companies", value: "500+", icon: Briefcase },
              { label: "Avg. Rating", value: "4.9", icon: Star },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">Everything You Need</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Powerful features designed to make workforce management simple and efficient
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              icon: Users,
              title: "Smart Matching",
              description: "AI-powered worker assignment based on skills, availability, and location",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: Clock,
              title: "Real-time Tracking",
              description: "Monitor job progress, worker location, and time tracking in real-time",
              color: "from-purple-500 to-purple-600",
            },
            {
              icon: Shield,
              title: "Secure Payments",
              description: "Integrated payment processing with automatic invoicing and commission tracking",
              color: "from-green-500 to-green-600",
            },
            {
              icon: Briefcase,
              title: "Job Management",
              description: "Create, assign, and track jobs with ease. Schedule recurring tasks automatically",
              color: "from-orange-500 to-orange-600",
            },
            {
              icon: CheckCircle,
              title: "Quality Assurance",
              description: "Built-in rating and review system with service guarantees and checklists",
              color: "from-pink-500 to-pink-600",
            },
            {
              icon: Zap,
              title: "Analytics Dashboard",
              description: "Comprehensive insights into performance, revenue, and business metrics",
              color: "from-indigo-500 to-indigo-600",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-10 rounded-3xl bg-white border border-gray-200 hover:border-indigo-200 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg`}>
                <feature.icon className="h-9 w-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700">
        <div className="container mx-auto px-6 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">Ready to Get Started?</h2>
            <p className="text-xl md:text-2xl mb-12 text-indigo-100 leading-relaxed">
              Join thousands of companies already using Jobzen to manage their workforce
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-50 shadow-2xl text-lg px-10 py-7 h-auto font-semibold">
                Start Your Free Trial <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">Jobzen</span>
              </div>
              <p className="text-base text-gray-600 leading-relaxed">
                Modern workforce management platform for the future of work.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-gray-900 text-lg">Product</h4>
              <ul className="space-y-3 text-base text-gray-600">
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Security</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-gray-900 text-lg">Company</h4>
              <ul className="space-y-3 text-base text-gray-600">
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-gray-900 text-lg">Support</h4>
              <ul className="space-y-3 text-base text-gray-600">
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 transition-colors">Status</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-gray-200 text-center text-base text-gray-600">
            <p className="font-medium">&copy; 2026 Jobzen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
