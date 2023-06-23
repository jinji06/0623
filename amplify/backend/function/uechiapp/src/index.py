import json
import boto3
import uuid
from decimal import Decimal

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
        # Get the request body.
        body = json.loads(event['body'])

        # 新規作成の場合はこちら
        if body['action'] == 'create':
            # テーブルにデータを挿入する
            app_table.put_item(Item={
                'id': str(uuid.uuid4()),
                'title': body['title'],
                'description': body['description']
            })

        # UPDATE アクセスの場合はこちら
        elif body['action'] == 'update':
            # Update the Todo.
            app_table.update_item(Key={
                'id': body['id']
            }, UpdateExpression='SET title = :title, description = :description', ExpressionAttributeValues={
                ':title': body['title'],
                ':description': body['description']
            })

        # DELETE /{id} アクセスの場合はこちら
        elif body['action'] == 'delete':
            # Delete the Todo.
            app_table.delete_item(Key={
                'id': body['id']
            })

    # GET /{id} アクセスの場合はこちら
    elif event['httpMethod'] == 'GET' and event.get('queryStringParameters') and 'id' in event['queryStringParameters']:
        # Get the Todo with the specified ID.
        todo = app_table.get_item(Key={
            'id': event['queryStringParameters']['id']
        })

        # Return the Todo as JSON.
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(todo, cls=DecimalEncoder)
        }

    # /GETアクセスの場合はこちら
    elif event['httpMethod'] == 'GET':
        # Get all Todos.
        app_table_datas = app_table.scan()

        # Return all Todos as JSON.
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(app_table_datas, cls=DecimalEncoder)
        }
