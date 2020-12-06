import Component from '@glimmer/component';
import { set, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class LocalRunners extends Component {
  @tracked isExpanded = false;

  @action
  toggleExpanded() {
    set(this, 'isExpanded', !this.isExpanded);
  }
}
