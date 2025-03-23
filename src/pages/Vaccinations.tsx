
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { patients, immunizations, getPatientById } from "@/utils/mockData";
import DataCard from "@/components/DataCard";
import { Syringe } from "lucide-react";
import { formatDate, getImmunizationName, getPatientName } from "@/utils/formatters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Vaccinations = () => {
  const [selectedPatient, setSelectedPatient] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter immunizations based on selected patient and search query
  const filteredImmunizations = immunizations.filter(imm => {
    const matchesPatient = selectedPatient === "all" || imm.patient.reference.includes(selectedPatient);
    const immunizationName = getImmunizationName(imm).toLowerCase();
    const matchesSearch = immunizationName.includes(searchQuery.toLowerCase());
    
    return matchesPatient && matchesSearch;
  });
  
  // Sort immunizations by date (newest first)
  const sortedImmunizations = [...filteredImmunizations].sort((a, b) => {
    return new Date(b.occurrenceDateTime).getTime() - new Date(a.occurrenceDateTime).getTime();
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container max-w-7xl mx-auto pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid gap-8 page-transition">
          <section className="mt-6">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Syringe className="h-6 w-6 text-primary" />
              Vaccinations
            </h1>
            <p className="text-muted-foreground mt-2">
              View and manage patient immunization records
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
                  placeholder="Search vaccinations..."
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
          
          {sortedImmunizations.length === 0 ? (
            <div className="text-center p-12 text-muted-foreground border border-border/50 rounded-lg">
              No vaccinations found matching your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedImmunizations.map((imm, index) => {
                const patient = getPatientById(imm.patient.reference.split('/')[1]);
                
                return (
                  <div key={imm.id} className="stagger-item">
                    <DataCard 
                      title={getImmunizationName(imm)} 
                      icon={<Syringe className="h-5 w-5" />}
                      className="h-full"
                    >
                      <div className="space-y-3">
                        <div className="text-md">
                          <div className="text-sm text-muted-foreground">
                            Administered on {formatDate(imm.occurrenceDateTime)}
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
                            <span className="text-muted-foreground">Provider: </span>
                            {imm.performer?.[0]?.actor?.display || 'Unknown'}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Location: </span>
                            {imm.location?.display || 'Unknown'}
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Status: </span>
                            <span className="capitalize">{imm.status}</span>
                          </div>
                          {imm.vaccineCode?.coding?.[0]?.code && (
                            <div className="text-sm">
                              <span className="text-muted-foreground">Code: </span>
                              {imm.vaccineCode.coding[0].code}
                            </div>
                          )}
                        </div>
                        
                        {imm.note && imm.note.length > 0 && (
                          <div className="text-sm mt-2 p-2 bg-secondary/50 rounded-md">
                            <span className="font-medium">Notes: </span>
                            {imm.note[0].text}
                          </div>
                        )}
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

export default Vaccinations;
