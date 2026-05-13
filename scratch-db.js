const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://chinu23062002_db_user:Harshit%4012345@cluster0.1blvxcu.mongodb.net/?appName=Cluster0";

async function main() {
  await mongoose.connect(MONGODB_URI);
  
  const certificateId = 'CERT-PRIYANSH123';
  
  // Delete if it already exists to be safe
  await mongoose.connection.collection('certificates').deleteOne({ certificateId });

  const newCert = {
    studentName: "Priyansh",
    fatherName: "",
    course: "BCA",
    semester: "V Semester",
    rollNo: "123456",
    collegeName: "Poddar International College",
    academicYear: "2025-26",
    companyName: "Shri Sai Computers",
    startDate: "01 Jan 2026",
    endDate: "31 Mar 2026",
    internshipRole: "Intern",
    duration: "120 hours",
    issueDate: new Date(),
    certificateId: certificateId,
    certificateImage: "/uploads/Priyansh_Certificate.png",
    createdAt: new Date()
  };

  await mongoose.connection.collection('certificates').insertOne(newCert);
  console.log("Inserted Priyansh's certificate!");
  process.exit(0);
}

main();
