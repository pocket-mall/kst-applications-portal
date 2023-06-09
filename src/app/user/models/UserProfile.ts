import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { CivilityEnum } from '../../profile/enums/civility.enum';
import { AppUserModel } from '../../authentication/models/app.user.model';

@JsonObject()
export class UserProfile {
	@JsonProperty({ required: true })
	public id: string | undefined;

	@JsonProperty({ required: true })
	public firstName: string | undefined;

	@JsonProperty({ required: true })
	public lastName: string | undefined;

	@JsonProperty({ required: true })
	public phone: string | undefined;

	@JsonProperty({ required: true })
	public civility: CivilityEnum | undefined;

	@JsonProperty()
	public birthday: string | undefined;

	@JsonProperty({ required: true })
	public user: AppUserModel | undefined;

	@JsonProperty()
	public created: string | undefined;

	@JsonProperty()
	public updated: string | undefined;
}
