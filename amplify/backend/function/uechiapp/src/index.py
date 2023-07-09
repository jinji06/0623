import json
import boto3
import uuid
from decimal import Decimal
from datetime import datetime, timedelta

# Define the DecimalEncoder class.
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

def handler(event, context):
    # Get the DynamoDB client.
    dynamodb = boto3.resource('dynamodb')

    # Get the Todo table.
    app_table = dynamodb.Table('uechiappzisseki-staging')

    # If the request is a POST request, do the following.
    if event['httpMethod'] == 'POST':
        body = json.loads(event['body'])
        action = body.get('action', '')

        if action == 'shop_sell':
            aumnp = body.get('aumnp', '')
            description = body.get('description', '')
            user_id = body.get('user_id', '')
            timestamp = datetime.now().isoformat()

            # Generate a UUID for the primary key
            id = str(uuid.uuid4())

            # Create a new item to be inserted into the DynamoDB table
            item = {
                'id': id,
                'aumnp': aumnp,
                'description': description,
                'user': user_id,
                'timestamp': timestamp
            }

            # Insert the item into the DynamoDB table
            app_table.put_item(Item=item)

            response = {
                'statusCode': 200,
                'body': json.dumps({'message': 'Record inserted successfully'}),
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }

            return response

        elif action == 'monthly_summary':
            date = body.get('date', '')

            # Parse the date string to get the year and month
            year, month, _ = date.split('-')

            # Get the first and last day of the month
            first_day = datetime(int(year), int(month), 1).isoformat()
            last_day = (datetime(int(year), int(month), 1) + timedelta(days=31)).isoformat()

            # Query the DynamoDB table for records within the specified date range
            response = app_table.scan(
                FilterExpression='#t between :start and :end',
                ExpressionAttributeNames={
                    '#t': 'timestamp'
                },
                ExpressionAttributeValues={
                    ':start': first_day,
                    ':end': last_day
                }
            )

            # Count the number of records for each sellName
            summary = {}
            for item in response['Items']:
                sellName = str(item['aumnp'])  # キーを文字列に変換する
                if sellName not in summary:
                    summary[sellName] = 0
                summary[sellName] += 1

            response = {
                'statusCode': 200,
                'body': json.dumps(summary),
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            }

            return response

    # If the request is not a POST request or the action is not recognized, return an error response
    response = {
        'statusCode': 400,
        'body': json.dumps({'error': 'Invalid request'}),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    return response
