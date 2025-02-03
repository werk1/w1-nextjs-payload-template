import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media', // URL-friendly identifier for the collection
  access: {
    read: () => true, // Makes media publicly readable
  },
  upload: {
    staticDir: 'public/media', // Where files are stored physically
    adminThumbnail: 'thumbnail', // Which size to show in admin panel
    mimeTypes: ['image/*'], // Only allows image files
    imageSizes: [
      {
        name: 'thumbnail', // Creates 400px wide thumbnails
        width: 400,
        height: undefined, // Maintains aspect ratio
        position: 'centre',
      },
      {
        name: 'slider', // Creates 1920px wide versions for sliders
        width: 1920,
        height: undefined, // Maintains aspect ratio
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'usecase', // Dropdown to categorize images
      type: 'select',
      options: [
        { label: 'Top Slider', value: 'slider-top' },
        { label: 'Bottom Slider', value: 'slider-bottom' },
        { label: 'General', value: 'general' },
      ],
      defaultValue: 'general',
    },
    // Additional metadata fields
    { name: 'alt', type: 'text', required: true }, // Accessibility text
    { name: 'title', type: 'text' }, // Optional title
    { name: 'description', type: 'textarea' }, // Optional description
  ],
}
