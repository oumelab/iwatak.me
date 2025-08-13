'use client';

import { Check, Clipboard } from 'lucide-react';
import { DetailedHTMLProps, HTMLAttributes, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

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
        className={cn('group absolute top-4 right-4 size-8 grid place-content-center text-zinc-400 bg-transparent hover:text-white hover:bg-zinc-700 dark:hover:bg-zinc-900 dark:text-muted-foreground dark:hover:text-white focus-within:text-white focus-within:bg-zinc-700 dark:focus-within:bg-zinc-900 rounded-sm cursor-pointer', isCopied && 'text-white bg-zinc-700 dark:bg-zinc-900')}
      >
        {isCopied ? <Check className="text-white" /> : <Clipboard className="" />}
      </Button>
      {children}
    </pre>
  );
}