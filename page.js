"use client";

import { useState } from "react";
import Image from "next/image";

export default function HolidayItinerary() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [departureLocation, setDepartureLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchItinerary = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // You would replace this with your actual API call in production
    // const response = await fetch("/api/itinerary", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ 
    //     start_date: startDate, 
    //     end_date: endDate, 
    //     location, 
    //     departure_location: departureLocation, 
    //     budget 
    //   })
    // });
    // const data = await response.json();
    // setItinerary(data);
    
    // Simulate API call for demo purposes
    setTimeout(() => {
      setItinerary({
        flights: [
          { airline: "Holiday Express", departure: "New York - 9:00 AM", arrival: "Maldives - 6:30 PM", price: "$899" }
        ],
        hotels: [
          { 
            name: "Ocean Breeze Resort", 
            location: "Maldives Beach Front", 
            price_per_night: "$199", 
            rating: "4.8",
            image: "/placeholder.jpg"
          }
        ],
        days: [
          { 
            day: "Day 1", 
            activities: [
              { time: "9:00 AM", place: "Beach Relaxation" },
              { time: "1:00 PM", place: "Snorkeling Adventure" },
              { time: "7:00 PM", place: "Seafood Dinner by the Shore" }
            ]
          },
          { 
            day: "Day 2", 
            activities: [
              { time: "8:00 AM", place: "Island Hopping Tour" },
              { time: "2:00 PM", place: "Local Market Visit" },
              { time: "6:00 PM", place: "Sunset Cruise" }
            ]
          }
        ],
        visa_details: {
          required: true,
          processing_time: "7-10 business days",
          cost: "$75",
          documents_needed: ["Passport", "Photo", "Hotel Booking", "Return Flight"]
        }
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-sky-50 text-sky-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-sky-600 mb-2">Holiday Planner</h1>
          <p className="text-xl text-sky-500">Plan your dream vacation with ease ✈️ 🏝️ 🌴</p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
          <form onSubmit={fetchItinerary} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sky-700 font-medium">Start Date</label>
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                  className="w-full p-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400" 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sky-700 font-medium">End Date</label>
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)} 
                  className="w-full p-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400" 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sky-700 font-medium">Destination</label>
                <input 
                  type="text" 
                  placeholder="Where are you going?" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  className="w-full p-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400" 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sky-700 font-medium">Departure From</label>
                <input 
                  type="text" 
                  placeholder="Where are you starting from?" 
                  value={departureLocation} 
                  onChange={(e) => setDepartureLocation(e.target.value)} 
                  className="w-full p-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400" 
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <label className="block text-sky-700 font-medium">Budget ($)</label>
                <input 
                  type="number" 
                  placeholder="What's your budget?" 
                  value={budget} 
                  onChange={(e) => setBudget(e.target.value)} 
                  className="w-full p-3 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400" 
                  required
                />
              </div>
            </div>
            
            <div className="text-center">
              <button 
                type="submit" 
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg transform hover:scale-105"
              >
                Create My Holiday Plan 🌊
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center p-10">
            <div className="text-sky-600 text-xl mb-4">Planning your perfect getaway...</div>
            <div className="w-12 h-12 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin mx-auto"></div>
          </div>
        )}

        {/* Results */}
        {itinerary && !loading && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-sky-700">Your Holiday Itinerary</h2>
            
            {/* Flights Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-sky-400">
              <h3 className="text-2xl font-bold text-sky-700 mb-4">✈️ Flights</h3>
              <div className="space-y-4">
                {itinerary.flights.map((flight, i) => (
                  <div key={i} className="bg-sky-50 p-4 rounded-lg">
                    <div className="text-xl font-semibold text-sky-800">{flight.airline}</div>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
                      <div className="text-sky-600">{flight.departure}</div>
                      <div className="text-sky-500 text-sm hidden sm:block">➝</div>
                      <div className="text-sky-600">{flight.arrival}</div>
                    </div>
                    <div className="mt-2 bg-sky-100 inline-block px-3 py-1 rounded-full text-sky-700">{flight.price}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hotels Section */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-sky-400">
              <h3 className="text-2xl font-bold text-sky-700 mb-4">🏨 Accommodations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {itinerary.hotels.map((hotel, i) => (
                  <div key={i} className="bg-sky-50 rounded-lg overflow-hidden shadow">
                    <div className="relative w-full h-48">
                      <Image 
                        src={hotel.image} 
                        alt={hotel.name} 
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="p-4">
                      <div className="text-xl font-semibold text-sky-800">{hotel.name}</div>
                      <div className="text-sky-600 mt-1">📍 {hotel.location}</div>
                      <div className="flex justify-between mt-2">
                        <span className="bg-sky-100 px-2 py-1 rounded-full text-sky-700">{hotel.price_per_night}</span>
                        <span className="bg-yellow-100 px-2 py-1 rounded-full text-yellow-700">⭐ {hotel.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Daily Itinerary */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-sky-400">
              <h3 className="text-2xl font-bold text-sky-700 mb-4">📅 Daily Activities</h3>
              <div className="space-y-6">
                {itinerary.days.map((day, i) => (
                  <div key={i} className="bg-sky-50 p-4 rounded-lg">
                    <div className="text-xl font-semibold text-sky-800 mb-3">{day.day}</div>
                    <div className="space-y-2">
                      {day.activities.map((activity, j) => (
                        <div key={j} className="flex items-start">
                          <div className="bg-sky-200 text-sky-800 px-2 py-1 rounded mr-3 text-sm">{activity.time}</div>
                          <div className="text-sky-700">{activity.place}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Visa Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-sky-400">
              <h3 className="text-2xl font-bold text-sky-700 mb-4">🛂 Travel Requirements</h3>
              <div className="bg-sky-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sky-600 font-medium">Visa Required:</p>
                    <p className="text-sky-800">{itinerary.visa_details.required ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-sky-600 font-medium">Processing Time:</p>
                    <p className="text-sky-800">{itinerary.visa_details.processing_time}</p>
                  </div>
                  <div>
                    <p className="text-sky-600 font-medium">Visa Fee:</p>
                    <p className="text-sky-800">{itinerary.visa_details.cost}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sky-600 font-medium">Required Documents:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {itinerary.visa_details.documents_needed.map((doc, i) => (
                      <span key={i} className="bg-sky-100 px-3 py-1 rounded-full text-sky-700 text-sm">{doc}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-10">
              <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg transform hover:scale-105">
                Book This Trip Now 🏝️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
