import { getPageBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import { blockRenderer } from "@/utils/block-renderer";

async function loader(slug: string) {
  const { data } = await getPageBySlug(slug);
  if (data.length === 0) notFound();
  return { blocks: data[0]?.blocks };
}

interface DynamicPageRouteProps {
  params: {
    slug: string;
  };
}

export default async function DynamicPageRoute(props: DynamicPageRouteProps) {
  const params = await props?.params;
  const { slug } = params;
  const { blocks } = await loader(slug);
  return <div>{blocks.map(blockRenderer)}</div>;
}

