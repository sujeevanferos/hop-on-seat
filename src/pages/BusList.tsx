import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bus, Clock, Phone, DollarSign, ArrowLeft } from "lucide-react";

// Mock data - in real app, this would come from backend
const mockBuses = [
  {
    id: 1,
    company: "Green Line",
    from: "Dhaka",
    to: "Chittagong",
    departureTime: "8:00 AM",
    arrivalTime: "2:00 PM",
    price: 800,
    contact: "01711-123456",
    availableSeats: 15,
  },
  {
    id: 2,
    company: "Shyamoli Paribahan",
    from: "Dhaka",
    to: "Chittagong",
    departureTime: "10:30 AM",
    arrivalTime: "4:30 PM",
    price: 750,
    contact: "01722-234567",
    availableSeats: 8,
  },
  {
    id: 3,
    company: "Ena Transport",
    from: "Dhaka",
    to: "Chittagong",
    departureTime: "2:00 PM",
    arrivalTime: "8:00 PM",
    price: 850,
    contact: "01733-345678",
    availableSeats: 22,
  },
];

const BusList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const buses = mockBuses.filter(
    (bus) => bus.from === from && bus.to === to
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-4 px-4 md:px-8 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/")}
            className="px-4 py-6"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {from} → {to}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              {buses.length} buses available
            </p>
          </div>
        </div>
      </header>

      {/* Bus List */}
      <main className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        <div className="space-y-4 md:space-y-6">
          {buses.map((bus) => (
            <Card key={bus.id} className="p-6 md:p-8 hover:shadow-lg transition-shadow">
              <div className="space-y-6">
                {/* Company Name */}
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Bus className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {bus.company}
                  </h2>
                </div>

                {/* Bus Details Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Time */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-5 h-5" />
                      <span className="text-lg">Departure Time</span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                      {bus.departureTime}
                    </p>
                    <p className="text-lg text-muted-foreground">
                      Arrives: {bus.arrivalTime}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-5 h-5" />
                      <span className="text-lg">Ticket Price</span>
                    </div>
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                      ৳{bus.price}
                    </p>
                    <p className="text-lg text-muted-foreground">
                      Per person
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="w-5 h-5" />
                      <span className="text-lg">Contact Number</span>
                    </div>
                    <p className="text-xl md:text-2xl font-semibold text-foreground">
                      {bus.contact}
                    </p>
                  </div>

                  {/* Available Seats */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Bus className="w-5 h-5" />
                      <span className="text-lg">Available Seats</span>
                    </div>
                    <p className="text-xl md:text-2xl font-semibold text-success">
                      {bus.availableSeats} seats left
                    </p>
                  </div>
                </div>

                {/* Book Button */}
                <Button
                  size="lg"
                  className="w-full h-14 md:h-16 text-xl md:text-2xl font-semibold"
                  onClick={() => navigate(`/seats/${bus.id}`)}
                >
                  Select Seats
                </Button>
              </div>
            </Card>
          ))}

          {buses.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-2xl text-muted-foreground">
                No buses found for this route
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default BusList;
