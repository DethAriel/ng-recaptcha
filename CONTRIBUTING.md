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

In order to run the demo you need to `npm run demo`. Then the demo site will be available at http://localhost:9000/ng-recaptcha/.
