exports.constants={
    VALIDATION_ERROR:400,
    UNAUTHORIZED:401,
    FORBIDDEN:403,
    NOT_FOUND:404,
    SERVER_ERROR:500

}
// In your Node.js backend
const BASE_URL = process.env.BASE_URL || "http://localhost:5001";