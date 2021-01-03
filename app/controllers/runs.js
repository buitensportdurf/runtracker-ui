import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { debounce } from '@ember/runloop';
import { isPresent, isEmpty, isNone } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class RunsController extends Controller {

  @tracked isSettingsPanelExpanded = false;

  @tracked showCanceled = true;
  @tracked showSeason = null;
  @tracked showCompetitions = true;
  @tracked showTravelTime = true;
  @tracked showMinAge = true;

  @tracked debouncedFilter = null;
  @tracked minAgeFilter = null;
  @tracked transportMode = "car";

  @computed('showCanceled', 'showSeason', 'debouncedFilter', 'minAgeFilter', 'model.[]')
  get filteredRuns() {
    let filter = this.debouncedFilter?.trim();
    let runs = this.model.filter((run) => {
      let nameFilter = isEmpty(filter) ? true : run.city.toLowerCase().includes(filter) || run.organization.name.toLowerCase().includes(filter);
      let ageFilter = isEmpty(this.minAgeFilter) ? true : run.minAge >= this.minAgeFilter;
      let futureFilter = isNone(this.showSeason) ? run.date > moment() : run.date < moment();
      let notCanceledFilter = this.showCanceled ? true : !run.cancelled;
      return nameFilter && ageFilter && futureFilter && notCanceledFilter;
    });
    return runs.sortBy('date');
  }

  @computed('showSeason')
  get seasonDisplay() {
    if (isNone(this.showSeason)) {
      return 'Current season (upcoming)';
    } else {
      return 'Current season (past)';
    }
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

  @action
  selectSeason(year) {
    this.showSeason = year;
  }
}
