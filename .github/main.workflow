workflow "Deploy to Github Pages" {
  on       = "push"

  resolves = [
    "Deploy to gh-pages"
  ]
}

#
# action "Setup Node.js" {
#   uses = "actions/setup-node@dd2e8a486fdc1071872c594d5388fd6dce1a7534"
#
#   #   uses = actions/setup-node@v1
#   args = [
#     "--node-version 12.x"
#   ]
# }
#
# action "Install dependencies" {
#   uses = "actions/bin/sh@master"
#
#   args = [
#     "yarn install"
#   ]
# }
#
# action "Build Database" {
#   uses  = "actions/bin/sh@master"
#
#   args  = [
#     "yarn build-db"
#   ]
#
#   needs = [
#     "Install dependencies"
#   ]
# }
#
# action "Tests" {
#   uses  = "actions/bin/sh@master"
#
#   args  = [
#     "CI=true yarn test"
#   ]
#
#   needs = [
#     "Build Database"
#   ]
# }
#
# action "Build" {
#   uses  = "actions/bin/sh@master"
#
#   args  = [
#     "yarn build"
#   ]
#
#   needs = [
#     "Build Database"
#   ]
# }
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
