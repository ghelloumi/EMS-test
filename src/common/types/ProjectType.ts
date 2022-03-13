export interface ProjectType {
    creationDate: string;
    projectName: string;
    id: string;
    status: "won" | "lost" | 'inProgress';
    uniqueId: string;
}
