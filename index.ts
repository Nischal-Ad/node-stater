import connectDatabase from './src/config/database';
import app from './src/app';
import dotenv from 'dotenv';

//handeling uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(
    `Error ${err.message} sutting down the server due to uncaught exception`
  );
  process.exit(1);
});

//setting path for dotenv config
dotenv.config({ path: './src/config/config.env' });

// connectDatabase
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});

//unhandled promise rejection
process.on('unhandledRejection', (err: Error) => {
  console.log(
    `Error ${err.message} sutting down the server due to uncaught exception`
  );

  server.close(() => {
    process.exit(1);
  });
});
