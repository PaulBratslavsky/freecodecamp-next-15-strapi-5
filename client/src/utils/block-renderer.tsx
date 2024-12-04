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
      return <HeroSection {...block} key={block.id} />;
    case "blocks.info-block":
      return <InfoBlock {...block} key={block.id} />;
    case "blocks.featured-article":
      return <FeaturedArticle {...block} key={block.id} />;
    case "blocks.subscribe":
      return <Subscribe {...block} key={block.id} />;
    case "blocks.heading":
      return <Heading {...block} key={block.id} />;
    case "blocks.paragraph-with-image":
      return <ParagraphWithImage {...block} key={block.id} />;
    case "blocks.paragraph":
      return <Paragraph {...block} key={block.id} />;
    case "blocks.full-image":
      return <FullImage {...block} key={block.id} />;
    default:
      return null;
  }
}
