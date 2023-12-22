import { Header, Status, Patient } from "./types";

export const HEADERS: Header[] = [
  { id: "name", header: "Name" },
  { id: "status", header: "Status" },
  { id: "dob", header: "Date of Birth" },
  { id: "addresses", header: "Addresses" },
];

export const statusOptions = [
  {
    label: "",
    value: Status.Empty,
  },
  {
    label: "Inquiry",
    value: Status.Inquiry,
  },
  {
    label: "Onboarding",
    value: Status.Onboarding,
  },
  {
    label: "Active",
    value: Status.Active,
  },
  {
    label: "Churned",
    value: Status.Churned,
  },
];

export const initialPatient: Patient = {
  name: { first: "", last: "" },
  status: Status.Empty,
  dob: "",
  addresses: [],
};
