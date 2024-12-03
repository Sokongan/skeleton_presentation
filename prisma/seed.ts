import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean up existing data
  await prisma.rolePermission.deleteMany({});
  await prisma.permission.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});

  // Seed Roles
  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
      description: "Administrator role with full permissions",
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: "User" },
    update: {},
    create: {
      name: "User",
      description: "Default user role with limited permissions",
    },
  });

  // Seed Permissions
  const manageUsersPermission = await prisma.permission.create({
    data: {
      name: "Manage Users",
      description: "Permission to manage users",
    },
  });

  // Assign Permissions to Roles
  await prisma.rolePermission.create({
    data: {
      roleId: adminRole.id,
      permissionId: manageUsersPermission.id,
    },
  });

  // Seed Users
  const hashedPassword = await bcrypt.hash("@dminp@ssw0rd", 10);

  // Create Admin User
  const adminUser = await prisma.user.create({
    data: {
      username: "asd_admin",
      password: hashedPassword,
      firstName: "System",
      lastName: "Administrator",
      email: "admin@example.com",
      UserRole: {
        create: {
          roleId: adminRole.id
        }
      }
    },
  });

  console.log("Admin user seeded!");

  // Create Non-Admin User
  const nonAdminUser = await prisma.user.create({
    data: {
      username: "asd_user",
      password: hashedPassword, // Hash the password
      firstName: "User",
      lastName: "Only",
      email: "user@example.com",
      UserRole: {
        create: {
          roleId: userRole.id // Assign the user role
        }
      }
    },
  });

  console.log("Non-admin user seeded!");

  // Seed Employees
  const employee = await prisma.employee.create({
    data: {
      employeeId: "EMP001",
      firstName: "John",
      lastName: "Doe",
      gender: "Male",
      birthdate: new Date("1990-01-01"),
      position: "Software Developer",
      department: "IT",
      email: "john.doe@example.com",
      officeDetails: {
        create: {
          plantilla: "101",
          office: "IT Department",
          salaryGrade: "12",
          step: "1",
        },
      },
      familyBackground: {
        create: {
          spouseFirstname: "Jane",
          spouseLastname: "Doe",
        },
      },
      educationRecords: {
        create: [
          {
            level: "Tertiary",
            school: "University of Example",
            course: "Computer Science",
            yearGraduated: "2012",
          },
        ],
      },
      workExperiences: {
        create: [
          {
            position: "Junior Developer",
            company: "Example Corp",
            startDate: new Date("2013-01-01"),
            endDate: new Date("2015-01-01"),
            salary: 30000,
          },
        ],
      },
    },
  });

  console.log("Employees seeded!");

  // Additional Employees
  const employees = await Promise.all([
    prisma.employee.create({
      data: {
        employeeId: "EMP002",
        firstName: "Maria",
        lastName: "Santos",
        gender: "Female",
        birthdate: new Date("1988-05-15"),
        position: "Legal Researcher",
        department: "Legal",
        email: "maria.santos@example.com",
        officeDetails: {
          create: {
            plantilla: "202",
            office: "Legal Division",
            salaryGrade: "15",
            step: "3",
          },
        },
        familyBackground: {
          create: {
            spouseFirstname: "Miguel",
            spouseLastname: "Santos",
          },
        },
        educationRecords: {
          create: [
            {
              level: "Tertiary",
              school: "University of Manila",
              course: "Bachelor of Laws",
              yearGraduated: "2010",
            },
            {
              level: "Post Graduate",
              school: "Manila Law School",
              course: "Juris Doctor",
              yearGraduated: "2014",
            },
          ],
        },
        workExperiences: {
          create: [
            {
              position: "Junior Legal Researcher",
              company: "Law Firm Associates",
              startDate: new Date("2014-06-01"),
              endDate: new Date("2018-12-31"),
              salary: 45000,
            },
          ],
        },
      },
    }),

    prisma.employee.create({
      data: {
        employeeId: "EMP003",
        firstName: "Robert",
        lastName: "Cruz",
        gender: "Male",
        birthdate: new Date("1992-09-23"),
        position: "Administrative Officer",
        department: "Administration",
        email: "robert.cruz@example.com",
        officeDetails: {
          create: {
            plantilla: "303",
            office: "Administrative Services",
            salaryGrade: "11",
            step: "2",
          },
        },
        familyBackground: {
          create: {
            spouseFirstname: "Patricia",
            spouseLastname: "Cruz",
          },
        },
        educationRecords: {
          create: [
            {
              level: "Tertiary",
              school: "Polytechnic University",
              course: "Public Administration",
              yearGraduated: "2013",
            },
          ],
        },
        workExperiences: {
          create: [
            {
              position: "Administrative Assistant",
              company: "Government Agency",
              startDate: new Date("2013-08-01"),
              endDate: new Date("2017-12-31"),
              salary: 25000,
            },
          ],
        },
      },
    }),

    prisma.employee.create({
      data: {
        employeeId: "EMP004",
        firstName: "Angela",
        lastName: "Reyes",
        gender: "Female",
        birthdate: new Date("1985-12-03"),
        position: "Senior Accountant",
        department: "Finance",
        email: "angela.reyes@example.com",
        officeDetails: {
          create: {
            plantilla: "404",
            office: "Finance Division",
            salaryGrade: "16",
            step: "4",
          },
        },
        familyBackground: {
          create: {
            spouseFirstname: "Benjamin",
            spouseLastname: "Reyes",
          },
        },
        educationRecords: {
          create: [
            {
              level: "Tertiary",
              school: "University of Santo Tomas",
              course: "Accountancy",
              yearGraduated: "2006",
            },
            {
              level: "Post Graduate",
              school: "Asian Institute of Management",
              course: "Master in Business Administration",
              yearGraduated: "2010",
            },
          ],
        },
        workExperiences: {
          create: [
            {
              position: "Junior Accountant",
              company: "ABC Corporation",
              startDate: new Date("2006-06-01"),
              endDate: new Date("2010-05-31"),
              salary: 28000,
            },
            {
              position: "Accountant",
              company: "XYZ Company",
              startDate: new Date("2010-06-01"),
              endDate: new Date("2015-12-31"),
              salary: 45000,
            },
          ],
        },
      },
    }),

    prisma.employee.create({
      data: {
        employeeId: "EMP005",
        firstName: "Michael",
        lastName: "Tan",
        gender: "Male",
        birthdate: new Date("1991-07-18"),
        position: "IT Security Specialist",
        department: "IT",
        email: "michael.tan@example.com",
        officeDetails: {
          create: {
            plantilla: "505",
            office: "IT Security Division",
            salaryGrade: "14",
            step: "2",
          },
        },
        familyBackground: {
          create: {
            spouseFirstname: "Sarah",
            spouseLastname: "Tan",
          },
        },
        educationRecords: {
          create: [
            {
              level: "Tertiary",
              school: "Mapua Institute of Technology",
              course: "Computer Engineering",
              yearGraduated: "2012",
            },
            {
              level: "Certification",
              school: "CISCO Academy",
              course: "Network Security",
              yearGraduated: "2013",
            },
          ],
        },
        workExperiences: {
          create: [
            {
              position: "Network Administrator",
              company: "Tech Solutions Inc",
              startDate: new Date("2012-08-01"),
              endDate: new Date("2016-07-31"),
              salary: 35000,
            },
            {
              position: "Security Analyst",
              company: "Cyber Defense Corp",
              startDate: new Date("2016-08-01"),
              endDate: new Date("2020-12-31"),
              salary: 50000,
            },
          ],
        },
      },
    }),
  ]);

  console.log("Additional employees seeded!");

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
