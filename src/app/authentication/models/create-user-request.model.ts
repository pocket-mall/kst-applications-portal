import { JsonObject, JsonProperty } from 'typescript-json-serializer';
import { AddressModel } from './address.model';
import { CivilityEnum } from '../../profile/enums/civility.enum';

@JsonObject()
export class CreateUserRequestModel {
	@JsonProperty({ required: true })
	public email: string | undefined;

	@JsonProperty({ required: true })
	public password: string | undefined;

	@JsonProperty({ required: true })
	public civility: CivilityEnum | undefined;

	@JsonProperty({ required: true })
	public firstName: string | undefined;

	@JsonProperty({ required: true })
	public lastName: string | undefined;

	@JsonProperty({ required: true })
	public phone: string | undefined;

	@JsonProperty()
	public birthDay?: Date;

	@JsonProperty()
	public address: AddressModel | undefined;
}
