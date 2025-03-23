
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatGender, formatAddress, getPatientAge } from "@/utils/formatters";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type PatientCardProps = {
  patient: any;
  className?: string;
  showDetails?: boolean;
};

const PatientCard = ({ patient, className, showDetails = true }: PatientCardProps) => {
  if (!patient) return null;

  const name = patient.name[0];
  const fullName = `${name.given ? name.given.join(' ') : ''} ${name.family || ''}`.trim();
  const age = getPatientAge(patient.birthDate);
  const gender = formatGender(patient.gender);
  const avatar = patient.photo?.[0]?.url || 'https://www.gravatar.com/avatar/?d=mp&s=200';
  
  return (
    <Card className={cn("overflow-hidden backdrop-blur-sm border border-border/50 transition-all duration-300", className)}>
      <CardHeader className="p-4 pb-2 flex flex-row items-center gap-4">
        <div className="h-16 w-16 rounded-full overflow-hidden border border-border/50 bg-secondary">
          <img 
            src={avatar} 
            alt={fullName}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Fallback if image fails to load
              (e.target as HTMLImageElement).src = 'https://www.gravatar.com/avatar/?d=mp&s=200';
            }}
          />
        </div>
        <div>
          <h3 className="text-lg font-medium">{fullName}</h3>
          <div className="text-sm text-muted-foreground">
            {age} • {gender}
          </div>
        </div>
      </CardHeader>
      
      {showDetails && (
        <CardContent className="p-4 pt-2">
          <div className="grid gap-2">
            {patient.identifier && patient.identifier.length > 0 && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-muted-foreground">MRN</span>
                <span className="text-sm">{patient.identifier[0].value}</span>
              </div>
            )}
            
            {patient.birthDate && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-muted-foreground">DOB</span>
                <span className="text-sm">{patient.birthDate}</span>
              </div>
            )}
            
            {patient.telecom && patient.telecom.length > 0 && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-muted-foreground">Phone</span>
                <span className="text-sm">
                  {patient.telecom.find((t: any) => t.system === 'phone')?.value || 'N/A'}
                </span>
              </div>
            )}
            
            {patient.address && (
              <div className="grid grid-cols-2">
                <span className="text-sm text-muted-foreground">Address</span>
                <span className="text-sm">{formatAddress(patient.address)}</span>
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <Link 
              to={`/patient/${patient.id}`} 
              className="text-sm text-primary hover:underline"
            >
              View full profile
            </Link>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default PatientCard;
