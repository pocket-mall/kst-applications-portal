import { inject, Injectable } from '@angular/core';
import { RecordAuthResponse } from 'pocketbase';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { AdminAuthResponse } from '../../pocket-base/models/admin.auth.response.model';
import { UserResponseModel } from '../../pocket-base/models/user.response.model';
import { deserializeObject } from '../../common/helpers/deserializer';
import { Provider } from '../enums/provider';
import { SignUpUserModel } from '../models/sign-up-user.model';
import { UserProfileResponseModel } from '../../pocket-base/models/user.profile.response.model';
import { PocketBaseClientService } from '../../pocket-base/services/pocket-base-client.service';
import { UserService } from '../../user/services/user.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private readonly pocketBaseClient = inject(PocketBaseClientService);
	private readonly userService = inject(UserService);

	constructor() {}

	public adminAuthentication(email: string, password: string): Observable<AdminAuthResponse | undefined> {
		return this.pocketBaseClient.adminAuthentication(email, password);
	}

	public appUserEmailAuth(email: string, password: string): Observable<UserResponseModel | undefined> {
		return this.pocketBaseClient.userEmailAuth(email, password).pipe(
			map((authData: RecordAuthResponse) => {
				return deserializeObject<UserResponseModel>(authData.record, UserResponseModel) ?? undefined;
			}),
			catchError((err: any) => of(undefined))
		);
	}

	public appUserOAuth(provider: Provider): Observable<UserResponseModel | undefined> {
		this.pocketBaseClient.cleanAuthenticationSession();

		return this.pocketBaseClient.userOAuth(provider).pipe(
			map((authData: RecordAuthResponse) => {
				return deserializeObject<UserResponseModel>(authData.record, UserResponseModel) ?? undefined;
			}),
			catchError((err: any) => of(undefined))
		);
	}

	public signUp(requestModel: SignUpUserModel): Observable<UserProfileResponseModel | undefined> {
		const user$ = this.userService.createUser(requestModel.email, requestModel.password);

		return user$.pipe(
			switchMap(() => {
				if (requestModel.email === undefined || requestModel.password === undefined) {
					return of(undefined);
				}
				return this.appUserEmailAuth(requestModel.email, requestModel.password);
			}),
			switchMap((appUser: UserResponseModel | undefined) => {
				if (appUser) {
					return this.userService.createUserProfile(appUser.id, requestModel);
				}
				return of(undefined);
			})
		);
	}
}
