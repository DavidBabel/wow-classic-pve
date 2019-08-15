workflow "Deploy to Github Pages" {
  on       = "push"

  resolves = [
    "Deploy to gh-pages"
  ]
}

# action "Setup Node.js" {
#   uses = "actions/setup-node@v1"
# }
action "Install dependencies" {
  uses = "docker://node:12-alpine"
  runs = "yarn"
  args = "install"
}

action "Build Database" {
  uses  = "docker://node:12-alpine"
  runs  = "yarn"
  args  = "build-db"

  needs = [
    "Install dependencies"
  ]
}

action "Tests" {
  uses  = "docker://node:12-alpine"
  runs  = "CI=true yarn"
  args  = "test"

  needs = [
    "Build Database"
  ]
}

action "Build" {
  uses  = "docker://node:12-alpine"
  runs  = "yarn"
  args  = "build"

  needs = [
    "Build Database"
  ]
}

action "master branch only" {
  uses  = "actions/bin/filter@master"
  args  = "branch master"

  needs = [
    "Build",
    "Tests"
  ]
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
    FOLDER       = "build"
  }
}
