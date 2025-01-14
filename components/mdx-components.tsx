import React from "react";
import NavLink from "next/link";
import { MDXComponents } from "mdx/types";
import { cn } from "@/lib/cn";
import { Pre } from "./code-block";
import { ComponentPreview, ComponentPreviewProps } from "./component-preview";

export const mdxComponents: MDXComponents = {
  h1: createHeading(1, "font-heading mt-2 scroll-m-20 text-2xl font-bold"),
  h2: createHeading(
    2,
    "font-heading mt-8 scroll-m-20 pb-1 text-xl font-semibold tracking-tight first:mt-0"
  ),
  h3: createHeading(
    3,
    "font-heading mt-4 scroll-m-20 text-xl font-semibold tracking-tight"
  ),
  h4: createHeading(
    4,
    "font-heading mt-6 scroll-m-20 text-lg font-semibold tracking-tight"
  ),
  h5: createHeading(5, "mt-6 scroll-m-20 text-lg font-semibold tracking-tight"),
  h6: createHeading(
    6,
    "mt-6 scroll-m-20 text-base font-semibold tracking-tight"
  ),
  a: Link,
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "text-base leading-7 [&:not(:first-child)]:mt-4",
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-4 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-4 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic [&>*]:text-fg-muted",
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }) => (
    <div className="my-6 w-full overflow-y-auto rounded-md">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }) => (
    <thead className={cn("bg-bg-muted", className)} {...props} />
  ),
  tr: ({ className, ...props }) => (
    <tr className={cn("m-0 border-t p-0 text-sm", className)} {...props} />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border px-2 py-2 text-left font-bold sm:px-4 [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, children, ...props }) => (
    <td
      className={cn(
        "border px-2 py-2 text-left sm:px-4 [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </td>
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <Pre className={cn("[&:not(:first-child)]:mt-4", className)} {...props} />
  ),
  ComponentPreview: ({ className, ...props }: ComponentPreviewProps) => (
    <ComponentPreview className={cn("mt-6", className)} {...props} />
  ),
};

function createHeading(level: number, className?: string) {
  const Component = ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => {
    return React.createElement(`h${level}`, { className, ...props }, children);
  };
  Component.displayName = `Heading${level}`;
  return Component;
}

function Link({
  className,
  href,
  children,
  ...props
}: React.ComponentProps<"a">) {
  const classes = cn("font-medium underline underline-offset-4", className);

  if (!!href?.startsWith("/")) {
    return (
      <NavLink {...props} href={href} className={classes}>
        {children}
      </NavLink>
    );
  }

  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      {...props}
      href={href}
      className={classes}
    >
      {children}
    </a>
  );
}
