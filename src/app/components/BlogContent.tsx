import ReactMarkdown from 'react-markdown'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  const [processedContent, setProcessedContent] = useState(content)
  
  useEffect(() => {
    // Process content when it changes
    const processContent = (rawContent: string) => {
      console.log('Processing content for images...')
      
      // Replace custom image notation with regular markdown image syntax
      // Format: !![alt text](imageUrl|width=600,height=400,caption=Your caption text)
      const processed = rawContent.replace(
        /!!\[(.*?)\]\((.*?)(?:\|(.*?))?\)/g,
        (match, alt, src, metaString) => {
          console.log('Found image match:', { match, alt, src, metaString })
          // Store the metadata in a data attribute to be used by the image component
          return `![${alt}](${src}|${metaString || ''})`
        }
      )
      
      // If no replacements were made, log this for debugging
      if (processed === rawContent) {
        console.log('No custom image syntax found in content')
      } else {
        console.log('Content processed with image replacements')
      }
      
      return processed
    }
    
    setProcessedContent(processContent(content))
  }, [content])

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        components={{
          // Handle custom image rendering
          img: ({ node, ...props }) => {
            console.log('Rendering image:', props)
            
            // Extract source and metadata from the src prop
            const srcParts = props.src?.split('|') || []
            const imageUrl = srcParts[0]
            
            // Ensure the URL is valid and handle Supabase URLs correctly
            if (!imageUrl) {
              console.error('Image URL is missing')
              return <p className="text-red-500">Image URL is missing</p>
            }
            
            console.log('Processing image with URL:', imageUrl)
            
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
            
            try {
              return (
                <figure className="my-8">
                  <div className="relative w-full" style={{ height: `${height}px` }}>
                    <Image 
                      src={imageUrl}
                      alt={props.alt || ''}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                      unoptimized={imageUrl.includes('supabase.co')} // Skip optimization for Supabase URLs
                    />
                  </div>
                  {caption && (
                    <figcaption className="text-sm text-gray-500 mt-2 text-center italic">
                      {caption}
                    </figcaption>
                  )}
                </figure>
              )
            } catch (error) {
              console.error('Error rendering image:', error)
              return (
                <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
                  <p className="text-red-500">Error rendering image: {imageUrl}</p>
                </div>
              )
            }
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