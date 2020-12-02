import * as cdk from "@aws-cdk/core";
import { Function, AssetCode, Runtime } from "@aws-cdk/aws-lambda";
import { Role, ServicePrincipal, ManagedPolicy } from "@aws-cdk/aws-iam";
import { Vpc, Subnet, SecurityGroup } from "@aws-cdk/aws-ec2";

export class DeployStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const prefix = process.env.PREFIX;
    if (!prefix) {
      throw new Error(`You have to set PREFIX.`);
    }
    const vpcId = process.env.VPC_ID;
    if (!vpcId) {
      throw new Error(`You have to set VPC_ID.`);
    }
    const sgId = process.env.SECURITY_GROUP_ID;
    if (!sgId) {
      throw new Error(`You have to set SECURITY_GROUP_ID.`);
    }
    const subnetId = process.env.SUBNET_ID;
    if (!subnetId) {
      throw new Error(`You have to set SUBNET_ID.`);
    }


    const executionLambdaRole = new Role(this, "code-runner-role", {
      roleName: `${prefix}lambdaSecureExecutionRole`,
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaVPCAccessExecutionRole"
        ),
      ],
    });

    const vpc = Vpc.fromLookup(this, "anVpc", { vpcId });

    new Function(this, "code-runner", {
      functionName: `${prefix}-simple-func`,
      runtime: Runtime.NODEJS_12_X,
      code: AssetCode.fromAsset("../lib"),
      handler: "lambda/index.handler",
      timeout: cdk.Duration.seconds(5),
      role: executionLambdaRole,

      // environment: {
      //   TZ: "Asia/Tokyo",
      // },
      vpc,
      securityGroups: [
        SecurityGroup.fromSecurityGroupId(this, "aSG", sgId),
      ],
      // subnet-37a6a143, subnet-66c29820
      vpcSubnets: {
        // subnetType: ec2.SubnetType.PRIVATE,
        subnets: [Subnet.fromSubnetId(this, "aSubnet", subnetId)],
      },
    });
  }
}
