# indexing-tool

To install dependencies:

```bash
bun install
touch urls.ts
touch service_account.json
```
- `urls.ts` sample:

```ts
export const urls = [
 'https://www.example.com/posts/1',
 'https://www.example.com/posts/2',
];
```

- `service_account.json` is the service account key file for Google Cloud Storage. You can create a service account key file from the [Google Cloud Console](https://console.cloud.google.com/iam-admin/serviceaccounts).

```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "your-private-key",
  "client_email": "your-client-email",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "your-client-x509-cert-url",
  "universe_domain": "googleapis.com"
}
```

To run:

```bash
bun start
```

This project was created using `bun init` in bun v1.0.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
