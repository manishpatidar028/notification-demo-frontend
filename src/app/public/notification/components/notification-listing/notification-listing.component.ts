import { Component, OnDestroy, OnInit } from '@angular/core';
import { NOTIFICATION_ROUTES } from '@app/common/constants/callAPI-constants';
import { ApiService } from '@app/shared/services/api.service';
import { UtilService } from '@app/shared/services/util.service';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-notification-listing',
  templateUrl: './notification-listing.component.html',
  styleUrls: ['./notification-listing.component.scss']
})
export class NotificationListingComponent implements OnInit, OnDestroy {

  public notificationData = [];
  private getUpdates: Subscription;
  public countDown = 10;
  public timerId;
  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
  ) { }

  ngOnInit(): void {
    this.getNotification();
  }

  /**
  * @purpose To get Notification
  */
  async getNotification() {
    this.apiService.startLoader();
    const response: any = await this.apiService.get(NOTIFICATION_ROUTES.GET_NOTIFICATION);
    this.notificationData = response.invites;
    this.notificationData.forEach(element => {
      element.timeSpan = this.utilService.getDate(element.invite_time);
      return element;
    });
    this.getTimer()
    /* To sort data if we need user wise data here i have confusion in requirements so just commented */
    // this.notificationData.sort(function (a, b) { return (a.user_id > b.user_id) ? 1 : ((b.user_id > a.user_id) ? -1 : 0); }); 
    this.getUpdates = interval(10000)
      .subscribe(() => {
        this.getUpdatedNotification();
      });
  }

  /**
  * @purpose To get Updated Notification
  */
  async getUpdatedNotification() {
    this.apiService.startLoader();
    const response: any = await this.apiService.get(NOTIFICATION_ROUTES.GET_UPDATED_NOTIFICATION);
    this.notificationData = response.invites;
    this.notificationData.forEach(element => {
      element.timeSpan = this.utilService.getDate(element.created_at);
      return element;
    });
    /* To sort data if we need user wise data here i have confusion in requirements so just commented */
    // this.notificationData.sort(function (a, b) { return (a.user_id > b.user_id) ? 1 : ((b.user_id > a.user_id) ? -1 : 0); });
  }

  /**
  * @purpose To Unsubscribe the observable.
  */
  ngOnDestroy() {
    this.getUpdates.unsubscribe();
  }

  /**
  * @purpose To get countdown of 10 second.
  */
  getTimer() {
    this.timerId = setInterval(() => {
      this.countDown--;
      if (this.countDown == 0) {
        this.countDown = 10;
      }
    }, 1000);
  }

}
