import { join } from "path";

export function template(path: string) {
  return join(__dirname, "../template", path);
}
