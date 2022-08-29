import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material/material.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {
  NgxMatErrorsModule,
  NGX_MAT_ERROR_DEFAULT_OPTIONS,
  DEFAULT_ERROR_MESSAGES,
  MinError,
} from 'ngx-mat-errors';

export const NGX_MAT_ERROR_DEFAULT_CONFIG: Provider = {
  useFactory: () => {
    return {
      ...DEFAULT_ERROR_MESSAGES,
      min: (error: MinError) =>
        `Min value is ${error.min}, actual is ${error.actual}`,
    };
  },
  provide: NGX_MAT_ERROR_DEFAULT_OPTIONS,
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    AuthModule,
    MaterialModule,
    DragDropModule,
    NgxMatErrorsModule
  ],
  providers: [NGX_MAT_ERROR_DEFAULT_CONFIG],
  bootstrap: [AppComponent]
})
export class AppModule { }
