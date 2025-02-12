
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import cities from "@/data/cities";

interface SearchLocationProps {
  onSearch: (location: string) => void;
}

const SearchLocation = ({ onSearch }: SearchLocationProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const getSimilarCities = (input: string) => {
    if (!input.trim()) return [];
    
    const normalizedInput = input.toLowerCase();
    return cities
      .filter(city => {
        const normalizedCity = city.toLowerCase();
        // Check if the city starts with the input or contains similar characters
        return normalizedCity.includes(normalizedInput) ||
          normalizedCity.length >= 3 &&
          normalizedInput.length >= 3 &&
          (normalizedCity.includes(normalizedInput.slice(0, -1)) || // Remove last character
           normalizedCity.includes(normalizedInput.slice(1))); // Remove first character
      })
      .slice(0, 5); // Limit to 5 suggestions
  };

  useEffect(() => {
    const suggestions = getSimilarCities(searchQuery);
    setSuggestions(suggestions);
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setSearchQuery(city);
    onSearch(city);
    setSuggestions([]);
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="backdrop-blur-lg bg-white/30 border-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400 transition-all duration-300 placeholder:text-gray-500"
          />
          <Button 
            type="submit" 
            variant="outline" 
            className="backdrop-blur-lg bg-white/30 hover:bg-white/40 border border-white/50 transition-all duration-300"
          >
            <Search className="w-4 h-4" />
          </Button>
        </form>

        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute w-full mt-2 z-50"
          >
            <Card className="p-2 backdrop-blur-lg bg-white/90 border border-white/50 shadow-lg">
              {suggestions.map((city, index) => (
                <motion.button
                  key={city}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 rounded-md transition-colors"
                  onClick={() => handleSuggestionClick(city)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  {city}
                </motion.button>
              ))}
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SearchLocation;
