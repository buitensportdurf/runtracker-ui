import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CircuitsIndicator extends Component {
  @tracked isCircuitsExpanded = false;

  @computed('circuits.[]', 'isCircuitsExpanded')
  get hasCircuitsOverlow() {
    return !this.isCircuitsExpanded && this.circuits?.length > 3;
  }

  @action
  toggleDistancesExpanded() {
    this.toggleProperty('isDistancesExpanded');
  }
}
