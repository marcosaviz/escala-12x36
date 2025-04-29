export interface DayOff {
    id?: number;
    employeeId: number;
    date: string;
    reason?: string; // Opcional, para dizer se é folga normal ou aniversário
  }