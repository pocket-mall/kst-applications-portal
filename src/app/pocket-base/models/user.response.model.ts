import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export class UserResponseModel {
	@JsonProperty({ required: true })
	id!: string;

	@JsonProperty({ required: true })
	username!: string;

	@JsonProperty({ required: true })
	email!: string;

	@JsonProperty()
	verified!: boolean;

	@JsonProperty()
	created!: string;

	@JsonProperty()
	updated!: string;
}
