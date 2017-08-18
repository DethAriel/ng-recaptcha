## Getting started

* Simply running `npm install` should get you started for development purposes
* Use `npm run lint` during local development to ensure that your code will pass linting (which is also done during CI phase)

## PR guidelines

* Every PR should have an associated issue
* Use [Angular commit message conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)
  * Allowed scopes: `component`, `package`, `build`. If you feel like these do not fit your use-case, consult with maintainer in PR comments section
  * Use `docs(readme|demo|contrib)` for corresponding changes.
* Use `closes #<Issue>` statement in commit <Description> section
* If there are changes required for your PR (or if there are merge conflicts with the target branch) - rebase and force-push instead of merging

## Running demo

Before doing this for the first time, you have to go throught prerequisites installation:

* [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/)
* Install bundler: `gem install bundler`
* Install jekyll: `gem install jekyll`
* Install the bundle for the demo: `cd demo && bundle install`

Now you have the prerequisites. In order to actually run the demo:

* Open `demo/_config.yml` file and follow the instructions within `<DEBUG>` comments. This is a one-time only operation for the whole debug session. **Do not forget to revert this before submitting a PR!**

Now you just have to run `npm run demo` and browse to http://127.0.0.1:4000/ng-recaptcha/
