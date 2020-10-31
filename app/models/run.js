import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default class RunModel extends Model {
  @attr("date") date;
  @attr("string") city;
  @attr("number") age;
  @attr() distances;
  @attr() circuits;
  @attr() organization;

  @computed('city')
  get cityCapitalized() {
    return this.city.charAt(0).toUpperCase() + this.city.slice(1);
  }

  @computed('date')
  get dateCompact() {
    return `${this.date.getDate()}-${this.date.getMonth()}-${this.date.getYear()}`.htmlSafe();
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
