## Getting started

You should have [`nvm`](https://github.com/nvm-sh/nvm) and [`yarn@1`](https://classic.yarnpkg.com/lang/en/docs/install/) installed.

- Run `nvm use` to make sure that you're on the right version of Node.js
- Run `yarn` should get you started for development purposes
- Run `yarn demo:file-gen` to ensure that auto-generated code files are present (otherwise linters will complain)
- `yarn lib:build` needs to be run in order for the demo to work correctly (as well as for the linting to pass)

### Testing

- Use `yarn lint` during local development to ensure that your code will pass linting (which is also done during CI phase)
- Use `yarn ng test` to run unit tests, `yarn ng e2e demo` to run a basic end-to-end smoke test.

## PR guidelines

- Every PR should have an associated issue
- PRs with failing builds **will not be accepted**
- Use [Angular commit message conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)
  - Allowed scopes: `component`, `package`, `build`, `docs`. If you feel like these do not fit your use-case, consult with maintainer in PR comments section
  - Use `chore(docs)` instead of `docs(<scope>)`
- Use `closes #<Issue>` statement in commit <Description> section
- Keep PRs focused on your changes. That is, don't go on a wild hunt to update code styles without consulting to maintainer first
- If there are changes required for your PR (or if there are merge conflicts with the target branch) - rebase and force-push instead of merging

## Running demo

In order to run the demo you need to build the lib first by running `yarn lib:build`. Then use `yarn demo:serve` to see the demo site at http://localhost:4200/ng-recaptcha/.

## Maintainer notes

### Release

In order for everything to go smooth, you'll need to check prerequisites first:

- Check if you're logged in to npm: `npm whoami`. If it errs out - log in via `npm adduser`.
- In order for [`conventional-github-releaser`](https://github.com/ckeditor/conventional-github-releaser) to work, you need to set the `CONVENTIONAL_GITHUB_RELEASER_TOKEN` environment variable. Follow the instructions from the project's [README](https://github.com/ckeditor/conventional-github-releaser#setup-token-for-cli) to do that.

After you did that, follow the below process:

- Pushed the latest changes to upstream: `git push`

  - use the following commit message convension when updating Angular to a newer version:
    > feat(package): add Angular N support
    >
    > BREAKING CHANGE:
    > Angular v(N-1) is no longer supported with this version. Pin `ng-recaptcha` to `vM.x.x` to retain support for a previous Angular version

- Ensure that the build succeeds
- To start with, make sure all the dependencies are up-to-date: `yarn && yarn clean`
- Then you need to prepare a release.

  - Export the version variable for later use by scripts: `export NGR_VERSION=<VERSION>`
    - Possible forms of `<VERSION>`: `<MAJOR>.<MINOR>.<PATCH>`, `<MAJOR>.<MINOR>.<PATCH>-beta.<BETA_VERSION>`
  - Run `npm version $NGR_VERSION`. Use `npm`, not `yarn`!

- Verify the latest commit, and run `git push` to push the changes to the origin
- Wait for the build to succeed. If the build is green, you're ready to publish.
- First, push the git tag to the origin with `git push --tags`
- Publish the package to npm _from the "/dist/ng-recaptcha" directory_: `cd dist/ng-recaptcha && npm publish` (or `cd dist/ng-recaptcha && npm publish --tag beta`)
- Create a GitHub release by running `yarn github-release`
- Publish the updated version of the demo site: `yarn demo:file-gen && yarn demo:build && yarn demo:publish-gh-pages`
- Update the [StackBlitz example](https://stackblitz.com/edit/ng-recaptcha-example) to the latest version
  - if it complains about `core-js`, try `core-js@2` as per [this comment](https://github.com/stackblitz/core/issues/930#issuecomment-482606881)

# List of commands that need to succeed

Generally CI runs those, but since I've run out of TravisCI credits, you can find the commands below. Hopefully I (or someone else) can migrate to Github Actions soon.

```sh
nvm use
yarn install
yarn cypress install
yarn demo:file-gen
yarn lib:build
yarn lint
yarn prettier --check --ignore-unknown "*"
yarn demo:build
yarn ng test ng-recaptcha --code-coverage
yarn ng run demo:cypress-run
```

### Back-porting fixes to older versions

- First, fix the issue in `master` for the current version.
- Check out the `vN.x.x` branch, and cherry-pick the fix to the desired past versions, starting with the oldest one.
- For each of these, ensure that builds pass before starting to release
- Starting with the oldest version, push the tags and then publish the packages to npm
- Checkout `master`, and merge in the CHANGELOG changes from these back-ported releases. It would go something like this:

  - `git merge vN.M.K`
  - Conflicts will appear; you only need to put the `N.M.K` change log in the right place, discard the rest
  - `git add CHANGELOG.md`
  - Use a sensible merge message, like, `chore(docs): update CHANGELOG to account for vN.M.K release`
  - `git push`

### Updating Travis CI secrets

Some variables in the `.travis.yml` file are secrets 🤫 (like deployment token for `provider: pages:git`). To manipulate those, head on to [Travis CI](https://docs.travis-ci.com/user/encryption-keys/) docs.
