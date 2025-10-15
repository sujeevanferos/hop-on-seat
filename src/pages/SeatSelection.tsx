import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, User } from "lucide-react";
import { toast } from "sonner";

// Mock bus data
const mockBus = {
  id: 1,
  company: "Sri Lanka Transport Board",
  from: "Colombo",
  to: "Kandy",
  departureTime: "8:00 AM",
  price: 450,
};

type SeatStatus = "available" | "booked" | "pending";

interface Seat {
  id: number;
  number: string;
  status: SeatStatus;
}

// Generate 40 seats (4 columns x 10 rows)
const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const bookedSeats = [5, 12, 18, 23, 27, 31, 34];
  const pendingSeats = [8, 15, 22];

  for (let i = 1; i <= 40; i++) {
    let status: SeatStatus = "available";
    if (bookedSeats.includes(i)) status = "booked";
    if (pendingSeats.includes(i)) status = "pending";

    seats.push({
      id: i,
      number: `${i}`,
      status,
    });
  }
  return seats;
};

const SeatSelection = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "booked") {
      toast.error("This seat is already booked");
      return;
    }
    if (seat.status === "pending") {
      toast.error("This seat is being reserved by someone else");
      return;
    }

    setSelectedSeats((prev) =>
      prev.includes(seat.id)
        ? prev.filter((id) => id !== seat.id)
        : [...prev, seat.id]
    );
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    toast.success(
      `Successfully booked ${selectedSeats.length} seat(s)! Total: Rs. ${
        selectedSeats.length * mockBus.price
      }`
    );
    setTimeout(() => navigate("/"), 2000);
  };

  const getSeatColor = (seat: Seat) => {
    if (selectedSeats.includes(seat.id)) return "bg-primary text-primary-foreground";
    if (seat.status === "booked") return "bg-destructive text-destructive-foreground";
    if (seat.status === "pending") return "bg-pending text-pending-foreground";
    return "bg-success text-success-foreground hover:bg-success/80";
  };

  const totalPrice = selectedSeats.length * mockBus.price;
  const availableCount = seats.filter((s) => s.status === "available").length;
  const bookedCount = seats.filter((s) => s.status === "booked").length;
  const pendingCount = seats.filter((s) => s.status === "pending").length;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="bg-card border-b border-border py-4 px-4 md:px-8 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
            className="px-4 py-6"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {mockBus.company}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              {mockBus.from} → {mockBus.to} • {mockBus.departureTime}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Legend */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Seat Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success rounded-lg"></div>
              <div>
                <p className="font-semibold text-lg">Available</p>
                <p className="text-muted-foreground">{availableCount} seats</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-destructive rounded-lg"></div>
              <div>
                <p className="font-semibold text-lg">Booked</p>
                <p className="text-muted-foreground">{bookedCount} seats</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-pending rounded-lg"></div>
              <div>
                <p className="font-semibold text-lg">Pending</p>
                <p className="text-muted-foreground">{pendingCount} seats</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg"></div>
              <div>
                <p className="font-semibold text-lg">Your Choice</p>
                <p className="text-muted-foreground">{selectedSeats.length} seats</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Seat Layout */}
        <Card className="p-6 md:p-8">
          <div className="mb-6 text-center">
            <div className="inline-block bg-muted px-8 py-3 rounded-lg">
              <p className="text-xl font-semibold">Driver</p>
            </div>
          </div>

          {/* Seats Grid */}
          <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-md mx-auto">
            {seats.map((seat) => (
              <button
                key={seat.id}
                onClick={() => handleSeatClick(seat)}
                disabled={seat.status === "booked"}
                className={`
                  h-16 md:h-20 rounded-lg font-bold text-lg md:text-xl
                  transition-all duration-200 transform active:scale-95
                  disabled:cursor-not-allowed
                  ${getSeatColor(seat)}
                `}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <User className="w-5 h-5" />
                  <span className="text-sm">{seat.number}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Confirm Section */}
        {selectedSeats.length > 0 && (
          <Card className="p-6 md:p-8 mt-6 bg-primary/5">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-xl md:text-2xl font-semibold">
                  Selected Seats:
                </p>
                <p className="text-xl md:text-2xl font-bold text-primary">
                  {selectedSeats.join(", ")}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xl md:text-2xl font-semibold">Total Price:</p>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  Rs. {totalPrice}
                </p>
              </div>
              <Button
                size="lg"
                className="w-full h-14 md:h-16 text-xl md:text-2xl font-semibold"
                onClick={handleConfirm}
              >
                Confirm Booking
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default SeatSelection;
