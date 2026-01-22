"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Ausfuehrung, TaetigkeitBegonnen } from "@/app/types";

type WeitereGewinneValues = {
  [key: string]: {
    diesJahr: string;
    folgejahr: string;
  };
};

interface FormData {
  // Step 2: Unternehmen und Tätigkeit
  taetigkeit: string;
  ausfuehrung: Ausfuehrung;
  selectedCategories: string[];
  begonnen: TaetigkeitBegonnen;
  startdatum: string;

  // Step 3: Geschätzter Umsatz
  umsatzDiesesJahr: string;
  umsatzFolgejahr: string;
  kleinunternehmerregelung: string;

  // Step 4: Geplannter Gewinn
  gewinnDiesesJahr: string;
  gewinnFolgejahr: string;
  weitereGewinne: string[];
  weitereGewinneValues: WeitereGewinneValues;

  // Step 5: Umsatzsteuer ID
  umsatzsteuerId: string;

  // Step 6: Persönliche Daten
  vorname: string;
  nachname: string;
  geburtsdatum: string;

  // Step 7: Kontakt
  persoenlicheAdresse: string;
  adresseGleich: boolean;
  firmenAdresse: string;
  email: string;
  telefon: string;
}

interface FormContextType {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<FormData>({
    // Step 2
    taetigkeit: "TODO: Dieses Feld sollte vorab ausgefüllt sein",
    ausfuehrung: "",
    selectedCategories: ["handel"],
    begonnen: "",
    startdatum: "",

    // Step 3
    umsatzDiesesJahr: "",
    umsatzFolgejahr: "",
    kleinunternehmerregelung: "",

    // Step 4
    gewinnDiesesJahr: "",
    gewinnFolgejahr: "",
    weitereGewinne: [],
    weitereGewinneValues: {},

    // Step 5
    umsatzsteuerId: "",

    // Step 6
    vorname: "",
    nachname: "",
    geburtsdatum: "",

    // Step 7
    persoenlicheAdresse: "",
    adresseGleich: true,
    firmenAdresse: "",
    email: "",
    telefon: "",
  });

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormData() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormData must be used within a FormProvider");
  }
  return context;
}
