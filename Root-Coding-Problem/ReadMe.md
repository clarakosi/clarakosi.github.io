# Driving History For People

## Directions for running code
1. Run `npm install` to install all dependencies
1. Use the command `npm test` to run all 4 tests found in `driving.test.js`
1. To run a single file use a command similar to `node driving.js input.txt`. The results will be printed to the console and in a file following the following format: `file_report.txt`
**Example**:`input_report.txt`

## Code in driving.js
In an effort to not write this solution in one function I chose to divide it up into 3 separate functions. Since the functions were written to run synchronously I chose to use the synchronous file system, `fs`, operations in Node.

I chose to store the results in an object because I wanted to take advantage of the key look up and to be able to convert the keys into an array to later use the sort method. The file information was stored in an array to further take advantage of the various array built-in methods such as `map`.

### addDrivers() 
The first function `addDrivers()` creates a new object with each driver's name as a key. The value is an object with miles and time initialized at zero. I chose to not focus on the Trip command here as I was unsure if the order of the data may change in the future. For example, if a trip information may be recorded before the driver's command. 

### addMilesandTime()
Now that the first function has initialized an object with each driver's name as a key. I chose to create another function to input the information from each trip. The `addMilesandTime` function loops, `O(n)`, through the file information stored in an array and for each Trip command it uses the driver's name to quickly look up, `O(1)`, the drivers information and if the trip is between 5-100 mph then `miles` and `time` is updated for the driver.

### sortByMiles()
At this point the information on the object is up-to-date and simply needs to be sorted and then parsed into the output format. I used a built-in array method to sort the keys of the object by miles, `O(n)`. Once the keys were sorted I looped through the keys, `O(n)`, and parsed the data in the proper format to a new document and into the console.


