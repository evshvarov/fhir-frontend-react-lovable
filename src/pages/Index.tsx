import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { fetchPatients, fetchPatientObservations, fetchPatientMedications, fetchPatientImmunizations } from "@/utils/mockData";
import { getPatientName } from "@/utils/formatters";
import { Link } from "react-router-dom";
import PatientList from "@/components/PatientList";
import DataCard from "@/components/DataCard";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Pill, Syringe, User } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  
  // Fetch patients
  const { data: patients = [], isLoading: isPatientsLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
  });

  // Fetch data for the first or selected patient
  const currentPatientId = selectedPatientId || (patients[0]?.id ?? null);
  
  const { data: observations = [], isLoading: isObservationsLoading } = useQuery({
    queryKey: ['observations', currentPatientId],
    queryFn: () => currentPatientId ? fetchPatientObservations(currentPatientId) : [],
    enabled: !!currentPatientId,
  });
  
  const { data: medications = [], isLoading: isMedicationsLoading } = useQuery({
    queryKey: ['medications', currentPatientId],
    queryFn: () => currentPatientId ? fetchPatientMedications(currentPatientId) : [],
    enabled: !!currentPatientId,
  });
  
  const { data: immunizations = [], isLoading: isImmunizationsLoading } = useQuery({
    queryKey: ['immunizations', currentPatientId],
    queryFn: () => currentPatientId ? fetchPatientImmunizations(currentPatientId) : [],
    enabled: !!currentPatientId,
  });
  
  // Loading state
  if (isPatientsLoading) {
    return <div>Loading patients...</div>;
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid gap-8 page-transition">
          <section className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight">
              Healthcare Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              View and manage patient health information using FHIR R4
            </p>
          </section>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Existing Card Content */}
            <Card className="col-span-1 md:col-span-3 glass p-4 border border-border/50">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Patients</div>
                      <div className="text-2xl font-semibold">{patients.length}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Observations</div>
                      <div className="text-2xl font-semibold">{observations.length}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Pill className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Medications</div>
                      <div className="text-2xl font-semibold">{medications.length}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Syringe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Immunizations</div>
                      <div className="text-2xl font-semibold">{immunizations.length}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Rest of the existing content */}
            <div className="col-span-1 space-y-6">
              <DataCard 
                title="Patients" 
                icon={<User className="h-5 w-5" />}
                footer={
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to="/patient">View All Patients</Link>
                  </Button>
                }
              >
                <PatientList />
              </DataCard>
            </div>
            
            <div className="col-span-1 md:col-span-2 space-y-6">
              <DataCard 
                title="Recent Observations" 
                icon={<Heart className="h-5 w-5" />}
                footer={
                  <Button asChild variant="outline" size="sm">
                    <Link to="/observations">View All Observations</Link>
                  </Button>
                }
              >
                <div className="space-y-3">
                  {observations.slice(0, 3).map((obs) => (
                    <div 
                      key={obs.id} 
                      className="flex items-center justify-between border-b border-border/50 last:border-0 pb-3 last:pb-0"
                    >
                      <div>
                        <div className="font-medium">
                          {obs.code.text || (obs.code.coding && obs.code.coding[0]?.display)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(obs.effectiveDateTime).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">
                          {obs.valueQuantity 
                            ? `${obs.valueQuantity.value} ${obs.valueQuantity.unit}`
                            : obs.component 
                              ? `${obs.component[0].valueQuantity.value}/${obs.component[1].valueQuantity.value}`
                              : 'No value'
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </DataCard>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DataCard 
                  title="Medications" 
                  icon={<Pill className="h-5 w-5" />}
                  footer={
                    <Button asChild variant="outline" size="sm">
                      <Link to="/medications">View All Medications</Link>
                    </Button>
                  }
                >
                  <div className="space-y-3">
                    {medications.slice(0, 3).map((med) => (
                      <div 
                        key={med.id} 
                        className="border-b border-border/50 last:border-0 pb-3 last:pb-0"
                      >
                        <div className="font-medium">
                          {med.medicationCodeableConcept.text}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {med.dosageInstruction[0].text}
                        </div>
                      </div>
                    ))}
                  </div>
                </DataCard>
                
                <DataCard 
                  title="Immunizations" 
                  icon={<Syringe className="h-5 w-5" />}
                  footer={
                    <Button asChild variant="outline" size="sm">
                      <Link to="/vaccinations">View All Immunizations</Link>
                    </Button>
                  }
                >
                  <div className="space-y-3">
                    {immunizations.slice(0, 3).map((imm) => (
                      <div 
                        key={imm.id} 
                        className="border-b border-border/50 last:border-0 pb-3 last:pb-0"
                      >
                        <div className="font-medium">
                          {imm.vaccineCode.text}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(imm.occurrenceDateTime).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </DataCard>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
