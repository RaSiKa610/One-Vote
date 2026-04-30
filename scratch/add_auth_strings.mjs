import fs from 'fs';

const newKeys = {
  phone_title: 'Verify Your Number',
  phone_subtitle: 'We will send a one-time passcode to confirm your identity.',
  phone_label: 'Mobile Number',
  phone_hint: 'Include country code, e.g. +91 for India',
  phone_invalid: 'Enter a valid phone number with country code.',
  phone_send_error: 'Failed to send OTP. Please try again.',
  send_otp: 'Send OTP',
  sending: 'Sending...',
  otp_title: 'Enter OTP',
  otp_subtitle: 'Enter the 6-digit code sent to your phone.',
  otp_label: '6-Digit Code',
  otp_invalid: 'Please enter the 6-digit code.',
  otp_wrong: 'Incorrect code. Please try again.',
  verifying: 'Verifying...',
  verify_otp: 'Verify and Continue',
  resend_otp: 'Resend OTP',
  go_back: 'Go Back',
  welcome_title: 'Welcome to One Vote',
  welcome_desc: "India's democracy is in your hands.",
  verified_user: 'Verified User',
  not_logged_in: 'Not logged in. Restart app to sign in.',
};

const p = 'src/i18n/en.json';
const j = JSON.parse(fs.readFileSync(p, 'utf8'));
Object.assign(j, newKeys);
fs.writeFileSync(p, JSON.stringify(j, null, 2));
console.log('Added', Object.keys(newKeys).length, 'keys to en.json');
