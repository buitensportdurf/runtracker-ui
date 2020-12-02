import Component from '@glimmer/component';
import { set, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const OVERFLOW_THRESHOLD = 10;

export default class LocalRunners extends Component {
  overflowThreshold = OVERFLOW_THRESHOLD;

  @tracked isExpanded = false;

  @action
  toggleExpanded() {
    set(this, 'isExpanded', !this.isExpanded);
  }
}
