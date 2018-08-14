const fs = require("fs");

// checks if filename was added in command line
if (process.argv.length < 3) {
  console.log(`driver.js requires a txt file to run`);
  process.exit(1);
}

const result = {};
let file;

// create an object with drivers
const addDrivers = () => {
  file = fs.readFileSync(process.argv[2], "utf-8").split("\n");
  for (let i = 0; i < file.length; i++) {
    const line = file[i].split(" ");
    if (line[0] === "Driver") {
      result[line[1]] = {
        miles: 0,
        time: 0
      };
    }
  }
}

// adds trip information for drivers
const addMilesandTime = () => {
  file.map(trip => {
    const line = trip.split(" ");
    if (line[0] === "Trip" && result[line[1]]) {
      const time1 =
        parseInt(line[3].split(":")[0]) +
        parseFloat(line[3].split(":")[1] / 60);
      const time2 =
        parseInt(line[2].split(":")[0]) +
        parseFloat(line[2].split(":")[1] / 60);
      const mph = parseInt(line[4]) / (time1 - time2);

      if (mph >= 5 && mph <= 100) {
        result[line[1]].time += time1 - time2;
        result[line[1]].miles += Math.round(line[4]);
      }
    }
  });
}

// sorts object by miles, creates report file, and prints information
const sortByMiles = () => {
  const sortedKeys = Object.keys(result).sort((a, b) => {
    return result[b].miles - result[a].miles;
  });
  const file = process.argv[2].split(".txt")[0] + "_report.txt";
  const stream = fs.createWriteStream(file);

  stream.on("open", () => {
    for (let i = 0; i < sortedKeys.length; i++) {
      if (result[sortedKeys[i]].miles === 0) {
        stream.write(`${sortedKeys[i]}: 0 miles \n`);
        console.log(`${sortedKeys[i]}: 0 miles`);
      } else {
        const miles = result[sortedKeys[i]].miles;
        const mph = Math.round(miles / result[sortedKeys[i]].time);
        stream.write(`${sortedKeys[i]}: ${miles} miles @ ${mph} mph \n`);
        console.log(`${sortedKeys[i]}: ${miles} miles @ ${mph} mph`);
      }
    }
    stream.end();
  });
}

addDrivers();
addMilesandTime();
sortByMiles();
