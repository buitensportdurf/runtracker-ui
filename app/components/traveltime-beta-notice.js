import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TraveltimeBetaNotice extends Component {
  @tracked isTravelTimePopoverVisible = false;

  @action
  toggleTravelTimePopover() {
    this.isTravelTimePopoverVisible = !this.isTravelTimePopoverVisible;
  }
}
