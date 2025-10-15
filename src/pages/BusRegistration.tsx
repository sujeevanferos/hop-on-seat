import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Bus } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BusRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    contactNumber: "",
    email: "",
    busNumber: "",
    totalSeats: "",
    route: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.companyName || !formData.ownerName || !formData.contactNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Bus registered successfully!");
    setTimeout(() => navigate("/"), 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-4 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/")}
            className="px-4 py-6"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2.5 rounded-xl">
              <Bus className="w-7 h-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Register Your Bus
            </h1>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <Card className="p-6 md:p-10">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Bus Owner Registration
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill in the details to register your bus service
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Name */}
            <div className="space-y-3">
              <Label htmlFor="companyName" className="text-lg md:text-xl font-semibold">
                Company Name *
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                placeholder="Enter company name"
                className="h-12 md:h-14 text-lg"
                required
              />
            </div>

            {/* Owner Name */}
            <div className="space-y-3">
              <Label htmlFor="ownerName" className="text-lg md:text-xl font-semibold">
                Owner Name *
              </Label>
              <Input
                id="ownerName"
                value={formData.ownerName}
                onChange={(e) => handleChange("ownerName", e.target.value)}
                placeholder="Enter your name"
                className="h-12 md:h-14 text-lg"
                required
              />
            </div>

            {/* Contact Number */}
            <div className="space-y-3">
              <Label htmlFor="contactNumber" className="text-lg md:text-xl font-semibold">
                Contact Number *
              </Label>
              <Input
                id="contactNumber"
                type="tel"
                value={formData.contactNumber}
                onChange={(e) => handleChange("contactNumber", e.target.value)}
                placeholder="01711-123456"
                className="h-12 md:h-14 text-lg"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-lg md:text-xl font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="example@email.com"
                className="h-12 md:h-14 text-lg"
              />
            </div>

            {/* Bus Number */}
            <div className="space-y-3">
              <Label htmlFor="busNumber" className="text-lg md:text-xl font-semibold">
                Bus Number
              </Label>
              <Input
                id="busNumber"
                value={formData.busNumber}
                onChange={(e) => handleChange("busNumber", e.target.value)}
                placeholder="DHA-1234"
                className="h-12 md:h-14 text-lg"
              />
            </div>

            {/* Total Seats */}
            <div className="space-y-3">
              <Label htmlFor="totalSeats" className="text-lg md:text-xl font-semibold">
                Total Seats
              </Label>
              <Select
                value={formData.totalSeats}
                onValueChange={(value) => handleChange("totalSeats", value)}
              >
                <SelectTrigger className="h-12 md:h-14 text-lg">
                  <SelectValue placeholder="Select number of seats" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30" className="text-lg py-3">30 Seats</SelectItem>
                  <SelectItem value="40" className="text-lg py-3">40 Seats</SelectItem>
                  <SelectItem value="50" className="text-lg py-3">50 Seats</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Route */}
            <div className="space-y-3">
              <Label htmlFor="route" className="text-lg md:text-xl font-semibold">
                Main Route
              </Label>
              <Input
                id="route"
                value={formData.route}
                onChange={(e) => handleChange("route", e.target.value)}
                placeholder="e.g., Dhaka - Chittagong"
                className="h-12 md:h-14 text-lg"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 md:h-16 text-xl md:text-2xl font-semibold"
              >
                Register Bus
              </Button>
            </div>

            <p className="text-center text-muted-foreground text-sm md:text-base">
              * Required fields
            </p>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default BusRegistration;
