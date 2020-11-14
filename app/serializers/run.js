import ApplicationSerializer from './application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class RunSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    circuits: {
      serialize: 'records',
      deserialize: 'records'
    },
    organization: {
      serialize: 'records',
      deserialize: 'records'
    }
  };
}
