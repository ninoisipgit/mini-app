// Import PrimeNG modules
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputMaskModule } from 'primeng/inputmask';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
@NgModule({
  imports: [
    AvatarModule,
    AvatarGroupModule,
    AnimateOnScrollModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    CommonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    SelectButtonModule,
    InputMaskModule,
    PanelModule,
    ToolbarModule,
    RouterModule,
    DropdownModule,
    CardModule,
    FileUploadModule

  ],
  exports: [
    AvatarModule,
    AvatarGroupModule,
    AnimateOnScrollModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccordionModule,
    TableModule,
    ButtonModule,
    CommonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    SelectButtonModule,
    InputMaskModule,
    PanelModule,
    ToolbarModule,
    RouterModule,
    DropdownModule,
    CardModule,
    FileUploadModule

  ],
  providers: [  ]
})
export class ImportsModule {}
