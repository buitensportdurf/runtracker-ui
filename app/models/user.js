import Model, { attr } from '@ember-data/model';
import { Promise } from 'rsvp';
import { computed, action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class UserModel extends Model {
  @attr('string') firstName;
  @attr('string') middleName;
  @attr('string') lastName;
  @attr('string') city;
  @attr('string') gender;
  @attr('string') username;

  @tracked hasProfilePicture = false;

  @computed('firstName', 'lastName', 'middleName')
  get fullName() {
    let fullName = `${this.firstName}`;
    if (!isEmpty(this.middleName)) {
      fullName = `${fullName} ${this.middleName}`
    }
    fullName = `${fullName} ${this.lastName}`
    return fullName;
  }

  @computed('city')
  get isCityDelft() {
    return this.city.toLowerCase() === 'delft';
  }

  @computed('username')
  get profilePictureSrc() {
    return `/images/profile-pictures/${this.username.replaceAll('_','-').replaceAll('--','-')}.jpg`.htmlSafe();
  }

  @action
  preloadProfilePicture() {
    return new Promise((resolve, reject) => {
      let img = new Image();

      img.onload = resolve.bind(this, img);
      img.onerror = reject.bind(this, img);

      img.src = this.profilePictureSrc;
      // return img; // return to access image later
    }).then(() => {
      this.set('hasProfilePicture', true);
    }).catch(() => {
    });
  }
}
