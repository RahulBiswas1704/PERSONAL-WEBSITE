import Link from "next/link";
import React from "react";

const MDXComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-2xl font-bold tracking-tight mt-8 mb-4 text-foreground" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-bold tracking-tight mt-8 mb-3 text-foreground" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-semibold tracking-tight mt-6 mb-2 text-foreground" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-7 mb-4 text-muted dark:text-neutral-300" {...props} />
  ),
  a: ({ href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternal = href && href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className="accent-link" {...props} />
      );
    }
    return (
      <a
        href={href}
        className="accent-link"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  },
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-3 border-accent pl-4 italic my-6 text-muted-light dark:text-neutral-400" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-6 mb-4 space-y-2 text-muted dark:text-neutral-300" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-6 mb-4 space-y-2 text-muted dark:text-neutral-300" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="overflow-x-auto p-4 rounded-md bg-neutral-50 dark:bg-neutral-900 border border-border my-6 text-sm font-mono leading-relaxed" {...props} />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isCodeBlock = className?.includes("language-");
    if (isCodeBlock) {
      return <code className={className} {...props} />;
    }
    return (
      <code className="bg-code-bg text-code-fg dark:bg-neutral-900 dark:text-rose-400 px-1 py-0.5 rounded text-xs font-mono" {...props} />
    );
  },
};

export default MDXComponents;
