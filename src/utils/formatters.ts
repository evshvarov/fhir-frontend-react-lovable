
// Helper functions to format FHIR data for display

// Format a date from FHIR format to a readable format
export function formatDate(dateString: string): string {
  if (!dateString) return 'Unknown';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
}

// Format date for simple display (no time)
export function formatSimpleDate(dateString: string): string {
  if (!dateString) return 'Unknown';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

// Get patient's full name
export function getPatientName(patient: any): string {
  if (!patient || !patient.name || !patient.name.length) return 'Unknown';
  
  const name = patient.name[0];
  const given = Array.isArray(name.given) ? name.given.join(' ') : (name.given || '');
  return `${given} ${name.family || ''}`.trim();
}

// Get patient's age from birthDate
export function getPatientAge(birthDate: string): string {
  if (!birthDate) return 'Unknown';
  
  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return 'Unknown';
  
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return `${age} years`;
}

// Format observation display
export function formatObservationValue(observation: any): string {
  if (observation.valueQuantity) {
    const value = observation.valueQuantity.value;
    const unit = observation.valueQuantity.unit;
    return `${value} ${unit || ''}`;
  }
  
  if (observation.component) {
    // Handle things like blood pressure with multiple components
    const components = observation.component.map((comp: any) => {
      if (comp.valueQuantity) {
        return `${comp.valueQuantity.value} ${comp.valueQuantity.unit || ''}`;
      }
      return '';
    });
    return components.join(' / ');
  }
  
  return 'No value recorded';
}

// Get an observation's name/type
export function getObservationName(observation: any): string {
  if (!observation || !observation.code) return 'Unknown Observation';
  
  if (observation.code.text) {
    return observation.code.text;
  }
  
  if (observation.code.coding && observation.code.coding.length > 0) {
    return observation.code.coding[0].display || observation.code.coding[0].code;
  }
  
  return 'Unknown Observation';
}

// Get medication name
export function getMedicationName(medication: any): string {
  if (!medication) return 'Unknown Medication';
  
  if (medication.medicationCodeableConcept && medication.medicationCodeableConcept.text) {
    return medication.medicationCodeableConcept.text;
  }
  
  if (medication.medicationCodeableConcept && medication.medicationCodeableConcept.coding && medication.medicationCodeableConcept.coding.length > 0) {
    return medication.medicationCodeableConcept.coding[0].display || 'Unknown Medication';
  }
  
  return 'Unknown Medication';
}

// Get medication instructions
export function getMedicationInstructions(medication: any): string {
  if (!medication || !medication.dosageInstruction || !medication.dosageInstruction.length) {
    return 'No instructions available';
  }
  
  const dosage = medication.dosageInstruction[0];
  if (dosage.text) {
    return dosage.text;
  }
  
  return 'See prescription details';
}

// Get immunization name
export function getImmunizationName(immunization: any): string {
  if (!immunization || !immunization.vaccineCode) return 'Unknown Vaccination';
  
  if (immunization.vaccineCode.text) {
    return immunization.vaccineCode.text;
  }
  
  if (immunization.vaccineCode.coding && immunization.vaccineCode.coding.length > 0) {
    return immunization.vaccineCode.coding[0].display || 'Unknown Vaccination';
  }
  
  return 'Unknown Vaccination';
}

// Get patient's gender formatted
export function formatGender(gender: string): string {
  if (!gender) return 'Unknown';
  
  const genderMap: {[key: string]: string} = {
    'male': 'Male',
    'female': 'Female',
    'other': 'Other',
    'unknown': 'Unknown'
  };
  
  return genderMap[gender.toLowerCase()] || 'Unknown';
}

// Format a patient's address
export function formatAddress(address: any): string {
  if (!address || !address.length) return 'No address on file';
  
  const addr = address[0];
  const line = Array.isArray(addr.line) ? addr.line.join(', ') : (addr.line || '');
  const parts = [line, addr.city, addr.state, addr.postalCode].filter(Boolean);
  
  return parts.join(', ');
}
