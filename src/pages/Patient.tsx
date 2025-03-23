
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { getPatientById, fetchPatientObservations, fetchPatientMedications, fetchPatientImmunizations } from "@/utils/mockData";
import { formatGender, formatAddress, getPatientAge, formatDate, getObservationName, formatObservationValue, getMedicationName, getMedicationInstructions, getImmunizationName } from "@/utils/formatters";
import { Heart, Pill, Syringe, ArrowLeft, Activity } from "lucide-react";
import DataCard from "@/components/DataCard";
import { Card, CardContent } from "@/components/ui/card";
import HemoglobinChart from "@/components/HemoglobinChart";

const Patient = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const patientId = id || "patient-1"; // Default to first patient if no ID provided
  
  const { data: patient, isLoading: isLoadingPatient } = useQuery({
    queryKey: ['patient', patientId],
    queryFn: () => getPatientById(patientId),
  });
  
  const { data: observations = [], isLoading: isLoadingObservations } = useQuery({
    queryKey: ['patientObservations', patientId],
    queryFn: () => fetchPatientObservations(patientId),
    enabled: !!patientId,
  });
  
  const { data: medications = [], isLoading: isLoadingMedications } = useQuery({
    queryKey: ['patientMedications', patientId],
    queryFn: () => fetchPatientMedications(patientId),
    enabled: !!patientId,
  });
  
  const { data: immunizations = [], isLoading: isLoadingImmunizations } = useQuery({
    queryKey: ['patientImmunizations', patientId],
    queryFn: () => fetchPatientImmunizations(patientId),
    enabled: !!patientId,
  });
  
  const isLoading = isLoadingPatient || isLoadingObservations || isLoadingMedications || isLoadingImmunizations;
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-12">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Loading patient data...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Patient Not Found</h1>
          <p className="text-muted-foreground mt-2">The patient you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }
  
  // Format patient details
  const name = patient.name?.[0] || {};
  const fullName = `${name.given ? name.given.join(' ') : ''} ${name.family || ''}`.trim();
  const age = getPatientAge(patient.birthDate);
  const gender = formatGender(patient.gender);
  const address = formatAddress(patient.address);
  const avatar = patient.photo?.[0]?.url || 'https://www.gravatar.com/avatar/?d=mp&s=200';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid gap-8 page-transition">
          <section className="mt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="mb-4 flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            
            <Card className="border border-border/50 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="h-24 w-24 rounded-full overflow-hidden border border-border/50 bg-secondary flex-shrink-0">
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
                  
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold tracking-tight">
                      {fullName}
                    </h1>
                    <div className="text-muted-foreground mt-1 flex flex-wrap gap-x-6 gap-y-1">
                      <span>{age} • {gender}</span>
                      <span>DOB: {patient.birthDate}</span>
                      {patient.identifier && patient.identifier.length > 0 && (
                        <span>MRN: {patient.identifier[0].value}</span>
                      )}
                    </div>
                    
                    <div className="mt-2 grid gap-1">
                      {patient.telecom && patient.telecom.length > 0 && (
                        <div>
                          <span className="text-sm text-muted-foreground">Phone: </span>
                          <span className="text-sm">
                            {patient.telecom.find((t: any) => t.system === 'phone')?.value || 'N/A'}
                          </span>
                        </div>
                      )}
                      
                      {patient.telecom && patient.telecom.length > 0 && (
                        <div>
                          <span className="text-sm text-muted-foreground">Email: </span>
                          <span className="text-sm">
                            {patient.telecom.find((t: any) => t.system === 'email')?.value || 'N/A'}
                          </span>
                        </div>
                      )}
                      
                      {patient.address && (
                        <div>
                          <span className="text-sm text-muted-foreground">Address: </span>
                          <span className="text-sm">{address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          
          {/* Hemoglobin Chart Section - Always visible */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Vital Signs
            </h2>
            <HemoglobinChart observations={observations} />
          </section>
          
          <Tabs defaultValue="observations" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-4">
              <TabsTrigger value="observations" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Observations</span>
              </TabsTrigger>
              <TabsTrigger value="medications" className="flex items-center gap-2">
                <Pill className="h-4 w-4" />
                <span className="hidden sm:inline">Medications</span>
              </TabsTrigger>
              <TabsTrigger value="immunizations" className="flex items-center gap-2">
                <Syringe className="h-4 w-4" />
                <span className="hidden sm:inline">Immunizations</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="observations" className="mt-0 space-y-4">
              {observations.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">
                  No observations found for this patient.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {observations.map((obs, index) => (
                    <div key={obs.id} className="stagger-item">
                      <DataCard title={getObservationName(obs)} className="h-full">
                        <div className="space-y-2">
                          <div className="text-2xl font-bold">
                            {formatObservationValue(obs)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Recorded on {formatDate(obs.effectiveDateTime)}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Category: </span>
                            {obs.category?.[0]?.coding?.[0]?.display || 'Uncategorized'}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Status: </span>
                            <span className="capitalize">{obs.status}</span>
                          </div>
                        </div>
                      </DataCard>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="medications" className="mt-0 space-y-4">
              {medications.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">
                  No medications found for this patient.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {medications.map((med, index) => (
                    <div key={med.id} className="stagger-item">
                      <DataCard title={getMedicationName(med)} className="h-full">
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Instructions: </span>
                            {getMedicationInstructions(med)}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Prescribed: </span>
                            {formatDate(med.authoredOn)}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Prescriber: </span>
                            {med.requester?.display || 'Unknown'}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Status: </span>
                            <span className="capitalize">{med.status}</span>
                          </div>
                        </div>
                      </DataCard>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="immunizations" className="mt-0 space-y-4">
              {immunizations.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">
                  No immunizations found for this patient.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {immunizations.map((imm, index) => (
                    <div key={imm.id} className="stagger-item">
                      <DataCard title={getImmunizationName(imm)} className="h-full">
                        <div className="space-y-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Date: </span>
                            {formatDate(imm.occurrenceDateTime)}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Location: </span>
                            {imm.location?.display || 'Unknown'}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Status: </span>
                            <span className="capitalize">{imm.status}</span>
                          </div>
                          {imm.note && imm.note.length > 0 && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Notes: </span>
                              {imm.note[0].text}
                            </div>
                          )}
                        </div>
                      </DataCard>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Patient;
