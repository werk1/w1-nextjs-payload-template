import { StyleAgentType } from "../StyleAgent";

export interface NavLinkProps {
  to: string;  // Keep for backward compatibility
  href?: string;  // Add for Next.js Link
  label: string;
  submenu?: Array<{
    to: string;
    href?: string;
    label: string
  }>;
  styleAgent: StyleAgentType;
  isSubnavOpen: boolean;
  setIsSubnavOpen: React.Dispatch<React.SetStateAction<boolean>>;
}