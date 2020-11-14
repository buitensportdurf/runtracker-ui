import Component from '@glimmer/component';
import Ember from 'ember';
import { computed } from '@ember/object';

const { generateGuid } = Ember;

export default class RunsListItem extends Component {
  @computed('args.model.{firstName,lastName}')
  get fullName() {
    return `${this.args.model.firstName} ${this.args.model.lastName}`;
  }

  @computed()
  get tooltipId() {
    return generateGuid();
  }
}
