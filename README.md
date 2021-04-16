# Demo-Connect-Contact-Flow
Converts Phone Numbers into Vanity Numbers and Lists Them to The Caller

1.           Record your reasons for implementing the solution the way you did, struggles you faced and problems you overcame.
	
	The implementation of this solution was done using the aws-sdk npm package provided by NodeJS in order to make a connection to the DynamoDB programmatically, in addition to the serverless npm package in order to implement the lamda function and cloud formation. Since the serverless package is open source and widely used for serverless applications, the documentation was clear, and the resultant code was clean.
	
Once the lambda function was created, an Amazon Connect Contact Flow was created in order to create a working phone number, and a workflow to connect to said phone number. The lambda function created variables that were then used for the text to speech to provide the vanity numbers created. SSML language was used so the caller can easily interpret the speech.![image](https://user-images.githubusercontent.com/23618084/115039453-76cb7a00-9e9e-11eb-8cdb-77bbb2a36262.png)
