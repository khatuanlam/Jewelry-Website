import bcrypt from 'bcryptjs';

// Function to hash a password
async function hashPassword(password) {
    // Number of salt rounds - higher means more secure but slower
    const saltRounds = 12;

    try {
        // Generate a salt and hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

// Function to verify a password
async function verifyPassword(plainPassword, hashedPassword) {
    try {
        // Compare plain password with stored hashed password
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
}

export { hashPassword, verifyPassword };
