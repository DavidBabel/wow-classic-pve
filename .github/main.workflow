workflow "Deploy to Github Pages" {
  resolves = ["Deploy to gh-pages"]
  on = "push"
}

action "master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy to gh-pages" {
  uses = "JamesIves/github-pages-deploy-action@master"
  env = {
    BRANCH = "gh-pages"
    BUILD_SCRIPT = "yarn install && CI=true yarn test && yarn build-db && yarn build"
    FOLDER = "build"
  }
  secrets = ["ACCESS_TOKEN"]
  needs = ["master branch only"]
}
