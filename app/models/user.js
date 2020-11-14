import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default class UserModel extends Model {
  @attr('string') firstName;
  @attr('string') lastName;
  @attr('string') city;
  @attr('string') gender;

  @computed('firstName', 'lastName')
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @computed('city')
  get isCityDelft() {
    return this.city.toLowerCase() === 'delft';
  }
}
