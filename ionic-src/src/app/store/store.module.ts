import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { AuthState } from './auth/auth.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from 'src/environments/environment';

@NgModule({
    imports: [
        CommonModule,
        NgxsModule.forRoot([AuthState], {
            selectorOptions: {},
            developmentMode: !environment.production,
        }),
        NgxsStoragePluginModule.forRoot({
            key: ['auth.token', 'auth.role']
        }),
        NgxsReduxDevtoolsPluginModule.forRoot(),
    ],
    exports: [
        NgxsModule
    ]
})
export class NgxsStoreModule { }