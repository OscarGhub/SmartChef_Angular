import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {}
}

import { createAnimation, IonicModule } from '@ionic/angular';

export function fadeAnimation(baseEl: HTMLElement, opts?: any) {
  const enteringEl = opts.enteringEl;
  const leavingEl = opts.leavingEl;

  const rootTransition = createAnimation()
    .addElement(enteringEl)
    .duration(300)
    .fromTo('opacity', '0', '1');

  if (leavingEl) {
    const leavingAnimation = createAnimation()
      .addElement(leavingEl)
      .duration(200)
      .fromTo('opacity', '1', '0');
    rootTransition.addAnimation([leavingAnimation]);
  }

  return rootTransition;
}
