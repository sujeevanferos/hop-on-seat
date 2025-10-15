import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bus, MapPin, ArrowRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const cities = [
    "Colombo",
    "Kandy",
    "Galle",
    "Jaffna",
    "Trincomalee",
    "Anuradhapura",
    "Matara",
    "Negombo",
    "Batticaloa",
    "Nuwara Eliya",
  ];

  const handleSearch = () => {
    if (from && to) {
      navigate(`/buses?from=${from}&to=${to}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-4 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2.5 rounded-xl">
              <Bus className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Bus Ticket
            </h1>
          </div>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/register")}
            className="text-base md:text-lg px-4 md:px-6 py-5 md:py-6"
          >
            Bus Owner? Register
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Book Your Bus Ticket
          </h2>
          <p className="text-lg md:text-2xl text-muted-foreground">
            Simple, Fast & Easy
          </p>
        </div>

        {/* Search Card */}
        <Card className="p-6 md:p-10 shadow-lg max-w-3xl mx-auto">
          <div className="space-y-6">
            {/* From Location */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg md:text-2xl font-semibold text-foreground">
                <MapPin className="w-6 h-6 text-primary" />
                From
              </label>
              <Select value={from} onValueChange={setFrom}>
                <SelectTrigger className="h-14 md:h-16 text-lg md:text-xl">
                  <SelectValue placeholder="Select departure city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem
                      key={city}
                      value={city}
                      className="text-lg md:text-xl py-3"
                    >
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* To Location */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-lg md:text-2xl font-semibold text-foreground">
                <MapPin className="w-6 h-6 text-destructive" />
                To
              </label>
              <Select value={to} onValueChange={setTo}>
                <SelectTrigger className="h-14 md:h-16 text-lg md:text-xl">
                  <SelectValue placeholder="Select destination city" />
                </SelectTrigger>
                <SelectContent>
                  {cities
                    .filter((city) => city !== from)
                    .map((city) => (
                      <SelectItem
                        key={city}
                        value={city}
                        className="text-lg md:text-xl py-3"
                      >
                        {city}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button
              size="lg"
              className="w-full h-14 md:h-16 text-xl md:text-2xl font-semibold"
              onClick={handleSearch}
              disabled={!from || !to}
            >
              Search Buses
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 text-center">
            <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bus className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-muted-foreground">Select route, pick seat, done!</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">All Routes</h3>
            <p className="text-muted-foreground">Travel anywhere you want</p>
          </Card>
          <Card className="p-6 text-center">
            <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick & Safe</h3>
            <p className="text-muted-foreground">Book in minutes</p>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
