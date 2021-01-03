import Route from '@ember/routing/route';

export default class RunsRoute extends Route {
  model(params) {
    console.log(params.season_year);
    return this.store.findAll('run');
  }
}
