import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';

const LOCAL_RUNNERS_PREVIEW_CAP = 4;

export default class RunsListItem extends Component {
  @service('router') router;

  localRunners = LOCAL_RUNNERS_PREVIEW_CAP;

  @computed('args.model.delftUsers.[]', 'isExpanded')
  get hasRunnersOverlow() {
    return this.args.model.delftUsers.length > LOCAL_RUNNERS_PREVIEW_CAP;
  }

  @computed('args.model.delftUsers.[]', 'isExpanded')
  get runnersOverflowLength() {
    return this.args.model.delftUsers.length - LOCAL_RUNNERS_PREVIEW_CAP;
  }

  @action
  openRun() {
    this.router.transitionTo('run', this.args.model.id);
  }
}
