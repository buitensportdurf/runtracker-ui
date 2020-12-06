import Model, { attr, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { isPresent } from '@ember/utils';
import { RUN_ADDRESS_LUT } from '../run-lut';

export default class RunModel extends Model {
  @attr('date') date;
  @attr('date') opensAt;
  @attr('date') closedAt;
  @attr('boolean') resultsPublished;
  @attr('boolean') cancelled;

  @attr('string') city;
  @attr('number') age;
  @attr('number') enrollId;
  @hasMany('circuit', { async: false }) circuits;
  @attr() organization;

  @readOnly('age') minAge;

  @computed('city', 'isCityBelgium')
  get cityDisplay() {
    let city = this.city;
    if (this.isCityBelgium) {
      city = city.substring(0, city.toLowerCase().indexOf('(b)')).trim();
      city += ' 🇧🇪';
    }
    return city.charAt(0).toUpperCase() + city.slice(1);
  }

  @computed('city')
  get isCityBelgium() {
    return this.city.toLowerCase().indexOf('(b)') > 1;
  }

  @computed('date')
  get dateCompact() {
    return `${this.date.getDate()}-${this.date.getMonth()}-${this.date.getFullYear()}`.htmlSafe();
  }

  @computed('circuits.[]')
  get hasDummies() {
    return this.circuits.isAny('dummy');
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

  @computed('circuits.[]')
  get competitions() {
    return this.circuits.filter((circuit) => {
      return isPresent(circuit.competitionType);
    });
  }

  @computed('competitions')
  get competitionsMap() {
    let competitions = this.competitions;
    return {
      youth: competitions.any((circuit) => {
        return circuit.competitionType === 'youth';
      }),
      short: competitions.any((circuit) => {
        return circuit.competitionType === 'short';
      }),
      medium: competitions.any((circuit) => {
        return circuit.competitionType === 'medium';
      }),
      long: competitions.any((circuit) => {
        return circuit.competitionType === 'long';
      })
    }
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
}
