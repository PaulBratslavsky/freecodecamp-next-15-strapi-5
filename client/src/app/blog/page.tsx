import { ContentList } from "@/components/ContentList";
import { getPageBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { blockRenderer } from "@/utils/block-renderer";
import { Card, type CardProps } from "@/components/ContentList";

async function loader() {
  const { data } = await getPageBySlug("blog");
  if (!data) notFound();
  return { blocks: data[0]?.blocks };
}

interface PageProps {
  searchParams: Promise<{ page?: string; query?: string }>
}

const BlogCard = (props: Readonly<CardProps>) => <Card {...props} basePath="blog" />; 

export default async function BlogRoute({ searchParams }: PageProps) {
  const { page, query } = await searchParams;
  const { blocks } = await loader();
  if (!blocks) notFound();
  return (
    <div className="blog-page">
      {blocks.map(blockRenderer)}
      <ContentList
        headline="Check out our latest articles"
        path="/api/articles"
        query={query}
        page={page}
        showSearch
        showPagination
        component={BlogCard}
      />
    </div>
  );
}
