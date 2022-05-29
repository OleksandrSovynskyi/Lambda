const fs = require("fs");

const data = fs.readFileSync("vacation.json");

function vacationList(vac) {
  const vacList = JSON.parse(vac);
  const result = new Map();
  vacList.map((el) => {
    if (result.has(el.user._id)) {
      const map = result.get(el.user._id);
      map["weekendDates"].push({
        startDate: el.startDate,
        endDate: el.endDate,
      });
    } else {
      result.set(el.user._id, {
        userId: el.user._id,
        name: el.user.name,
        weekendDates: [{ startDate: el.startDate, endDate: el.endDate }],
      });
    }
  });
  console.log(result.values());
}

vacationList(data);
