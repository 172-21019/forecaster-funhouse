
import { Card } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";
import { motion } from "framer-motion";

interface WeatherCardProps {
  temperature: number;
  condition: string;
  location: string;
  time: string;
}

const WeatherCard = ({ temperature, condition, location, time }: WeatherCardProps) => {
  const getWeatherIcon = () => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="w-12 h-12 text-weather-sunny" />;
      case "rainy":
        return <CloudRain className="w-12 h-12 text-weather-rainy" />;
      case "cloudy":
        return <Cloud className="w-12 h-12 text-weather-cloudy" />;
      default:
        return <Wind className="w-12 h-12 text-weather-default" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 backdrop-blur-lg bg-white/30 hover:bg-white/40 transition-all duration-300">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-semibold mb-1">{location}</h3>
            <p className="text-sm text-gray-600">{time}</p>
          </div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {getWeatherIcon()}
          </motion.div>
        </div>
        <div className="mt-4">
          <p className="text-4xl font-bold">{temperature}°C</p>
          <p className="text-lg text-gray-700 capitalize">{condition}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default WeatherCard;
