import bcrypt from "bcryptjs";

async function run() {
  const password = "admin123"; 
  const hashed = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashed);
}

run();
