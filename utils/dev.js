'use strict'

function isLocal() {
  return process.env.NODE_ENV === 'local'
}

function isDev() {
  return process.env.NODE_ENV === 'development'
}

function isStaging() {
  return process.env.NODE_ENV === 'staging'
}

function hasDevtool() {
  return isLocal() || process.env.DEVTOOL === 'true'
}

module.exports = {
  isLocal,
  isDev,
  isStaging,
  hasDevtool,
}
