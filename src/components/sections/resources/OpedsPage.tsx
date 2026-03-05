import Image from "next/image";
import Link from "next/link";
import { OpEdSchema } from "@/backend/models/opeds";

const dummyOpeds: OpEdSchema[] = [
  {
    id: "1",
    title: "Geoengineering Is Not a Silver Bullet — But Africa Cannot Afford to Ignore It",
    author: "Kwame Asante",
    description:
      "Dismissing solar geoengineering as a distraction from emissions reductions is a luxury that the most climate-vulnerable communities cannot afford. Here is why Africa must engage.",
    content: "",
    imgUrl: "/assets/images/test-image.png",
    publishedDate: "March 2025",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "The North Cannot Govern SRM for the South",
    author: "Dr. Fatima Osei",
    description:
      "When wealthy nations fund and direct solar geoengineering research, they inevitably shape its risk framings, governance assumptions, and ethical boundaries — often without African input.",
    content: "",
    imgUrl: "/assets/images/test-image.png",
    publishedDate: "January 2025",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Let Communities Decide: The Case for Participatory CDR Governance in Africa",
    author: "Nadia Mwangi",
    description:
      "Carbon removal projects are increasingly targeting African land. Without meaningful community consent and benefit-sharing, CDR risks reproducing the extractive dynamics of past development models.",
    content: "",
    imgUrl: "/assets/images/test-image.png",
    publishedDate: "October 2024",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

function OpedsPage({ opeds }: { opeds: OpEdSchema[] }) {
  const display = opeds.length > 0 ? opeds : dummyOpeds;

  return (
    <section className="w-full bg-[#034D6B] pb-[100px] flex flex-col">
      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16 py-[180px]">
        <div className="flex flex-col items-center text-center gap-4">
          <p className="text-[#E0C759]/60 text-xs primarybold tracking-[6px] uppercase">Op-Eds</p>
          <h1 className="text-bold-2xl md:text-bold-3xl text-[#E0C759]">Voices & Perspectives</h1>
          <p className="text-normal-base text-white/70 max-w-lg">
            Opinion and editorial pieces from ECF contributors and African climate voices.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[1920px] 2xl:mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col gap-10 max-w-[800px] mx-auto">
          {display.map((oped) => (
            <OpEdCard key={oped.id} oped={oped} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OpEdCard({ oped }: { oped: OpEdSchema }) {
  return (
    <Link
      href={`/resources/opeds/${oped.id}`}
      className="group flex flex-col md:flex-row gap-6 items-center bg-transparent hover:bg-white/10 transition-colors duration-200 p-4 rounded-lg"
    >
      <div className="relative shrink-0 w-full md:w-[180px] aspect-square rounded-xl overflow-hidden bg-[#C7B14E]">
        {oped.imgUrl && (
          <Image src={oped.imgUrl} alt={oped.title} fill style={{ objectFit: "cover" }}
            className="group-hover:scale-105 transition-transform duration-300" />
        )}
      </div>
      <div className="flex flex-col gap-3 pt-1">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="px-3 py-1 rounded-full bg-[#E0C759]/10 text-[#E0C759] text-xs primarybold">Opinion</span>
          <span className="text-white/50 text-xs">{oped.author}</span>
          <span className="text-white/40 text-xs">· {oped.publishedDate}</span>
        </div>
        <h3 className="text-bold-xl text-[#E0C759] group-hover:text-[#E0C759]/80 transition-colors duration-200">
          {oped.title}
        </h3>
        <p className="text-normal-base text-white/70 line-clamp-3">{oped.description}</p>
      </div>
    </Link>
  );
}

export default OpedsPage;
