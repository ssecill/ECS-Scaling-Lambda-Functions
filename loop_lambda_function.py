import json
import boto3
client = boto3.client('application-autoscaling')
def lambda_handler(event, context):
    resource=['service/cluster-dev/service1','service/cluster-dev/service2']
    for r in resource:
     response = client.register_scalable_target(
     ServiceNamespace='ecs',
     ResourceId=r,
     ScalableDimension='ecs:service:DesiredCount',
     MinCapacity=0)
