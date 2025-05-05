export interface Schedule {
    id?: number;
    employeeId: number;
    employeeName?: string; // Para exibir no calendário
    shift_date: string;
    shift_type: 'DAY' | 'NIGHT'; // Dia ou Noite
  }