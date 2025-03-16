type PaginationOptions = {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  delta?: number;
}

type PageItem = 
| {
  type: 'number';
  value: number;
}
| {
  type: 'dots';
  value?: undefined;
}

type PaginationResult = {
  pages: PageItem[];
  isFirstPage: boolean;
  isLastPage: boolean;  
}

export const paginate = (options: PaginationOptions): PaginationResult => {
  const { totalPosts, postsPerPage, currentPage, delta = 2 } = options;
  const pageCount = Math.ceil(totalPosts / postsPerPage);
  const pages: PageItem[] = [];
  const rangeStart = Math.max(2, currentPage - delta);
  const rangeEnd = Math.min(pageCount - 1, currentPage + delta);

  if (currentPage - delta > 2) {
    pages.push({ type: 'dots' });
  }

  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push({ type: 'number', value: i });
  }

  if (currentPage + delta < pageCount - 1) {
    pages.push({ type: 'dots' });
  }

  if (pageCount > 1) {
    pages.unshift({ type: 'number', value: 1 });
    pages.push({ type: 'number', value: pageCount });
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  return {
    pages,
    isFirstPage,
    isLastPage,
  }
}