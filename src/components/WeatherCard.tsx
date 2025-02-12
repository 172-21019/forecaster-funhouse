
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
      whileHover={{ scale: 1.02 }}
    >
      <Card className="p-6 backdrop-blur-lg bg-gradient-to-br from-white/40 to-white/20 hover:from-white/50 hover:to-white/30 transition-all duration-300 border border-white/50 shadow-lg hover:shadow-xl rounded-xl">
        <div className="flex justify-between items-start">
          <div>
            <motion.h3 
              className="text-2xl font-semibold mb-1 bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {location}
            </motion.h3>
            <p className="text-sm text-gray-600">{time}</p>
          </div>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 rounded-full bg-white/30 backdrop-blur-sm"
          >
            {getWeatherIcon()}
          </motion.div>
        </div>
        <div className="mt-4">
          <motion.p 
            className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {temperature}°C
          </motion.p>
          <p className="text-lg text-gray-700 capitalize mt-2">{condition}</p>
        </div>
      </Card>
    </motion.div>
  );
};

export default WeatherCard;
