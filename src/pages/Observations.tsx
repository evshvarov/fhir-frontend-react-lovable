
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import { fetchPatients, fetchObservations, getPatientById } from "@/utils/mockData";
import DataCard from "@/components/DataCard";
import { Heart } from "lucide-react";
import { formatDate, getObservationName, formatObservationValue, getPatientName } from "@/utils/formatters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Observations = () => {
  const [selectedPatient, setSelectedPatient] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: patients = [], isLoading: isLoadingPatients } = useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
  });
  
  const { data: allObservations = [], isLoading: isLoadingObservations } = useQuery({
    queryKey: ['observations'],
    queryFn: fetchObservations,
  });
  
  const isLoading = isLoadingPatients || isLoadingObservations;
  
  // Filter observations based on selected patient and search query
  const filteredObservations = allObservations.filter(obs => {
    const matchesPatient = selectedPatient === "all" || obs.subject?.reference?.includes(selectedPatient);
    const observationName = getObservationName(obs).toLowerCase();
    const matchesSearch = observationName.includes(searchQuery.toLowerCase());
    
    return matchesPatient && matchesSearch;
  });
  
  // Sort observations by date (newest first)
  const sortedObservations = [...filteredObservations].sort((a, b) => {
    return new Date(b.effectiveDateTime || 0).getTime() - new Date(a.effectiveDateTime || 0).getTime();
  });
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-12">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Loading observations...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid gap-8 page-transition">
          <section className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              Observations
            </h1>
            <p className="text-muted-foreground mt-2">
              View and manage clinical observations
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
                  placeholder="Search observations..."
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
          
          {sortedObservations.length === 0 ? (
            <div className="text-center p-12 text-muted-foreground border border-border/50 rounded-lg">
              No observations found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedObservations.map((obs, index) => {
                // Extract patient ID from reference
                const patientRef = obs.subject?.reference || '';
                const patientId = patientRef.split('/')[1];
                const patientData = patientId ? getPatientById(patientId) : null;
                
                return (
                  <div key={obs.id} className="stagger-item">
                    <DataCard 
                      title={getObservationName(obs)} 
                      icon={<Heart className="h-5 w-5" />}
                      className="h-full"
                    >
                      <div className="space-y-3">
                        <div className="text-2xl font-bold">
                          {formatObservationValue(obs)}
                        </div>
                        
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Recorded on {formatDate(obs.effectiveDateTime)}
                          </div>
                          {/* Patient info will be populated asynchronously when data is loaded */}
                          <div className="text-sm">
                            <span className="text-muted-foreground">Patient: </span>
                            {patientRef ? `Patient ${patientId}` : 'Unknown'}
                          </div>
                        </div>
                        
                        <div className="grid gap-1">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Category: </span>
                            {obs.category?.[0]?.coding?.[0]?.display || 'Uncategorized'}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Status: </span>
                            <span className="capitalize">{obs.status}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Code: </span>
                            {obs.code?.coding?.[0]?.code || 'Unknown'}
                          </div>
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

export default Observations;
