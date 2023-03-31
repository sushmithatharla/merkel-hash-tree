const crypto = require("crypto");
const fs = require("fs");

function md5(filename) {
  return crypto
    .createHash("md5")
    .update(fs.readFileSync(filename))
    .digest("hex");
}

function topHash(filenames) {
  return crypto
    .createHash("md5")
    .update(filenames.sort().map(md5).join(""))
    .digest("hex");
}

// Example
const filenames = ["L1.txt", "L2.txt", "L3.txt", "L4.txt"];
const topHashOriginal = topHash(filenames);
console.log("Original Top Hash:", topHashOriginal);

// Modify one file
fs.appendFileSync("L1.txt", " - file is modified");

const topHashModified = topHash(filenames);
console.log("Modified Top Hash:", topHashModified);

// Check if the Top Hash has changed
if (topHashOriginal === topHashModified) {
  console.log("Top Hash is the same - something went wrong!");
} else {
  console.log("Top Hash has changed - files have been modified.");
}
