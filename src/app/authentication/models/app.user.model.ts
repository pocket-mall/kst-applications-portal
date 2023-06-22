import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export class AppUserModel {
	@JsonProperty({ required: true })
	id: string | undefined;

	@JsonProperty({ required: true })
	username: string | undefined;

	@JsonProperty({ required: true })
	email: string | undefined;

	@JsonProperty()
	verified: boolean | undefined;

	@JsonProperty()
	created: string | undefined;

	@JsonProperty()
	updated: string | undefined;
}
