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
Deletes request with `<id>` present in history

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

### Get history
Every request you make is logged with a unique id for quickly executing it in future. You can iterate faster without having to type in the entire request again.

![](assets/tiny-clear.png)
**Get recent history**
```
cx history
```

![](assets/tiny-clear.png)
**Run a particular request present in history**
```
cx run {request_id}
```