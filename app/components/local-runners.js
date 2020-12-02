import Component from '@glimmer/component';
import { set, action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const OVERFLOW_THRESHOLD = 10;

export default class LocalRunners extends Component {
  overflowThreshold = OVERFLOW_THRESHOLD;

  @tracked isExpanded = false;

  @computed('args.model.delftUsers.[]', 'isExpanded')
  get hasRunnersOverlow() {
    return !this.isExpanded && this.args.model.delftUsers.length > OVERFLOW_THRESHOLD;
  }

  @computed('args.model.delftUsers.[]', 'isExpanded')
  get runnersOverflowLength() {
    return this.args.model.delftUsers.length - OVERFLOW_THRESHOLD;
  }

  @action
  toggleExpanded() {
    set(this, 'isExpanded', !this.isExpanded);
  }
}
