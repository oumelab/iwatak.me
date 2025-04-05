'use client';

import { paginate } from "@/lib/paginate";
import {
  Pagination as _Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function Pagination({
  totalPosts,
  defaultPostsPerPage = 3,
  delta = 2,
}: {
  totalPosts: number;
  defaultPostsPerPage?: number;
  delta?: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') ?? '1');
  const postsPerPage = parseInt(searchParams.get('perPage') ?? defaultPostsPerPage.toString());

  const { pages, isFirstPage, isLastPage } = paginate({
    currentPage,
    totalPosts,
    postsPerPage,
    delta,
  });

  const createURL = useCallback(
    (value: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', value.toString());

      return pathname + '?' + params.toString();
    },
    [searchParams, pathname]
  );
  return (
    <_Pagination>
      <PaginationContent>
        {!isFirstPage && (
          <PaginationItem>
            <PaginationPrevious href={createURL(currentPage - 1)} />
          </PaginationItem>
        )}

        {pages.map((page, index) => {
          if (page.type === 'dots') {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          } else {
            return (
              <PaginationItem key={index}>
                <PaginationLink isActive={page.value === currentPage} href={createURL(page.value)}>
                  {page.value}
                </PaginationLink>
              </PaginationItem>
            );
          }
        })}

        {!isLastPage && (
          <PaginationItem>
            <PaginationNext href={createURL(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </_Pagination>
  )
}