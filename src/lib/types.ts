export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime?: string;
  location: string;
  address?: string;
  description: string;
  dressCode?: string;
  mapUrl?: string;
  category: "ceremony" | "reception" | "activity" | "meal" | "transportation" | "free-time";
}

export interface WeddingDay {
  date: string;
  label: string;
  events: WeddingEvent[];
}

export interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  rsvpStatus: "pending" | "attending" | "declined";
  arrivalDate?: string;
  departureDate?: string;
  flightInfo?: string;
  hotelName?: string;
  dietaryRestrictions?: string;
  plusOne?: string;
  notes?: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  priority: "normal" | "important" | "urgent";
  author: string;
}

export interface TravelInfo {
  id: string;
  category: "airport" | "hotel" | "transport" | "restaurant" | "activity" | "tip";
  title: string;
  description: string;
  address?: string;
  mapUrl?: string;
  phone?: string;
  website?: string;
  priceRange?: string;
}
