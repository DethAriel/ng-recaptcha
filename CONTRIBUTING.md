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

In order for everything to go smooth, you'll need to check prerequisites first:

* Check if you're logged in to npm: `npm whoami`. If it errs out - log in via `npm adduser`.
* In order for [`conventional-github-releaser`](https://github.com/ckeditor/conventional-github-releaser) to work, you need to set the `CONVENTIONAL_GITHUB_RELEASER_TOKEN` environment variable. Follow the instructions from the project's [README](https://github.com/ckeditor/conventional-github-releaser#setup-token-for-cli) to do that.

After you did that, follow the below process:

* Pushed the latest changes to upstream: `git push`
* Ensure that the build succeeds
* To start with, make sure all the dependencies are up-to-date: `yarn && yarn clean && yarn demo:install`
* Then you need to prepare a release. Run `npm run prepare-release <VERSION>`. Use `npm` , not `yarn`!
  * Possible forms of `<VERSION>`: `<MAJOR>.<MINOR>.<PATCH>`, `<MAJOR>.<MINOR>.<PATCH>-beta.<BETA_VERSION>`
* Verify the latest commit, and run `git push && git push --tag` to push the changes to the origin
* Wait for the build to succeed
* Publish the package to npm *from the "/dist" directory*: `cd dist && npm publish` (or `cd dist && npm publish --tag beta`)
* Create a GitHub release and update the demo site by running `yarn github-release && yarn demo:publish`
