
import { useState, useEffect } from "react";
import WeatherCard from "@/components/WeatherCard";
import SearchLocation from "@/components/SearchLocation";
import WeatherMetrics from "@/components/WeatherMetrics";
import { getWeatherByCity, getForecast, WeatherData } from "@/services/weatherService";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async (city: string) => {
    try {
      setLoading(true);
      const data = await getWeatherByCity(city);
      const forecast = await getForecast(city);
      setWeatherData({ ...data, forecast });
      toast({
        title: "Weather Updated",
        description: `Latest weather data for ${city} has been loaded.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData("London");
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent shadow-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 p-6 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto max-w-4xl"
      >
        <motion.h1 
          className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          Weather Forecast
        </motion.h1>
        
        <SearchLocation onSearch={fetchWeatherData} />

        {weatherData && (
          <motion.div 
            className="mt-8 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <WeatherCard
              temperature={weatherData.temperature}
              condition={weatherData.condition}
              location={weatherData.location}
              time={new Date().toLocaleTimeString()}
            />

            <WeatherMetrics
              humidity={weatherData.humidity}
              windSpeed={weatherData.windSpeed}
              pressure={weatherData.pressure}
            />

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">5-Day Forecast</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <motion.div
                    key={day.date}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="transform transition-all duration-300"
                  >
                    <Card className="p-4 backdrop-blur-lg bg-white/30 hover:bg-white/40 transition-all duration-300 border border-white/50 shadow-lg hover:shadow-xl">
                      <p className="text-sm text-gray-600">{day.date}</p>
                      <p className="text-xl font-semibold">{day.temperature}°C</p>
                      <p className="text-sm capitalize">{day.condition}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Index;
