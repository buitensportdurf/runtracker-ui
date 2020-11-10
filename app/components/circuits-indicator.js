import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CircuitsIndicator extends Component {
  @tracked isCircuitsExpanded = false;

  @computed('args.circuits.[]', 'isCircuitsExpanded')
  get hasCircuitsOverlow() {
    return !this.isCircuitsExpanded && this.args.circuits.length > 4;
  }

  @computed('args.circuits.[]', 'isCircuitsExpanded')
  get circuitsOverflowLength() {
    return this.args.circuits.length - 4;
  }

  @action
  toggleDistancesExpanded() {
    this.isCircuitsExpanded = !this.isCircuitsExpanded;
  }
}
