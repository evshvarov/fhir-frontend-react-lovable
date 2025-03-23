
import { FHIR_SERVER_URL, FHIR_FETCH_OPTIONS } from '@/config/fhir';

// Fetch all patients data from FHIR server
export const fetchPatients = async () => {
  try {
    const response = await fetch(`${FHIR_SERVER_URL}Patient`, FHIR_FETCH_OPTIONS);
    const data = await response.json();
    return data.entry?.map((entry: any) => entry.resource) || [];
  } catch (error) {
    console.error('Error fetching patients:', error);
    return [];
  }
};

// For backward compatibility
export const patients = fetchPatients;

// Fetch observations for a specific patient
export const fetchPatientObservations = async (patientId: string) => {
  try {
    const response = await fetch(`${FHIR_SERVER_URL}Observation?patient=${patientId}`, FHIR_FETCH_OPTIONS);
    const data = await response.json();
    return data.entry?.map((entry: any) => entry.resource) || [];
  } catch (error) {
    console.error('Error fetching observations:', error);
    return [];
  }
};

// For backward compatibility
export const getPatientObservations = fetchPatientObservations;

// Fetch hemoglobin observations for a specific patient
export const fetchPatientHemoglobinObservations = async (patientId: string) => {
  try {
    // LOINC code 718-7 for Hemoglobin in Blood
    const response = await fetch(`${FHIR_SERVER_URL}Observation?patient=${patientId}&code=718-7,4548-4,30313-1`, FHIR_FETCH_OPTIONS);
    const data = await response.json();
    return data.entry?.map((entry: any) => entry.resource) || [];
  } catch (error) {
    console.error('Error fetching hemoglobin observations:', error);
    return [];
  }
};

// Fetch all observations
export const fetchObservations = async () => {
  try {
    const response = await fetch(`${FHIR_SERVER_URL}Observation`, FHIR_FETCH_OPTIONS);
    const data = await response.json();
    return data.entry?.map((entry: any) => entry.resource) || [];
  } catch (error) {
    console.error('Error fetching observations:', error);
    return [];
  }
};

// For backward compatibility
export const observations = fetchObservations;

// Fetch medications for a specific patient
export const fetchPatientMedications = async (patientId: string) => {
  try {
    const response = await fetch(`${FHIR_SERVER_URL}MedicationRequest?patient=${patientId}`, FHIR_FETCH_OPTIONS);
    const data = await response.json();
    return data.entry?.map((entry: any) => entry.resource) || [];
  } catch (error) {
    console.error('Error fetching medications:', error);
    return [];
  }
};

// For backward compatibility
export const getPatientMedications = fetchPatientMedications;

// Fetch all medications
export const fetchMedications = async () => {
  try {
    const response = await fetch(`${FHIR_SERVER_URL}MedicationRequest`, FHIR_FETCH_OPTIONS);
    const data = await response.json();
    return data.entry?.map((entry: any) => entry.resource) || [];
  } catch (error) {
    console.error('Error fetching medications:', error);
    return [];
  }
};

// For backward compatibility
export const medications = fetchMedications;

// Fetch immunizations for a specific patient
export const fetchPatientImmunizations = async (patientId: string) => {
  try {
    const response = await fetch(`${FHIR_SERVER_URL}Immunization?patient=${patientId}`, FHIR_FETCH_OPTIONS);
    const data = await response.json();
    return data.entry?.map((entry: any) => entry.resource) || [];
  } catch (error) {
    console.error('Error fetching immunizations:', error);
    return [];
  }
};

// For backward compatibility
export const getPatientImmunizations = fetchPatientImmunizations;

// Fetch all immunizations
export const fetchImmunizations = async () => {
  try {
    const response = await fetch(`${FHIR_SERVER_URL}Immunization`, FHIR_FETCH_OPTIONS);
    const data = await response.json();
    return data.entry?.map((entry: any) => entry.resource) || [];
  } catch (error) {
    console.error('Error fetching immunizations:', error);
    return [];
  }
};

// For backward compatibility
export const immunizations = fetchImmunizations;

// Find a patient by ID
export const getPatientById = async (patientId: string) => {
  try {
    const response = await fetch(`${FHIR_SERVER_URL}Patient/${patientId}`, FHIR_FETCH_OPTIONS);
    return await response.json();
  } catch (error) {
    console.error('Error fetching patient:', error);
    return null;
  }
};
