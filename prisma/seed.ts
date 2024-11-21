const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
  // Create Employee with related records
  const employee = await prisma.employee.create({
    data: {
      employeeId: "EMP001",
      firstName: "John",
      middleName: "Robert",
      lastName: "Doe",
      gender: "Male",
      civilStatus: "Married",
      email: "john.doe@example.com",
      position: "Senior Developer",
      department: "IT Department",
      
      // Create Spouse
      spouse: {
        create: {
          firstName: "Jane",
          lastName: "Doe",
          occupation: "Teacher",
          employer: "Local School District"
        }
      },

      // Create Parents
      parents: {
        create: {
          fatherFirstName: "James",
          fatherLastName: "Doe",
          motherFirstName: "Mary",
          motherLastName: "Smith"
        }
      },

      // Create Office Info with Appointment Details
      officeInfo: {
        create: {
          plantilla: "IT-IV",
          office: "Main Office",
          salaryGrade: "SG-18",
          tin: "123-456-789",
          gsis: "GSIS-123",
          appointmentDetails: {
            create: {
              dojAppointment: new Date("2020-01-15"),
              presentPositionAppointment: new Date("2022-03-01")
            }
          }
        }
      },

      // Create Educational Records
      educationalRecords: {
        create: [
          {
            level: "College",
            school: "State University",
            course: "Computer Science",
            yearGraduated: "2015",
            honors: "Cum Laude"
          },
          {
            level: "High School",
            school: "City High School",
            course: "General Academic",
            yearGraduated: "2011"
          }
        ]
      },

      // Create Eligibility Records
      eligibilityRecords: {
        create: [
          {
            eligibility: "Civil Service Professional",
            rating: "85.23",
            examDate: new Date("2016-06-15"),
            licenseNumber: "CSP-2016-123"
          }
        ]
      },

      // Create Work Experience
      workExperience: {
        create: [
          {
            action: "Initial Appointment",
            date: new Date("2020-01-15")
          },
          {
            action: "Promotion",
            date: new Date("2022-03-01")
          }
        ]
      },

      // Create Attachments
      attachments: {
        create: [
          {
            fileName: "resume.pdf",
            fileSize: 1024576, // 1MB
            uploadDate: new Date(),
            fileType: "application/pdf"
          },
          {
            fileName: "profile-picture.jpg",
            fileSize: 512000, // 500KB
            uploadDate: new Date(),
            fileType: "image/jpeg"
          }
        ]
      }
    }
  })

  // Create a second employee with different details
  const employee2 = await prisma.employee.create({
    data: {
      employeeId: "EMP002",
      firstName: "Maria",
      lastName: "Garcia",
      gender: "Female",
      civilStatus: "Single",
      email: "maria.garcia@example.com",
      position: "HR Manager",
      department: "Human Resources",

      officeInfo: {
        create: {
          plantilla: "HR-III",
          office: "HR Department",
          salaryGrade: "SG-16",
          appointmentDetails: {
            create: {
              dojAppointment: new Date("2019-05-01")
            }
          }
        }
      },

      educationalRecords: {
        create: {
          level: "Masters",
          school: "Management University",
          course: "Human Resource Management",
          yearGraduated: "2018"
        }
      }
    }
  })

  console.log({ employee, employee2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 