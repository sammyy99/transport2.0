import sql from "mssql";

const config = {
    server: 'SAMMY\\SQLEXPRESS',
    database: 'soluti14_transport',
    user: 'localserver',
    password: 'transport@123',
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
    },
};

export const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log("Connection to db successful");
    } catch (error) {
        console.log("Error in connecting to db " + error);
    }
};

export default sql;