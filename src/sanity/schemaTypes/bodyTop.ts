export default {
  name: "bodyTop",
  title: "Body Top",
  type: "document",
  fields: [
    {
      name: "backgroundImage",
      title: "Trending Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "categoriesBackgroundColor",
      title: "Categories Background Color",
      type: "string",
    },
    {
      name: "textColor",
      title: "Categories&Trending Text Color",
      type: "string",
    },
    {
      name: "parallaxImage",
      title: "Parallax-bg Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Name",
            },
            {
              name: "location",
              type: "string",
              title: "Location",
            },
            {
              name: "description",
              type: "text",
              title: "Description",
            },
            {
              name: "image",
              type: "image",
              title: "Image",
              options: {
                hotspot: true, // Enables image cropping
              },
            },
          ],
        },
      ],
    },
    {
      name: "footerImage",
      title: "Footer Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
