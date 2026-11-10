# Responsive Web Design & JavaScript Foundations

This repository contains the completed technical practical assignment for **Responsive Web Design & JavaScript Foundations**, organized into the exact two-part architecture specified in the assignment guidelines.

---

## Repository Structure

```
irp-web-development-assignment/
├── part-a-responsive-ui/
│   ├── index.html       # Semantic HTML5 recreation of IRP LMS Home Page
│   └── style.css        # Responsive CSS (Flexbox, CSS Grid, Media Queries)
├── part-b-javascript/
│   └── bank.js          # Standalone JavaScript file (Part 1 & Part 2)
└── README.md            # Setup notes, responsive testing steps, and execution instructions
```

---

## Part A: Frontend CSS Responsiveness (IRP LMS Home Page)

### Overview
A semantic HTML5 recreation and CSS3 responsive styling of the **IRP LMS Home Page** based on the official assignment specifications.

### Key Features & Requirements Met
1. **Navigation Bar (Top Header & CSS Positioning)**:
   - Secured to the top of the viewport using `position: sticky; top: 0; z-index: 1000;` with smooth backdrop blur.
   - **Desktop View (≥ 1024px)**: Displays brand logo (graduation cap + "IRP LMS"), navigation links (`Home`, `Courses`, `Contact Us`), and an orange outlined "Sign In" button with rounded corners. The active `Home` link features a distinct orange bottom-border indicator.
   - **Mobile View (≤ 768px)**: Navigation links collapse/hide cleanly. Header preserves brand logo on the left and the outlined "Sign In" button on the right with comfortable touch spacing (matching Figure 2 in the specification).
2. **Hero Banner**:
   - **Desktop View (≥ 1024px)**: 2-column layout with copy on the left and the hosted "Climbing Towards Success" illustration on the right.
   - **Mobile View (≤ 768px)**: Stacks into a clean vertical stream (text on top, illustration underneath). The illustration scales proportionally (`max-width: 100%; height: auto;`) without occluding headlines or overflowing viewport bounds.
   - Includes orange kicker `LEARN • BUILD • GET PLACED`, headline `Welcome to <span>IRP LMS</span> Platform`, description, and `Explore Courses →` CTA button.
3. **Learning Journey Section**:
   - Displays 5 step cards (`Learn`, `Practice`, `Build Projects`, `Prepare`, `Get Placed`) with white background (`#FFFFFF`), light blue border (`#D6E9FF`), rounded corners (`10px`), and prominent orange numerals (`1` to `5`) on top-left.
   - **Desktop View (> 1024px)**: Strict 5-column horizontal grid (`grid-template-columns: repeat(5, 1fr)`).
   - **Tablet View (768px – 1024px)**: Balanced 3-column wrapping grid (`grid-template-columns: repeat(3, 1fr)`).
   - **Mobile View (≤ 768px)**: Strict 1-column vertical stack (`grid-template-columns: 1fr`).

### Design Tokens Used
| Token Name | HEX Code | Usage |
| :--- | :--- | :--- |
| `--color-primary-navy` | `#003366` | Headings (`h1`, `h2`), brand text, active nav indicator |
| `--color-primary-orange` | `#FE781E` | Hero kicker, CTA button, headline accent, step numbers (1–5) |
| `--color-secondary-blue` | `#5F9FE0` | Sub-headings, secondary elements, accents |
| `--color-bg-light` | `#E2F2FD` | Hero section background, soft container highlights |
| `--color-card-bg` | `#FFFFFF` | Main page background, card containers |
| `--color-border-light` | `#D6E9FF` | Step card outlines, subtle divider borders |

### How to Test Part A
1. Navigate to `part-a-responsive-ui/index.html` (or root `index.html`).
2. Open `index.html` in Google Chrome (or double-click the file).
3. **Verify Header Anchoring**: Scroll down the page and verify that the navbar remains fixed/sticky at the top with content scrolling underneath.
4. **Desktop Layout Verification**: At screen widths $\ge 1024\text{px}$, verify:
   - Navbar displays all navigation links and active orange underline under "Home".
   - Hero banner has 2 columns (text left, illustration right).
   - Step cards sit in an exact 5-column horizontal grid.
5. **Mobile Layout Verification**: Press `F12` to open Developer Tools, toggle Device Toolbar (`Ctrl + Shift + M`), and select **iPhone 12/13/14 (390px)** or **Pixel 7 (412px)**:
   - Nav links hide, leaving brand on left and "Sign In" button on right.
   - Hero banner stacks into a clean vertical stream with illustration below text.
   - Step cards stack in a strict 1-column vertical layout with zero horizontal scrollbar overflow.

---

## Part B: JavaScript — Bank Account Simulator (`bank.js`)

### Overview
A standalone Node.js script diagnosing and fixing core data type, coercion, variable scoping, and hoisting defects in a simulated banking environment.

### Key Features & Requirements Met
1. **Part 1: Types & Coercion (`parseAmount`)**:
   - Runs with `"use strict";` and exclusively uses strict equality (`===` / `!==`).
   - Validates user input through 7 sequential guards:
     1. Guards against `null` and `undefined` ("Amount is required.").
     2. Validates type is string or number ("Invalid type: Amount must be a string or a number.").
     3. Trims whitespace from string inputs using `.trim()`.
     4. Guards against empty string `""` zero-coercion ("Amount cannot be an empty string.").
     5. Converts with `Number()` and rejects `NaN` ("Amount must be a valid numeric value.").
     6. Rejects zero and negative amounts $\le 0$ ("Amount must be greater than zero.").
     7. Returns verified number.
   - Tests all required inputs (`"500"`, `" 250 "`, `""`, `"abc"`, `null`, `undefined`, `"12.5.3"`) inside `try/catch` blocks without direct logging inside `parseAmount`.
   - Contains mandatory comments explaining why `"5" + 2 === "52"` while `"5" - 2 === 3`, and why `typeof null === "object"`.

2. **Part 2: Scoping, Hoisting & Temporal Dead Zone**:
   - **Step 1: Main Declarations**: Declares immutable `const BANK_NAME = "JS National Bank";` and mutable `let transactionCounter = 0;` with explanatory comments.
   - **Step 2: Hoisting Demo**:
     - `var`: Demonstrates variable declaration hoisting returning `undefined`.
     - `let`: Demonstrates Temporal Dead Zone (TDZ), catching and logging `ReferenceError`.
     - Function Declaration: Demonstrates calling `announce()` before definition via function declaration hoisting.
     - Function Expression: Demonstrates calling `var notify = function() {}` before assignment, catching and logging `TypeError`.
     - Detailed technical explanation of Creation Phase vs. Execution Phase.
   - **Step 3: Asynchronous Loop Bug**:
     - `var` loop: Demonstrates closure over single shared function-scoped variable, outputting `3, 3, 3`.
     - `let` loop: Demonstrates per-iteration block-scoped lexical binding, outputting `0, 1, 2`.
     - Detailed technical comment explaining the scoping behavior.

### How to Run & Verify Part B
Run the script using Node.js:
```bash
node part-b-javascript/bank.js
```
*(or run `node bank.js` directly in the project root)*

**Expected Console Output**:
```
====================================================================
PART 1: Types & Coercion - Testing parseAmount()
====================================================================
[PASS] Valid string integer ("500") => Returned: 500 (type: number)
[PASS] Valid string with outer whitespace (" 250 ") => Returned: 250 (type: number)
[CAUGHT] Empty string (zero coercion test) ("") => Error: Amount cannot be an empty string.
[CAUGHT] Non-numeric alphabetical string ("abc") => Error: Amount must be a valid numeric value.
[CAUGHT] Explicit null value (null) => Error: Amount is required.
[CAUGHT] Undefined value (undefined) => Error: Amount is required.
[CAUGHT] Malformed multi-decimal string ("12.5.3") => Error: Amount must be a valid numeric value.

====================================================================
PART 2: Step 1 - Main Declarations
====================================================================
Bank Name (const): JS National Bank
Initial Transaction Counter (let): 0

====================================================================
PART 2: Step 2 - Hoisting Demo
====================================================================
1. var before declaration: undefined
2. Caught ReferenceError (let accessed during TDZ): Cannot access 'tdzLet' before initialization
3. announce() executed successfully prior to declaration via function declaration hoisting.
4. Caught TypeError (calling var function expression before assignment): notify is not a function

====================================================================
PART 2: Step 3 - The Asynchronous Loop Bug
====================================================================
var loop: 3
var loop: 3
var loop: 3
let loop: 0
let loop: 1
let loop: 2
```
Zero unhandled runtime crashes, completely clean execution.
