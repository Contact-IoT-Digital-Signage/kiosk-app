# Installation

# Requirements
- AWS CLI
- SAM CLI
- npm

## Backend
1. `cd backend`
1. `sam build`
1. `sam deploy -g`

## Frontend
1. make `.env` file
    - REACT_APP_CONTENTS_FOLDER -> specify folder on s3 bucket
    - REACT_APP_LIST_CONTENTS_API_ENDPOINT -> copy and paste output of sam deploy's `ListContentsApiEndpoint`
    - REACT_APP_CONTENTS_BUCKET_URL -> copy and paste output of sam deploy's `ContentsBucketSecureUrl`

1. `npm install`
1. `npm start run`