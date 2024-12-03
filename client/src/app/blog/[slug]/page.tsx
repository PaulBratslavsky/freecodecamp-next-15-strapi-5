import type { ArticleProps } from "@/types";
import { getArticleBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { blockRenderer } from "@/utils/block-renderer";
import { formatDate } from "@/utils/format-date";

import type { Block } from "@/types";
import { HeroSection } from "@/components/blocks/HeroSection";
import { ContentList } from "@/components/ContentList";
import { Card } from "@/components/Card";
import Link from "next/link";

interface SingleBlogRouteProps {
  params: {
    slug: string;
  };
}

async function loader(slug: string) {
  const { data } = await getArticleBySlug(slug);
  const article = data[0];
  if (!article) throw notFound();
  return { article: article as ArticleProps, blocks: article?.blocks };
}

function ArticleOverview({
  headline,
  description,
  tableOfContents,
}: {
  headline: string;
  description: string;
  tableOfContents: { heading: string; linkId: string }[];
}) {
  return (
    <div className="article-overview">
      <div className="article-overview__info">
        <h3 className="article-overview__headline">{headline}</h3>
        <p className="article-overview__description">{description}</p>
      </div>

      {tableOfContents && (
        <ul className="article-overview__contents">
          {tableOfContents.map((item, index) => (
            <li key={index}>
              <Link href={`#${item.linkId}`} className="article-overview__link">
                {index + 1}. {item.heading}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default async function SingleBlogRoute(props: SingleBlogRouteProps) {
  const params = await props?.params;
  const { slug } = params;
  const { article, blocks } = await loader(slug);
  const { title, author, publishedAt, description, image } = article;

  const tableOfContents = blocks?.filter(
    (block: Block) => block.__component === "blocks.heading"
  );

  console.dir(blocks, { depth: null });

  return (
    <div>
      <HeroSection
        id={article.id}
        headline={title}
        theme="orange"
        image={image}
        author={author}
        publishedAt={formatDate(publishedAt)}
        darken={true}
      />

      <div className="container">
        <ArticleOverview
          headline={title}
          description={description}
          tableOfContents={tableOfContents}
        />
        {blocks && blocks.map(blockRenderer)}
        <ContentList
          headline="Featured Articles"
          path="/api/articles"
          component={(props) => <Card {...props} basePath="blog" />}
          className="blog-preview"
          featured={true}
        />
      </div>
    </div>
  );
}
