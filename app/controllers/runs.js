import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { debounce } from '@ember/runloop';
import { isEmpty } from '@ember/utils';
import { tracked } from '@glimmer/tracking';

export default class RunsController extends Controller {
  @tracked debouncedFilter = '';
  @tracked settings = {};
  @tracked isSettingsPanelExpanded = false;

  @tracked showCompetitions = true;
  @tracked showTravelTime = true;

  @computed('debouncedFilter', 'model.[]')
  get filteredRuns() {
    let filter = this.debouncedFilter?.trim();
    if (isEmpty(filter)) {
      return this.model;
    }
    return this.model.filter((run) => {
      return run.city.toLowerCase().includes(filter) || run.organization.name.toLowerCase().includes(filter);
    });
  }

  updateFilter = function() {
    this.debouncedFilter = this.filter;
  }

  @action
  filterKeypress() {
    debounce(this, this.updateFilter, 200);
  }

  @action
  toggleSettingsPanel() {
    this.isSettingsPanelExpanded = !this.isSettingsPanelExpanded;
  }

  @action
  toggleSetting(setting) {
    this[setting] = !this[setting];
  }
}
