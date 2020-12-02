import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const OVERFLOW_THRESHOLD = 4;

export default class CircuitsIndicator extends Component {
  overflowThreshold = OVERFLOW_THRESHOLD;

  @tracked isCircuitsExpanded = false;

  @computed('args.model.distances.[]', 'isCircuitsExpanded')
  get hasCircuitsOverlow() {
    return !this.isCircuitsExpanded && this.args.model.distances.length > OVERFLOW_THRESHOLD;
  }

  @computed('args.model.distances.[]', 'isCircuitsExpanded')
  get circuitsOverflowLength() {
    return this.args.model.distances.length - OVERFLOW_THRESHOLD;
  }

  @action
  toggleDistancesExpanded() {
    this.isCircuitsExpanded = !this.isCircuitsExpanded;
  }
}
