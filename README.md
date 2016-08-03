# Charon

##Overview

Charon is a Middleware that provide a openstack services by http requests

##Initial configuration

Edit the file init.json with parameters:

```json
{
    "provider": "openstack",
    "keystoneAuthVersion": "my_version",
    "username": "my_username",
    "password": "my_password",
    "region": "RegionOne",
    "authUrl": "my_auth_url"
}

```

##End Poinsts

###General info

GET  `/api/openstack/version`

GET  `/api/openstack/limits`

###Flavors

GET  `/api/openstack/flavors`

GET  `/api/openstack/flavors/:id`

###image

GET `/api/openstack/images`

POST `/api/openstack/images`

GET `/api/openstack/images/:id`

DELETE (`/api/openstack/images/:id`

###Instances

GET `/api/openstack/servers`

POST `/api/openstack/servers`

GET `/api/openstack/servers/:id`

PUT `/api/openstack/servers/:id`


### Volumes

GET `/api/openstack/volumes/types`

GET `/api/openstack/volumes/types/:id`


GET `/api/openstack/volumes`

POST `/api/openstack/volumes`

PUT `/api/openstack/volumes`

GET `/api/openstack/volumes/:id`

DELETE `/api/openstack/volumes/:id`


GET `/api/openstack/volumes/snapshots`

GET `/api/openstack/volumes/snapshots/:id`

POST `/api/openstack/volumes/snapshots`

### Instances Volume Attach

GET `/api/openstack/servers/volumes/:id`

POST `/api/openstack/servers/volumes/attach`

POST `/api/openstack/servers/volumes/detach`

### Network

GET `/api/openstack/networks`
