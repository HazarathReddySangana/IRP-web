"use strict";

// ============================================================================
// PART 1: Types & Coercion
// ============================================================================

/**
 * Validates a raw deposit or withdrawal amount submitted by a user.
 * Diagnoses and prevents loose type coercion defects.
 *
 * Requirements:
 * 1. If input is null or undefined, throw an Error saying amount is required.
 * 2. If input is not a string or number, throw an Error indicating invalid type.
 * 3. If input is a string, remove outer spaces using .trim().
 * 4. If trimmed string is empty (""), throw an Error (prevents Number("") -> 0 coercion).
 * 5. Convert value with Number(). If result is NaN, throw an Error.
 * 6. If the number is zero or negative (<= 0), throw an Error (amount must be > 0).
 * 7. Otherwise, return the verified number.
 *
 * @param {unknown} input - The raw amount to validate.
 * @returns {number} The validated positive numeric amount.
 * @throws {Error} Informative error when validation fails.
 */
function parseAmount(input) {
  // 1. Check for missing or uninitialized values (strictly null or undefined)
  if (input === null || input === undefined) {
    throw new Error("Amount is required.");
  }

  // 2. Reject any data type that is not a string or a primitive number
  if (typeof input !== "string" && typeof input !== "number") {
    throw new Error("Invalid type: Amount must be a string or a number.");
  }

  let valueToConvert = input;

  // 3. Clean whitespace if input is a string
  if (typeof input === "string") {
    valueToConvert = input.trim();

    // 4. Guard against empty-string zero coercion (Number("") returns 0)
    if (valueToConvert === "") {
      throw new Error("Amount cannot be an empty string.");
    }
  }

  // 5. Convert to number and catch non-numeric or malformed decimal representations
  const numericAmount = Number(valueToConvert);
  if (Number.isNaN(numericAmount)) {
    throw new Error("Amount must be a valid numeric value.");
  }

  // 6. Enforce positive business balance rule (amount must be strictly > 0)
  if (numericAmount <= 0) {
    throw new Error("Amount must be greater than zero.");
  }

  // 7. Return verified valid number
  return numericAmount;
}

// ----------------------------------------------------------------------------
// MANDATORY COMMENTS: Technical Explanations of Core JS Quirks
// ----------------------------------------------------------------------------
// 1. Why "5" + 2 gives "52" while "5" - 2 gives 3:
// The binary '+' operator is overloaded for both numeric addition and string concatenation.
// When either operand is a string, JavaScript prioritizes concatenation and coerces the
// number 2 into the string "2", producing "5" + "2" = "52".
// Conversely, the '-' operator is strictly an arithmetic subtraction operator without any
// string counterpart. Therefore, JavaScript coerces the string "5" into the number 5,
// computing numeric subtraction 5 - 2 = 3.
//
// 2. Why typeof null === "object":
// This is a renowned historical defect from the original 1995 JavaScript implementation.
// Values were stored with a type tag in their lowest bits; objects were assigned the type
// tag 0. The null pointer was represented in C as 0x00 (all zeroes), which caused the
// type tag check to erroneously identify null as an "object". The ECMAScript committee
// retains this behavior to maintain permanent backward compatibility with legacy web code.

// ----------------------------------------------------------------------------
// Testing: parseAmount inside try/catch blocks
// (parseAmount never logs directly; output is handled in try/catch)
// ----------------------------------------------------------------------------
console.log("====================================================================");
console.log("PART 1: Types & Coercion - Testing parseAmount()");
console.log("====================================================================");

const testCases = [
  { label: "Valid string integer", input: "500" },
  { label: "Valid string with outer whitespace", input: " 250 " },
  { label: "Empty string (zero coercion test)", input: "" },
  { label: "Non-numeric alphabetical string", input: "abc" },
  { label: "Explicit null value", input: null },
  { label: "Undefined value", input: undefined },
  { label: "Malformed multi-decimal string", input: "12.5.3" }
];

for (const { label, input } of testCases) {
  try {
    const verifiedAmount = parseAmount(input);
    console.log(`[PASS] ${label} (${JSON.stringify(input)}) => Returned: ${verifiedAmount} (type: ${typeof verifiedAmount})`);
  } catch (error) {
    console.log(`[CAUGHT] ${label} (${JSON.stringify(input)}) => Error: ${error.message}`);
  }
}

// ============================================================================
// PART 2: Scoping & Hoisting
// ============================================================================

// ----------------------------------------------------------------------------
// Step 1: Main Declarations
// ----------------------------------------------------------------------------

// const is used for BANK_NAME because the bank's brand identity is immutable and must never be reassigned.
const BANK_NAME = "JS National Bank";

// let is used for transactionCounter because it tracks state that increments dynamically over time.
let transactionCounter = 0;

console.log("\n====================================================================");
console.log("PART 2: Step 1 - Main Declarations");
console.log("====================================================================");
console.log("Bank Name (const):", BANK_NAME);
console.log("Initial Transaction Counter (let):", transactionCounter);

// ----------------------------------------------------------------------------
// Step 2: Hoisting Demo
// ----------------------------------------------------------------------------
// // HOISTING DEMO
console.log("\n====================================================================");
console.log("PART 2: Step 2 - Hoisting Demo");
console.log("====================================================================");

// 1. var: Declaration is hoisted and initialized to undefined during creation phase.
console.log("1. var before declaration:", hoistedVar); // prints: undefined
var hoistedVar = "Standard Savings Account";

// 2. let: Declaration is hoisted into the Temporal Dead Zone (TDZ) without initialization;
// accessing it before its line of declaration throws a ReferenceError.
try {
  console.log(tdzLet);
} catch (error) {
  console.log("2. Caught ReferenceError (let accessed during TDZ):", error.message);
}
let tdzLet = "Premium Checking Account";

// 3. Function Declaration: Entire function (identifier + body) is hoisted,
// enabling execution before its explicit definition in source code.
announce();
function announce() {
  console.log("3. announce() executed successfully prior to declaration via function declaration hoisting.");
}

// 4. Function Expression: Variable declaration 'var notify' is hoisted as undefined,
// but the assigned function is not evaluated until execution phase. Calling undefined() throws TypeError.
try {
  notify();
} catch (error) {
  console.log("4. Caught TypeError (calling var function expression before assignment):", error.message);
}
var notify = function () {
  console.log("Notification: Daily transaction summary ready.");
};

// 5. Execution Context Creation vs. Execution Phase Explanation:
// - Creation Phase: Before any code is executed, the JavaScript engine allocates memory for
//   declarations. Function declarations are hoisted with their complete function bodies attached.
//   Variables declared with 'var' are registered and initialized to 'undefined'.
//   Variables declared with 'let' and 'const' are registered in memory but remain uninitialized
//   in the Temporal Dead Zone (TDZ).
// - Execution Phase: The engine traverses the code sequentially line-by-line, executing
//   statements, evaluating expressions, and assigning runtime values to variables.

// ----------------------------------------------------------------------------
// Step 3: The Asynchronous Loop Bug
// ----------------------------------------------------------------------------
// Technical Explanation of the Loop Bug:
// In the 'var' loop, 'var' is function-scoped (or globally scoped). All 3 iterations share
// the exact same reference to 'i'. When the asynchronous setTimeout callbacks are retrieved
// from the task queue and executed, the synchronous loop has already completed with i = 3.
// In the 'let' loop, 'let' is block-scoped. Each iteration of the for-loop creates a brand-new
// lexical binding for 'i'. Each setTimeout callback closes over its own individual copy
// of 'i', correctly preserving values 0, 1, and 2.

console.log("\n====================================================================");
console.log("PART 2: Step 3 - The Asynchronous Loop Bug");
console.log("====================================================================");

// 1. Asynchronous loop using var (prints: 3, 3, 3)
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("var loop:", i);
  }, 50);
}

// 2. Identical loop using let (prints: 0, 1, 2)
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("let loop:", i);
  }, 100);
}
