import { ContentList } from "@/components/ContentList";
import { getHomePage } from "@/data/loaders";
import { blockRenderer } from "@/utils/block-renderer";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";

async function loader() {
  const { data } = await getHomePage();
  if (!data) notFound();
  return { blocks: data?.blocks };
}

interface SearchParamsProps {
  searchParams?: {
    page?: string;
    query?: string;
  };
}

export default async function HomeRoute({ searchParams }: SearchParamsProps) {
  const params = (await searchParams) || {};
  const { blocks } = await loader();
  return (
    <div>
      {blocks.map(blockRenderer)}
      <div className="container">
        <ContentList
          headline="Featured Articles"
          path="/api/articles"
          component={(props) => <Card {...props} basePath="blog" />}
          className="blog-preview"
          featured
        />
      </div>
    </div>
  );
}
