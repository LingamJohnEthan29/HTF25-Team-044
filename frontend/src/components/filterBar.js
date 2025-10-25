import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import CardNav from "./CardNav"; // ✅ Added CardNav import

export default function FilterBar({ onFilter, currentTab, onTabChange }) {
  const [creator, setCreator] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [sortOption, setSortOption] = useState("latest");

  const applyFilter = () => {
    onFilter({ creator, searchTitle, sortOption });
  };

  const clearFilter = () => {
    setCreator("");
    setSearchTitle("");
    setSortOption("latest");
    onFilter({ creator: "", searchTitle: "", sortOption: "latest" });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      
      {/* ✅ Navigation added above filters */}
      <CardNav 
        activeTab={currentTab} 
        onChangeTab={onTabChange} 
      />

      {/* Filter UI */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-gray-800 shadow p-4 rounded-2xl gap-3">
        <div className="flex flex-wrap gap-3 items-center">
          <Input
            placeholder="Search by title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-52"
          />

          <Input
            placeholder="Filter by creator..."
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            className="w-52"
          />

          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="alphabetical">A–Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 mt-2 sm:mt-0">
          <Button
            onClick={applyFilter}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Apply
          </Button>
          <Button variant="outline" onClick={clearFilter}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
