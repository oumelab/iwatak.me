import type {MDXComponents} from "mdx/types";
import Pre from "./components/mdx/pre";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: (props) => <p className="my-4 leading-8" {...props} />,
    pre: (props) => {

      // 特定の言語で自動的に折りたたみ機能を有効にする
      const dataLanguage = props["data-language"];
      if (
        dataLanguage === "typescript" ||
        dataLanguage === "ts" ||
        dataLanguage === "javascript" ||
        dataLanguage === "js" ||
        dataLanguage === "json" ||
        dataLanguage === "css"
      ) {
        return <Pre {...props} className={`not-prose shiki ${props.className ?? ''}`} data-collapsible="true" />;
      }
      return <Pre {...props} className={`not-prose shiki ${props.className ?? ''}`} />;
    },
    ...components,
  };
}
