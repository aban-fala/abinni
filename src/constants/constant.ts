import { Header, User } from "./types";

export const headers: Header[] = [
  { id: "name", header: "Name" },
  { id: "status", header: "Status" },
  { id: "dob", header: "Date of Birth" },
  { id: "addresses", header: "Addresses" },
  { id: "additionals", header: "Additionals" },
];

export const statusOptions = [
  {
    label: "Inquiry",
    value: "Inquiry",
  },
  {
    label: "Onboarding",
    value: "Onboarding",
  },
  {
    label: "Active",
    value: "Active",
  },
  {
    label: "Churned",
    value: "Churned",
  },
];

export const initialUser: User = {
  name: { first: "", last: "" },
  status: "",
  dob: "",
  addresses: [""],
};
