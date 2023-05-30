import { Injectable } from '@angular/core';
import PocketBase, { RecordAuthResponse } from 'pocketbase';
import { catchError, from, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminAuthResponse } from '../models/admin.auth.response.model';
import { AppUserModel } from '../models/app.user.model';
import { deserializeObject } from '../../common/helpers/deserializer';
import { Provider } from '../enums/provider';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private readonly userCollection: string = 'users';
	private readonly pocketBaseClient: PocketBase;

	constructor() {
		this.pocketBaseClient = new PocketBase(environment.coreApiEndPoint);
	}

	public adminAuthentication(email: string, password: string): Observable<AdminAuthResponse | undefined> {
		return from(this.pocketBaseClient.admins.authWithPassword(email, password)).pipe(
			catchError((err: any) => of(undefined))
		);
	}

	public appUserAuthentication(email: string, password: string): Observable<AppUserModel | undefined> {
		return from(this.pocketBaseClient.collection(this.userCollection).authWithPassword(email, password)).pipe(
			map((authData: RecordAuthResponse) => {
				return deserializeObject<AppUserModel>(authData.record, AppUserModel) ?? undefined;
			}),
			catchError((err: any) => of(undefined))
		);
	}

	public appUserOAuth(provider: Provider): Observable<AppUserModel | undefined> {
		this.pocketBaseClient.authStore.clear();
		return from(this.pocketBaseClient.collection(this.userCollection).authWithOAuth2({ provider })).pipe(
			map((authData: RecordAuthResponse) => {
				return deserializeObject<AppUserModel>(authData.record, AppUserModel) ?? undefined;
			}),
			catchError((err: any) => of(undefined))
		);
	}
}
