# README
A sample for AWS Lambda with container to run a simple function written in golang.
- Container image file built with paketo buildpacks.
- Deploy with CDK.
  - Multi-stack layout.

You need
- docker
- [pack](https://github.com/buildpacks/pack)

## Build image 
```
$ cd build
$ make build
...
Successfully built image tmtk75/lambda-func-sample:latest
```

## Deploy
```
$ cd deploy
```
Set some environment variables for existing a few AWS network resoruces.
```
export PROJECT_PREFIX="tmtk75-lambda-container-"
export ACCOUNT_ID=123456789123
export VPC_ID="vpc-12345678"
export SECURITY_GROUP_ID="sg-12345678"
export SUBNET_ID="subnet-12345678"
```

Try diff.
```
$ AWS_PROFILE=<your-profile>
$ AWS_DEFAULT_REGION=ap-northeast-1
$ npm run cdk diff
```

Make an ECR repository first, and push the image there.
```
$ npm run cdk deploy AWSLambdaWithContainerSampleRepository
...

$ ./push2ecr.sh
...
```

Then deploy the main stack.
```
$ npm run cdk deploy AWSLambdaWithContainerSample
...
 ✅  AWSLambdaWithContainerSample

Stack ARN:
arn:aws:cloudformation:ap-northeast-1:123456789123:stack/AWSLambdaWithContainerSample/58ba41a0-36c9-11eb-b1cf-0611461e9ae4

```

You can invoke the deployed function.
```
$ aws --cli-binary-format raw-in-base64-out \
  lambda invoke out.json \
  --function-name "${PROJECT_PREFIX}simple-func" \
  --payload '{"name":"tmtk75"}' \
  && cat out.json && echo
{
    "StatusCode": 200,
    "ExecutedVersion": "$LATEST"
}
"Hello tmtk75!"
$
```
