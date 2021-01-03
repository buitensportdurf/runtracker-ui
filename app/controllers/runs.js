import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { debounce } from '@ember/runloop';
import { isEmpty, isNone } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class RunsController extends Controller {

  @tracked isSettingsPanelExpanded = false;

  @tracked showCanceled = true;
  @tracked showSeason = null;
  @tracked showCompetitions = true;
  @tracked showTravelTime = true;
  @tracked showAge = true;

  @tracked ageFilter = null;
  @tracked debouncedAgeFilter = null;
  @tracked nameFilter = null;
  @tracked debouncedNameFilter = null;
  @tracked transportMode = "car";

  @computed('showCanceled', 'showSeason', 'debouncedNameFilter', 'ageFilter', 'model.[]')
  get filteredRuns() {
    let filter = this.debouncedNameFilter?.trim();
    let runs = this.model.filter((run) => {
      let nameFilter = isEmpty(filter) ? true : run.city.toLowerCase().includes(filter) || run.organization.name.toLowerCase().includes(filter);
      let ageFilter = isEmpty(this.ageFilter) ? true : this.ageFilter >= run.age;
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
    this.debouncedNameFilter = this.nameFilter;
  }
  updateAgeFilter = function() {
    this.debouncedAgeFilter = this.ageFilter;
  }

  @action
  changeNameFilter() {
    debounce(this, this.updateNameFilter, 200);
  }

  @action
  changeAgeFilter() {
    debounce(this, this.updateAgeFilter, 200);
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
  changeTransportMode(mode) {
    this.transportMode = mode;
  }

  @action
  selectSeason(year) {
    this.showSeason = year;
  }
}
