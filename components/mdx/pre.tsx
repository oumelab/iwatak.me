'use client';

import { Check, Clipboard } from 'lucide-react';
import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from 'react';
import { Button } from '../ui/button';

export default function Pre({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) {
  const [isCopied, setIsCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

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

  return (
    <pre ref={preRef} {...props} className='relative px-5 py-4'>
      <Button
        disabled={isCopied}
        onClick={handleClickCopy}
        className='absolute top-4 right-4 size-8 grid place-content-center dark:bg-zinc-900 dark:text-muted-foreground rounded-sm cursor-pointer'
      >
        {isCopied ? <Check className="text-muted dark:text-muted-foreground" /> : <Clipboard className="text-muted-foreground dark:text-muted-foreground" />}
      </Button>
      {children}
    </pre>
  );
}