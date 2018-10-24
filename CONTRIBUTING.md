## Getting started

* Simply running `yarn` should get you started for development purposes
* Use `yarn lint` during local development to ensure that your code will pass linting (which is also done during CI phase)

## PR guidelines

* Every PR should have an associated issue
* Use [Angular commit message conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)
  * Allowed scopes: `component`, `package`, `build`. If you feel like these do not fit your use-case, consult with maintainer in PR comments section
  * Use `docs(readme|demo|contrib)` for corresponding changes.
* Use `closes #<Issue>` statement in commit <Description> section
* If there are changes required for your PR (or if there are merge conflicts with the target branch) - rebase and force-push instead of merging

## Running demo

In order to run the demo you need to `yarn demo`. Then the demo site will be available at http://localhost:9000/ng-recaptcha/.

## Maintainer notes

### Release


* First, you need to prepare a release. Run `npm run prepare-release <VERSION>`. Use `npm` , not `yarn`!
  * Possible forms of `<VERSION>`: `<MAJOR>.<MINOR>.<PATCH>`, `<MAJOR>.<MINOR>.<PATCH>-beta.<BETA_VERSION>`
* Verify the latest commit, and run `git push && git push --tag` to push the changes to the origin
* Wait for the build to succeed
* Publish the package to npm: `npm publish` (or `npm publish --tag beta`)
* Create a GitHub release and update the demo site by running `yarn github-release && yarn demo:publish`
