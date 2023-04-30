import {
    DynamoDBClient,
    ScanCommand,
    QueryCommand,
    PutItemCommand,
    UpdateItemCommand,
    DeleteItemCommand
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from '@aws-sdk/util-dynamodb';

const dynamo = new DynamoDBClient({});
export const handler = async (event) => {
    try {
        switch (event.path) {
            case '/gettour': {
                return await Gettour(event);
            }
            case '/detail': {
                return await Detail(event);
            }
            case '/form': {
                return await Getform(event);
            }
            case '/confirm': {
                return await GetConfirm(event);
            }
            case '/payment': {
                return await GetPayment(event);
            }
            case '/status': {
                return await GetStatus(event);
            }
            case '/check': {
                return await GetCheckStatus(event);
            }
            //-------------------------------------------------------------------
            // -----------------ADMIN------------------------------------------- 
            case '/home': {
                return await GetHome(event);
            }
            case '/manage': {
                return await GetTourInfo(event);
            }
            case '/alltour': {
                return await GetAllTour(event);
            }
            case '/pay': {
                return await GetMoney(event);
            }
            case '/approve': {
                return await GetApprove(event);
            }
            case '/reject': {
                return await GetReject(event);
            }
            case '/info': {
                return await GetInfo(event);
            }
            case '/tourdetail': {
                return await GetTourDetail(event);
            }
            case '/toreject': {
                return await GetNotPass(event);
            }
            case '/createtour': {
                return await CreateTour(event);
            }
            case '/update': {
                return await UpdateTour(event);
            }
            case '/delete': {
                return await DeleteTour(event);
            }
            case '/slip': {
                return await GetSlip(event);
            }
            case '/login': {
                return await Login(event);
            }
            case 'OPTIONS': { // เพิ่ม options เพื่อทำการ preflight สำหรับ CORS
                return {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                        'Content-Type': 'application/json'
                    },
                    body: ''
                }
            }
        }
    }
    catch (err) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ error: err.message })
        };
    }

};
async function Gettour(event) {
    if (event.httpMethod == "GET") {
        try {
            const params = {
                TableName: 'myTour',
            };
            const data = await dynamo.send(new ScanCommand(params));
            const items = data.Items.map((item) => {
                const { tourId, tour_name, img, detail_img, province, price, detail, schedule, max_tourist, date_first, date_second } = unmarshall(item);
                return {

                    tourId, tour_name, img, detail_img, province, price, detail, schedule, max_tourist, date_first, date_second

                };
            }); return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
}
async function Detail(event) {
    if (event.httpMethod == "GET") {
        try {
            const tourId = event.queryStringParameters.tourId;
            const params = {
                TableName: 'myTour',
                KeyConditionExpression: 'tourId = :tourId',
                ExpressionAttributeValues: {
                    ':tourId': { 'N': tourId }
                }
            };
            const data = await dynamo.send(new QueryCommand(params));
            const items = data.Items.map((item) => {
                const { tourId, tour_name, img, detail_img, province, price, detail, schedule, max_tourist, date_first, date_second } = unmarshall(item);
                return {

                    tourId, tour_name, img, detail_img, province, price, detail, schedule, max_tourist, date_first, date_second
                };

            }

            );


            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
}

async function Getform(event) {
    if (event.httpMethod == "GET") {
        try {
            const tourId = event.queryStringParameters.tourId;
            const params = {
                TableName: 'myTour',
                KeyConditionExpression: 'tourId = :tourId',
                ExpressionAttributeValues: {
                    ':tourId': { 'N': tourId }
                }
            };
            const data = await dynamo.send(new QueryCommand(params));
            const items = data.Items.map((item) => {
                const { tourId, tour_name, img, detail_img, province, price, detail, schedule, max_tourist, date_first, date_second } = unmarshall(item);
                return {

                    tourId, tour_name, img, detail_img, province, price, detail, schedule, max_tourist, date_first, date_second
                };

            }

            );


            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
    else if (event.httpMethod == "POST") {
        try {
            const {
                firstname,
                lastname,
                phone,
                email,
                annotation,
                total_tourist,
                tour_name,
                province,
                price,
                date,
                // status,
                // state,

            } = JSON.parse(event.body);

            const paramsgetid = {
                TableName: 'myUser'
            };
            const data = await dynamo.send(new ScanCommand(paramsgetid));//ไปเอาข้อมูลมา
            const items = data.Items.map((item) => {
                const { userId } = unmarshall(item);
                return {
                    userId,

                };
            });
            const id = Math.max(...items.map(item => item.userId)) + 1;

            const params = {
                TableName: 'myUser',
                Item: {
                    userId: { "N": String(id) },
                    email: { "S": email },
                    firstname: { "S": firstname },
                    lastname: { "S": lastname },
                    phone: { "S": phone },
                    province: { "S": province },
                    annotation: { "S": annotation },
                    total_tourist: { "N": String(total_tourist) },
                    tour_name: { "S": tour_name },
                    price: { "N": String(price) },
                    userStatus: { "S": "" },
                    userState: { "S": "" },
                    slip: { "S": "" },
                    date: { "S": date },
                    bank: { "S": "" },
                }
            };
            await dynamo.send(new PutItemCommand(params));
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: (id)
            };
        } catch (err) {
            return {

                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };

        }


    }
}

async function GetConfirm(event) {
    if (event.httpMethod == "GET") {
        try {
            const userId = event.queryStringParameters.userId;
            const params = {
                TableName: 'myUser',
                KeyConditionExpression: 'userId = :userId',
                ExpressionAttributeValues: {
                    ':userId': { 'N': userId }
                }
            };
            const data = await dynamo.send(new QueryCommand(params));
            const items = data.Items.map((item) => {
                const { userId, firstname,
                    lastname,
                    phone,
                    email,
                    annotation,
                    total_tourist,
                    tour_name,
                    province,
                    price,
                    date } = unmarshall(item);
                return {

                    userId, firstname,
                    lastname,
                    phone,
                    email,
                    annotation,
                    total_tourist,
                    tour_name,
                    province,
                    price,
                    date
                };

            }

            );


            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
}
async function GetPayment(event) {
    if (event.httpMethod == "GET") {
        try {
            const params = {
                TableName: 'payment',
            };
            const data = await dynamo.send(new ScanCommand(params));
            const items = data.Items.map((item) => {
                const { paymentId, name, account_number, account_name, account_img } = unmarshall(item);
                return {

                    paymentId, name, account_number, account_name, account_img

                };
            }); return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
    else if (event.httpMethod == "PUT") {
        try {
            const {
                userId,
                bank,
                slip

            } = JSON.parse(event.body);

            const params = {
                TableName: 'myUser',
                Key: {
                    userId: { "N": String(userId) }
                },
                UpdateExpression: "set bank = :bank, slip = :slip",
                ExpressionAttributeValues: {
                    ":bank": { "S": bank },
                    ":slip": { "S": slip },
                },
                ReturnValues: "UPDATED_NEW"
            };
            await dynamo.send(new UpdateItemCommand(params));
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: (userId)
            };
        } catch (err) {
            return {

                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };

        }


    }
}

async function GetStatus(event) {
    if (event.httpMethod == "GET") {
        try {
            const userId = event.queryStringParameters.userId;
            const params = {
                TableName: 'myUser',
                KeyConditionExpression: 'userId = :userId',
                ExpressionAttributeValues: {
                    ':userId': { 'N': userId }
                }
            };
            const data = await dynamo.send(new QueryCommand(params));
            const items = data.Items.map((item) => {
                const { userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState, } = unmarshall(item);
                return {

                    userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState,
                };

            }

            );
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
}

async function GetCheckStatus(event) {
    if (event.httpMethod == "POST") {
        try {
            const {
                userId

            } = JSON.parse(event.body);


            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: (userId)
            };
        } catch (err) {
            return {

                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };

        }


    }

}

async function GetHome(event) {
    if (event.httpMethod == "GET") {
        try {
            const params = {
                TableName: 'myUser',
            };
            const data = await dynamo.send(new ScanCommand(params));
            const items = data.Items.map((item) => {
                const { userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState,
                    bank,
                    phone, email, tour_price
                } = unmarshall(item);
                return {

                    userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState,
                    bank,
                    phone, email, tour_price

                };
            }); return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
}
async function GetTourInfo(event) {
    if (event.httpMethod == "GET") {
        try {
            const params = {
                TableName: 'myTour',
            };
            const data = await dynamo.send(new ScanCommand(params));
            const items = data.Items.map((item) => {
                const { tourId, tour_name, img, detail_img, province, price, detail, schedule, max_tourist, date_first, date_second } = unmarshall(item);
                return {

                    tourId, tour_name, img, detail_img, province, price, detail, schedule, max_tourist, date_first, date_second

                };
            }); return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
}

async function GetAllTour(event) {
    if (event.httpMethod == "GET") {
        try {
            const params = {
                TableName: 'myTour',
            };
            const data = await dynamo.send(new ScanCommand(params));
            const items = data.Items.map((item) => {
                const { tourId, tour_name, img, detail_img, province, price, detail, schedule, max_tourist, date_first, date_second } = unmarshall(item);
                return {

                    tourId, tour_name, img, detail_img, province, price, detail, schedule, max_tourist, date_first, date_second

                };
            }); return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
}
async function GetMoney(event) {
    if (event.httpMethod == "GET") {
        try {
            const params = {
                TableName: 'myUser',
            };
            const data = await dynamo.send(new ScanCommand(params));
            const items = data.Items.map((item) => {
                const { userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState,
                    bank,
                    phone, email, tour_price
                } = unmarshall(item);
                return {

                    userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState,
                    bank,
                    phone, email, tour_price

                };
            }); return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
    else if (event.httpMethod == "PUT") {
        try {
            const userId = event.queryStringParameters.userId;


            const params = {
                TableName: 'myUser',
                Key: {
                    userId: { "N": String(userId) }
                },
                UpdateExpression: "set userState = :userState, userStatus= :userStatus",
                ExpressionAttributeValues: {
                    ":userState": { "S": "true" },
                    ":userStatus": { "S": "true" },
                },
                ReturnValues: "UPDATED_NEW"
            };
            await dynamo.send(new UpdateItemCommand(params));
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify({ error: err.message })
            };
        } catch (err) {
            return {

                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };

        }


    }
}
async function GetNotPass(event) {

    if (event.httpMethod == "PUT") {
        try {
            const userId = event.queryStringParameters.userId;


            const params = {
                TableName: 'myUser',
                Key: {
                    userId: { "N": String(userId) }
                },
                UpdateExpression: "set userState = :userState, userStatus= :userStatus",
                ExpressionAttributeValues: {
                    ":userState": { "S": "false" },
                    ":userStatus": { "S": "false" },
                },
                ReturnValues: "UPDATED_NEW"
            };
            await dynamo.send(new UpdateItemCommand(params));
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify({ error: err.message })
            };
        } catch (err) {
            return {

                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };

        }


    }
}
async function GetApprove(event) {
    if (event.httpMethod == "GET") {
        try {
            const params = {
                TableName: 'myUser',
            };
            const data = await dynamo.send(new ScanCommand(params));
            const items = data.Items.map((item) => {
                const { userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState,
                    bank,
                    phone, email, tour_price, slip
                } = unmarshall(item);
                return {

                    userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState,
                    bank,
                    phone, email, tour_price, slip

                };
            }); return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
}
async function GetReject(event) {
    if (event.httpMethod == "GET") {
        try {
            const params = {
                TableName: 'myUser',
            };
            const data = await dynamo.send(new ScanCommand(params));
            const items = data.Items.map((item) => {
                const { userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState,
                    bank,
                    phone, email, tour_price
                } = unmarshall(item);
                return {

                    userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState,
                    bank,
                    phone, email, tour_price

                };
            }); return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
}

async function GetInfo(event) {
    if (event.httpMethod == "GET") {
        try {
            const userId = event.queryStringParameters.userId;
            const params = {
                TableName: 'myUser',
                KeyConditionExpression: 'userId = :userId',
                ExpressionAttributeValues: {
                    ':userId': { 'N': userId }
                }
            };
            const data = await dynamo.send(new QueryCommand(params));
            const items = data.Items.map((item) => {
                const { userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState, } = unmarshall(item);
                return {

                    userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState,
                };

            }

            );
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
}


async function GetTourDetail(event) {
    if (event.httpMethod == "GET") {
        try {
            const tour_name = event.queryStringParameters.tour_name;
            const params = {
                TableName: 'myUser',
                FilterExpression: 'tour_name = :tour_name',
                ExpressionAttributeValues: {
                    ':tour_name': { S: tour_name },
                },
            };
            const data = await dynamo.send(new ScanCommand(params));
            const items = data.Items.map((item) => {
                const { userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState, email, phone } = unmarshall(item);
                return {
                    userId,
                    firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState,
                    email, phone
                };

            }

            );
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
}

async function CreateTour(event) {
    if (event.httpMethod == "POST") {
        try {
            const {
                tour_name, img, detail_img, province, price, detail, schedule, max_tourist, date_first, date_second

            } = JSON.parse(event.body);
            const paramsgetid = {
                TableName: 'myTour'
            };
            const data = await dynamo.send(new ScanCommand(paramsgetid));//ไปเอาข้อมูลมา
            const items = data.Items.map((item) => {
                const { tourId } = unmarshall(item);
                return {
                    tourId,

                };
            });
            const id = Math.max(...items.map(item => (item.tourId))) + 1;

            const params = {
                TableName: 'myTour',
                Item: {
                    tourId: { "N": String(id) },
                    tour_name: { "S": tour_name },
                    img: { "S": img },
                    detail_img: { "S": detail_img },
                    province: { "S": province },
                    detail: { "S": detail },
                    schedule: { "S": schedule },
                    price: { "N": String(price) },
                    max_tourist: { "N": String(max_tourist) },
                    date_first: { "S": date_first },
                    date_second: { "S": date_second },
                }
            };
            await dynamo.send(new PutItemCommand(params));
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: (id)
            };
        } catch (err) {
            return {

                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };

        }


    }

}
async function UpdateTour(event) {
    if (event.httpMethod == "GET") {
        try {
            const tourId = event.queryStringParameters.tourId;
            const params = {
                TableName: 'myTour',
                KeyConditionExpression: 'tourId = :tourId',
                ExpressionAttributeValues: {
                    ':tourId': { 'N': tourId }
                }
            };
            const data = await dynamo.send(new QueryCommand(params));
            const items = data.Items.map((item) => {
                const { tourId, tour_name, img, detail_img, province, price, detail, schedule, max_tourist, date_first, date_second } = unmarshall(item);
                return {

                    tourId, tour_name, img, detail_img, province, price, detail, schedule, max_tourist, date_first, date_second
                };

            }

            );
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
    else if (event.httpMethod == "PUT") {
        try {
            const {
                tourId, tour_name, img, detail_img, province, price, detail, schedule, max_tourist, date_first, date_second

            } = JSON.parse(event.body);

            const params = {
                TableName: 'myTour',
                Key: {
                    tourId: { "N": String(tourId) }
                },
                UpdateExpression: "set tour_name = :tour_name, img = :img, detail_img = :detail_img, province = :province, price = :price, detail = :detail, schedule = :schedule, max_tourist = :max_tourist, date_first = :date_first, date_second = :date_second",
                ExpressionAttributeValues: {
                    ":tour_name": { "S": tour_name },
                    ":img": { "S": img },
                    ":detail_img": { "S": detail_img },
                    ":province": { "S": province },
                    ":price": { "N": String(price) },
                    ":detail": { "S": detail },
                    ":schedule": { "S": schedule },
                    ":max_tourist": { "N": String(max_tourist) },
                    ":date_first": { "S": date_first },
                    ":date_second": { "S": date_second },
                },
                ReturnValues: "UPDATED_NEW"
            };
            await dynamo.send(new UpdateItemCommand(params));
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: (tourId)
            };
        } catch (err) {
            return {

                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };

        }


    }
}


async function DeleteTour(event) {

    if (event.httpMethod == "DELETE") {
        try {
            const tourId = event.queryStringParameters.tourId;

            const params = {
                TableName: 'myTour',
                Key: {
                    tourId: { "N": String(tourId) }
                },
            };
            await dynamo.send(new DeleteItemCommand(params));
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: (tourId)
            };
        } catch (err) {
            return {

                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };

        }


    }
}

async function GetSlip(event) {
    if (event.httpMethod == "GET") {
        try {
            const userId = event.queryStringParameters.userId;
            const params = {
                TableName: 'myUser',
                KeyConditionExpression: 'userId = :userId',
                ExpressionAttributeValues: {
                    ':userId': { 'N': userId }
                }
            };
            const data = await dynamo.send(new QueryCommand(params));
            const items = data.Items.map((item) => {
                const { userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState, slip } = unmarshall(item);
                return {

                    userId, firstname,
                    lastname,
                    total_tourist,
                    tour_name,
                    province,
                    date,
                    userStatus,
                    userState, slip
                };

            }

            );
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(items)
            };
        } catch (err) {
            return {
                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };
        }
    }
}


async function Login(event) {
    if (event.httpMethod == "POST") {
        try {
            const {
                username,
                password

            } = JSON.parse(event.body);
            const TABLE_NAME = 'admin';
            const params = {
                TableName: TABLE_NAME,
                FilterExpression: 'username = :username',
                ExpressionAttributeValues: {
                    ':username': { 'S': username },
                },
            };
            const data = await dynamo.send(new ScanCommand(params));
            const users = data.Items.map((item) => unmarshall(item))
            const user = users.find((u) => u.password === password);
            if (user) {
                return {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'
                    },
                    body: ('Pass')
                };
            } else {
                return {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json'

                    },
                    body: ('invalid'),
                };
            }
        }
        catch (err) {
            return {

                statusCode: 500,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ error: err.message })
            };

        }
    }



}