# NgxBootstrapNavbar

[![npm version](https://img.shields.io/npm/v/ngx-bootstrap-navbar.svg?style=flat-square)](https://www.npmjs.com/package/ngx-bootstrap-navbar)
[![npm downloads total](https://img.shields.io/npm/dt/ngx-bootstrap-navbar.svg?style=flat-square)](https://www.npmjs.com/package/ngx-bootstrap-navbar)
[![npm downloads monthly](https://img.shields.io/npm/dm/ngx-bootstrap-navbar.svg?style=flat-square)](https://www.npmjs.com/package/ngx-bootstrap-navbar)

## What does it do?
Native Angular component and directive for [Bootstrap Navbar](https://getbootstrap.com/docs/4.3/components/navbar/) component. Uses bootstrap classes and Angular Animations for changing the navbars collapse

## Try it
See it in action at [https://stackblitz.com/edit/angular-bootstrap-dynamic-navbar](https://stackblitz.com/edit/angular-bootstrap-dynamic-navbar)

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

* `@angular/core`: `^7.0.0 || ^8.0.0`,
* `bootstrap`: `^4.0.0`,
* `rxjs`: `^5.5.2 || ^6.0.0`
