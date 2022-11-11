import React, { FC } from "react";
import { Helmet } from "react-helmet";

interface SEOProps {
  title: string;
  desc?: string;
  lang?: string;
}

const SEO: FC<SEOProps> = ({ title, desc, lang }) => {
  return (
    <Helmet
      htmlAttributes={{
        lang: lang || "en",
      }}
      title={title}
      titleTemplate={`Readmi | ${title}`}
      meta={[
        {
          name: `description`,
          content: desc,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: desc,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: `@saurra3h`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: desc,
        },
      ]}
    />
  );
};

export default SEO;
