import { ArticleProps, ImageProps } from "@/types";
import { getContent } from "@/data/loaders";
import { Search } from "./Search";
import { PaginationComponent } from "./Pagination";

interface ContentListProps {
  headline: string;
  query?: string;
  page?: string;
  path: string;
  featured?: boolean;
  component: React.ComponentType<ArticleProps & { basePath: string }>;
  showSearch?: boolean;
  showPagination?: boolean;
  headlineAlignment?: "center" | "right" | "left";
}

async function loader(
  path: string,
  query?: string,
  page?: string,
  featured?: boolean
) {
  const { data, meta } = await getContent(path, query, page, featured);
  return {
    articles: (data as ArticleProps[]) || [],
    pageCount: meta?.pagination?.pageCount || 1,
  };
}

export async function ContentList({
  headline,
  query,
  page,
  path,
  featured,
  component,
  showSearch,
  showPagination,
  headlineAlignment,
}: Readonly<ContentListProps>) {
  const { articles, pageCount } = await loader(path, query, page, featured);
  const Component = component;
  return (
    <section className="content-items">
      <h3 className={`content-items__headline ${headlineAlignment ?? ""}`}>
        {headline || "Featured Articles"}
      </h3>
      {showSearch && <Search />}
      <div className="content-items__container--card">
        {articles.map((article) => (
          <Component key={article.documentId} {...article} basePath={path} />
        ))}
      </div>
      {showPagination && <PaginationComponent pageCount={pageCount} />}
    </section>
  );
}
import Link from "next/link";
import { StrapiImage } from "./StrapiImage";
import { formatDate } from "@/utils/format-date";

export interface CardProps {
  documentId: string;
  title: string;
  description: string;
  slug: string;
  image: ImageProps;
  price?: number;
  startDate?: string;
  createdAt: string;
  basePath: string;
}


export function Card({
  title,
  description,
  slug,
  image,
  price,
  createdAt,
  startDate,
  basePath,
}: Readonly<CardProps>) {
  return (
    <Link href={`/${basePath}/${slug}`} className="content-items__card">
      <div className="content-items__card-img">
        <StrapiImage
          src={image.url}
          alt={image.alternativeText || "No alternative text provided"}
          width={100}
          height={100}
        />
      </div>
      <div className="content-items__card-text">
        <h5>{title}</h5>
        {price && <p><span>Price: </span>{price}</p>}
        {(startDate || createdAt) && <p>{formatDate(startDate || createdAt)}</p>}
        <p>{description.slice(0, 144)}...</p>
      </div>
    </Link>
  );
}