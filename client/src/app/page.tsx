import { ContentList } from "@/components/ContentList";
import { getHomePage } from "@/data/loaders";
import { notFound } from "next/navigation";
import { Card, type CardProps } from "@/components/Card";
import { BlockRenderer } from "@/components/BlockRenderer";
async function loader() {
  const { data } = await getHomePage();
  if (!data) notFound();
  return { blocks: data?.blocks };
}

const BlogCard = (props: Readonly<CardProps>) => <Card {...props} basePath="blog" />;

export default async function HomeRoute() {
  const { blocks } = await loader();
  return (
    <div>
      <BlockRenderer blocks={blocks} />
      <div className="container">
        <ContentList
          headline="Featured Articles"
          headlineAlignment="left"
          path="/api/articles"
          component={BlogCard}
          featured
        />
      </div>
    </div>
  );
}
