"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  vitePluginBuildInfo: () => vitePluginBuildInfo
});
module.exports = __toCommonJS(src_exports);
var import_child_process = __toESM(require("child_process"), 1);
var getGitSHA = (short) => {
  const { exec } = import_child_process.default;
  const sh = short ? "git rev-parse --short HEAD" : "git rev-parse HEAD";
  return new Promise((resolve, reject) => {
    exec(sh, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        const output = stdout.toString()?.replace("\n", "");
        resolve(output);
      }
    });
  });
};
var vitePluginBuildInfo = (input = {}) => {
  const {
    name = process.env["npm_package_name"],
    version = process.env["npm_package_version"],
    shortSha = true
  } = input;
  return {
    name: "vite-plugin-build-info",
    async transformIndexHtml() {
      const gitSHA = await getGitSHA(shortSha);
      const els = [];
      els.push({
        tag: "script",
        injectTo: "body",
        children: `
        __BUILD_COMMIT__ = "${gitSHA}"
        __BUILD_TIME__ = "${(/* @__PURE__ */ new Date()).toISOString()}"
        `
      });
      return els;
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  vitePluginBuildInfo
});
