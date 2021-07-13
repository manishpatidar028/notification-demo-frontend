import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationListingComponent } from './components/notification-listing/notification-listing.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    NotificationListingComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    SharedModule
  ]
})
export class NotificationModule { }
