export interface Additional {
  [key: string]: string | number;
}

export interface Name {
  first: string;
  middle?: string;
  last: string;
}

export enum Status {
  Inquiry = "Inquiry",
  Onboarding = "Onboarding",
  Active = "Active",
  Churned = "Churned",
}

export interface User {
  readonly uid?: string;
  readonly name: Name;
  readonly status: string;
  readonly dob: string;
  readonly addresses: string[];
  readonly additionals?: Additional[];
}

export interface Header {
  id: string;
  header: string;
}
