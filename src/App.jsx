import React from "react";
import { Globe, Shield, BarChart3, Users } from "lucide-react";

// --- START: Mocked Shadcn/ui Components for this example ---
// These are simplified versions to make the code runnable in one file.
const Card = ({ children, className }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Button = ({ children, className, variant, size, onClick }) => {
  const baseStyle =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  };
  const sizes = {
    lg: "h-11 px-8 py-2",
  };
  return (
    <button
      className={`${baseStyle} ${variants[variant] || variants.default} ${
        sizes[size] || ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// --- END: Mocked Shadcn/ui Components ---

// SpartaHR website mockup component
function SpartaHRMockup() {
  // To simulate the 'motion' component, we'll use a regular div
  // and apply the classes directly, as framer-motion is not available.
  const MotionDiv = ({ children, initial, animate, transition, className }) => (
    <div className={className}>{children}</div>
  );

  return (
    <div className="space-y-12 p-8 bg-gray-50 font-sans antialiased">
      {/* Hero Section */}
      <section className="relative text-center py-20 bg-gradient-to-r from-indigo-900 to-purple-800 text-white rounded-2xl shadow-2xl">
        <MotionDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6"
        >
          The Future of HR is Intelligent.
        </MotionDiv>
        <p className="text-lg mb-8">
          Powered by People + Data. Shielding small businesses with geolocation & diversity intelligence.
        </p>
        <Button size="lg" variant="secondary" className="rounded-full px-8 py-6 text-lg">
          Explore the Diversity Map →
        </Button>
        <div className="absolute inset-0 opacity-20 flex items-center justify-center">
          <Globe size={300} />
        </div>
      </section>

      {/* Interactive Dashboard Preview */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Interactive Diversity Dashboard</h2>
        <Card className="shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-gray-100 rounded-xl flex flex-col items-center justify-center">
                <BarChart3 className="text-indigo-600 mb-4" size={64} />
                <p className="font-semibold">Workforce Diversity Index</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-xl flex flex-col items-center justify-center">
                <Users className="text-purple-600 mb-4" size={64} />
                <p className="font-semibold">Talent Pool Hotspots</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Esri-powered mapping: Visualize diversity metrics, talent pipelines, and equity benchmarks across California.
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Live Map Mockup Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Live Diversity & Compliance Map</h2>
        <div className="relative w-full h-96 bg-gray-200 rounded-2xl shadow-xl overflow-hidden">
          {/* Mock background map image - using a placeholder for a California map */}
          <img 
            src="https://placehold.co/1200x600/e2e8f0/333333?text=California+Map+Mockup" 
            alt="Mock California map" 
            className="w-full h-full object-cover"
          />
          {/* Mock data points as "hotspots" */}
          {/* San Francisco hotspot (Talent Acquisition) */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 bg-opacity-70 animate-pulse">
            <Users className="text-white" size={32} />
          </div>
          <div className="absolute top-1/4 left-1/4 text-sm text-white font-bold bg-blue-700 rounded-full px-2 py-1 -mt-10 -ml-4">SF Hotspot</div>
          
          {/* Los Angeles hotspot (Compliance Risk) */}
          <div className="absolute bottom-1/4 right-1/4 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-red-500 bg-opacity-70 animate-pulse">
            <Shield className="text-white" size={32} />
          </div>
          <div className="absolute bottom-1/4 right-1/4 text-sm text-white font-bold bg-red-700 rounded-full px-2 py-1 -mb-10 -mr-4">LA Risk Zone</div>
          
          {/* San Diego hotspot (Compliance Risk) */}
          <div className="absolute bottom-1/4 right-1/5 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-red-500 bg-opacity-70 animate-pulse">
            <Shield className="text-white" size={32} />
          </div>
          <div className="absolute bottom-1/4 right-1/5 text-sm text-white font-bold bg-red-700 rounded-full px-2 py-1 -mb-10 -mr-4">SD Risk Zone</div>
        </div>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Real-time insights: View talent acquisition hotspots and compliance risk zones across California.
        </p>
      </section>

      {/* Membership Portal Preview */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Client Membership Portal</h2>
        <Card className="shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gray-100 rounded-xl">
                <Shield className="text-green-600 mb-4" size={48} />
                <p className="font-semibold">Compliance Dashboard</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-xl">
                <BarChart3 className="text-blue-600 mb-4" size={48} />
                <p className="font-semibold">Quarterly Reports</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-xl">
                <Users className="text-purple-600 mb-4" size={48} />
                <p className="font-semibold">Training Hub</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Secure access for members: HR dashboards, equity benchmarks, leadership training, and advisory sessions.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Services with Data Layers */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Data-Driven Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md rounded-2xl overflow-hidden">
            <CardContent className="p-6 bg-white">
              <h3 className="font-semibold text-xl mb-2">HR Compliance</h3>
              <p className="text-sm text-gray-600">
                California map overlay with lawsuit activity zones to predict compliance risks.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-2xl overflow-hidden">
            <CardContent className="p-6 bg-white">
              <h3 className="font-semibold text-xl mb-2">Talent Acquisition</h3>
              <p className="text-sm text-gray-600">
                Heatmap showing candidate availability and cultural fit across Bay Area hotspots.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

// Main App component to render the mockup
export default function App() {
  return <SpartaHRMockup />;
}

