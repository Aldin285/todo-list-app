import { TaskStatus } from "./tasksEnum";

export interface CreateTaskDto {
    nom: string;
    status: TaskStatus;
}