export interface Responsible {
    id: number;
    username: string;
    token?: string;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    deadline: string;
    completed: boolean;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    responsible: Responsible;
}

export interface TaskCreate {
    id?: number;
    title: string;
    description: string;
    deadline: Date;
    completed: boolean;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    responsibleId: number;
}

export const PriorityLabels: Record<string, string> = {
    HIGH: 'Alta',
    MEDIUM: 'Média',
    LOW: 'Baixa'
};
