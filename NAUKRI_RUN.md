Run the Naukri resume upload test

Set environment variables before running the Playwright test:

- `NAUKRI_USERNAME` - your Naukri login email/username
- `NAUKRI_PASSWORD` - your Naukri password
- `RESUME_PATH` - path to the resume file to upload (absolute or workspace-relative)
- `NAUKRI_PROFILE_URL` (optional) - direct URL to your profile/resume upload page (recommended for stability)

Example (Windows PowerShell):

```powershell
$env:NAUKRI_USERNAME = 'you@example.com'
$env:NAUKRI_PASSWORD = 'yourPassword'
$env:RESUME_PATH = 'C:\path\to\resume.pdf'
npx playwright test tests/NaukariProfileUpdate.spec.ts
```

Example (Linux / macOS):

```bash
export NAUKRI_USERNAME=you@example.com
export NAUKRI_PASSWORD=yourPassword
export RESUME_PATH=/home/me/resume.pdf
npx playwright test tests/NaukariProfileUpdate.spec.ts
```

Notes:
- If `NAUKRI_PROFILE_URL` is not provided, the test will try to navigate via UI clicks which may be brittle.
- The test attempts several common selectors; you may need to update selectors in `tests/NaukariProfileUpdate.spec.ts` to match the current Naukri page structure.
