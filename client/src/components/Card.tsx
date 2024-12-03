import Link from "next/link";
import { StrapiImage } from "./StrapiImage";
import { ImageProps } from "@/types";
import { formatDate } from "@/utils/format-date";

interface CardProps {
  documentId: string;
  title: string;
  description: string;
  slug: string;
  image: ImageProps;
  price?: number;
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
  basePath,
}: CardProps) {
  return (
    <Link href={`/${basePath}/${slug}`} className="featured-items__article">
      <div className="featured-items__article-img">
        <StrapiImage
          src={image.url}
          alt={image.alternativeText || "No alternative text provided"}
          width={100}
          height={100}
        />
      </div>
      <div className="featured-items__article-text">
        <h5>{title}</h5>
        {price && <p>{price}</p>}
        {createdAt && <p>{formatDate(createdAt)}</p>}
        <p>{description.slice(0, 144)}...</p>
      </div>
    </Link>
  );
}
