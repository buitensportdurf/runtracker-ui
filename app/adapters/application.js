import RESTAdapter from '@ember-data/adapter/rest';
import config from 'runtracker-ui/config/environment';

export default class ApplicationAdapter extends RESTAdapter {
  host = config.host;
  namespace = config.namespace;
}
