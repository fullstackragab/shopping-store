import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NewsletterSubscriptionComponent } from './newsletter-subscription/newsletter-subscription.component';
import { FirstFooterComponent } from './first-footer/first-footer.component';
import { SecondFooterComponent } from './second-footer/second-footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DealsComponent } from './deals/deals.component';
import { HomeMainCategoriesComponent } from './home-main-categories/home-main-categories.component';
import { SalesComponent } from './sales/sales.component';
import { TopInCategoryComponent } from './top-in-category/top-in-category.component';
import { SharedModule } from './shared/shared.module';
import { HomePopularProductsComponent } from './home-popular-products/home-popular-products.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SidenavComponent,
    NewsletterSubscriptionComponent,
    FirstFooterComponent,
    SecondFooterComponent,
    DealsComponent,
    HomeMainCategoriesComponent,
    SalesComponent,
    TopInCategoryComponent,
    HomePopularProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
