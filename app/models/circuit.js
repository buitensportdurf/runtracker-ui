import Model, { attr, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { equal, readOnly } from '@ember/object/computed';

export default class CircuitModel extends Model {
  @attr('string') rawName;
  @attr('string') circuitType;
  @attr('string') competitionType;
  @attr('boolean') dummy;
  @attr('number') distance;
  @attr('number') groupSize;
  @attr('number') price;
  @attr('number') points;

  @attr('number') minAge;
  @attr('number') maxAge;

  @attr('number') userCapacity;
  @attr('number') userCount;

  @hasMany('user') users;

  @readOnly('dummy') isDummy;

  @equal('groupSize', 1) isIndividual;
  @equal('groupSize', 2) isCouple;

  @equal('circuitType', 'wedstrijd') isCompetition;
  @equal('circuitType', 'recreatief') isRecreational;

  @equal('competitionType', 'youth') isYouthCompetition;
  @equal('competitionType', 'short') isShortCompetition;
  @equal('competitionType', 'medium') isMediumCompetition;
  @equal('competitionType', 'long') isLongCompetition;

  @computed('userCapacity', 'userCount')
  get capacityUsed() {
    return this.userCount / this.userCapacity;
  }

  @computed('userCapacity', 'userCount')
  get capacityLeft() {
    return this.userCapacity - this.userCount;
  }
}
