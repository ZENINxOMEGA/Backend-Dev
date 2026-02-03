const fs = require("fs");
const path = require("path");
const { Transform } = require("stream");

// file paths
const inputFilePath = path.join(__dirname, "input.txt");
const outputFilePath = path.join(__dirname, "transformOutput.txt");

// create streams
const readStream = fs.createReadStream(inputFilePath, { encoding: "utf-8" });
const writeStream = fs.createWriteStream(outputFilePath);

// transform stream → convert to uppercase
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    try {
      const transformedData = chunk.toString().toUpperCase();
      this.push(transformedData);
      callback();
    } catch (err) {
      callback(err);
    }
  }
});

// pipe streams
readStream
  .pipe(upperCaseTransform)
  .pipe(writeStream);

// error handling
readStream.on("error", err => console.error("Read Error:", err));
writeStream.on("error", err => console.error("Write Error:", err));
upperCaseTransform.on("error", err => console.error("Transform Error:", err));

// finish event
writeStream.on("finish", () => {
  console.log("✅ File transformed successfully to uppercase.");
});
