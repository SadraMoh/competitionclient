import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {

  constructor(private modalService: ModalService) { }

  async canDeactivate(component: ComponentCanDeactivate) {
    // if there are no pending changes, just allow deactivation; else confirm first
    if (component.canDeactivate())
      return true;
    else {
      // NOTE: this warning message will only be shown when navigating elsewhere within your angular app;
      // when navigating away from your angular app, the browser will show a generic warning message
      const res = await this.modalService.confirm('هشدار', 'هشدار، خروج از این صفحه باعث از میان رفتن تغییرات شما می شود');
      return res;
    }

  }
}