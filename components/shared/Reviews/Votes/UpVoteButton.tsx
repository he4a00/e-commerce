import { useUpVoteMutation } from "@/app/store/slices/api/votes/voteSlice";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ThumbsUp } from "lucide-react";
import React, { useEffect } from "react";

interface UpVoteProps {
  reviewID: string;
  totalUpVotes: number;
  hasUpVoted: boolean;
}

const UpVoteButton = ({ reviewID, totalUpVotes, hasUpVoted }: UpVoteProps) => {
  const { toast } = useToast();
  const [upVote, { isLoading, isSuccess }] = useUpVoteMutation();

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
        hasUpVoted
          ? "text-blue-600 bg-blue-100"
          : "hover:text-blue-600 hover:bg-blue-100"
      }`}
      disabled={isLoading}
      onClick={() => upVote(reviewID as string)}
    >
      <ThumbsUp className={`w-4 h-4 ${hasUpVoted ? "fill-current" : ""}`} />
      <span>{totalUpVotes}</span>
    </Button>
  );
};

export default UpVoteButton;
