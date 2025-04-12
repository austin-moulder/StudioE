import ReactMarkdown from 'react-markdown'

interface BlogContentProps {
  content: string
}

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        components={{
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
          h2: ({ node, ...props }) => (
            <h2 {...props} className="text-2xl font-bold mb-3" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
} 