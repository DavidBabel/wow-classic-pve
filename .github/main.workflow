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
  uses = "actions/setup-node@v1"

  args = [
    "yarn install"
  ]
}

action "Build Database" {
  uses  = "actions/setup-node@v1"

  args  = [
    "yarn build-db"
  ]

  needs = [
    "Install dependencies"
  ]
}

action "Tests" {
  uses  = "actions/setup-node@v1"

  args  = [
    "CI=true yarn test"
  ]

  needs = [
    "Build Database"
  ]
}

action "Build" {
  uses  = "actions/setup-node@v1"

  args  = [
    "yarn build"
  ]

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
