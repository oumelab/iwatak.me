import type {MDXComponents} from "mdx/types";
import Pre from "./components/mdx/pre";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: (props) => <p className="my-4 leading-8" {...props} />,
    pre: (props) => {
      return (
        <Pre
          {...props}
          className={`not-prose shiki ${props.className ?? ""}`}
        />
      );
    },
    ...components,
  };
}
