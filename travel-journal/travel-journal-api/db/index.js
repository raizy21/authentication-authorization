import mongoose from 'mongoose';  // import mongoose to interact with MongoDB

try {

  // Connect to MongoDB using the URI stored in the environment variable MONGO_URI
  const client = await mongoose.connect(process.env.MONGO_URI);
  // Log the connection status to the console
  console.log(`Connected to MongoDB @ ${client.connection.host}`);
} catch (error) { 
  // If an error occurs during the connection, log the error to the console and exit the process with a failure codeW  
  console.log(error);
  process.exit(1);
}
