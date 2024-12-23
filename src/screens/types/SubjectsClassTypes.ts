import { SubjectParams } from './SubjectTypes';

export type SubjectClassParams = {
    subjectIds: string[],
};

export type SubjectParamsDelete = SubjectParams & {
    classId: number,
}
