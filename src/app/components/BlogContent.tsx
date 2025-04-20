import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import { useState } from 'react'

interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  // Function to process content and extract image information
  const processImageMarkdown = (content: string) => {
    // Replace custom image notation with regular markdown image syntax
    // Format: !![alt text](imageUrl|width=600,height=400,caption=Your caption text)
    const processedContent = content.replace(
      /!!\[(.*?)\]\((.*?)(?:\|(.*?))?\)/g,
      (match, alt, src, metaString) => {
        // Store the metadata in a data attribute to be used by the image component
        return `![${alt}](${src}|${metaString || ''})`
      }
    )
    return processedContent
  }

  // Process the content
  const processedContent = processImageMarkdown(content)

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        components={{
          // Handle custom image rendering
          img: ({ node, ...props }) => {
            // Extract source and metadata from the src prop
            const srcParts = props.src?.split('|') || []
            const imageUrl = srcParts[0]
            
            // Parse metadata (width=600,height=400,caption=Your caption text)
            const metaString = srcParts[1] || ''
            const metadata: Record<string, string> = {}
            
            if (metaString) {
              metaString.split(',').forEach(item => {
                const [key, value] = item.split('=')
                if (key && value) {
                  metadata[key.trim()] = value.trim()
                }
              })
            }
            
            const width = metadata.width ? parseInt(metadata.width, 10) : 800
            const height = metadata.height ? parseInt(metadata.height, 10) : 500
            const caption = metadata.caption || ''
            
            return (
              <figure className="my-8">
                <div className="relative w-full" style={{ height: `${height}px` }}>
                  <Image 
                    src={imageUrl}
                    alt={props.alt || ''}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                  />
                </div>
                {caption && (
                  <figcaption className="text-sm text-gray-500 mt-2 text-center italic">
                    {caption}
                  </figcaption>
                )}
              </figure>
            )
          },
          // Customize link rendering with Studio E colors
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="text-[#F94C8D] hover:text-[#FF3366] transition-colors duration-200 no-underline hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          // You can customize other elements as needed
          p: ({ node, ...props }) => (
            <p {...props} className="mb-4" />
          ),
          h1: ({ node, ...props }) => (
            <h1 {...props} className="text-3xl font-bold mb-4" />
          ),
          h2: ({ ...props }) => {
            // Generate an ID based on the heading text
            const id = `header-${props.children?.toString().toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).substring(2, 9)}`
            return <h2 {...props} id={id} className="text-2xl font-bold mb-3 pt-6" />
          },
          h3: ({ ...props }) => {
            // Generate an ID based on the heading text
            const id = `header-${props.children?.toString().toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).substring(2, 9)}`
            return <h3 {...props} id={id} className="text-xl font-bold mb-2 pt-4" />
          },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  )
} 