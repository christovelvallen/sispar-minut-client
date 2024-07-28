'use client';

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';

export default function DataPagination({
  pageTotal,
  pageIndex,
  setPageIndex,
}: {
  pageTotal: number;
  pageIndex: number;
  setPageIndex: (e: number) => void;
}) {
  return (
    <div className="flex items-center">
      <div className="flex-1">
        <p className="pr-3 text-sm text-muted-foreground">
          {`Page: ${pageIndex} / ${pageTotal}`}
        </p>
      </div>
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem></PaginationItem>
            <PaginationItem>
              <Button
                onClick={() => setPageIndex(pageIndex - 1)}
                disabled={pageIndex <= 1 ? true : false}
                variant="outline"
              >
                Previous
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                onClick={() => setPageIndex(pageIndex + 1)}
                disabled={pageIndex === pageTotal ? true : false}
                variant="outline"
              >
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
