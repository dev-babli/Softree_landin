import { readFileSync } from "node:fs"
import { join } from "node:path"

const componentPath = join(
  process.cwd(),
  "src",
  "components",
  "homepage-light",
  "LightContactSection.tsx"
)

const component = readFileSync(componentPath, "utf8")

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

assert(component.includes("Let's Talk"), "CTA should use a Let's Talk headline")
assert(component.includes("Follow us"), "CTA should include social follow links")
assert(component.includes("What we offer"), "CTA should include the offer panel")
assert(component.includes("UI UX Design"), "CTA should list UI UX Design")
assert(component.includes("Web Development"), "CTA should list Web Development")
assert(component.includes("Brand Identity"), "CTA should list Brand Identity")
assert(component.includes("contact@softreetechnology.com"), "CTA should use the Softree contact email")
assert(component.includes("Full Name"), "CTA form should ask for full name")
assert(component.includes("Company name"), "CTA form should ask for company name")
assert(component.includes("Test Message"), "CTA form should include the reference message placeholder")
assert(component.includes("Submit"), "CTA form should use the requested submit label")

console.log("Footer CTA verification passed")
