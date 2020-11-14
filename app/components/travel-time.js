import Ember from 'ember';
import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { RUN_ADDRESS_LUT } from '../run-lut';

const { generateGuid } = Ember;

export default class TravelTime extends Component {

    @computed()
    get adddressTooltipId() {
      return generateGuid();
    }

    @computed('args.model.organization.id')
    get travelTimeCarHours() {
      return this.timeToHours(RUN_ADDRESS_LUT[this.args.model.organization.id]?.travelTime.car);
    }
    @computed('args.model.organization.id')
    get travelTimeCarMinutes() {
      return this.timeToMinutes(RUN_ADDRESS_LUT[this.args.model.organization.id]?.travelTime.car);
    }
    @computed('args.model.organization.id')
    get travelTimeTransitHours() {
      return this.timeToHours(RUN_ADDRESS_LUT[this.args.model.organization.id]?.travelTime.transit);
    }
    @computed('args.model.organization.id')
    get travelTimeTransitMinutes() {
      return this.timeToMinutes(RUN_ADDRESS_LUT[this.args.model.organization.id]?.travelTime.transit);
    }

    timeToHours(time) {
      let hours = Math.floor( time / 60);
      return hours > 0 ?  hours : null;
    }

    timeToMinutes(time) {
      return time % 60;
    }
}
