import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RunsListItem extends Component {
  @service('router') router;

  @action
  openRun() {
    this.router.transitionTo('run', this.args.model.id);
  }
}
