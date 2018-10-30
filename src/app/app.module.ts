import { NgModule , NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { LOCALE_ID } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// import { MatButtonModule} from '@angular/material';
import { SimpleModalModule } from 'ngx-simple-modal';

import { environment } from './../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';
import { HomeComponent } from './core/components/home/home.component';
import { ShoppingModule } from './shopping/shopping.module';
import { ConfirmComponent } from 'app/core/confirm/confirm.component';
import { FormWorkerComponent } from 'app/core/form-worker/form-worker.component';

@NgModule({
  schemas: [NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    ConfirmComponent   
  ],
  imports: [
  BrowserModule,
  SimpleModalModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'app-products', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'form-worker', component: FormWorkerComponent },
    ])    
  ],
  entryComponents: [
    ConfirmComponent
  ],
  providers: [
    AdminAuthGuard,
    [ { provide: LOCALE_ID, useValue: 'he' } ],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
