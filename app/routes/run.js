import Route from '@ember/routing/route';

export default class RunsRoute extends Route {
  model(params) {
    return this.store.findRecord('run', params.run_id);
  }
}
