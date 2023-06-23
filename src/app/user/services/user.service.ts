import { Injectable, signal, WritableSignal } from '@angular/core';
import { AppUserModel } from '../../authentication/models/app.user.model';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	public user: WritableSignal<AppUserModel | undefined> = signal<AppUserModel | undefined>(undefined);

	constructor() {}
}
