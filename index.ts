import { google } from 'googleapis';
import key from './service_account.json';
import { urls } from './urls';

const jwtClient = new google.auth.JWT(
  key.client_email,
  undefined,
  key.private_key,
  ['https://www.googleapis.com/auth/indexing'],
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
    const response = await fetch(
      'https://indexing.googleapis.com/v3/urlNotifications:publish',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokens.access_token}`,
        },
        body: JSON.stringify({
          url,
          type: 'URL_UPDATED',
        }),
      },
    );
    if (response.ok) {
      console.info('URL sent:', url);
    } else {
      console.error('URL failed:', url);
    }
  });
});
