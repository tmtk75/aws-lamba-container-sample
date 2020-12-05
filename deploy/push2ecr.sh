uri=$(aws ecr describe-repositories | jq -r '.repositories[]|select(.repositoryName|test("'${PROJECT_PREFIX}'")).repositoryUri')
docker tag tmtk75/lambda-func-sample:latest ${uri}:latest
aws ecr get-login-password | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com
docker push ${uri}:latest
