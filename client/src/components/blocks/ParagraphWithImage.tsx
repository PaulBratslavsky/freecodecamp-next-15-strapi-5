import ReactMarkdown from "react-markdown";
import { StrapiImage } from "../StrapiImage";
import { ParagraphWithImageProps } from "@/types";

export function ParagraphWithImage({
  content,
  image,
  reversed,
  imageLandscape,
}: ParagraphWithImageProps) {
  console.log(imageLandscape, "imageLandscape");
  return (
    <div className={`article-text-image ${reversed ? "article-text-image--reversed" : ""} ${imageLandscape ? "" : "article-text-image--portrait"}`}>
      <ReactMarkdown className="copy article-text-image__text article-paragraph">
        {content}
      </ReactMarkdown>
      <div className="article-text-image__container">
        <StrapiImage
          src={image.url}
          alt={image.alternativeText || "No alternative text provided"}
          width={1920}
          height={1080}
          className="article-text-image__image"
        />
      </div>
    </div>
  );
}