![](assets/intro-banner.png)

`curlx` is a simple command line HTTP client that keeps track of request history, helps you organize your requests into collections, run and test frequent calls faster and more. 

### Getting Started
Install curlx
```
npm install curlx -g
```
Make sure to have nodejs version 8.0 or above.

### Make Requests
Use `cx` or `curlx` just like how you would use cURL.

Here's a simple GET call:
```
$ cx -X GET "https://httpbin.org/get"
> HTTP/1.1 200 OK
> Access-Control-Allow-Credentials: true
> Access-Control-Allow-Origin: *
> Content-Type: application/json
> Date: Mon, 25 Mar 2019 06:02:02 GMT
> Server: nginx
> Content-Length: 202
> Connection: keep-alive

**{
  "args": {},
  "headers": {
    "Accept": "*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0"
  },
  "origin": "73.222.138.87, 73.222.138.87",
  "url": "https://httpbin.org/get"
}**

```

### History
Every request you make is logged with a unique id for quickly executing it in future. You can iterate faster without having to type in the entire request again.

`cx history` displays your recent calls timestamped with status.

`cx run {request_id}` will run that particular request again for you.