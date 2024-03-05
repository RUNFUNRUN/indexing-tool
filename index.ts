import key from './service_account.json';
import { google } from 'googleapis';
import { urls } from './urls';

// urls.ts sample
// export const urls = [
//  'https://www.example.com/posts/1',
//  'https://www.example.com/posts/2',
// ];

const jwtClient = new google.auth.JWT(
  key.client_email,
  undefined,
  key.private_key,
  ['https://www.googleapis.com/auth/indexing'],
  undefined,
);

console.log('Authorizing...');

jwtClient.authorize(async (err, tokens) => {
  if (err) {
    console.log(err);
    return;
  }
  if (tokens === undefined) {
    console.log('No tokens');
    return;
  }
  console.log('Successfully connected!');
  console.log('Sending request to Google Indexing API...');
  urls.map(async (url) => {
    const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokens.access_token}`
      },
      body: JSON.stringify({
        url,
        type: 'URL_UPDATED'
      })
    });
    if (response.ok) {
      console.info('URL sent:', url);
    } else {
      console.error('URL failed:', url);
    }
  });
});
