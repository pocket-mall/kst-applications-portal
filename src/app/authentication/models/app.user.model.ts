import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export class AppUserModel {
	@JsonProperty()
	id: string | undefined;

	@JsonProperty()
	username: string | undefined;

	@JsonProperty()
	email: string | undefined;

	@JsonProperty()
	verified: boolean | undefined;

	@JsonProperty()
	created: string | undefined;

	@JsonProperty()
	updated: string | undefined;
}
