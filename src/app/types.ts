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

export interface FormData {
  rechtsform: Rechtsform | "";
}

export const initialFormData: FormData = {
  rechtsform: "",
};
