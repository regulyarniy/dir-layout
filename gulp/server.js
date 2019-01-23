const browserSync = require(`browser-sync`);
const {TARGET} = require(`./config`);

class Server {
  constructor() {
    this._server = browserSync.create();
  }

  init(done) {
    this._server.init({
      server: `${TARGET.root}`,
      notify: false,
      open: true,
      port: 3000,
      ui: false,
      files: `${TARGET.root}/**/*`
    });
    done();
  }
}

module.exports = Server;
