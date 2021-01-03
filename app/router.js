import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('about');
  this.route('runs', function() {
    this.route('season', { path: '/:season_year' });
  });
  this.route('run', { path: '/run/:run_id' });
});
