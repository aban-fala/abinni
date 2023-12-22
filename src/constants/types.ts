export interface Additionals {
  [key: string]: string | number;
}

export interface Name {
  first: string;
  middle?: string;
  last: string;
}

export enum Status {
  Empty = "",
  Inquiry = "Inquiry",
  Onboarding = "Onboarding",
  Active = "Active",
  Churned = "Churned",
}

export interface Patient {
  id?: string;
  name: Name;
  status: Status;
  dob: string;
  addresses: string[];
  additionals?: Additionals;
}
export type PatientToShow = Patient & { [index: string]: string | number };

export interface Header {
  id: string;
  header: string;
}
