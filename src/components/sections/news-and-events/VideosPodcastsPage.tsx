type MediaItem = {
  title: string;
  description: string;
  embedUrl: string;
  type: "video" | "podcast";
  date: string;
};

const dummyMedia: MediaItem[] = [
  {
    title: "What is Solar Radiation Management? An African Perspective",
    description:
      "ECF's research team breaks down what SRM is, why it matters, and why African voices must be central to global governance conversations on this emerging technology.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    type: "video",
    date: "February 2025",
  },
  {
    title: "ACIFER Fellowship — Fellows Share Their Research Journey",
    description:
      "Three ACIFER SRM Track fellows discuss their research experiences, the challenges of working at the frontier of climate science, and their vision for Africa's role in SRM governance.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    type: "video",
    date: "January 2025",
  },
  {
    title: "Podcast: Governing the Ungovernable — SRM and African Agency",
    description:
      "A deep dive into the political economy of solar geoengineering governance and what meaningful African participation in SRM decision-making could look like.",
    embedUrl: "https://open.spotify.com/embed/episode/4rOoJ6Egrf8K2IrywzwOMk?utm_source=generator",
    type: "podcast",
    date: "December 2024",
  },
  {
    title: "CDR in Africa: Opportunities, Risks, and the Path Forward",
    description:
      "An expert panel discusses the potential for carbon dioxide removal in African contexts — from enhanced weathering to biochar — and how to ensure equitable outcomes.",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    type: "video",
    date: "November 2024",
  },
];

function VideosPodcastsPage() {
  return (
    <section className="w-full bg-[#034D6B] pb-[120px] flex flex-col">
      {/* Hero */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase">
            Videos & Podcasts
          </p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#E0C759]">
            Watch & Listen
          </h1>
          <p className="text-normal-base text-white/70 max-w-lg">
            Video discussions, lecture recordings, and podcast episodes on frontier climate technologies from an African lens.
          </p>
        </div>
      </div>

      {/* Media grid */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1100px] mx-auto">
          {dummyMedia.map((item, i) => (
            <MediaCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MediaCard({ item }: { item: MediaItem }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Embed */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/30">
        <iframe
          src={item.embedUrl}
          title={item.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Meta */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs primarybold tracking-wide ${
            item.type === "video"
              ? "bg-[#E0C759]/20 text-[#E0C759]"
              : "bg-white/10 text-white/80"
          }`}>
            {item.type === "video" ? "VIDEO" : "PODCAST"}
          </span>
          <span className="text-white/40 text-xs">{item.date}</span>
        </div>
        <h3 className="text-bold-xl text-white leading-snug">{item.title}</h3>
        <p className="text-normal-base text-white/60 line-clamp-3">{item.description}</p>
      </div>
    </div>
  );
}

export default VideosPodcastsPage;
