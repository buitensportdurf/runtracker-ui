import Route from '@ember/routing/route';

export default class RunsRoute extends Route {
  model() {
    return this.store.findAll('run');
  }
}
