import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Add ReactiveFormsModule here
import { AppComponent } from './app.component';
import { SplitCommentPipe } from './split-comment.pipe'; // adjust the path as needed

@NgModule({
  declarations: [
    AppComponent,
    SplitCommentPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule // And add it here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
