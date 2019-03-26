![](assets/intro-banner.png)

`curlx` is a simple command line HTTP client that keeps track of request history, helps you organize your requests into collections, run and test frequent calls faster and more. 

![](assets/small-clear.png)

### Getting Started
Install curlx
```
npm install curlx -g
```
Make sure to have nodejs version 8.0 or above.

![](assets/small-clear.png)

### Available options
![](assets/tiny-clear.png)
**Help**
```
cx help
```
Displays help menu with a list of available options

![](assets/tiny-clear.png)
**History**
```
cx history
```
Displays list of recent requests made with cx

![](assets/tiny-clear.png)
**Collections**

```
cx collections
```
Displays an iterable list of created collections. Collections are a group of requests.

![](assets/tiny-clear.png)
**New**
```
cx new collection
```
Walks you through a prompt for creating a new collection. 
```
cx new request
```
Walks you through saving a new request to an existing collection. If the collection does not exist already, create using `cx new collection` command

![](assets/tiny-clear.png)
**Delete**
```
cx delete <id>
```
Deletes request with `request_id` present in history
```
cx delete <collection_name:request_id>
```
Deletes a request with `request_id` in collection `collection_name`
```
cx delete <collection_name> --collection
```
Deletes the collection and all its requests

![](assets/tiny-clear.png)
**Run**
```
cx run <request_id>
```
Runs the request with id `request_id` present in history again

```
cx run <collection_name:request_id>
```
Runs the request with id `request_id` present inside collection `collection_name`


![](assets/small-clear.png)

### Make requests
Use `cx` or `curlx` just like how you would use cURL.

Here's a simple GET call:
```
$ cx -X GET "https://httpbin.org/get"

HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Content-Type: application/json
Date: Mon, 25 Mar 2019 06:02:02 GMT
Server: nginx
Content-Length: 202
Connection: keep-alive

{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "origin": "73.222.138.87, 73.222.138.87",
  "url": "https://httpbin.org/get"
}
```

![](assets/small-clear.png)

### Sharing

All your collections and history are stored locally in your machine. Navigate to `cxdb` in your root folder.
Example: 
```
$ cd ~/cxdb

$ ls
collections.json history.json

$ cat collections.json
{
  "collections": {
    "Test": [
      {
        "id": "ANRfSkWYU",
        "name": "Post test call",
        "method": "post",
        "command": "curl -i \"-X\" \"POST\" \"https://httpbin.org/post\"",
        "url": "https://httpbin.org/post"
      }
    ],
    "mycoolapp": [
      {
        "id": "KvUx9H9t6",
        "name": "users",
        "method": "get",
        "command": "curl -i 'http://localhost:3000/api/users',
        "url": "http://localhost:3000/api/users"
      }
    ]
  }
}
```
In this example, There are two collections `Test` and `mycoolapp` with 1 request each. To run, say, the `users` request in `mycoolapp`, 
```
$ cx run mycoolapp:KvUx9H9t6

HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
Content-Type: application/json
Date: Mon, 25 Mar 2019 06:02:02 GMT
Server: nginx
Content-Length: 202
Connection: keep-alive

[{
  "userId": 1,
  "id": 1,
  "name": "Richard Hendricks",
  "company": "Pied Piper"
}, {
  "userId": 2,
  "id": 2,
  "name": "Gavin Belson",
  "company": "Hooli"
}]
```

Since since are just json files, you can easily share these with another user. Simple add the collections to an existing collection and they will be available via the CLI.