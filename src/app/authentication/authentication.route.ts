import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const authenticationRoutes: Routes = [
	{
		path: 'auth',
		children: [
			{
				path: 'login',
				loadComponent: () => LoginComponent
			},
			{
				path: 'sign-up',
				loadComponent: () => SignUpComponent
			}
		]
	}
];
