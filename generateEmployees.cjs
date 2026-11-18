const fs = require("fs");

const database = JSON.parse(fs.readFileSync("db.json", "utf8"));
const existingEmployees = database.employees ?? [];

const departments = [
  "Engineering",
  "HR",
  "Finance",
  "Marketing",
  "Sales",
];

const designations = [
  "Developer",
  "Manager",
  "Analyst",
  "Executive",
  "Designer",
];

const employees = [...existingEmployees];

for (let index = employees.length; index < 1000; index += 1) {
  const employeeNumber = index + 1;

  employees.push({
    id: employeeNumber,
    name: `Employee ${employeeNumber}`,
    email: `employee${employeeNumber}@example.com`,
    department: departments[index % departments.length],
    designation: designations[index % designations.length],
    salary: 30000 + (index % 20) * 2500,
  });
}

fs.writeFileSync(
  "db.json",
  JSON.stringify({ ...database, employees }, null, 2),
);

console.log(`${employees.length} employees generated successfully.`);