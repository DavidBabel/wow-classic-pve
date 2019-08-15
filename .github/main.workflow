workflow "Deploy to Github Pages" {
  on       = "push"

  resolves = [
    "Deploy to gh-pages"
  ]
}

action "Setup Node.js" {
  uses = "actions/bin/sh@master"

  args = [
    "sudo apt-get install curl",
    "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash",
    "nvm install 12"
  ]
}

action "Install dependencies" {
  uses  = "actions/bin/sh@master"

  args  = [
    "yarn install"
  ]

  needs = [
    "Setup Node.js"
  ]
}

action "Build Database" {
  uses  = "actions/bin/sh@master"

  args  = [
    "yarn build-db"
  ]

  needs = [
    "Install dependencies"
  ]
}

action "Tests" {
  uses  = "actions/bin/sh@master"

  args  = [
    "CI=true yarn test"
  ]

  needs = [
    "Build Database"
  ]
}

action "Build" {
  uses  = "actions/bin/sh@master"

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
