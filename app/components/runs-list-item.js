import Component from '@glimmer/component';
import Ember from 'ember';
import { computed } from '@ember/object';

const { generateGuid } = Ember;

export default class RunsListItem extends Component {
  @computed()
  get adddressTooltipId() {
    return generateGuid();
  }
}
