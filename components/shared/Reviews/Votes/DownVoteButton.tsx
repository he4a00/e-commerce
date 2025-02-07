import { useDownVoteMutation } from "@/app/store/slices/api/votes/voteSlice";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ThumbsDown } from "lucide-react";
import React, { useEffect } from "react";

interface UpVoteProps {
  reviewID: string;
  totalDownVotes: number;
  hasDownVoted: boolean;
}

const DownVoteButton = ({
  reviewID,
  totalDownVotes,
  hasDownVoted,
}: UpVoteProps) => {
  const { toast } = useToast();
  const [downVote, { isLoading, isSuccess }] = useDownVoteMutation();

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Voted added successfully",
        description: "Your vote has been added to the review",
      });
    }
  }, [isSuccess, toast]);
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`flex items-center gap-1 ${
        hasDownVoted
          ? "text-blue-600 bg-blue-100"
          : "hover:text-blue-600 hover:bg-blue-100"
      }`}
      disabled={isLoading}
      onClick={() => downVote(reviewID as string)}
    >
      <ThumbsDown className={`w-4 h-4 ${hasDownVoted ? "fill-current" : ""}`} />
      <span>{totalDownVotes}</span>
    </Button>
  );
};

export default DownVoteButton;
