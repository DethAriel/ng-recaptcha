(function (global) {
  global.initSystemJS = function (recaptchaMapping, loadForms) {
    // lock in the angular package version; do not let it float to current!
    var ngVer = '@4.0.0';

    //map tells the System loader where to look for things
    var map = {
      'examples': './examples/app',

      '@angular': 'https://npmcdn.com/@angular', // sufficient if we didn't pin the version
      'rxjs': 'https://npmcdn.com/rxjs@5.2.0',
      'ts': 'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js',
      'typescript': 'https://npmcdn.com/typescript@2.2.0/lib/typescript.js',
      'ng-recaptcha': recaptchaMapping,
    };

    //packages tells the System loader how to load when no filename and/or no extension
    var packages = {
      'examples': { defaultExtension: 'ts' },
      'ng-recaptcha': { main: 'index.js', defaultExtension: 'js' },
    };

    var ngPackageNames = [
      'common',
      'compiler',
      'core',
      'platform-browser',
      'platform-browser-dynamic',
    ];

    if (loadForms) {
      ngPackageNames.push('forms');
    }

    ngPackageNames.forEach(function (pkgName) {
      // Add map entries for each angular package
      // only because we're pinning the version with `ngVer`.
      map['@angular/' + pkgName] = 'https://npmcdn.com/@angular/' + pkgName + ngVer;
      // Add package entries for angular packages
      packages['@angular/' + pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    });

    var config = {
      // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
      transpiler: 'ts',
      typescriptOptions: {
        "target": "es5",
        "module": "system",
        "moduleResolution": "node",
        "sourceMap": false,
        "declaration": true,
        "removeComments": false,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "noImplicitAny": true,
        "listFiles": false,
        "noLib": false
      },
      meta: {
        'typescript': {
          "exports": "ts"
        }
      },
      map: map,
      packages: packages
    }

    System.config(config);
  };
})(this);
