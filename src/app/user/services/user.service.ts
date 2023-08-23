import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { UserResponseModel } from '../../pocket-base/models/user.response.model';
import { SignUpUserModel } from '../../authentication/models/sign-up-user.model';
import { Observable, of } from 'rxjs';
import { UserProfileResponseModel } from '../../pocket-base/models/user.profile.response.model';
import { deserializeObject } from '../../common/helpers/deserializer';
import { ProfileRequestModel } from '../../pocket-base/models/profile.request.model';
import { PocketBaseClientService } from '../../pocket-base/services/pocket-base-client.service';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	public user: WritableSignal<UserResponseModel | undefined> = signal<UserResponseModel | undefined>(undefined);
	public userProfile: WritableSignal<UserProfileResponseModel | undefined> = signal<
		UserProfileResponseModel | undefined
	>(undefined);
	private readonly pocketBaseClient = inject(PocketBaseClientService);

	constructor() {}

	createUserProfile(
		userId: string | undefined,
		requestModel: SignUpUserModel
	): Observable<UserProfileResponseModel | undefined> {
		if (userId === undefined) {
			return of(undefined);
		}

		const profileDto = deserializeObject<ProfileRequestModel>(
			{ user: userId, ...requestModel },
			ProfileRequestModel
		);

		if (profileDto) {
			return this.pocketBaseClient.createProfile(profileDto);
		}

		return of(undefined);
	}

	createUser(email: string, password: string): Observable<UserResponseModel | undefined> {
		return this.pocketBaseClient.createUser(email, password, password);
	}

	getUserProfile(userId: string | undefined): Observable<UserProfileResponseModel | undefined> {
		if (userId === undefined) {
			return of(undefined);
		}
		return this.pocketBaseClient.getUserProfile(userId);
	}
}
