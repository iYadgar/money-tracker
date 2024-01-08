import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { env } from '@money-tracker/common';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return redirectUnauthorizedTo(`/login`);
};
const redirectLoggedInToPreviousPage = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  let redirectUrl = '/';
  try {
    const redirectToUrl = new URL(state.url, location.origin);
    const params = new URLSearchParams(redirectToUrl.search);
    redirectUrl = params.get('redirectTo') || '/';
  } catch (err) {
    // invalid URL
    console.error('INVALID URL');
    console.error(err);
  }
  return redirectLoggedInTo(redirectUrl);
};
const routes: Routes = [
  {
    path: '',
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    loadChildren: () =>
      import('@money-tracker/layout').then((m) => m.LayoutModule),
  },
  {
    path: 'login',
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToPreviousPage,
    },
    loadChildren: () =>
      import('@money-tracker/login').then((m) => m.LoginModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(env.firebase),
  ],
  exports: [RouterModule],
  providers: [AngularFireAuthGuard],
})
export class AppRoutingModule {}
