import { ArticleProps } from "@/types";
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
