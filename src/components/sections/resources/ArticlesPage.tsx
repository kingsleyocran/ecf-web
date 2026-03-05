import Image from "next/image";
import Link from "next/link";
import { ArticleSchema } from "@/backend/models/articles";

const dummyArticles: ArticleSchema[] = [
  {
    id: "1",
    title: "Why Africa Must Lead the Conversation on Solar Geoengineering",
    description:
      "The continent faces the sharpest end of the climate crisis, yet African voices remain marginal in the scientific and governance debates shaping solar radiation modification.",
    author: "ECF Research Team",
    content: "",
    imgUrl: "/assets/images/test-image.png",
    publishedDate: "February 2025",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "AI and Climate Governance: What Does Meaningful African Participation Look Like?",
    description:
      "Artificial intelligence is reshaping climate modelling, early warning systems, and governance decision-making. This article examines what equitable AI deployment means in African contexts.",
    author: "Dr. Amara Diallo",
    content: "",
    imgUrl: "/assets/images/test-image.png",
    publishedDate: "January 2025",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Carbon Markets and CDR: Ensuring African Communities Benefit",
    description:
      "As voluntary carbon markets expand into CDR, critical questions about land rights, benefit-sharing, and accountability remain unanswered for African host communities.",
    author: "ECF Policy Team",
    content: "",
    imgUrl: "/assets/images/test-image.png",
    publishedDate: "November 2024",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function ArticlesPage({ articles }: { articles: ArticleSchema[] }) {
  const display = articles.length > 0 ? articles : dummyArticles;

  return (
    <section className="w-full bg-[#034D6B] pb-[100px] flex flex-col">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase">Articles</p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#E0C759]">Insights & Analysis</h1>
          <p className="text-normal-base text-white/70 max-w-lg">
            Research insights, policy analysis, and commentary on frontier climate technologies.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col gap-10 max-w-[800px] mx-auto">
          {display.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleCard({ article }: { article: ArticleSchema }) {
  return (
    <Link
      href={`/resources/articles/${article.id}`}
      className="group flex flex-col md:flex-row gap-6 items-center bg-transparent hover:bg-white/10 transition-colors duration-200 p-4 rounded-lg"
    >
      <div className="relative shrink-0 w-full md:w-[180px] aspect-square rounded-xl overflow-hidden bg-[#C7B14E]">
        {article.imgUrl && (
          <Image src={article.imgUrl} alt={article.title} fill style={{ objectFit: "cover" }}
            className="group-hover:scale-105 transition-transform duration-300" />
        )}
      </div>
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-white/50 text-xs">{article.author}</span>
          <span className="text-white/40 text-xs">· {article.publishedDate}</span>
        </div>
        <h3 className="text-bold-xl text-[#E0C759] group-hover:text-[#E0C759]/80 transition-colors duration-200">
          {article.title}
        </h3>
        <p className="text-normal-base text-white/70 line-clamp-3">{article.description}</p>
      </div>
    </Link>
  );
}

export default ArticlesPage;
