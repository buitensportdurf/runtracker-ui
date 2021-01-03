import Route from '@ember/routing/route';

export default class RunsIndexRoute extends Route {
  model() {
    return this.store.findAll('run');
  }
}
