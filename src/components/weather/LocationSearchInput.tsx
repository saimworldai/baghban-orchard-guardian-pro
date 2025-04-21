
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

type LocationSearchInputProps = {
  searchInput: string;
  setSearchInput: (val: string) => void;
  loading: boolean;
  onSearch: () => void;
  showMap: boolean;
  onToggleMap: () => void;
};

export function LocationSearchInput({
  searchInput,
  setSearchInput,
  loading,
  onSearch,
  showMap,
  onToggleMap,
}: LocationSearchInputProps) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Search any location..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onSearch()}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
      </div>
      <Button
        onClick={onSearch}
        className="flex items-center gap-2"
        disabled={loading}
        type="button"
      >
        {loading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-opacity-30 border-t-white"></div>
            Searching...
          </>
        ) : (
          <>
            <Search className="h-4 w-4" />
            Search
          </>
        )}
      </Button>
      <Button
        variant="outline"
        type="button"
        onClick={onToggleMap}
        className="flex items-center gap-2"
      >
        <MapPin className="h-4 w-4" />
        {showMap ? "Hide Map" : "Show Map"}
      </Button>
    </div>
  );
}
