import { Roles } from './../../models/user.model';
import { Login, Logout } from './auth.actions';
import { AuthService } from './../../services/auth.service';
import { Injectable } from '@angular/core';
import { AuthStateModel } from './auth.actions';
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from 'rxjs/operators';

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: null,
        username: null,
        role: null
    }
})
@Injectable()
export class AuthState {
    @Selector()
    static token(state: AuthStateModel): string | null {
        return state.token;
    }

    @Selector()
    static isAuthenticated(state: AuthStateModel): boolean {
        return !!state.token;
    }

    @Selector()
    static role(state: AuthStateModel): Roles | null {
        return state.role;
    }

    constructor(private authService: AuthService) { }

    @Action(Login)
    login(ctx: StateContext<AuthStateModel>, action: Login) {
        return this.authService.authenticateUser(action.payload).pipe(
            tap((result) => {
                if (result.success) {
                    ctx.patchState({
                        token: result.token,
                        username: action.payload.username,
                        role: result.user.role
                    });
                }
            })
        );
    }

    @Action(Logout)
    logout(ctx: StateContext<AuthStateModel>) {
        ctx.setState({
            token: null,
            username: null,
            role: null
        });
    }
}