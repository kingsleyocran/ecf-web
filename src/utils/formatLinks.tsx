import React from "react";


export function formatTextWithLinksAndNewlines(text: string) {
  const urlRegex = /(\bhttps?:\/\/[^\s]+[^\s.!?,;])/g;

  return text.split('\n').map((line: string, index: React.Key | null | undefined) => {
    const parts = line.split(urlRegex).map((part, i) => {
      if (urlRegex.test(part)) {
        return (
          <a href={part} key={i} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
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

