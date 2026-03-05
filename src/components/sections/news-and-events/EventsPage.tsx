import Image from "next/image";
import Link from "next/link";
import { EventSchema } from "@/backend/models/events";

const dummyEvents: EventSchema[] = [
  {
    id: "1",
    title: "SRM Governance Forum: African Perspectives",
    description:
      "A high-level convening bringing together African policymakers, researchers, and civil society to develop a unified continental position on Solar Radiation Modification governance.",
    location: "Accra, Ghana",
    date: "April 10, 2025",
    type: "in-person",
    content: "",
    imgUrl: "/assets/images/test-image.png",
    registrationUrl: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "ACIFER SRM Track — Cohort 2 Info Session",
    description:
      "An online information session for early-career researchers interested in applying to the second cohort of ECF's ACIFER SRM Fellowship programme.",
    location: "Virtual",
    date: "March 25, 2025",
    type: "virtual",
    content: "",
    imgUrl: "/assets/images/test-image.png",
    registrationUrl: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "CDR Futures: African Pathways Workshop",
    description:
      "A two-day hybrid workshop exploring the feasibility, opportunities, and risks of carbon dioxide removal approaches in African contexts, with a focus on equity and justice.",
    location: "Nairobi, Kenya",
    date: "May 8–9, 2025",
    type: "hybrid",
    content: "",
    imgUrl: "/assets/images/test-image.png",
    registrationUrl: null,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const typeLabels: Record<string, string> = {
  virtual: "Virtual",
  "in-person": "In Person",
  hybrid: "Hybrid",
};

const typeBadgeColors: Record<string, string> = {
  virtual: "bg-[#5b3d8a]/30 text-[#c7a8ff]",
  "in-person": "bg-[#034D6B]/60 text-[#7dd4f0]",
  hybrid: "bg-[#1a6b3c]/30 text-[#6ee7a8]",
};

function EventsPage({ events }: { events: EventSchema[] }) {
  const displayEvents = events.length > 0 ? events : dummyEvents;

  return (
    <section className="w-full bg-[#034D6B] pb-[100px] flex flex-col">
      {/* Hero */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase">
            Events
          </p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#E0C759]">
            On the Ground
          </h1>
          <p className="text-normal-base text-white/70 max-w-lg">
            Forums, workshops, and convenings shaping Africa&apos;s engagement with frontier climate technologies.
          </p>
        </div>
      </div>

      {/* Events list */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col gap-10 max-w-[800px] mx-auto">
          {displayEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Google Calendar embed */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 mt-[80px]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col gap-3 mb-8 text-center">
            <p className="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase">Calendar</p>
            <h2 className="text-bold-xl md:text-bold-2xl text-[#E0C759]">Upcoming Events</h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            <iframe
              src="REPLACE_WITH_YOUR_GOOGLE_CALENDAR_EMBED_URL"
              style={{ border: 0 }}
              width="100%"
              height="700"
              frameBorder="0"
              scrolling="no"
              title="ECF Events Calendar"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }: { event: EventSchema }) {
  return (
    <Link
      href={`/news-and-events/events/${event.id}`}
      className="group flex flex-col md:flex-row gap-6 items-center bg-transparent hover:bg-white/10
      transition-colors duration-200 p-4 rounded-lg"
    >
      {/* Image */}
      <div className="relative shrink-0 w-full md:w-[180px] aspect-square rounded-xl overflow-hidden bg-[#C7B14E]">
        {event.imgUrl && (
          <Image
            src={event.imgUrl}
            alt={event.title}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex flex-wrap gap-2 items-center">
          <span className={`px-3 py-1 rounded-full text-xs primarybold tracking-wide ${typeBadgeColors[event.type]}`}>
            {typeLabels[event.type]}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#E0C759]/10 text-[#E0C759] text-xs">
            {event.date}
          </span>
          <span className="text-white/50 text-xs">{event.location}</span>
        </div>
        <h3 className="text-bold-xl text-[#E0C759] group-hover:text-[#E0C759]/80 transition-colors duration-200">
          {event.title}
        </h3>
        <p className="text-normal-base text-white/70 line-clamp-2">
          {event.description}
        </p>
      </div>
    </Link>
  );
}

export default EventsPage;
