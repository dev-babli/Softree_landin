import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const componentPath = join(root, "src", "components", "homepage", "SoftreeClientStories.tsx")
const homepagePath = join(root, "src", "components", "homepage", "Homepage.tsx")

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

assert(existsSync(componentPath), "SoftreeClientStories.tsx should exist")

const component = readFileSync(componentPath, "utf8")
const homepage = readFileSync(homepagePath, "utf8")

assert(component.includes("export default function SoftreeClientStories"), "component should export SoftreeClientStories as default")
assert(component.includes("Client stories"), "component should render the requested Client stories heading")
assert(component.includes("aria-roledescription=\"carousel\""), "component should expose carousel semantics")
assert(component.includes("prefers-reduced-motion"), "component should respect reduced-motion preferences")
assert((component.match(/portrait:/g) ?? []).length >= 6, "component should define at least six story portraits")
assert((component.match(/alt:/g) ?? []).length >= 6, "component should define meaningful alt text for every portrait")
assert(homepage.includes("SoftreeClientStoriesLazy"), "homepage should lazy-load the new client stories section")
assert(homepage.includes("<SoftreeClientStoriesLazy />"), "homepage should render the new client stories section")

console.log("Softree client stories verification passed")
