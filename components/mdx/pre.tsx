"use client";

import {cn} from "@/lib/utils";
import {Check, Copy, ChevronDown, ChevronUp} from "lucide-react";
import {
  DetailedHTMLProps,
  HTMLAttributes,
  useRef,
  useState,
  useEffect,
} from "react";
import {Button} from "../ui/button";

const MAX_LINES = 18; // 折りたたみの閾値
const LINE_HEIGHT = 20; // 1行の高さ（px）

interface PreProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> {
  "data-collapsible"?: string;
}

export default function Pre({children, ...props}: PreProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowToggle, setShouldShowToggle] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  // data-collapsible属性をチェック
  const isCollapsible = props["data-collapsible"] === "true";


  // コードの行数を計算して折りたたみボタンの表示を決定
  useEffect(() => {
    if (preRef.current && isCollapsible) {
      const lineCount = preRef.current.textContent?.split("\n").length || 0;
      console.log("Line count:", lineCount);
      console.log("Should show toggle:", lineCount > MAX_LINES);
      setShouldShowToggle(lineCount > MAX_LINES);
    }
  }, [children, isCollapsible]);

  const handleClickCopy = async () => {
    const code = preRef.current?.textContent;

    if (code) {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // 折りたたみ時の最大高さを計算
  const maxHeight = MAX_LINES * LINE_HEIGHT + 32; // 32pxはパディング分

  return (
    <div className="relative">
      <pre
        ref={preRef}
        {...props}
        className={cn(
          "px-5 py-4 overflow-x-auto transition-all duration-300 ease-in-out",
          isCollapsible &&
            shouldShowToggle &&
            !isExpanded &&
            `overflow-y-hidden`,
          isCollapsible && shouldShowToggle && isExpanded && "pb-12"
        )}
        style={{
          ...(isCollapsible && shouldShowToggle && !isExpanded
            ? {maxHeight: `${maxHeight}px`}
            : {}),
        }}
      >
        {children}
      </pre>

      {/* コピーボタン */}
      <Button
        variant="ghost"
        disabled={isCopied}
        onClick={handleClickCopy}
        className={cn(
          "group absolute z-[2] top-1 right-2 size-8 grid place-content-center text-zinc-400 bg-transparent hover:text-foreground hover:bg-muted dark:hover:bg-muted dark:text-muted-foreground dark:hover:text-white focus-within:text-white focus-within:bg-zinc-700 dark:focus-within:bg-zinc-900 rounded-sm cursor-pointer",
          isCopied && "text-foreground bg-muted dark:text-white dark:bg-muted"
        )}
      >
        {isCopied ? <Check className="text-white" /> : <Copy className="" />}
      </Button>

      {/* 展開/折りたたみボタン（コードブロック内） */}
      {isCollapsible && shouldShowToggle && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 z-10">
          <Button
            onClick={toggleExpanded}
            variant="ghost"
            size="default"
            className="text-muted-foreground font-bold text-md hover:text-foreground dark:text-muted-foreground dark:hover:text-white rounded-sm bg-pre-bg dark:bg-pre-bg hover:bg-muted dark:hover:bg-muted cursor-pointer"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" />
                少なく表示
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" />
                すべて表示
              </>
            )}
          </Button>
        </div>
      )}

      {/* グラデーションオーバーレイ（折りたたみ時のみ） */}
      {isCollapsible && shouldShowToggle && !isExpanded && (
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-pre-bg/100 dark:from-pre-bg/100 via-pre-bg/90 dark:via-pre-bg/90 to-transparent pointer-events-none rounded-b-sm" />
      )}
    </div>
  );
}
