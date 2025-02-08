
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ApiKeyFormProps {
  onSubmit: (apiKey: string) => void;
}

const ApiKeyForm = ({ onSubmit }: ApiKeyFormProps) => {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100"
    >
      <div className="max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Enter OpenWeather API Key</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter your API key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="backdrop-blur-lg bg-white/30"
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
          <p className="text-sm text-gray-600 text-center">
            Get your API key from{" "}
            <a
              href="https://openweathermap.org/api"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              OpenWeather
            </a>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default ApiKeyForm;
