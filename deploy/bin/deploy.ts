#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { DeployStack } from "../lib/deploy-stack";

const app = new cdk.App();
new DeployStack(app, "AWSLambdaWithContainerSample", {
  // https://docs.aws.amazon.com/cdk/latest/guide/environments.html
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
