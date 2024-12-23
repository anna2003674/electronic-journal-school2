import { GENDERS, RoleForm } from '../../types/UsersTypes';

export type GenderDropdownVariables = {
    genderLabel: string;
    genderValue: GENDERS;
}

export type RoleDropdownVariables = {
    roleLabel: string;
    roleValue: RoleForm;
}
