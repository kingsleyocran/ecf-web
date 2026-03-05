import Image from "next/image";
import Link from "next/link";

type NewsItem = {
  title: string;
  source: string;
  description: string;
  url: string;
  imgUrl: string;
  date: string;
  tag: string;
};

const dummyNews: NewsItem[] = [
  {
    title: "Africa's Role in Shaping Solar Geoengineering Governance",
    source: "Carbon Brief",
    description:
      "As solar radiation modification moves from theory to research agenda, African scientists and policymakers are pushing for a seat at the table in global governance discussions.",
    url: "https://www.carbonbrief.org",
    imgUrl: "/assets/images/test-image.png",
    date: "March 2, 2025",
    tag: "SRM",
  },
  {
    title: "New UN Report Flags Risks of Unilateral Geoengineering Deployment",
    source: "The Guardian",
    description:
      "A landmark United Nations assessment warns that unilateral deployment of solar geoengineering technologies could have severe and unequal consequences for developing nations.",
    url: "https://www.theguardian.com/environment/climate-crisis",
    imgUrl: "/assets/images/test-image.png",
    date: "February 18, 2025",
    tag: "Policy",
  },
  {
    title: "AI Tools Are Transforming Climate Modelling in Sub-Saharan Africa",
    source: "Nature",
    description:
      "Researchers across Ghana, Kenya, and South Africa are leveraging artificial intelligence to improve regional climate projections and inform adaptation strategies.",
    url: "https://www.nature.com/nclimate",
    imgUrl: "/assets/images/test-image.png",
    date: "February 5, 2025",
    tag: "AI",
  },
  {
    title: "Carbon Dioxide Removal Investments Hit Record High in 2024",
    source: "Reuters",
    description:
      "Global investment in carbon removal technologies surpassed $5 billion in 2024, with growing calls to direct a share of funding toward African-led projects.",
    url: "https://www.reuters.com/business/environment",
    imgUrl: "/assets/images/test-image.png",
    date: "January 28, 2025",
    tag: "CDR",
  },
  {
    title: "COP30 Negotiators Debate Inclusion of SRM in Climate Frameworks",
    source: "E&E News",
    description:
      "Ahead of COP30, climate negotiators are grappling with whether solar radiation modification should be formally acknowledged within UNFCCC frameworks, amid sharp disagreement.",
    url: "https://www.eenews.net",
    imgUrl: "/assets/images/test-image.png",
    date: "January 14, 2025",
    tag: "Policy",
  },
  {
    title: "Kenyan Scientists Lead Groundbreaking Study on Stratospheric Aerosols",
    source: "Science",
    description:
      "A team from the University of Nairobi has published new findings on how stratospheric aerosol injection could affect East Africa's rainfall patterns — with implications for food security.",
    url: "https://www.science.org/journal/science",
    imgUrl: "/assets/images/test-image.png",
    date: "December 20, 2024",
    tag: "SRM",
  },
];

const tagColors: Record<string, string> = {
  SRM: "bg-[#034D6B] text-white",
  CDR: "bg-[#1a6b3c] text-white",
  AI: "bg-[#5b3d8a] text-white",
  Policy: "bg-[#8a5b00] text-white",
};

function LatestNewsPage() {
  return (
    <section className="w-full bg-[#034D6B] pb-[100px] flex flex-col">
      {/* Hero */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase">
            Latest News
          </p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#E0C759]">
            Stay Informed
          </h1>
          <p className="text-normal-base text-white/70 max-w-lg">
            The latest coverage on frontier climate technologies, African climate governance, and global policy developments.
          </p>
        </div>
      </div>

      {/* News list */}
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col gap-10 max-w-[800px] mx-auto">
          {dummyNews.map((item, i) => (
            <NewsCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col md:flex-row gap-6 items-center bg-transparent hover:bg-white/10
      transition-colors duration-200 p-4 rounded-lg"
    >
      {/* Image */}
      <div className="relative shrink-0 w-full md:w-[180px] aspect-square rounded-xl overflow-hidden bg-[#C7B14E]">
        <Image
          src={item.imgUrl}
          alt={item.title}
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className="group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex flex-wrap gap-2 items-center">
          <span className={`px-3 py-1 rounded-full text-xs primarybold tracking-wide ${tagColors[item.tag] ?? "bg-white/20 text-white"}`}>
            {item.tag}
          </span>
          <span className="text-white/50 text-xs">{item.source}</span>
          <span className="text-white/40 text-xs">· {item.date}</span>
        </div>
        <h3 className="text-bold-xl text-[#E0C759] group-hover:text-[#E0C759]/80 transition-colors duration-200">
          {item.title}
        </h3>
        <p className="text-normal-base text-white/70 line-clamp-3">
          {item.description}
        </p>
      </div>
    </Link>
  );
}

export default LatestNewsPage;
