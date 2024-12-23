export type PupilClassParams = {
    classId: number,
    pupilId: number,
}

export type PupilsParams = {
    id: number,
    patronymic: string,
    firstName: string,
    surname: string,
}

export type PupilsParamsDelete = PupilsParams & {
    classId: number,
}
