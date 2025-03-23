
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { fetchPatients } from "@/utils/mockData";
import PatientCard from "./PatientCard";
import { getPatientName } from "@/utils/formatters";

const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: patients = [], isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: fetchPatients,
  });
  
  const filteredPatients = patients.filter(patient => {
    const fullName = getPatientName(patient).toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });
  
  if (isLoading) {
    return <div>Loading patients...</div>;
  }
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-4 h-10"
        />
      </div>
      
      <div className="space-y-4">
        {filteredPatients.length === 0 ? (
          <div className="text-center p-4 text-muted-foreground">
            No patients found matching your search.
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <div key={patient.id} className="stagger-item">
              <PatientCard patient={patient} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientList;
