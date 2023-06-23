import { JsonObject, JsonProperty } from 'typescript-json-serializer';

@JsonObject()
export class AddressModel {
	@JsonProperty({ required: true })
	public street: string | undefined;

	@JsonProperty({ required: true })
	public city: string | undefined;

	@JsonProperty({ required: true })
	public zipcode: string | undefined;

	@JsonProperty()
	public complement: string | undefined;
}
