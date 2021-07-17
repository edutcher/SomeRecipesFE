# Get All Recipes
import json
import boto3

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('SomeRecipes')
    data = table.scan()
    return {
        'statusCode': 200,
        'headers' : {
        'Access-Control-Allow-Headers': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET'
        },
        'body': data
    }


#Add Photo
import json
import boto3
import base64

s3 = boto3.client('s3')

def lambda_handler(event, context):
    bucket_name = 'some-recipes'
    
    if event['httpMethod'] == 'POST' :
        image = event['body']
        image = image[image.find(",")+1:]
        dec = base64.b64decode(image + "===")
        title = event['pathParameters']['title']
        title = title[title.find("=")+1:]
        
        if "%20" in title:
            key="%20"
            title_sani = title.replace(key, "-")
        
        user = event['pathParameters']['name']
        user = user[user.find("=")+1:]
        file_name = "images/"+title_sani+"-"+user+".jpg"
        resp = s3.put_object(Bucket=bucket_name, Key=file_name, Body=dec)
        
        location = s3.get_bucket_location(Bucket=bucket_name)['LocationConstraint']
        url = "https://s3-%s.amazonaws.com/%s/%s" % (location, bucket_name, file_name)
        
        return {
            'statusCode': 200, 
            'body': json.dumps(url),         
            'headers' : {
            'Access-Control-Allow-Headers': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'
        }}


#Get Recipe by ID
import json
import boto3
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    
    dynamodb = boto3.resource('dynamodb')
    
    table = dynamodb.Table('SomeRecipes')      
    
    resp = table.query(
            IndexName="id-category-index",
            KeyConditionExpression=Key('id').eq(event["params"]["path"]["recipe"])
        )
    
    res=event['params']
    
    return {
        'statusCode': 200,
        'headers' : {
        'Access-Control-Allow-Headers': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET'
        },
        'body': resp
    }

#Search Recipes
import json
import boto3
from boto3.dynamodb.conditions import Attr
import decimal

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return str(o)
        return super(DecimalEncoder, self).default(o)

def lambda_handler(event, context):
    
    dynamodb = boto3.resource('dynamodb')
    
    table = dynamodb.Table('SomeRecipes')      
    query = event['pathParameters']['search']
    query = query[query.find("=")+1:]

    response = table.scan()
    items = response["Items"]
    
    filtered = [item for item in items if query in item['RecipeName']]
    
    items = json.dumps(filtered, cls=DecimalEncoder)
    
    
    if filtered:
        return {
        'statusCode': 200,
        'headers' : {
            'Access-Control-Allow-Headers': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': items
        }
    else:
        return {
        'statusCode': 400,
        'headers' : {
            'Access-Control-Allow-Headers': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            'body': json.dumps({"message:": "No results found"})
        }

#Add Recipe
import json
import boto3
import uuid
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    dynamodb = boto3.resource('dynamodb')

    table = dynamodb.Table('SomeRecipes')
    temp = json.loads(event['body'])

    resp = table.put_item(Item={
        'id': str(uuid.uuid1()),
        'RecipeName': temp['RecipeName'],
        'Username': temp['Username'],
        'description': temp['description'],
        'ingredients': temp['ingredients'],
        'directions': temp['directions'],
        'time': temp['time'],
        'image_url': temp['image_url'],
        'category': temp['category']
    })
    
    return {
        'statusCode': 200,
        'headers' : {
        'Access-Control-Allow-Headers': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST'
        },
        'body': json.dumps(resp)
    }


#Get User Recipes
import json
import boto3
from boto3.dynamodb.conditions import Attr
import decimal

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return str(o)
        return super(DecimalEncoder, self).default(o)

def lambda_handler(event, context):
    
    dynamodb = boto3.resource('dynamodb')
    
    table = dynamodb.Table('SomeRecipes')
    
    user = event['pathParameters']['username']
    user = user[user.find("=")+1:]
    
    resp = table.scan(
            FilterExpression=Attr('Username').eq(user)
        )
        
    items = json.dumps(resp, cls=DecimalEncoder)
    
    return {
        'statusCode': 200,
        'headers' : {
        'Access-Control-Allow-Headers': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,GET'
        },
        'body': items
    }