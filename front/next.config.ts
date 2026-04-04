import type { NextConfig } from "next";

const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, '../.env')
});

module.exports = {
    reactStrictMode: true
};

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  transpilePackages: ['bootstrap']
};

export default nextConfig;