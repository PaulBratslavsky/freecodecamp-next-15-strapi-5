import type { FeaturedArticleProps } from "@/types";
import Link from "next/link";
import { StrapiImage } from "@/components/StrapiImage";
import ReactMarkdown from "react-markdown";

export function FeaturedArticle({
  headline,
  link,
  excerpt,
  image,
}: FeaturedArticleProps) {
  return (
    <article className="highlight-article">
      <div className="highlight-article__info">
        <h3>{headline}</h3>
        <ReactMarkdown className="copy">{excerpt}</ReactMarkdown>
        <Link
          href={link.href}
          className="btn btn--turquoise btn--medium"
        >
          {link.text}
        </Link>
      </div>
      <StrapiImage
        src={image.url}
        alt={image.alternativeText || "No alternative text provided"}
        height={200}
        width={300}
      />
    </article>
  );
}
