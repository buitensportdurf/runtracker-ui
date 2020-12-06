import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class RunsListItem extends Component {
  @service('responsive') responsive;

  @tracked isTravelTimePopoverVisible = false;

  @action
  toggleTravelTimePopover() {
    this.isTravelTimePopoverVisible = !this.isTravelTimePopoverVisible;
  }
}
