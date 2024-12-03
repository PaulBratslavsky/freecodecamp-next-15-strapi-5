import { ContentList } from "@/components/ContentList";
import { getPageBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { blockRenderer } from "@/utils/block-renderer";
import { Card } from "@/components/Card";

async function loader() {
  const { data } = await getPageBySlug("blog");
  if (!data) notFound();
  return { blocks: data[0]?.blocks };
}

interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}

export default async function BlogRoute({ searchParams }: SearchParamsProps) {
  const params = (await searchParams) || {};

  const { blocks } = await loader();
  if (!blocks) notFound();
  return (
    <div className="blog-page">
      {blocks.map(blockRenderer)}
      <ContentList
        headline="Check out our latest articles"
        query={params?.query}
        page={params?.page}
        path="/api/articles"
        showSearch
        showPagination
        component={(props) => <Card {...props} basePath="blog" />}
      />
    </div>
  );
}
