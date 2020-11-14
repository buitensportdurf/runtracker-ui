import Model, { attr, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { RUN_ADDRESS_LUT } from '../run-lut';

export default class RunModel extends Model {
  @attr('date') date;
  @attr('string') city;
  @attr('number') age;
  @attr('number') enrollId;
  @attr('boolean') cancelled;
  @hasMany('circuit', { async: false }) circuits;
  @attr() organization;

  @readOnly('age') minAge;

  @computed('city')
  get cityCapitalized() {
    return this.city.charAt(0).toUpperCase() + this.city.slice(1);
  }

  @computed('date')
  get dateCompact() {
    return `${this.date.getDate()}-${this.date.getMonth()}-${this.date.getFullYear()}`.htmlSafe();
  }

  @computed('circuits.[]')
  get distances() {
    return this.circuits.reduce((collect, circuit) => {
      if (!collect.includes(circuit.distance)) {
        collect.push(circuit.distance);
      }
      return collect;
    }, []);
  }

  @computed('enrollId')
  get canEnroll() {
    return this.enrollId > 0;
  }

  @computed('enrollId')
  get enrollURI() {
    return `https://www.uvponline.nl/uvponlineF/inschrijven/${this.enrollId}`;
  }

  @computed('circuits.[]')
  get delftUsers() {
    return this.circuits.reduce((collect, circuit) => {
      let delftUsers = circuit.users.filterBy('isCityDelft');
      return collect.concat(delftUsers);
    }, []);
  }

  @computed('organization.id')
  get address() {
    return RUN_ADDRESS_LUT[this.organization.id]?.address;
  }

  @computed('address')
  get googleMapsURI() {
    return `https://www.google.com/maps/dir/Delft/${this.address.replace(/\s/g, "+")}/`.htmlSafe();
  }

  /* eslint-disable ember/require-computed-property-dependencies */
  @computed('circuits.[]')
  get competitionsMap() {
    return {
      youth: (Math.random() > 0.5),
      short: (Math.random() > 0.5),
      medium: (Math.random() > 0.5),
      long: (Math.random() > 0.5)
    }
  }
}
