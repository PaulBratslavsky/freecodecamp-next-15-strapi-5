import type { Block } from "@/types";

import { HeroSection } from "@/components/blocks/HeroSection";
import { InfoBlock } from "@/components/blocks/InfoBlock";
import { FeaturedArticle } from "@/components/blocks/FeaturedArticle";
import { Subscribe } from "@/components/blocks/Subscribe";
import { Heading } from "@/components/blocks/Heading";
import { ParagraphWithImage } from "@/components/blocks/ParagraphWithImage";
import { Paragraph } from "@/components/blocks/Paragraph";
import { FullImage } from "@/components/blocks/FullImage";

export function blockRenderer(block: Block) {
  switch (block.__component) {
    case "blocks.hero-section":
      return <HeroSection {...block} />;
    case "blocks.info-block":
      return <InfoBlock {...block} />;
    case "blocks.featured-article":
      return <FeaturedArticle {...block} />;
    case "blocks.subscribe":
      return <Subscribe {...block} />;
    case "blocks.heading":
      return <Heading {...block} />;
    case "blocks.paragraph-with-image":
      return <ParagraphWithImage {...block} />;
    case "blocks.paragraph":
      return <Paragraph {...block} />;
    case "blocks.full-image":
      return <FullImage {...block} />;
    default:
      return null;
  }
}
