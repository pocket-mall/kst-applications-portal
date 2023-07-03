import { JsonSerializer } from 'typescript-json-serializer';

const deserializer = new JsonSerializer({
	nullishPolicy: {
		undefined: 'allow',
		null: 'allow'
	}
});

export function deserializeObject<T extends Object>(json: any, type: new () => T): T | undefined {
	return deserializer.deserializeObject<T>(json, type) ?? undefined;
}
