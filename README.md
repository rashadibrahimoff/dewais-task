# Dewais test assignment

Consists of 2 parts

- Implement an AWS Lambda service function that calculates how many different types of words can be found within the provided text.
- Implement a simple React App to connect to this service.
React App should have an input text field, a paragraph to display the results and a submit button.

## Project

Project is structure with 2 folders in /apps directory

### apps/backend

- Built on top of Serverless Framework
- Creates single lambda function and exposes public URL
- Readme is [here](https://github.com/rashadibrahimoff/dewais-task/tree/main/apps/backend)
- Already deployed to private AWS account
- URL: https://k5etvmds3d5ihoarlu5x5it25q0riplr.lambda-url.us-east-1.on.aws

### apps/frontend

- Built on top of Next.js 13
- Creates single form with text input, submit button and result paragraph
- Readme is [here](https://github.com/rashadibrahimoff/dewais-task/tree/main/apps/frontend)
- Already deployed to private Netlify account
- URL: https://dewais-task-frontend.netlify.app/