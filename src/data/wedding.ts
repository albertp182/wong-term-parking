import { WeddingDay, Announcement, TravelInfo } from "@/lib/types";

export const WEDDING_DATE = "2026-08-15";
export const COUPLE_NAMES = "Albert & Partner";
export const WEDDING_LOCATION = "Bali, Indonesia";
export const WEDDING_TAGLINE = "Wong Term Parking 🅿️";

export const schedule: WeddingDay[] = [
  {
    date: "2026-08-13",
    label: "Thursday — Arrivals",
    events: [
      {
        id: "1",
        title: "Airport Welcome",
        date: "2026-08-13",
        startTime: "All Day",
        location: "Ngurah Rai International Airport (DPS)",
        description:
          "Look for our welcome team holding Wong Term Parking signs! We'll have transportation arranged to your hotel.",
        category: "transportation",
      },
      {
        id: "2",
        title: "Welcome Drinks",
        date: "2026-08-13",
        startTime: "7:00 PM",
        endTime: "10:00 PM",
        location: "Hotel Pool Bar",
        description:
          "Casual welcome gathering. Grab a Bintang, meet the other guests, and shake off that jet lag!",
        dressCode: "Casual / Resort Wear",
        category: "meal",
      },
    ],
  },
  {
    date: "2026-08-14",
    label: "Friday — Pre-Wedding Fun",
    events: [
      {
        id: "3",
        title: "Group Breakfast",
        date: "2026-08-14",
        startTime: "8:00 AM",
        endTime: "10:00 AM",
        location: "Hotel Restaurant",
        description: "Buffet breakfast included with your room. Fuel up for a big day!",
        category: "meal",
      },
      {
        id: "4",
        title: "Beach Day & Water Sports",
        date: "2026-08-14",
        startTime: "10:00 AM",
        endTime: "3:00 PM",
        location: "Nusa Dua Beach",
        description:
          "Optional beach activities: surfing lessons, snorkeling, paddleboarding, or just relax on the sand.",
        category: "activity",
      },
      {
        id: "5",
        title: "Rehearsal Dinner",
        date: "2026-08-14",
        startTime: "6:30 PM",
        endTime: "9:30 PM",
        location: "Seaside Restaurant",
        description:
          "Dinner with a view. Toasts, stories, and a preview of tomorrow's big day.",
        dressCode: "Smart Casual",
        category: "meal",
      },
    ],
  },
  {
    date: "2026-08-15",
    label: "Saturday — The Big Day 💒",
    events: [
      {
        id: "6",
        title: "Ceremony",
        date: "2026-08-15",
        startTime: "4:00 PM",
        endTime: "5:00 PM",
        location: "Clifftop Garden",
        description:
          "The main event! Please be seated by 3:45 PM. Tissues will be provided. 🥲",
        dressCode: "Formal / Cocktail",
        category: "ceremony",
      },
      {
        id: "7",
        title: "Cocktail Hour",
        date: "2026-08-15",
        startTime: "5:00 PM",
        endTime: "6:30 PM",
        location: "Pavilion Terrace",
        description: "Drinks, canapés, and sunset views while we take photos.",
        dressCode: "Formal / Cocktail",
        category: "reception",
      },
      {
        id: "8",
        title: "Reception & Dinner",
        date: "2026-08-15",
        startTime: "6:30 PM",
        endTime: "Late",
        location: "Grand Ballroom",
        description:
          "Dinner, speeches, first dance, and a party you won't forget (we hope!).",
        dressCode: "Formal / Cocktail",
        category: "reception",
      },
    ],
  },
  {
    date: "2026-08-16",
    label: "Sunday — Recovery & Farewell",
    events: [
      {
        id: "9",
        title: "Recovery Brunch",
        date: "2026-08-16",
        startTime: "10:00 AM",
        endTime: "1:00 PM",
        location: "Hotel Restaurant",
        description:
          "Slow morning. Come as you are. Coffee is mandatory, sunglasses recommended.",
        dressCode: "Whatever you woke up in",
        category: "meal",
      },
      {
        id: "10",
        title: "Pool Hangout",
        date: "2026-08-16",
        startTime: "1:00 PM",
        endTime: "5:00 PM",
        location: "Hotel Pool",
        description: "Last day together! Relax by the pool before everyone heads home.",
        category: "free-time",
      },
    ],
  },
];

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "Welcome to Wong Term Parking! 🅿️",
    body: "We're so excited you're joining us in Bali! This app has everything you need — schedule, travel info, and updates. Check back often for the latest!",
    timestamp: "2026-03-15T12:00:00Z",
    priority: "normal",
    author: "Albert",
  },
  {
    id: "2",
    title: "RSVP Reminder",
    body: "Please RSVP by June 1st so we can finalize headcounts with our vendors. Use the RSVP tab to confirm your attendance!",
    timestamp: "2026-04-01T12:00:00Z",
    priority: "important",
    author: "Albert",
  },
];

export const travelInfo: TravelInfo[] = [
  {
    id: "1",
    category: "airport",
    title: "Ngurah Rai International Airport (DPS)",
    description:
      "The only airport in Bali. Most international flights connect through Singapore, Jakarta, or Hong Kong. Visa on arrival is available for US passport holders (free for 30 days).",
    address: "Jl. Raya Gusti Ngurah Rai, Tuban, Kuta",
  },
  {
    id: "2",
    category: "transport",
    title: "Airport Transfers",
    description:
      "We've arranged shuttle service from the airport to the hotel on Aug 13-14. Look for the Wong Term Parking signs at arrivals! If arriving on other dates, we recommend using Grab (the local Uber).",
  },
  {
    id: "3",
    category: "transport",
    title: "Getting Around",
    description:
      "Grab (ride-hailing app) is the easiest way to get around. Download it before you arrive. A scooter rental is also popular but we only recommend it if you have experience riding.",
  },
  {
    id: "4",
    category: "hotel",
    title: "Room Block Hotel",
    description:
      "We have a room block at [Hotel Name TBD]. Use code WONGTERMPARKING when booking for the group rate. Book early — Bali in August is peak season!",
    website: "https://example.com",
  },
  {
    id: "5",
    category: "tip",
    title: "Currency & Payments",
    description:
      "The local currency is Indonesian Rupiah (IDR). 1 USD ≈ 15,500 IDR. Most tourist places accept credit cards, but bring some cash for local shops and tips. ATMs are widely available.",
  },
  {
    id: "6",
    category: "tip",
    title: "Weather in August",
    description:
      "August is Bali's dry season — expect sunny skies, 80-85°F (27-30°C), and low humidity. Perfect wedding weather! Pack sunscreen, a hat, and light layers for air-conditioned restaurants.",
  },
  {
    id: "7",
    category: "restaurant",
    title: "Locavore (Fine Dining)",
    description:
      "One of Bali's best restaurants. Modern Indonesian tasting menu with local ingredients. Book well in advance.",
    priceRange: "$$$$",
  },
  {
    id: "8",
    category: "restaurant",
    title: "Warung Babi Guling Ibu Oka",
    description:
      "Famous for suckling pig (babi guling). Anthony Bourdain's favorite spot in Bali. Casual, delicious, and cheap.",
    priceRange: "$",
  },
  {
    id: "9",
    category: "activity",
    title: "Uluwatu Temple & Kecak Dance",
    description:
      "Stunning clifftop temple with a traditional Kecak fire dance performance at sunset. One of Bali's most iconic experiences.",
  },
  {
    id: "10",
    category: "activity",
    title: "Tegallalang Rice Terraces",
    description:
      "Iconic terraced rice paddies in Ubud. Best visited in the morning for photos and cooler temperatures. Great coffee shops nearby.",
  },
  {
    id: "11",
    category: "tip",
    title: "Temple Etiquette",
    description:
      "When visiting temples, cover your knees and shoulders. Sarongs are usually available to borrow at temple entrances. Remove shoes before entering.",
  },
];
