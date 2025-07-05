import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import HealthCheck from "./HealthCheck";
import AdminPanel from "./AdminPanel";
import ContactForm from "./Contact/ContactForm";
import { Code, TestTube, Database, Settings } from "lucide-react";

const ApiDemo = () => {
  const [activeTab, setActiveTab] = useState("health");

  const codeExamples = {
    contact: `// Contact Form Integration
import { submitContactForm } from "../api";

const handleSubmit = async (formData) => {
  try {
    const response = await submitContactForm(formData);
    console.log('Contact form submitted:', response);
  } catch (error) {
    console.error('Error:', error);
  }
};`,
    getStarted: `// Get Started Form Integration
import { submitGetStartedForm } from "../api";

const handleSubmit = async (formData) => {
  try {
    const response = await submitGetStartedForm(formData);
    console.log('Get started form submitted:', response);
  } catch (error) {
    console.error('Error:', error);
  }
};`,
    bookCall: `// Book Call Integration  
import { submitBookCallForm } from "../api";

const handleSubmit = async (bookingData) => {
  try {
    const response = await submitBookCallForm(bookingData);
    console.log('Call booked:', response);
  } catch (error) {
    console.error('Error:', error);
  }
};`,
    health: `// Health Check Integration
import { checkHealth } from "../api";

const checkApiHealth = async () => {
  try {
    const health = await checkHealth();
    console.log('API Health:', health);
  } catch (error) {
    console.error('Health check failed:', error);
  }
};`,
    admin: `// Admin Panel Integration
import { getAdminSubmissions } from "../api";

const fetchSubmissions = async () => {
  try {
    const data = await getAdminSubmissions();
    console.log('Submissions:', data);
  } catch (error) {
    console.error('Error fetching submissions:', error);
  }
};`,
  };

  const endpointInfo = [
    {
      method: "GET",
      endpoint: "/api/health",
      description: "Health check endpoint",
      example: "checkHealth()",
    },
    {
      method: "POST",
      endpoint: "/api/contact",
      description: "Submit contact form",
      example: "submitContactForm(formData)",
    },
    {
      method: "POST",
      endpoint: "/api/get-started",
      description: "Submit get started form",
      example: "submitGetStartedForm(formData)",
    },
    {
      method: "POST",
      endpoint: "/api/book-call",
      description: "Book a discovery call",
      example: "submitBookCallForm(bookingData)",
    },
    {
      method: "GET",
      endpoint: "/api/admin/submissions",
      description: "Get all submissions (admin)",
      example: "getAdminSubmissions()",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-light text-white mb-4">
          API Integration Demo
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          This demo shows how the frontend components integrate with the backend
          API endpoints. Test the connections and view the implementation
          examples.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-gray-900 border border-gray-800">
          <TabsTrigger value="health" className="flex items-center gap-2">
            <TestTube size={16} />
            Health
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Code size={16} />
            Contact
          </TabsTrigger>
          <TabsTrigger value="forms" className="flex items-center gap-2">
            <Settings size={16} />
            Forms
          </TabsTrigger>
          <TabsTrigger value="admin" className="flex items-center gap-2">
            <Database size={16} />
            Admin
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex items-center gap-2">
            <Code size={16} />
            Docs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-light text-white mb-4">
                API Health Status
              </h3>
              <HealthCheck showDetails={true} />
            </div>
            <div>
              <h3 className="text-lg font-light text-white mb-4">
                Code Example
              </h3>
              <pre className="bg-gray-900 border border-gray-800 p-4 rounded-lg text-sm text-gray-300 overflow-auto">
                {codeExamples.health}
              </pre>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-light text-white mb-4">
                Contact Form
              </h3>
              <div className="bg-gray-900 border border-gray-800 p-6 rounded-lg">
                <ContactForm
                  onSubmit={(data) => console.log("Form submitted:", data)}
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-light text-white mb-4">
                Integration Code
              </h3>
              <pre className="bg-gray-900 border border-gray-800 p-4 rounded-lg text-sm text-gray-300 overflow-auto">
                {codeExamples.contact}
              </pre>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forms" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-light text-white mb-4">
                Get Started Form
              </h3>
              <pre className="bg-gray-900 border border-gray-800 p-4 rounded-lg text-sm text-gray-300 overflow-auto">
                {codeExamples.getStarted}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-light text-white mb-4">
                Book Call Form
              </h3>
              <pre className="bg-gray-900 border border-gray-800 p-4 rounded-lg text-sm text-gray-300 overflow-auto">
                {codeExamples.bookCall}
              </pre>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="admin" className="space-y-6">
          <AdminPanel />
        </TabsContent>

        <TabsContent value="docs" className="space-y-6">
          <div>
            <h3 className="text-lg font-light text-white mb-4">
              API Endpoints
            </h3>
            <div className="space-y-4">
              {endpointInfo.map((endpoint, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900 border border-gray-800 p-4 rounded-lg"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span
                      className={`px-2 py-1 text-xs rounded font-mono ${
                        endpoint.method === "GET"
                          ? "bg-green-900 text-green-300"
                          : "bg-blue-900 text-blue-300"
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <code className="text-gray-300">{endpoint.endpoint}</code>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">
                    {endpoint.description}
                  </p>
                  <code className="text-xs text-gray-500">
                    {endpoint.example}
                  </code>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-light text-white mb-4">
              Environment Setup
            </h3>
            <div className="bg-gray-900 border border-gray-800 p-4 rounded-lg">
              <p className="text-gray-400 mb-2">
                Create a <code className="text-gray-300">.env</code> file in
                your client directory:
              </p>
              <pre className="bg-gray-800 p-3 rounded text-sm text-gray-300">
                VITE_API_URL=http://localhost:5000
              </pre>
              <p className="text-gray-400 text-sm mt-2">
                Update the URL to match your server deployment.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiDemo;
