import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';
import { RUN_ADDRESS_LUT } from '../run-lut';

export default class RunModel extends Model {
  @attr('date') date;
  @attr('string') city;
  @attr('number') age;
  @attr() distances;
  @attr() circuits;
  @attr() organization;

  @computed('city')
  get cityCapitalized() {
    return this.city.charAt(0).toUpperCase() + this.city.slice(1);
  }

  @computed('date')
  get dateCompact() {
    return `${this.date.getDate()}-${this.date.getMonth()}-${this.date.getFullYear()}`.htmlSafe();
  }

  @computed('organization.id')
  get address() {
    return RUN_ADDRESS_LUT[this.organization.id]?.address;
  }

  @computed('organization.id')
  get travelTimeHours() {
    let hours = Math.floor( RUN_ADDRESS_LUT[this.organization.id]?.travelTime.car / 60);
    return hours > 0 ?  hours : null;
  }
  @computed('organization.id')
  get travelTimeMinutes() {
    return RUN_ADDRESS_LUT[this.organization.id]?.travelTime.car % 60;
  }

  @computed('address')
  get googleMapsURI() {
    return `https://www.google.com/maps/dir/Delft/${this.address.replace(/\s/g, "+")}/`.htmlSafe();
  }

  /* eslint-disable ember/require-computed-property-dependencies */
  @computed('circuits.[]')
  get circuitsMap() {
    return {
      youth: this.circuits.includes('youth'),
      short: this.circuits.includes('short'),
      medium: this.circuits.includes('medium'),
      long: this.circuits.includes('long')
    }
  }
}
