import bcrypt from 'bcryptjs';

const password = 'admin'; // The password you want to hash

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
    return;
  }
  console.log('Generated hash:', hash);
});
