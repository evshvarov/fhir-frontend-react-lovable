
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type DataCardProps = {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  icon?: ReactNode;
};

const DataCard = ({ 
  title, 
  children, 
  footer, 
  className, 
  headerClassName,
  contentClassName,
  icon 
}: DataCardProps) => {
  return (
    <Card className={cn("overflow-hidden border border-border/50 transition-all duration-300 hover:shadow-subtle", className)}>
      <CardHeader className={cn("p-4 pb-2 flex flex-row items-center justify-between", headerClassName)}>
        <CardTitle className="text-lg font-medium">
          {title}
        </CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      
      <CardContent className={cn("p-4 pt-2", contentClassName)}>
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default DataCard;
