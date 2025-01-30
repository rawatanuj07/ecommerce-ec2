import { type SchemaTypeDefinition } from "sanity";
import { carousel, slide } from "./headerCarousel";
import bodyTop from "./bodyTop";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [carousel, slide, bodyTop],
};
