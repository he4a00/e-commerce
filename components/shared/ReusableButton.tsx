import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";

type ReusableButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link";
};
const ReusableButton = ({
  title,
  onClick,
  disabled,
  className,
  variant = "outline",
}: ReusableButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(buttonVariants({ variant: variant }), className)}
    >
      {title}
    </Button>
  );
};

export default ReusableButton;
