const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  // cleaned up code by removing TRIVIAL_PARTITION_KEY and else statement in candidate conditional statement
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate = "0";

  // refactored nested if statements to use ternary operator to reassign candidate variable
  if (event) {
    candidate = event.partitionKey
      ? event.partitionKey
      : crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
  }

  // also removed nested if statement by using AND operator in first if statement
  if (candidate && (typeof candidate !== "string")) {
    candidate = JSON.stringify(candidate);
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};
