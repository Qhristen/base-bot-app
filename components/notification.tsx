import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/Alert";
import { InfoIcon } from "@/assets/icons";
import { cn } from "@/utils/cn";

interface INotificationType {
  className?: string;
  message: string;
  type: "error" | "success";
}
const Notification = ({ className, message, type }: INotificationType) => {
  return (
    <div>
      <Alert
        variant={`default`}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center gap-2 border-0",
          className,
          type === "error" ? "bg-destructive-foreground" : "bg-green-foreground"
        )}
      >
        <InfoIcon
          className={cn(
            className,
            type === "error" ? "fill-destructive" : "fill-green"
          )}
        />
        <AlertTitle
          className={cn(
            className,
            type === "error" ? "text-destructive" : "text-green"
          )}
        >
          {message}
        </AlertTitle>
      </Alert>
    </div>
  );
};

export default Notification;
