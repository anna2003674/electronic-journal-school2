export type UserParams = {
    id: number,
    username: string,
    firstName: string,
    patronymic: string,
    surname: string,
    email: string,
    phone: string,
    birthDate: string,
    gender: GENDERS,
    role: RoleForm,
}

export enum GENDERS {
    FEMALE = 'FEMALE',
    MALE = 'MALE',
}

export enum Role {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_TEACHER = 'ROLE_TEACHER',
    ROLE_PUPIL = 'ROLE_PUPIL',
    ROLE_PARENT = 'ROLE_PARENT',
}

export const genderForm = {
    [GENDERS.MALE]: 'Мужской',
    [GENDERS.FEMALE]: 'Женский',
};

export enum RoleForm {
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
    PUPIL = 'PUPIL',
    PARENT = 'PARENT',
}

export const roleForm = {
    [RoleForm.ADMIN]: 'Администратор',
    [RoleForm.TEACHER]: 'Учитель',
    [RoleForm.PARENT]: 'Родитель',
    [RoleForm.PUPIL]: 'Ученик',
};
