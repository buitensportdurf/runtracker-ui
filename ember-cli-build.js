'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      extension: 'scss'
    }
  });

  app.import('public/images/background.jpg');
  app.import('public/images/profile-pictures/arjan-de-kater.jpg');
  app.import('public/images/profile-pictures/berend-koot.jpg');
  app.import('public/images/profile-pictures/christ-akkermans.jpg');
  app.import('public/images/profile-pictures/felix-akkermans.jpg');
  app.import('public/images/profile-pictures/jan-van-willigen.jpg');
  app.import('public/images/profile-pictures/joline-galjaard.jpg');
  app.import('public/images/profile-pictures/jorgis-theodoulou.jpg');
  app.import('public/images/profile-pictures/lisette-kloosterboer.jpg');
  app.import('public/images/profile-pictures/marlies-petter.jpg');
  app.import('public/images/profile-pictures/mitchell-vlaar.jpg');
  app.import('public/images/profile-pictures/pim-vree.jpg');
  app.import('public/images/profile-pictures/samuel-dullaart.jpg');
  app.import('public/images/profile-pictures/schelte-van-de-horst.jpg');
  app.import('public/images/profile-pictures/sjoerd-benning.jpg');
  app.import('public/images/profile-pictures/steffan-norberhuis.jpg');
  app.import('public/images/profile-pictures/willemijn-dreth.jpg');

  return app.toTree();
};
