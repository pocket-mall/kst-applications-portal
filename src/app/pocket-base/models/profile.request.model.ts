import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { CivilityEnum } from '../../profile/enums/civility.enum';

@JsonObject()
export class ProfileRequestModel {
	@JsonProperty({ required: true })
	public user!: string;

	@JsonProperty({ required: true })
	public civility!: CivilityEnum;

	@JsonProperty({ required: true })
	public firstName!: string;

	@JsonProperty({ required: true })
	public lastName!: string;

	@JsonProperty({ required: true })
	public phone!: string;

	@JsonProperty()
	public birthDay?: Date;
}
