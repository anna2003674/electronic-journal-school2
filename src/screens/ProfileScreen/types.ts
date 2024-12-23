export type EditPasswordMutationPayload = {
    userId: number;
    oldPassword: string;
    newPassword: string;
};

export type EditPasswordFormFields = {
    newPassword: string,
    oldPassword: string,
}
