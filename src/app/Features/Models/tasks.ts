import { TaskStatus } from "./tasksEnum";

export interface Task {
    id: number;
    nom: string;
    status: TaskStatus;
    description?: string;
}