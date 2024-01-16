import functions = require('firebase-functions');
import { getAuth } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

exports.processSignUp = functions.auth.user().onCreate(async (user) => {
  const claims = {
    admin: false,
  };

  if (
    user.email &&
    user.email === 'ben.munro2000@gmail.com' &&
    user.emailVerified
  ) {
    claims.admin = true;
  }

  try {
    await getAuth().setCustomUserClaims(user.uid, claims);
  } catch (error) {
    console.log(error);
  }

  try {
    const firestore = getFirestore();
    const timestamp = Timestamp.now();
    await firestore.collection('users').doc(user.uid).set({
      email: user.email,
      createdAt: timestamp,
      updatedAt: timestamp,
      claims: claims,
    });
    console.log('User document created successfully');
  } catch (error) {
    console.error('Error creating user document:', error);
  }
});
