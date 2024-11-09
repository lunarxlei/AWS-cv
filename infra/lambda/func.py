import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('cloud-resume')

def lambda_handler(event, context):
    response = table.get_item(Key={'id': '0'})
    # Check if the item exists in the response
    if 'Item' not in response:
        print("Item not found, initializing views to 0.")
        views = 0  
    else:
        views = int(response['Item']['views']['N']) 
    views += 1
    print(f"Updated views count: {views}")
    
    # Update the 'views' in the DynamoDB table
    table.put_item(Item={'id': '0', 'views': {'N': str(views)}})
    
    return views