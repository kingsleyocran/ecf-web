import React from "react";
import Head from "next/head";
import favicon from "../../../public/favicon/favicon.ico";

type Props = {
  jsonLd: any;
  metaDataTag: any;
};

function CustomHead({ jsonLd, metaDataTag }: Props) {
  const webColor = "#FFB12B";
  const webName = "Emerging Climate Frontiers";
  const websiteUrl = "https://ecfrontiers.org";
  const twitterHandle = "ecfrontiers";

  if (!jsonLd || !metaDataTag) return (<></>);

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="apple-mobile-web-app-title" content={metaDataTag.title} />
      <meta name="application-name" content={metaDataTag.title} />
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content={webColor} />

      {/* Link Tags */}
      <link rel="canonical" href={metaDataTag.alternates.canonical}></link>
      <link rel="shortcut icon" href={favicon.src} type="image/x-icon" />
      {/* <link
        rel="alternate"
        type="application/rss+xml"
        href="https://dminhvu.com/rss.xml"
      /> */}
      <link rel="icon" href={favicon.src} type="image/x-icon" />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link
        rel="icon"
        type="image/png"
        href="/favicon-16x16.png"
        sizes="16x16"
      />

      <title>{metaDataTag.title}</title>
      <meta name="description" content={metaDataTag.description} />
      <meta property="title" content={metaDataTag.title} />
      <meta name="keywords" content={metaDataTag.keywords} />
      {/* Robot & Crawler Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* AI Crawler Tags */}
      <meta name="GPTBot" content="index, follow" />
      <meta name="ClaudeBot" content="index, follow" />
      <meta name="Google-Extended" content="index, follow" />
      <meta name="PerplexityBot" content="index, follow" />
      <meta name="CCBot" content="index, follow" />

      {/* OpenGraph Tags */}
      <meta property="og:title" content={metaDataTag.title} />
      <meta property="og:description" content={metaDataTag.description} />
      <meta property="og:image" content={metaDataTag.openGraph.images[0].url} />
      <meta
        property="og:image:alt"
        content={metaDataTag.openGraph.images[0].alt}
      />
      <meta
        property="og:image:type"
        content={metaDataTag.openGraph.images[0].type}
      />
      <meta
        property="og:image:width"
        content={metaDataTag.openGraph.images[0].width}
      />
      <meta
        property="og:image:height"
        content={metaDataTag.openGraph.images[0].height}
      />
      <meta property="og:site_name" content={webName} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={metaDataTag.openGraph.type} />
      <meta property="og:url" content={metaDataTag.openGraph.url} />

      {/* OpenGraph Article TAGS */}
      <meta property="article:author" content={websiteUrl} />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${twitterHandle}`} />
      <meta name="twitter:creator" content={`@${twitterHandle}`} />
      <meta name="twitter:title" content={metaDataTag.title} />
      <meta name="twitter:description" content={metaDataTag.description} />
      <meta name="twitter:image" content={metaDataTag.twitter.images[0].url} />
      <meta name="twitter:image:alt" content={metaDataTag.twitter.images[0].alt} />

      {/* Other */}
      <meta name="google" content="notranslate" />

      {/* other parts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}

export default CustomHead;
