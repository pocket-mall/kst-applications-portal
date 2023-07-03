import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { CivilityEnum } from '../../profile/enums/civility.enum';
import { UserResponseModel } from './user.response.model';
import { fetchUserResponseModel } from '../helpers/extact-model.helper';

@JsonObject()
export class UserProfileResponseModel {
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

	@JsonProperty({ name: 'expand', required: true, beforeDeserialize: fetchUserResponseModel })
	public user: UserResponseModel | undefined;

	@JsonProperty()
	public created: string | undefined;

	@JsonProperty()
	public updated: string | undefined;
}
