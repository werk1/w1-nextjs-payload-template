import { CollectionConfig } from 'payload'

export const TextContent: CollectionConfig = {
  slug: 'text-content',
  fields: [
    {
      name: 'identifier',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [
        {
          slug: 'title',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
            {
              name: 'level',
              type: 'select',
              options: [
                { label: 'H1', value: 'h1' },
                { label: 'H2', value: 'h2' },
                { label: 'H3', value: 'h3' },
              ],
              defaultValue: 'h2',
            },
          ],
        },
        {
          slug: 'textBody',
          fields: [
            {
              name: 'content',
              type: 'textarea', // Changed from 'text' to 'textarea'
              required: true,
            },
            {
              name: 'variant',
              type: 'select',
              options: [
                { label: 'Standard', value: 'standard' },
                { label: 'Highlight', value: 'highlight' },
                { label: 'Small', value: 'small' },
              ],
              defaultValue: 'standard',
            },
          ],
        },
      ],
    },
  ],
}
