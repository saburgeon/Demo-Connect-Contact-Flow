# Demo-Connect-Contact-Flow
## Converts Phone Numbers into Vanity Numbers and Lists Them to The Caller

### Production Phone Number
+1 208-992-5364

### Documentation
1.	Record your reasons for implementing the solution the way you did, struggles you faced and problems you overcame.
 
The implementation of this solution was done using the aws-sdk npm package provided by NodeJS in order to make a connection to the DynamoDB programmatically, in addition to the serverless npm package in order to implement the lamda function and cloud formation. Since the serverless package is open source and widely used for serverless applications, the documentation was clear, and the resultant code was clean.
 
Once the lambda function was created, an Amazon Connect Contact Flow was created in order to create a working phone number, and a workflow to connect to said phone number. The lambda function created variables that were then used for the text to speech to provide the vanity numbers created. SSML language was used so the caller can easily interpret the speech.

2.	What shortcuts did you take that would be a bad practice in production?
 
The root account was used for the user profile as opposed to creating a user with restricted access within IAM to only use the functionality that is required. In addition, the serverless.yaml file, which is used in the creation of cloud formation included permissions to DynamoDB that extended past the PutItem permission. For security, this would be restricted to only the particular functionalities that are used.

3.	What would you have done with more time? We know you have a life. :-)
 
Given more time, the web application would have been built in the super bonus section, in addition to additional routing  and options for the Amazon Connect workflow. This was certainly a fascinating project with many possibilities for a high level of dynamism. I would have loved to demonstrate more of the functionality that Amazon Connect has to provide, such as having the user select from a list of options, have the ability to choose how many vanity numbers are created, and provide to the user the total entries that have been appended to the DynamoDB table.

### Architecture Diagram
![image](https://user-images.githubusercontent.com/23618084/115039883-dc1f6b00-9e9e-11eb-843f-de76e79cb771.png)


### Deployment Instructions

CloudFormation was used as the deployment package, and deployment is done via the serverless npm package. In order to deploy to your machine, first use the command:
 
npm install serverless -g
 
This will allow the serverless package to be installed globally. Using the AWS CLI, configure the account so that the account to be used is logged in (please refer to the documentation below for setup that requires access keys):
 
aws configure
 
Afterwards, the command to deploy would be:
 
serverless deploy
 
You would then import the Amazon Connect Contact Flow into your own project. Once you log into your Amazon Connect Instance, the Demo Connect Lambda file listed in the project would be used for import. The lamda function would have to be changed, which is done through the AWS console under Amazon Connect. Once assigning the lambda function that was created using the serverless package for deployment, the phone number would then be assigned to the contact flow.

### Documentation
Serverless Documentation: https://www.serverless.com/framework/docs/providers/aws/cli-reference/deploy/

AWS CLI configuration: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html

Serverless NPM package: https://www.npmjs.com/package/serverless

Amazon Connect Contact Flow Import Instructions: https://docs.aws.amazon.com/connect/latest/adminguide/contact-flow-import-export.html

For downloading the AWS CLI: https://aws.amazon.com/cli/

Video on How to Import Amazon Connect Contact Flow: https://drive.google.com/file/d/1mHCaE-LgjQdasBKGOc9RKw0ynKBh7RzR/view

