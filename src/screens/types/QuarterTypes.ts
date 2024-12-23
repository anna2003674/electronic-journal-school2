import { AcademicYearParams } from './AcademicYearTypes';

export type QuarterParams = {
    id: number,
    startDate: string,
    endDate: string,
    number: number,
    schoolYear: AcademicYearParams,
}

export type QuarterParamsMutationVariables = Omit<QuarterParams, 'schoolYear'> & {schoolYear: Pick<AcademicYearParams, 'startDate'>}
