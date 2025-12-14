type Employee = {
    name: string;
    startDate: Date;
}

interface Manager {
    name: string;
    department: string;
}

type TechLead = Employee & Manager;
const t: TechLead = {
    name: "harkirat",
    startDate: new Date(),
    department: "cse"
} 

// Rule of thumb:

// interface → preferred for objects & public APIs

// type → better for unions, intersections, complex types