
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface SearchLocationProps {
  onSearch: (location: string) => void;
}

const SearchLocation = ({ onSearch }: SearchLocationProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="backdrop-blur-lg bg-white/30 border-none focus:ring-2 focus:ring-blue-400"
        />
        <Button type="submit" variant="outline" className="backdrop-blur-lg bg-white/30">
          <Search className="w-4 h-4" />
        </Button>
      </form>
    </motion.div>
  );
};

export default SearchLocation;
