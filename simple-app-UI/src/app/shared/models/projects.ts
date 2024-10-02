export interface Project {
  id: number;
  title?: string | null;              // Optional field
  constructor?: string | null;        // Optional field (correct spelling: "constructor")
  amount?: number;                    // Optional field
  startDate?: Date | null;            // Optional field
  endDate?: Date | null;              // Optional field
  assignedEngrID?: number;            // Optional field
  status?: number;                    // Optional field
}
