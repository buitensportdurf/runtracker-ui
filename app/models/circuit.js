import Model, { attr, hasMany } from '@ember-data/model';

export default class CircuitModel extends Model {
  @attr('string') rawName;
  @attr('string') circuitType;
  @attr('number') distance;
  @attr('number') groupSize;
  @attr('number') price;
  @attr('number') points;
  @attr('boolean') dummy;

  @attr('number') minAge;
  @attr('number') maxAge;

  @hasMany('user') users;
}
