export class User {
    _id: string;
    name: string;
    email: string;
    username: string;
    role: Roles;
}

export enum Roles {
    'COMMISSION' = 'COMMISSION',
    'CLUB' = 'CLUB',
    'USER' = 'USER',
    'ADMIN' = 'ADMIN'
}