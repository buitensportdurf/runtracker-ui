import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { debounce } from '@ember/runloop';
import { isEmpty } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class RunsController extends Controller {

  @tracked isSettingsPanelExpanded = false;

  @tracked showCanceled = true;
  @tracked showPassed = false;
  @tracked showCompetitions = true;
  @tracked showTravelTime = true;
  @tracked showMinAge = true;

  @tracked debouncedFilter = null;
  @tracked minAgeFilter = null;
  @tracked transportMode = "car";

  @computed('showCanceled', 'showPassed', 'debouncedFilter', 'minAgeFilter', 'model.[]')
  get filteredRuns() {
    let filter = this.debouncedFilter?.trim();
    let runs = this.model.filter((run) => {
      let nameFilter = isEmpty(filter) ? true : run.city.toLowerCase().includes(filter) || run.organization.name.toLowerCase().includes(filter);
      let ageFilter = isEmpty(this.minAgeFilter) ? true : run.minAge >= this.minAgeFilter;
      let futureFilter = this.showPassed ? true : run.date > moment();
      let notCanceledFilter = this.showCanceled ? true : !run.cancelled;
      return nameFilter && ageFilter && futureFilter && notCanceledFilter;
    });
    return runs.sortBy('date');
  }

  updateNameFilter = function() {
    this.debouncedFilter = this.filter;
  }

  @action
  changeFilter() {
    debounce(this, this.updateNameFilter, 200);
  }

  @action
  toggleSettingsPanel() {
    this.isSettingsPanelExpanded = !this.isSettingsPanelExpanded;
  }

  @action
  toggleSetting(setting) {
    this[setting] = !this[setting];
  }

  @action
  filterMinAge(age) {
    this.minAgeFilter = age;
  }

  @action
  changeTransportMode(mode) {
    this.transportMode = mode;
  }
}
