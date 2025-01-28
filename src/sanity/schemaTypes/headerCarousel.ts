export const carousel = {
  name: "carousel",
  title: "Hero",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
      options: {
        disableAlpha: true,
      },
    },
    {
      name: "autoPlay",
      title: "Auto Play",
      type: "boolean",
    },
    {
      name: "infiniteLoop",
      title: "Infinite Loop",
      type: "boolean",
    },
    {
      name: "showArrows",
      title: "Show Arrows",
      type: "boolean",
    },
    {
      name: "swipeable",
      title: "Allow Swipe",
      type: "boolean",
    },
    {
      name: "interval",
      title: "Auto Play Interval",
      type: "number",
    },
    {
      name: "transitionTime",
      title: "Transition Time",
      type: "number",
    },
    {
      name: "slides",
      title: "Slides",
      type: "array",
      of: [
        {
          type: "slide", // This references the slide schema you need to define
        },
      ],
    },

    {
      name: "navigationItems",
      title: "Navigation Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "navItem",
          title: "Navigation Item",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
            },
            {
              name: "link",
              title: "Link",
              type: "url",
            },
          ],
        },
      ],
    },
    {
      name: "exclusiveTag",
      title: "Exclusive Tag",
      type: "string",
    },
    {
      name: "headerColor",
      title: "Header Color",
      type: "color",
      options: {
        disableAlpha: true,
      },
    },
    {
      name: "heroSlides",
      title: "Hero Slides",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "text",
              title: "Text",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};

export const slide = {
  name: "slide",
  title: "Slide",
  type: "object",
  fields: [
    {
      name: "text",
      title: "Text",
      type: "string",
    },
    // Add any other fields for slide, like images, buttons, etc.
  ],
};
