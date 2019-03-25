![](assets/intro-banner.png)

`curlx` is a simple command line HTTP client that keeps track of request history, helps you organize your requests into collections, run and test frequent calls faster and more. 

### Getting Started
Install curlx
```
npm install curlx -g
```
Make sure to have nodejs version 8.0 or above.


### Available options
**Help**
```
cx help
```
Displays help menu with a list of available options

**History**
```
cx history
```
Displays list of recent requests made with cx


**Collections**
```
cx collections
```
Displays an iterable list of created collections. Collections are a group of requests.

**New**
```
cx new collection
```
Walks you through a prompt for creating a new collection. 

```
cx new request
```
Walks you through saving a new request to an existing collection. If the collection does not exist already, create using `cx new collection` command

**Delete**
```
cx delete <id>
```
Deletes request with `<id>` present in history


### Make requests
Use `cx` or `curlx` just like how you would use cURL.

Here's a simple GET call:
![](assets/Request.png)



### Get history
Every request you make is logged with a unique id for quickly executing it in future. You can iterate faster without having to type in the entire request again.

<h4>Get recent history</h4>
```
cx history
```
<h4>Run a particular request present in history</h4>
```
cx run {request_id}
```