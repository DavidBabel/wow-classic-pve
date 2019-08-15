workflow "Deploy to Github Pages" {
  on       = "push"

  resolves = [
    "Deploy to gh-pages"
  ]
}

action "master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy to gh-pages" {
  uses    = "JamesIves/github-pages-deploy-action@master"

  secrets = [
    "ACCESS_TOKEN"
  ]

  needs   = [
    "master branch only",
  ]

  env     = {
    BRANCH       = "gh-pages"
    BUILD_SCRIPT = "yarn install && yarn build-db && CI=true yarn test && yarn build"
    #    BUILD_SCRIPT = ""
    FOLDER       = "build"
  }
}
