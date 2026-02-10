import React from "react";
import Chip from "../input/Chip";

type Props = {
  title: string;
  value: string | string[] | any;
  isChip?: boolean;
};

function DashboardDetailsCard({ title, value, isChip }: Props) {
  return (
    <div
      style={{ whiteSpace: "pre-wrap" }}
      className="flex flex-col gap-2 bg-neutral-100 rounded-xl p-4 items-start"
    >
      <p className="font-medium text-xs text-neutral-400">{title}</p>
      {isChip ? (
        <div className="flex flex-wrap gap-2">
          {Array.isArray(value) && value.map((c, idx) => <Chip key={idx} accessor={c} />)}
        </div>
      ) : (
        <div className="font-medium text-sm text-black">
          {value ? formatTextWithLinksAndNewlines(value) : "-"}
        </div>
      )}
    </div>
  );
}

function formatTextWithLinksAndNewlines(text: string) {
  const urlRegex = /(\bhttps?:\/\/[^\s]+[^\s.!?,;])/g;

  return text
    .split("\n")
    .map((line: string, index: React.Key | null | undefined) => {
      const parts = line.split(urlRegex).map((part, i) => {
        if (urlRegex.test(part)) {
          return (
            <a
              href={part}
              key={i}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {part}
            </a>
          );
        }
        return part;
      });

      return (
        <React.Fragment key={index}>
          {parts}
          <br />
        </React.Fragment>
      );
    });
}

export default DashboardDetailsCard;
