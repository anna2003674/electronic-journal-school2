export type LoginMutationVariables = {
    username: string,
    password: string,
}

export type LoginMutationResponse = {
    'jwt-token': string,
}
