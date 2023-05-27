import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthenticationService } from './authentication/services/authentication.service';

export const appConfig: ApplicationConfig = {
	providers: [provideRouter(routes), AuthenticationService]
};
