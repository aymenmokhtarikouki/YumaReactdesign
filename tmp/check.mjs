import fs from "fs";
import { parse } from "@babel/parser";

const code = fs.readFileSync("/src/app/pages/PlanDetails.tsx", "utf-8");

try {
  parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"]
  });
  console.log("Syntax OK");
} catch (e) {
  console.error("Syntax Error:", e.message);
}
