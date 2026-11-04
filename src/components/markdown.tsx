import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

const components: Components = {
  h1: ({ children, ...props }) => (
    <h1
      className="text-3xl md:text-4xl font-light mt-12 mb-6 leading-tight"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="text-2xl md:text-3xl font-light mt-12 mb-5 pt-6 border-t border-[var(--color-line)] leading-tight"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="text-xl md:text-2xl font-normal mt-8 mb-4 leading-tight"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-lg font-medium mt-6 mb-3" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-5 leading-[1.85] text-[var(--color-ink)]" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-[var(--color-primary)] underline underline-offset-4 hover:text-[var(--color-primary)]"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-5 space-y-2 list-disc pl-6 marker:text-[var(--color-primary)]" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-5 space-y-2 list-decimal pl-6 marker:text-[var(--color-primary)] marker:font-semibold" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-[1.85]" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="my-8 pl-5 border-l-2 border-[var(--color-primary)] text-lg leading-relaxed"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="px-1 py-0.5 bg-[var(--color-bg-alt)] text-[0.875em] font-mono text-[var(--color-primary)]"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={`${className} font-mono text-sm leading-relaxed`} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="my-6 p-5 bg-[var(--color-bg-alt)] border border-[var(--color-line)] overflow-x-auto text-sm leading-relaxed"
      {...props}
    >
      {children}
    </pre>
  ),
  hr: () => <hr className="my-10 border-[var(--color-line)]" />,
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse text-sm border border-[var(--color-line)]"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-[var(--color-bg-alt)]" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th
      className="px-4 py-2.5 text-left font-semibold border border-[var(--color-line)]"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-2.5 border border-[var(--color-line)]" {...props}>
      {children}
    </td>
  ),
  img: ({ src, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : ""}
      alt={alt ?? ""}
      className="my-6 rounded-[var(--radius-md)] border border-[var(--color-line)]"
      {...props}
    />
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-medium text-[var(--color-ink)]" {...props}>
      {children}
    </strong>
  ),
};

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
