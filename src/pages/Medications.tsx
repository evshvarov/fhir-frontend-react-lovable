
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { patients, medications, getPatientById } from "@/utils/mockData";
import DataCard from "@/components/DataCard";
import { Pill } from "lucide-react";
import { formatDate, getMedicationName, getMedicationInstructions, getPatientName } from "@/utils/formatters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Medications = () => {
  const [selectedPatient, setSelectedPatient] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter medications based on selected patient and search query
  const filteredMedications = medications.filter(med => {
    const matchesPatient = selectedPatient === "all" || med.subject.reference.includes(selectedPatient);
    const medicationName = getMedicationName(med).toLowerCase();
    const matchesSearch = medicationName.includes(searchQuery.toLowerCase());
    
    return matchesPatient && matchesSearch;
  });
  
  // Sort medications by date (newest first)
  const sortedMedications = [...filteredMedications].sort((a, b) => {
    return new Date(b.authoredOn).getTime() - new Date(a.authoredOn).getTime();
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid gap-8 page-transition">
          <section className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Pill className="h-6 w-6 text-primary" />
              Medications
            </h1>
            <p className="text-muted-foreground mt-2">
              View and manage patient medications
            </p>
          </section>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full sm:w-64">
              <Select
                value={selectedPatient}
                onValueChange={setSelectedPatient}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Patient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {getPatientName(patient)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-auto flex-1 sm:max-w-md">
              <div className="relative">
                <Input
                  placeholder="Search medications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {sortedMedications.length === 0 ? (
            <div className="text-center p-12 text-muted-foreground border border-border/50 rounded-lg">
              No medications found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedMedications.map((med, index) => {
                const patient = getPatientById(med.subject.reference.split('/')[1]);
                
                return (
                  <div key={med.id} className="stagger-item">
                    <DataCard 
                      title={getMedicationName(med)} 
                      icon={<Pill className="h-5 w-5" />}
                      className="h-full"
                    >
                      <div className="space-y-3">
                        <div className="text-md font-medium">
                          {getMedicationInstructions(med)}
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Prescribed on {formatDate(med.authoredOn)}
                          </div>
                          {patient && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Patient: </span>
                              {getPatientName(patient)}
                            </div>
                          )}
                        </div>
                        
                        <div className="grid gap-1">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Prescriber: </span>
                            {med.requester?.display || 'Unknown'}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Status: </span>
                            <span className="capitalize">{med.status}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Intent: </span>
                            <span className="capitalize">{med.intent}</span>
                          </div>
                          {med.medicationCodeableConcept?.coding?.[0]?.code && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Code: </span>
                              {med.medicationCodeableConcept.coding[0].code}
                            </div>
                          )}
                        </div>
                      </div>
                    </DataCard>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Medications;
