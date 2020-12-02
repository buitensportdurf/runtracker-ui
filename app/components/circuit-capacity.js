import Component from '@glimmer/component';
import { computed } from '@ember/object';

export default class LocalRunners extends Component {
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
}
