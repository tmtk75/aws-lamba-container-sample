#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { DeployStack } from "../lib/deploy-stack";
import { EcrStack } from "../lib/ecr-stack";

const app = new cdk.App();
const opts = {
  // https://docs.aws.amazon.com/cdk/latest/guide/environments.html
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
};

new EcrStack(app, "AWSLambdaWithContainerSampleRepository", opts);
new DeployStack(app, "AWSLambdaWithContainerSample", opts);
