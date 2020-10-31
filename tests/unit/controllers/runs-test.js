import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | runs', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:runs');
    assert.ok(controller);
  });
});
