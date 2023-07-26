import { Injectable } from '@angular/core';
import PocketBase, { BaseQueryParams, RecordQueryParams } from 'pocketbase';
import { environment } from '../../../environments/environment';
import { catchError, from, map, of } from 'rxjs';
import { CollectionEnum } from '../enums/collection.enum';
import { Provider } from '../../authentication/enums/provider';
import { UserResponseModel } from '../models/user.response.model';
import { ProfileRequestModel } from '../models/profile.request.model';
import { deserializeObject } from '../../common/helpers/deserializer';
import { UserProfileResponseModel } from '../models/user.profile.response.model';

@Injectable({
	providedIn: 'root'
})
export class PocketBaseClientService {
	private readonly pocketBaseClient: PocketBase;

	constructor() {
		this.pocketBaseClient = new PocketBase(environment.coreApiEndPoint);
	}

	adminAuthentication(email: string, password: string, bodyParams?: {}, queryParams?: BaseQueryParams) {
		return from(this.pocketBaseClient.admins.authWithPassword(email, password, bodyParams, queryParams)).pipe(
			catchError((err: any) => of(undefined))
		);
	}

	userEmailAuth(email: string, password: string, bodyParams?: {}, queryParams?: RecordQueryParams) {
		return from(
			this.pocketBaseClient
				.collection(CollectionEnum.UsersCollection)
				.authWithPassword(email, password, bodyParams, queryParams)
		);
	}

	userOAuth(provider: Provider) {
		return from(this.pocketBaseClient.collection(CollectionEnum.UsersCollection).authWithOAuth2({ provider }));
	}

	createUser(email: string, password: string, passwordConfirm: string) {
		return from(
			this.pocketBaseClient.collection(CollectionEnum.UsersCollection).create<UserResponseModel>({
				email,
				password,
				passwordConfirm
			})
		);
	}

	createProfile(profileDto: ProfileRequestModel) {
		return from(
			this.pocketBaseClient.collection(CollectionEnum.ProfilesCollection).create(profileDto, {
				expand: 'user'
			})
		).pipe(
			map((json: object) => {
				return deserializeObject(json, UserProfileResponseModel);
			})
		);
	}

	getUserProfile(userId: string) {
		return from(
			this.pocketBaseClient
				.collection(CollectionEnum.ProfilesCollection)
				.getFirstListItem(`user.id="${userId}"`, {
					expand: 'user'
				})
		).pipe(
			map((json: object) => deserializeObject(json, UserProfileResponseModel)),
			catchError(() => of(undefined))
		);
	}

	cleanAuthenticationSession() {
		this.pocketBaseClient.authStore.clear();
	}
}
