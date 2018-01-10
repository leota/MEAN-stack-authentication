import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';

import { ToastComponent } from './toast/toast.component';
import { LoadingComponent } from './loading/loading.component';
import { PageHeaderComponent } from './page-header/page-header.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    // Shared Modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // Shared Components
    ToastComponent,
    LoadingComponent,
    PageHeaderComponent
  ],
  declarations: [
    ToastComponent,
    LoadingComponent,
    PageHeaderComponent
  ],
  providers: [
    ToastComponent
  ]
})
export class SharedModule { }
