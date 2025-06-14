"use client";

import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  FileText,
  Shield,
  Star,
  Zap,
} from "lucide-react";
import Button from "../components/common/Button";
import GlassCard from "../components/common/GlassCard";
import Header from "../components/layout/Header";

const Home = ({ onNavigate }) => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-400" />,
      title: "Lightning Fast Testing",
      description:
        "Upload your OpenAPI spec and run comprehensive tests in seconds with our optimized testing engine.",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "Security First",
      description:
        "Built-in security testing with support for API keys, OAuth, Bearer tokens, and custom authentication.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-purple-400" />,
      title: "Beautiful Analytics",
      description:
        "Comprehensive dashboards with interactive charts, confusion matrices, and performance metrics.",
    },
    {
      icon: <FileText className="w-8 h-8 text-orange-400" />,
      title: "Professional Reports",
      description:
        "Generate stunning PDF reports with detailed analysis and recommendations for your team.",
    },
  ];

  const benefits = [
    "Automated test case generation from OpenAPI specs",
    "Real-time test execution with live progress tracking",
    "Comprehensive security configuration support",
    "Interactive result visualizations and analytics",
    "Professional PDF report generation",
    "Session history and test management",
  ];

  return (
    <div className="min-h-screen aurora-bg">
      <Header onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Professional
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                API Testing
              </span>
              <br />
              Made Simple
            </h1>
            <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed">
              Upload your OpenAPI specification and run comprehensive test
              suites with beautiful visualizations, security testing, and
              professional reporting - all in one elegant platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => onNavigate("tool")}>
                <Button size="xl" className="group">
                  Start Testing Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </button>
              <button onClick={() => onNavigate("signup")}>
                <Button variant="secondary" size="xl">
                  Create Account
                </Button>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need for API Testing
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to
              test, validate, and document your APIs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <GlassCard
                key={index}
                className="text-center slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-white/70">
                Built by developers, for developers. Experience the difference.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button onClick={() => onNavigate("tool")}>
                <Button size="lg" className="group">
                  Try It Free
                  <Star className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </Button>
              </button>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">AT</span>
            </div>
            <span className="text-lg font-semibold text-white">API Tester</span>
          </div>
          <p className="text-white/50 text-sm">
            © 2024 API Testing Engine. Built with React and modern web
            technologies.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
