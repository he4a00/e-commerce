import { useGetAllProductReviewsQuery } from "@/app/store/slices/api/reviews/reviewSlice";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Star } from "lucide-react";
import { useState } from "react";
import UpVoteButton from "./Votes/UpVoteButton";
import DownVoteButton from "./Votes/DownVoteButton";

interface ReviewListProps {
  reviewID: string;
  rating: number;
  reviewText: string;
  reviewDate: Date;
  userName: string;
  totalUpVotes: number;
  totalDownVotes: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-green-600 text-green-600"
              : "fill-slate-100 text-slate-900"
          }`}
        />
      ))}
    </div>
  );
}

const ReviewsList = ({ productID }: { productID: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const { data: productReviews } = useGetAllProductReviewsQuery({
    productID: productID,
    PageIndex: currentPage,
    PageSize: pageSize,
  });

  const totalPages = productReviews?.result?.totalPages || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };
  return (
    <div className="space-y-4">
      {productReviews?.result?.items.length === 0 ? (
        <Card className="border-input">
          <CardContent className="p-4">
            <p className="text-center text-muted-foreground">
              No reviews yet. Be the first to review this product!
            </p>
          </CardContent>
        </Card>
      ) : (
        productReviews?.result?.items.map((review: ReviewListProps) => (
          <Card
            key={review.reviewID}
            className="border-input hover:border-green-500 transition-colors"
          >
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarFallback className="bg-primary/10">
                    {review.userName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-green-600">
                          {review.userName}
                        </p>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.reviewDate).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}{" "}
                        •{" "}
                        {new Date(review.reviewDate).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-col md:flex-row lg:flex-row">
                      <UpVoteButton
                        reviewID={review.reviewID}
                        totalUpVotes={review.totalUpVotes}
                        hasUpVoted={review.hasUpVoted}
                      />
                      <DownVoteButton
                        reviewID={review.reviewID}
                        totalDownVotes={review.totalDownVotes}
                        hasDownVoted={review.hasDownVoted}
                      />
                    </div>
                  </div>
                  <p className="text-sm break-all break-words">
                    {review.reviewText}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
      {productReviews?.result?.items.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {renderPaginationItems()}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ReviewsList;
