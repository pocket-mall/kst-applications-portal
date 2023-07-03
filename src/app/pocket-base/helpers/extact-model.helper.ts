import { deserializeObject } from '../../common/helpers/deserializer';
import { UserResponseModel } from '../models/user.response.model';

export const fetchUserResponseModel = (expand: { user: object }) => {
	console.log('expand', expand);
	return deserializeObject(expand.user, UserResponseModel);
};
