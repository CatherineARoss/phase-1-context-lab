/* Your Code Here */
function createEmployeeRecord(empArr) {
    return {
      firstName: empArr[0],
      familyName: empArr[1],
      title: empArr[2],
      payPerHour: empArr[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(empArrs) {
    return empArrs.map(empArr => createEmployeeRecord(empArr));
  }
  
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeInEvents.push({ 
      type: "TimeIn", 
      hour: parseInt(hour, 10),
      date: date 
    });
    return this
  }
  
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(" ");
    this.timeOutEvents.push({ 
      type: "TimeOut", 
      hour: parseInt(hour, 10),
      date: date
     });
    return this
  }
  
  function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100
  }
  
  function wagesEarnedOnDate(date) {
    return (hoursWorkedOnDate.call(this,date) * this.payPerHour);
  }
  
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })
    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    return payable
}

function calculatePayroll(empRecs) {
    const totalForEachEmployee = empRecs.map(empRecs => allWagesFor.call(empRecs))
    return totalForEachEmployee.reduce((total, empTotal) => total + empTotal)
  }

function findEmployeeByFirstName(src, name) {
  return src.find(record => record.firstName === name);
}

