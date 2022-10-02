/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  dest: 'public'
})
module.exports = withPWA({
  runtimeCaching,
  reactStrictMode: true
})
