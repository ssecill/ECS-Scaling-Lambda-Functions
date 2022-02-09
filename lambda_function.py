import json
import boto3

client = boto3.client('application-autoscaling')
def lambda_handler(event, context):

    response = client.register_scalable_target(
    ServiceNamespace='ecs',
    ResourceId='service/secil/sns',
    ScalableDimension='ecs:service:DesiredCount',
    MinCapacity=0
    #,
    #RoleARN='string',
    #SuspendedState={
    #    'DynamicScalingInSuspended': True|False,
    #    'DynamicScalingOutSuspended': True|False,
    #    'ScheduledScalingSuspended': True|False
    #}
)

