
import { Card } from "@/components/ui/card";
import { Droplets, Wind, Gauge } from "lucide-react";
import { motion } from "framer-motion";

interface WeatherMetricsProps {
  humidity: number;
  windSpeed: number;
  pressure: number;
}

const WeatherMetrics = ({ humidity, windSpeed, pressure }: WeatherMetricsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
    >
      <motion.div whileHover={{ scale: 1.05 }} className="transform transition-all duration-300">
        <Card className="p-4 backdrop-blur-lg bg-gradient-to-br from-blue-50/50 to-blue-100/50 hover:from-blue-50/60 hover:to-blue-100/60 transition-all duration-300 border border-white/50 shadow-lg hover:shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100">
              <Droplets className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="text-xl font-semibold text-blue-600">{humidity}%</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} className="transform transition-all duration-300">
        <Card className="p-4 backdrop-blur-lg bg-gradient-to-br from-purple-50/50 to-purple-100/50 hover:from-purple-50/60 hover:to-purple-100/60 transition-all duration-300 border border-white/50 shadow-lg hover:shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-purple-100">
              <Wind className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Wind Speed</p>
              <p className="text-xl font-semibold text-purple-600">{windSpeed} km/h</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} className="transform transition-all duration-300">
        <Card className="p-4 backdrop-blur-lg bg-gradient-to-br from-indigo-50/50 to-indigo-100/50 hover:from-indigo-50/60 hover:to-indigo-100/60 transition-all duration-300 border border-white/50 shadow-lg hover:shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-indigo-100">
              <Gauge className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pressure</p>
              <p className="text-xl font-semibold text-indigo-600">{pressure} hPa</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default WeatherMetrics;
