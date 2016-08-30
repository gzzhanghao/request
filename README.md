# request

A simple wrapper for http.IncomingMessage

## Usage

```javascript
import Request from '@gzzhanghao/request'

const request = new Request(incomingMessage)
```

You can read/write properties from/to the request object. It will automatically update relevant values.

e.g.

```javascript
request.query = { update: 'query' }

// request.search === '?update=query'
// request.path === 'pathname?update=query'

request.search = '?search'

// request.query === { search: '' }
// request.path === 'pathname?search'
```

Currently we supports following properties (where `msg` reference to the http.IncomingMessage passed to the constructor):

Property | Value                          | Bound
---------|--------------------------------|-------
raw      | msg                            | No
body     | msg                            | No
method   | msg.method                     | Yes
protocol | msg.protocol                   | Yes
host     | hostname + port                | No
hostname | msg.headers.host.split(':')[0] | No
port     | msg.headers.host.split(':')[1] | No
url      | url_parse(path)                | Yes
path     | pathname + search + query      | Yes
pathname | url.pathname                   | Yes
search   | url.search                     | Yes
query    | url.query                      | Yes
hash     | url.hash                       | Yes
href     | url_format(this)               | Yes
headers  | msg.headers                    | Yes
auth     | msg.auth                       | Yes

Note that we only read `hostname` and `port` once. Setting `req.host` won't update the value of `msg.headers.host`, so we can have different values for `msg.headers.host` and `req.host`.
