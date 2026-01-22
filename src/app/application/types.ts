export type Rechtsform =
  | "einzelunternehmen"
  | "gmbh"
  | "gbr"
  | "ug"
  | "ag"
  | "ohg"
  | "kg";

export interface RechtsformOption {
  value: Rechtsform;
  label: string;
}

export const rechtsformOptions: RechtsformOption[] = [
  { value: "einzelunternehmen", label: "Einzelunternehmen" },
  { value: "gmbh", label: "Gesellschaft mit beschränkter Haftung (GmbH)" },
  { value: "gbr", label: "Gesellschaft bürgerlichen Rechts (GbR)" },
  { value: "ug", label: "Unternehmergesellschaft (UG)" },
  { value: "ag", label: "Aktiengesellschaft (AG)" },
  { value: "ohg", label: "Offene Handelsgesellschaft (OHG)" },
  { value: "kg", label: "Kommanditgesellschaft (KG)" },
];

export interface TaetigkeitOption {
  value: string;
  label: string;
}

export const taetigkeitOptions: TaetigkeitOption[] = [
  { value: "eisanbieter", label: "Eisanbieter" },
  { value: "eiscafe", label: "Eiscafe" },
  { value: "eisdiele", label: "Eisdiele" },
  { value: "eisenbahngesellschaft", label: "Eisenbahngesellschaft" },
];

export type SideActivity = "yes" | "no" | "";

export const sideActivityOptions = [
  { value: "yes", label: "Ja" },
  { value: "no", label: "Nein" },
];

export type HasEmployees = "with" | "without" | "";

export const hasEmployeesOptions = [
  { value: "with", label: "Mit Angestellten" },
  { value: "without", label: "Ohne Angestellte" },
];

export interface FormData {
  rechtsform: Rechtsform | "";
  taetigkeit: string;
  isSideActivity: SideActivity;
  hasEmployees: HasEmployees;
}

export const initialFormData: FormData = {
  rechtsform: "",
  taetigkeit: "",
  isSideActivity: "",
  hasEmployees: "",
};
