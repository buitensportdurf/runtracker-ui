import Component from '@glimmer/component';
import Ember from 'ember';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

const { generateGuid } = Ember;

export default class CircuitsIndicator extends Component {
  @computed('args.isCompact')
  get isCompact() {
    return isPresent(this.args.isCompact) ? this.args.isCompact : true;
  }

  @computed()
  get youthCircuitTooltipId() {
    return generateGuid();
  }

  @computed()
  get shortCircuitTooltipId() {
    return generateGuid();
  }

  @computed()
  get mediumCircuitTooltipId() {
    return generateGuid();
  }

  @computed()
  get longCircuitTooltipId() {
    return generateGuid();
  }
}
