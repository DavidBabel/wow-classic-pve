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
  runs = "yarn install"
}

action "Build Database" {
  uses  = "docker://node:12-alpine"
  runs  = "yarn build-db"

  needs = [
    "Install dependencies"
  ]
}

action "Tests" {
  uses  = "docker://node:12-alpine"

  runs  = [
    "sh",
    "-c",
    "yarn test"
  ]

  needs = [
    "Build Database"
  ]

  env   = {
    CI = "true"
  }
}

action "Build" {
  uses  = "docker://node:12-alpine"
  runs  = "yarn build"

  needs = [
    "Build Database"
  ]
}

#  env   = {
#    NODE_ENV = "production"
#  }
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
    #    BUILD_SCRIPT = "yarn install && yarn build-db && CI=true yarn test && yarn build"
    BUILD_SCRIPT = ""
    FOLDER       = "build"
  }
}
