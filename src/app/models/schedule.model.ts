export interface Schedule {
    id?: number;
    employeeId: number;
    employeeName?: string; // Para exibir no calendário
    date: string;
    shift: 'DAY' | 'NIGHT'; // Dia ou Noite
  }