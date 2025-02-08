
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
      <Card className="p-4 backdrop-blur-lg bg-white/30 hover:bg-white/40 transition-all duration-300">
        <div className="flex items-center gap-3">
          <Droplets className="w-6 h-6 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">Humidity</p>
            <p className="text-xl font-semibold">{humidity}%</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 backdrop-blur-lg bg-white/30 hover:bg-white/40 transition-all duration-300">
        <div className="flex items-center gap-3">
          <Wind className="w-6 h-6 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Wind Speed</p>
            <p className="text-xl font-semibold">{windSpeed} km/h</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 backdrop-blur-lg bg-white/30 hover:bg-white/40 transition-all duration-300">
        <div className="flex items-center gap-3">
          <Gauge className="w-6 h-6 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">Pressure</p>
            <p className="text-xl font-semibold">{pressure} hPa</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default WeatherMetrics;
