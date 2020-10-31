import Component from '@glimmer/component';
import Ember from 'ember';
import { computed } from '@ember/object';

const { generateGuid } = Ember;

export default class CircuitsIndicator extends Component {
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
