import { cn } from "../../@/lib/utils";

interface ErrorLabelInterface {
  label: string;
  style?: string;
}

function ErrorLabel({ label, style }: ErrorLabelInterface) {
  return (
    <i className={cn("text-destructive text-xs pl-1", style)}>{label}</i>
  );
}
export default ErrorLabel;
