# NgxBootstrapNavbar

[![npm version](https://img.shields.io/npm/v/ngx-bootstrap-navbar.svg?style=flat-square)](https://www.npmjs.com/package/ngx-bootstrap-navbar)
[![npm downloads total](https://img.shields.io/npm/dt/ngx-bootstrap-navbar.svg?style=flat-square)](https://www.npmjs.com/package/ngx-bootstrap-navbar)
[![npm downloads monthly](https://img.shields.io/npm/dm/ngx-bootstrap-navbar.svg?style=flat-square)](https://www.npmjs.com/package/ngx-bootstrap-navbar)

## What does it do?
Native Angular component and directive for [Bootstrap Navbar](https://getbootstrap.com/docs/5.1/components/navbar/) component. Uses bootstrap classes and Angular Animations for changing the navbars collapse

## Try it
See it in action with:
* Bootstrap 4 at [https://stackblitz.com/edit/angular-13-bootstrap-4-dynamic-navbar](https://stackblitz.com/edit/angular-13-bootstrap-4-dynamic-navbar)
* Bootstrap 5 at [https://stackblitz.com/edit/angular-13-bootstrap-dynamic-5-navbar](https://stackblitz.com/edit/angular-13-bootstrap-dynamic-5-navbar)

## How to use it?
Install `ngx-bootstrap-navbar` in your project:
```
npm install ngx-bootstrap-navbar
```

Import the `NgxNavbarModule` in your `app.module.ts`:
```typescript
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    NgxNavbarModule
  ],
})
export class AppModule {}
```

Use the `ngx-navbar-collapse` component as the container of the .navbar-nav, it applies the basic bootstrap classes too.
If you want to dynamically detect that the navbar fits and can be expanded use the `ngxNavbarDynamicExpand` directive on the navbar. It applies the .navbar and .text-nowrap classes.
```html
<nav ngxNavbarDynamicExpand class="navbar-light bg-light">
  <button class="navbar-toggler" type="button" (click)="collapse.toggle()">
    ....
  </button>
  <ngx-navbar-collapse #collapse="ngxNavbarCollapse">
    <ul class="navbar-nav mr-auto">
      ...
    </ul>
  </ngx-navbar-collapse>
</nav>
```


### Compatibility

* `@angular/core`: `^13.0.0`,
* `bootstrap`: `^4.0.0 || ^5.0.0`,

## Development

### Library Build / NPM Package
Run `npm run build:lib` to build the library and generate an NPM package. 
The build artifacts will be stored in the `dist/ngx-bootstrap-navbar` folder.

### Development server

Run `npm run develop` for building the lib and watch it's changes, then run `npm run start` for a dev server. Navigate to `http://localhost:4203/`. The app will automatically reload if you change any of the source files.

