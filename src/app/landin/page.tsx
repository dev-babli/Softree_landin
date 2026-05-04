import fs from "fs";
import path from "path";
import LandinClient from "./LandinClient";

export default function LandinPage() {
  const base = path.join(process.cwd(), "public", "landin");
  const bodyHtml = fs.readFileSync(path.join(base, "body-clean.html"), "utf-8");
  const styles = fs.readFileSync(path.join(base, "styles.css"), "utf-8");

  return <LandinClient bodyHtml={bodyHtml} styles={styles} />;
}
