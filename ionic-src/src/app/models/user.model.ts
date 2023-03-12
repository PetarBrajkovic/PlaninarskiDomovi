export class User {
    _id: string;
    name: string;
    email: string;
    username: string;
    role: Roles;
}

export enum Roles {
    'COMMISSION' = 'COMMISSION',
    'MANAGER' = 'MANAGER',
    'USER' = 'USER',
    'ADMIN' = 'ADMIN'
}