import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG Modules
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog'; // <-- Add this
import { InputTextModule } from 'primeng/inputtext'; // <-- And this

// Your Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import { CreateComponent } from './components/auth/create/create.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { DashnavComponent } from './components/dashnav/dashnav.component';
import { RestaurantComponent } from './components/resto/resto.component';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CreateComponent,
    LoginComponent,
    DashboardComponent,
    CarouselComponent,
    DashnavComponent,
    RestaurantComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // <-- Ensure FormsModule is imported
    ReactiveFormsModule,
    CarouselModule,
    ButtonModule,
    DropdownModule,
    PasswordModule,
    CheckboxModule,
    ToastModule,
    DialogModule, // <-- And added here
    InputTextModule, // <-- And here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }