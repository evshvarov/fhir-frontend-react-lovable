
import { FHIR_SERVER_URL } from '@/config/fhir';

// Fetch patient data from FHIR server
export const fetchPatients = async () => {
  try {
    const response = await fetch(`${FHIR_SERVER_URL}Patient`);
    const data = await response.json();
    return data.entry?.map((entry: any) => entry.resource) || [];
  } catch (error) {
    console.error('Error fetching patients:', error);
    return [];
  }
};

// Fetch observations for a specific patient
export const fetchPatientObservations = async (patientId: string) => {
  try {
    const response = await fetch(`${FHIR_SERVER_URL}Observation?patient=${patientId}`);
    const data = await response.json();
    return data.entry?.map((entry: any) => entry.resource) || [];
  } catch (error) {
    console.error('Error fetching observations:', error);
    return [];
  }
};

// Fetch medications for a specific patient
export const fetchPatientMedications = async (patientId: string) => {
  try {
    const response = await fetch(`${FHIR_SERVER_URL}MedicationRequest?patient=${patientId}`);
    const data = await response.json();
    return data.entry?.map((entry: any) => entry.resource) || [];
  } catch (error) {
    console.error('Error fetching medications:', error);
    return [];
  }
};

// Fetch immunizations for a specific patient
export const fetchPatientImmunizations = async (patientId: string) => {
  try {
    const response = await fetch(`${FHIR_SERVER_URL}Immunization?patient=${patientId}`);
    const data = await response.json();
    return data.entry?.map((entry: any) => entry.resource) || [];
  } catch (error) {
    console.error('Error fetching immunizations:', error);
    return [];
  }
};

// Find a patient by ID
export const getPatientById = async (patientId: string) => {
  try {
    const response = await fetch(`${FHIR_SERVER_URL}Patient/${patientId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching patient:', error);
    return null;
  }
};
