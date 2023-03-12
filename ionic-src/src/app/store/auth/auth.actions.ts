import { Roles } from './../../models/user.model';
export interface AuthStateModel {
    token: string | null;
    username: string | null;
    role: Roles | null;
    userId: number | null;
}

export class Login {
    static readonly type = '[Auth] Login';
    constructor(public payload: { username: string; password: string }) { }
}

export class Logout {
    static readonly type = '[Auth] Logout';
}