import * as cdk from "@aws-cdk/core";
import { Repository } from "@aws-cdk/aws-ecr";
import { RemovalPolicy } from "@aws-cdk/core";

export class EcrStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const prefix = process.env.PROJECT_PREFIX;
    if (!prefix) {
      throw new Error(`You have to set PROJECT_PREFIX.`);
    }

    const repo = new Repository(this, "aRepo", {
      repositoryName: `${prefix}sample-repo`,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
