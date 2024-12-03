'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import path from 'path'
import fs from 'fs/promises'

// Get single employee with all relations
export async function getEmployee(id: string) {
  if (!id) {
    throw new Error('Employee ID is required');
  }

  return await prisma.employee.findUnique({
    where: {
      id: id
    },
    include: {
      familyBackground: true,
      officeDetails: true,
      educationRecords: true,
      workExperiences: true,
      attachments: true
    }
  })
}

// Get all employees with relations
export async function getEmployees() {
  return await prisma.employee.findMany({
    include: {
      familyBackground: true,
      officeDetails: true,
      educationRecords: true,
      workExperiences: true,
      attachments: true,
      eligibilityRecords: true,
      trainingPrograms: true,
      references: true
    }
  })
}

// Get employee personal information
export async function getEmployeePersonalInfo(employeeId: string) {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        familyBackground: true
      }
    })
    return employee
  } catch (error) {
    console.error('Error fetching employee:', error)
    throw new Error('Failed to fetch employee information')
  }
}

// Update employee information with complete fields
export async function updateEmployee(id: string, data: any) {
  try {
    const [updated] = await Promise.all([prisma.employee.update({
      where: {id},
      data: {
        employeeId: data.employeeId,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        suffix: data.suffix,
        birthdate: data.birthdate ? new Date(data.birthdate) : undefined,
        birthplace: data.birthplace,
        gender: data.gender,
        civilStatus: data.civilStatus,
        citizenship: data.citizenship,
        religion: data.religion,
        bloodType: data.bloodType,
        height: data.height ? parseFloat(data.height) : undefined,
        weight: data.weight ? parseFloat(data.weight) : undefined,
        mobileNo: data.mobileNo,
        email: data.email,
        residentialAddress: data.residentialAddress,
        permanentAddress: data.permanentAddress,
        gsisId: data.gsisId,
        pagibigId: data.pagibigId,
        philhealthId: data.philhealthId,
        sssId: data.sssId,
        tinId: data.tinId,
        agencyEmployeeNo: data.agencyEmployeeNo,
      }
    })]);

    revalidatePath('/employees/[id]');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Update employee error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update employee' 
    };
  }
}

export async function addEducationRecord(employeeId: string, data: any) {
  try {
    await prisma.educationRecord.create({
      data: {
        employeeId,
        level: data.level,
        school: data.school,
        // ... rest of the education record fields ...
      }
    })
    revalidatePath('/employees')
    return { success: true }
  } catch (error) {
    console.error('Error adding education record:', error)
    return { success: false, error: 'Failed to add education record' }
  }
}

export async function addEligibilityRecord(employeeId: string, data: any) {
  try {
    await prisma.eligibilityRecord.create({
      data: {
        employeeId,
        eligibility: data.eligibility,
      }
    })
    revalidatePath('/employees')
    return { success: true }
  } catch (error) {
    console.error('Error adding eligibility record:', error)
    return { success: false, error: 'Failed to add eligibility record' }
  }
}

export async function uploadAttachment(employeeId: string, file: File) {
  try {
    const fileName = file.name
    console.log('Uploading file:', fileName)
    
    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    const uploadDir = path.join(process.cwd(), 'uploads')
    const filePath = path.join(uploadDir, fileName)
    
    await fs.writeFile(filePath, buffer)
    console.log('File saved to:', filePath)

    // Create database record
    const attachment = await prisma.attachment.create({
      data: {
        fileName,
        fileType: file.type,
        fileSize: file.size,
        storageUrl: `/uploads/${fileName}`,
        employeeId,
        uploadDate: new Date(),
      },
    })

    console.log('Database record created:', attachment)

    // Revalidate the employee page
    revalidatePath(`/employees/${employeeId}`)

    return { success: true, attachment }
  } catch (error) {
    console.error('Upload error:', error)
    return { success: false, error: 'Failed to upload attachment' }
  }
}

export async function addWorkExperience(employeeId: string, data: any) {
  try {
    // Add date validation before creating the record
    const startDate = data.startDate ? new Date(data.startDate) : null;
    const endDate = data.endDate ? new Date(data.endDate) : null;

    // Validate dates
    if (startDate && isNaN(startDate.getTime())) {
      return { success: false, error: 'Invalid start date' };
    }
    if (endDate && isNaN(endDate.getTime())) {
      return { success: false, error: 'Invalid end date' };
    }

    await prisma.workExperience.create({
      data: {
        employeeId,
        startDate,
        endDate,
        // ... rest of the work experience fields ...
      }
    })
    revalidatePath('/employees')
    return { success: true }
  } catch (error) {
    console.error('Error adding work experience:', error)
    return { success: false, error: 'Failed to add work experience' }
  }
}

// Update education record with complete fields
export async function updateEducationRecord(id: string, data: any) {
  try {
    const updated = await prisma.educationRecord.update({
      where: { id },
      data: {
        level: data.level,
        school: data.school,
        course: data.course,
        yearGraduated: data.yearGraduated,
        units: data.units,
        yearFrom: data.yearFrom,
        yearTo: data.yearTo,
        honors: data.honors
      }
    });

    revalidatePath('/employees/[id]');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, error: 'Failed to update education record' };
  }
}

// Personal Information
export async function updatePersonalInfo(id: string, data: any) {
  try {
    const updated = await prisma.employee.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        birthDate: data.birthDate,
        birthPlace: data.birthPlace,
        gender: data.gender,
        civilStatus: data.civilStatus,
        citizenship: data.citizenship,
        // Add other personal info fields
      }
    });
    revalidatePath('/employees/[id]');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, error: 'Failed to update personal information' };
  }
}

// Office Information
export async function updateOfficeInfo(id: string, data: any) {
  try {
    const updated = await prisma.officeDetails.update({
      where: { employeeId: id },
      data: {
        position: data.position,
        department: data.department,
        salary: data.salary,
        employmentStatus: data.employmentStatus,
        dateHired: data.dateHired,
        // Add other office info fields
      }
    });
    revalidatePath('/employees/[id]');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, error: 'Failed to update office information' };
  }
}

// Update eligibility record with complete fields
export async function updateEligibilityRecord(id: string, data: any) {
  try {
    const updated = await prisma.eligibilityRecord.update({
      where: { id },
      data: {
        eligibility: data.eligibility,
        rating: data.rating,
        examDate: data.examDate ? new Date(data.examDate) : undefined,
        place: data.place,
        licenseNumber: data.licenseNumber,
        releaseDate: data.releaseDate ? new Date(data.releaseDate) : undefined
      }
    });

    revalidatePath('/employees/[id]');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, error: 'Failed to update eligibility record' };
  }
}

// Update work experience with complete fields
export async function updateWorkExperience(id: string, data: any) {
  try {
    const updated = await prisma.workExperience.update({
      where: { id },
      data: {
        position: data.position,
        company: data.company,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        salary: data.salary ? parseFloat(data.salary) : undefined,
        salaryGrade: data.salaryGrade,
        appointmentStatus: data.appointmentStatus,
        isGovernmentService: data.isGovernmentService
      }
    });

    revalidatePath('/employees/[id]');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, error: 'Failed to update work experience' };
  }
}

// Update training program with complete fields
export async function updateTrainingProgram(id: string, data: any) {
  try {
    const updated = await prisma.trainingProgram.update({
      where: { id },
      data: {
        title: data.title,
        type: data.type,
        hours: data.hours ? parseInt(data.hours) : undefined,
        conductor: data.conductor,
        venue: data.venue,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined
      }
    });

    revalidatePath('/employees/[id]');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, error: 'Failed to update training program' };
  }
}

// Update reference with complete fields
export async function updateReference(id: string, data: any) {
  try {
    const updated = await prisma.reference.update({
      where: { id },
      data: {
        name: data.name,
        position: data.position,
        company: data.company,
        contactNumber: data.contactNumber,
        email: data.email
      }
    });

    revalidatePath('/employees/[id]');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, error: 'Failed to update reference' };
  }
}

// Attachments
export async function updateAttachment(id: string, data: any) {
  try {
    const updated = await prisma.attachment.update({
      where: { id },
      data: {
        fileName: data.fileName,
        fileSize: data.fileSize,
        fileType: data.fileType,
        uploadDate: data.uploadDate ? new Date(data.uploadDate) : undefined,
        storageUrl: data.storageUrl
      }
    });
    revalidatePath('/employees/[id]');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, error: 'Failed to update attachment' };
  }
}

// Update family background with complete fields
export async function updateFamilyBackground(id: string, data: any) {
  try {
    const updated = await prisma.familyBackground.update({
      where: { employeeId: id },
      data: {
        spouseFirstname: data.spouseFirstName,
        spouseMiddlename: data.spouseMiddleName,
        spouseLastname: data.spouseLastName,
        spouseOccupation: data.spouseOccupation,
        spouseEmployer: data.spouseEmployer,
        spouseBusinessAddress: data.spouseBusinessAddress,
        spouseTelephone: data.spouseTelephone,
        fatherFirstName: data.fatherFirstName,
        fatherMiddleName: data.fatherMiddleName,
        fatherLastName: data.fatherLastName,
        motherFirstName: data.motherFirstName,
        motherMiddleName: data.motherMiddleName,
        motherLastName: data.motherLastName,
        motherMaidenName: data.motherMaidenName,
      }
    });

    revalidatePath('/employees/[id]');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, error: 'Failed to update family background' };
  }
}