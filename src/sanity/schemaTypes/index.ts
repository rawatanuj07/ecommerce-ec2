import { type SchemaTypeDefinition } from "sanity";
import { carousel, slide } from "./headerCarousel";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [carousel, slide],
};
