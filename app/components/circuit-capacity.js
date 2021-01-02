import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { later, cancel } from '@ember/runloop';
import { tracked } from '@glimmer/tracking';

export default class LocalRunners extends Component {
  @tracked startAnimation = false;

  @computed('args.model.capacityUsed')
  get _capacityBarStyles() {
    return `width: ${this.args.model.capacityUsed * 100}%`.htmlSafe();
  }

  @computed('args.model.capacityUsed')
  get _capacityBarClass() {
    if (this.args.model.capacityUsed > 0.9) {
      return `rt-circuit-capacity__bar--red`;
    } else if (this.args.model.capacityUsed > 0.75) {
      return `rt-circuit-capacity__bar--orange`;
    } else {
      return `rt-circuit-capacity__bar--blue`;
    }
  }

  @action
  scheduleAnimation() {
    this.animationTimeout = later(() => {
      this.startAnimation = true;
    }, 100 + 50 * this.args.index);
  }

  willDestroy() {
    cancel(this.animationTimeout);
  }
}
