export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default-value-to-test',
    expiresIn: '1d',
  },
};
