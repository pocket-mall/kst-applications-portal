import { Injectable } from '@angular/core';
import PocketBase, { RecordAuthResponse } from 'pocketbase';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminAuthResponse } from '../models/admin.auth.response.model';
import { AppUserModel } from '../models/app.user.model';
import { deserializeObject } from '../../common/helpers/deserializer';
import { Provider } from '../enums/provider';
import { CreateUserRequestModel } from '../models/create-user-request.model';
import { UserProfile } from '../../user/models/UserProfile';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private readonly userCollection: string = 'users';
	private readonly profileCollection: string = 'profiles';
	private readonly pocketBaseClient: PocketBase;

	constructor() {
		this.pocketBaseClient = new PocketBase(environment.coreApiEndPoint);
	}

	public adminAuthentication(email: string, password: string): Observable<AdminAuthResponse | undefined> {
		return from(this.pocketBaseClient.admins.authWithPassword(email, password)).pipe(
			catchError((err: any) => of(undefined))
		);
	}

	public appUserEmailAuth(email: string, password: string): Observable<AppUserModel | undefined> {
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

	public signUp(requestModel: CreateUserRequestModel): Observable<UserProfile | undefined> {
		const user$ = this.createUser(requestModel);

		return user$.pipe(
			switchMap(() => {
				if (requestModel.email === undefined || requestModel.password === undefined) {
					return of(undefined);
				}
				return this.appUserEmailAuth(requestModel.email, requestModel.password);
			}),
			switchMap((appUser: AppUserModel | undefined) => {
				if (appUser) {
					return this.createUserProfile(appUser.id, requestModel);
				}
				return of(undefined);
			})
		);
	}

	private createUser(requestModel: CreateUserRequestModel): Observable<AppUserModel> {
		const userRequestModel = {
			email: requestModel.email,
			password: requestModel.password,
			passwordConfirm: requestModel.password
		};
		return from(this.pocketBaseClient.collection(this.userCollection).create<AppUserModel>(userRequestModel));
	}

	private createUserProfile(
		userId: string | undefined,
		requestModel: CreateUserRequestModel
	): Observable<UserProfile | undefined> {
		if (userId === undefined) {
			return of(undefined);
		}

		const profileRequestModel = {
			birthday: requestModel.birthDay,
			civility: requestModel.civility,
			phone: requestModel.phone,
			firstName: requestModel.firstName,
			lastName: requestModel.lastName,
			user: userId
		};

		return from(
			this.pocketBaseClient.collection(this.profileCollection).create<UserProfile>(profileRequestModel, {
				expand: 'user'
			})
		);
	}
}
