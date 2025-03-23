
// Mock FHIR data structures for development purposes

// Patient resources
export const patients = [
  {
    resourceType: "Patient",
    id: "patient-1",
    identifier: [
      {
        system: "http://hospital.example.org",
        value: "MRN12345"
      }
    ],
    active: true,
    name: [
      {
        use: "official",
        family: "Smith",
        given: ["John", "James"]
      }
    ],
    telecom: [
      {
        system: "phone",
        value: "555-123-4567",
        use: "home"
      },
      {
        system: "email",
        value: "john.smith@example.com"
      }
    ],
    gender: "male",
    birthDate: "1974-12-25",
    address: [
      {
        use: "home",
        line: ["123 Main St"],
        city: "Anytown",
        state: "CA",
        postalCode: "12345",
        country: "USA"
      }
    ],
    photo: [
      {
        url: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
      }
    ]
  },
  {
    resourceType: "Patient",
    id: "patient-2",
    identifier: [
      {
        system: "http://hospital.example.org",
        value: "MRN67890"
      }
    ],
    active: true,
    name: [
      {
        use: "official",
        family: "Johnson",
        given: ["Emily", "Anne"]
      }
    ],
    telecom: [
      {
        system: "phone",
        value: "555-987-6543",
        use: "home"
      },
      {
        system: "email",
        value: "emily.johnson@example.com"
      }
    ],
    gender: "female",
    birthDate: "1985-08-15",
    address: [
      {
        use: "home",
        line: ["456 Oak Ave"],
        city: "Somecity",
        state: "NY",
        postalCode: "67890",
        country: "USA"
      }
    ],
    photo: [
      {
        url: "https://www.gravatar.com/avatar/5658ffccee7f0ebfda2b226238b1eb6e?s=200"
      }
    ]
  },
  {
    resourceType: "Patient",
    id: "patient-3",
    identifier: [
      {
        system: "http://hospital.example.org",
        value: "MRN54321"
      }
    ],
    active: true,
    name: [
      {
        use: "official",
        family: "Williams",
        given: ["Michael", "Robert"]
      }
    ],
    telecom: [
      {
        system: "phone",
        value: "555-789-0123",
        use: "home"
      },
      {
        system: "email",
        value: "michael.williams@example.com"
      }
    ],
    gender: "male",
    birthDate: "1992-03-21",
    address: [
      {
        use: "home",
        line: ["789 Pine St"],
        city: "Othertown",
        state: "TX",
        postalCode: "54321",
        country: "USA"
      }
    ],
    photo: [
      {
        url: "https://www.gravatar.com/avatar/92eae3a9a05ea0a26cb3462efa4c2171?s=200"
      }
    ]
  }
];

// Observation resources
export const observations = [
  {
    resourceType: "Observation",
    id: "obs-1",
    status: "final",
    category: [
      {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "vital-signs",
            display: "Vital Signs"
          }
        ]
      }
    ],
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "8867-4",
          display: "Heart rate"
        }
      ],
      text: "Heart Rate"
    },
    subject: {
      reference: "Patient/patient-1"
    },
    effectiveDateTime: "2023-10-05T13:28:17-05:00",
    valueQuantity: {
      value: 80,
      unit: "beats/minute",
      system: "http://unitsofmeasure.org",
      code: "/min"
    }
  },
  {
    resourceType: "Observation",
    id: "obs-2",
    status: "final",
    category: [
      {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "vital-signs",
            display: "Vital Signs"
          }
        ]
      }
    ],
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "8480-6",
          display: "Systolic blood pressure"
        }
      ],
      text: "Blood Pressure"
    },
    subject: {
      reference: "Patient/patient-1"
    },
    effectiveDateTime: "2023-10-05T13:28:17-05:00",
    component: [
      {
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "8480-6",
              display: "Systolic blood pressure"
            }
          ]
        },
        valueQuantity: {
          value: 120,
          unit: "mmHg",
          system: "http://unitsofmeasure.org",
          code: "mm[Hg]"
        }
      },
      {
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "8462-4",
              display: "Diastolic blood pressure"
            }
          ]
        },
        valueQuantity: {
          value: 80,
          unit: "mmHg",
          system: "http://unitsofmeasure.org",
          code: "mm[Hg]"
        }
      }
    ]
  },
  {
    resourceType: "Observation",
    id: "obs-3",
    status: "final",
    category: [
      {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "laboratory",
            display: "Laboratory"
          }
        ]
      }
    ],
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "2339-0",
          display: "Glucose"
        }
      ],
      text: "Glucose"
    },
    subject: {
      reference: "Patient/patient-1"
    },
    effectiveDateTime: "2023-10-05T09:30:00-05:00",
    valueQuantity: {
      value: 95,
      unit: "mg/dL",
      system: "http://unitsofmeasure.org",
      code: "mg/dL"
    }
  },
  {
    resourceType: "Observation",
    id: "obs-4",
    status: "final",
    category: [
      {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "vital-signs",
            display: "Vital Signs"
          }
        ]
      }
    ],
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "29463-7",
          display: "Body Weight"
        }
      ],
      text: "Weight"
    },
    subject: {
      reference: "Patient/patient-1"
    },
    effectiveDateTime: "2023-10-05T09:30:00-05:00",
    valueQuantity: {
      value: 70.5,
      unit: "kg",
      system: "http://unitsofmeasure.org",
      code: "kg"
    }
  },
  {
    resourceType: "Observation",
    id: "obs-5",
    status: "final",
    category: [
      {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "vital-signs",
            display: "Vital Signs"
          }
        ]
      }
    ],
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "8310-5",
          display: "Body temperature"
        }
      ],
      text: "Temperature"
    },
    subject: {
      reference: "Patient/patient-1"
    },
    effectiveDateTime: "2023-10-05T13:28:17-05:00",
    valueQuantity: {
      value: 37.0,
      unit: "C",
      system: "http://unitsofmeasure.org",
      code: "Cel"
    }
  },
  {
    resourceType: "Observation",
    id: "obs-6",
    status: "final",
    category: [
      {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "laboratory",
            display: "Laboratory"
          }
        ]
      }
    ],
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "1920-8",
          display: "Aspartate aminotransferase [Enzymatic activity/volume] in Serum or Plasma"
        }
      ],
      text: "AST"
    },
    subject: {
      reference: "Patient/patient-1"
    },
    effectiveDateTime: "2023-09-20T08:00:00-05:00",
    valueQuantity: {
      value: 20,
      unit: "U/L",
      system: "http://unitsofmeasure.org",
      code: "U/L"
    }
  }
];

// Medication resources
export const medications = [
  {
    resourceType: "MedicationRequest",
    id: "med-1",
    status: "active",
    intent: "order",
    medicationCodeableConcept: {
      coding: [
        {
          system: "http://www.nlm.nih.gov/research/umls/rxnorm",
          code: "311036",
          display: "Lisinopril 10 MG Oral Tablet"
        }
      ],
      text: "Lisinopril 10 MG Oral Tablet"
    },
    subject: {
      reference: "Patient/patient-1"
    },
    authoredOn: "2023-09-20",
    requester: {
      reference: "Practitioner/practitioner-1",
      display: "Dr. Sarah Johnson"
    },
    dosageInstruction: [
      {
        text: "Take 1 tablet by mouth daily",
        timing: {
          repeat: {
            frequency: 1,
            period: 1,
            periodUnit: "d"
          }
        },
        route: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "26643006",
              display: "Oral route"
            }
          ]
        },
        doseAndRate: [
          {
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/dose-rate-type",
                  code: "ordered",
                  display: "Ordered"
                }
              ]
            },
            doseQuantity: {
              value: 1,
              unit: "tablet",
              system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
              code: "TAB"
            }
          }
        ]
      }
    ]
  },
  {
    resourceType: "MedicationRequest",
    id: "med-2",
    status: "active",
    intent: "order",
    medicationCodeableConcept: {
      coding: [
        {
          system: "http://www.nlm.nih.gov/research/umls/rxnorm",
          code: "197361",
          display: "Atorvastatin 20 MG Oral Tablet"
        }
      ],
      text: "Atorvastatin 20 MG Oral Tablet"
    },
    subject: {
      reference: "Patient/patient-1"
    },
    authoredOn: "2023-09-20",
    requester: {
      reference: "Practitioner/practitioner-1",
      display: "Dr. Sarah Johnson"
    },
    dosageInstruction: [
      {
        text: "Take 1 tablet by mouth at bedtime",
        timing: {
          repeat: {
            frequency: 1,
            period: 1,
            periodUnit: "d",
            when: ["HS"]
          }
        },
        route: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "26643006",
              display: "Oral route"
            }
          ]
        },
        doseAndRate: [
          {
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/dose-rate-type",
                  code: "ordered",
                  display: "Ordered"
                }
              ]
            },
            doseQuantity: {
              value: 1,
              unit: "tablet",
              system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
              code: "TAB"
            }
          }
        ]
      }
    ]
  },
  {
    resourceType: "MedicationRequest",
    id: "med-3",
    status: "active",
    intent: "order",
    medicationCodeableConcept: {
      coding: [
        {
          system: "http://www.nlm.nih.gov/research/umls/rxnorm",
          code: "849727",
          display: "Acetaminophen 500 MG Oral Tablet"
        }
      ],
      text: "Acetaminophen 500 MG Oral Tablet"
    },
    subject: {
      reference: "Patient/patient-1"
    },
    authoredOn: "2023-09-20",
    requester: {
      reference: "Practitioner/practitioner-1",
      display: "Dr. Sarah Johnson"
    },
    dosageInstruction: [
      {
        text: "Take 1-2 tablets by mouth every 6 hours as needed for pain",
        timing: {
          repeat: {
            frequency: 1,
            period: 6,
            periodUnit: "h"
          }
        },
        asNeededBoolean: true,
        route: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "26643006",
              display: "Oral route"
            }
          ]
        },
        doseAndRate: [
          {
            type: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/dose-rate-type",
                  code: "ordered",
                  display: "Ordered"
                }
              ]
            },
            doseRange: {
              low: {
                value: 1,
                unit: "tablet",
                system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
                code: "TAB"
              },
              high: {
                value: 2,
                unit: "tablet",
                system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
                code: "TAB"
              }
            }
          }
        ]
      }
    ]
  }
];

// Immunization resources
export const immunizations = [
  {
    resourceType: "Immunization",
    id: "imm-1",
    status: "completed",
    vaccineCode: {
      coding: [
        {
          system: "http://hl7.org/fhir/sid/cvx",
          code: "140",
          display: "Influenza, seasonal, injectable, preservative free"
        }
      ],
      text: "Influenza, seasonal, injectable, preservative free"
    },
    patient: {
      reference: "Patient/patient-1"
    },
    occurrenceDateTime: "2023-09-15",
    primarySource: true,
    location: {
      reference: "Location/location-1",
      display: "Primary Care Clinic"
    },
    performer: [
      {
        actor: {
          reference: "Practitioner/practitioner-1",
          display: "Dr. Sarah Johnson"
        }
      }
    ],
    note: [
      {
        text: "Patient tolerated the vaccination well."
      }
    ]
  },
  {
    resourceType: "Immunization",
    id: "imm-2",
    status: "completed",
    vaccineCode: {
      coding: [
        {
          system: "http://hl7.org/fhir/sid/cvx",
          code: "43",
          display: "Hepatitis B vaccine (Hep B), adult dosage"
        }
      ],
      text: "Hepatitis B vaccine"
    },
    patient: {
      reference: "Patient/patient-1"
    },
    occurrenceDateTime: "2022-08-10",
    primarySource: true,
    location: {
      reference: "Location/location-1",
      display: "Primary Care Clinic"
    },
    performer: [
      {
        actor: {
          reference: "Practitioner/practitioner-1",
          display: "Dr. Sarah Johnson"
        }
      }
    ],
    note: [
      {
        text: "First dose in series of 3"
      }
    ]
  },
  {
    resourceType: "Immunization",
    id: "imm-3",
    status: "completed",
    vaccineCode: {
      coding: [
        {
          system: "http://hl7.org/fhir/sid/cvx",
          code: "43",
          display: "Hepatitis B vaccine (Hep B), adult dosage"
        }
      ],
      text: "Hepatitis B vaccine"
    },
    patient: {
      reference: "Patient/patient-1"
    },
    occurrenceDateTime: "2022-09-10",
    primarySource: true,
    location: {
      reference: "Location/location-1",
      display: "Primary Care Clinic"
    },
    performer: [
      {
        actor: {
          reference: "Practitioner/practitioner-1",
          display: "Dr. Sarah Johnson"
        }
      }
    ],
    note: [
      {
        text: "Second dose in series of 3"
      }
    ]
  },
  {
    resourceType: "Immunization",
    id: "imm-4",
    status: "completed",
    vaccineCode: {
      coding: [
        {
          system: "http://hl7.org/fhir/sid/cvx",
          code: "43",
          display: "Hepatitis B vaccine (Hep B), adult dosage"
        }
      ],
      text: "Hepatitis B vaccine"
    },
    patient: {
      reference: "Patient/patient-1"
    },
    occurrenceDateTime: "2023-02-10",
    primarySource: true,
    location: {
      reference: "Location/location-1",
      display: "Primary Care Clinic"
    },
    performer: [
      {
        actor: {
          reference: "Practitioner/practitioner-1",
          display: "Dr. Sarah Johnson"
        }
      }
    ],
    note: [
      {
        text: "Third dose in series of 3"
      }
    ]
  }
];

// Helper function to get observations for a specific patient
export function getPatientObservations(patientId: string) {
  return observations.filter(obs => {
    return obs.subject.reference === `Patient/${patientId}`;
  });
}

// Helper function to get medications for a specific patient
export function getPatientMedications(patientId: string) {
  return medications.filter(med => {
    return med.subject.reference === `Patient/${patientId}`;
  });
}

// Helper function to get immunizations for a specific patient
export function getPatientImmunizations(patientId: string) {
  return immunizations.filter(imm => {
    return imm.patient.reference === `Patient/${patientId}`;
  });
}

// Helper to get a patient by ID
export function getPatientById(patientId: string) {
  return patients.find(patient => patient.id === patientId);
}
