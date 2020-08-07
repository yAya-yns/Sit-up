import { AnimationController, Animation } from '@ionic/angular'


export const enterAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
  const DURATION = 1000;
  const animationCtrl = new AnimationController();

  if (opts.direction == 'forward') {
    const inAnimation = animationCtrl.create()
      .addElement(opts.enteringEl)
      .duration(DURATION)
      .easing('ease-in')
      .fromTo('opacity', 0, 1)
    
    const outAnimation = animationCtrl.create()
    .addElement(opts.leavingEl)
    .duration(DURATION)
    .easing('ease-out')
    .fromTo('opacity', 1, 0)
    

    return animationCtrl.create().addAnimation([inAnimation, outAnimation]);
    
  } else {
    return null
  }

}