# Overview

WIP Do not reply on this!

Since the API doc will mostly be used in web environments it's written in JSON as that it's easily parsable by web tools. 

Here is a basic example doc:
```JSON
{
    "name": "My API",
    "defaults": {
        "responses": {
            "OK": {
                "code": 200,
                "template": "ok",
                "type": "text"
            },
            "ERR": {
                "code": 500,
                "message": "Internal Server Error",
                "type": "json",
                "template": {
                    "code": "SERVER_ERR"
                }
            }
        }
    },
    "routes": {

    }
}
```

# Syntax

## Routes

All routes should start with a slash `/` and end with a letter or number unless it is the root route. 

 * `/` - Valid
 * `/route` - Valid
 * `route` - Invalid
 * `/route/` - Invalid
 * `route/` - Invalid

# Headers

The "headers" are the initial properties at the top level of the JSON document. These correspond to global doc-wide settings and properties.

Example 
```JSON
{
    "header1": "...",
    "header2": "..."
}
```

Here is the minimal required headers for an API doc:
```JSON
{
    "name": "My new API doc",
    "routes": { ... }
}
```

## name

The name of the API, used for documentation and debugging purposes.

 * Required

## version

Used for documentation and client-server sync checks. 

 * Default: `1`

## root

The root of all API routes, e.g with a root of `/api` and a route for `/test` the route will have the root prepended `/api/test`

 * Default: `/api`

## routes

All the routes for the API, covered in depth below.

 * Required

## defaults

Sets defaults for all routes, covered in depth below.

### responses 

The pre-defined responses that apply to all routes. These define the allowed responses from the server.
