import { initializeApp } from 'firebase-admin/app';

import processSignUp = require('./onUserCreation');
exports.processSignUp = processSignUp;

initializeApp();
