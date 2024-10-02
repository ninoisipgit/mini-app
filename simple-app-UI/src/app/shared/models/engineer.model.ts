export interface Engineer {
  id: number;
  prcID?: string | null;          // Optional field
  name?: string | null;           // Optional field
  gender?: string | null;         // Optional field
  email?: string | null;          // Optional field
  prcExpiryDate?: Date | null;    // Optional field
  projectCount?: number | null;   // Optional field
  issActive?: number | null;       // Optional field
}
