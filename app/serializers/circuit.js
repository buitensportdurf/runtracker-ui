import ApplicationSerializer from './application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class CircuitSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    users: {
      serialize: 'records',
      deserialize: 'records'
    }
  };
}
