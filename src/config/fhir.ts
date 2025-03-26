
export const FHIR_SERVER_URL = 'http://localhost:32783/fhir/r4/';

// Default fetch options to include the ngrok header
export const FHIR_FETCH_OPTIONS = {
  headers: {
    'ngrok-skip-browser-warning': '1'
  }
};
