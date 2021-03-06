# Charon

## Overview

Charon is a Middleware that provide a openstack services by http requests

## Initial configuration

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

## End Poinsts

### General info

GET `/api/openstack/version`

GET `/api/openstack/limits`

### SSH keys

GET `/api/openstack/keys`

POST `/api/openstack/keys`

```json
{
    "name": "name",
    "public_key": "ssh.public_key"
}
```

### Groups

GET `/api/openstack/groups`

POST `/api/openstack/groups`

```json
{
  "name": "name",
  "description": "description"
}
```

POST `/api/openstack/groups/rules`

```json
{
  "groupId": "group.id",
  "ipProtocol": "TCP",
  "fromPort": 80,
  "toPort": 80

}
```

### Flavors

GET `/api/openstack/flavors`

GET `/api/openstack/flavors/:id`

### image

GET `/api/openstack/images`

POST `/api/openstack/images`

```json
{
    "name": "name",
    "server": "server"
}
```

GET `/api/openstack/images/:id`

DELETE (`/api/openstack/images/:id`

### Instances

GET `/api/openstack/clean/servers`

GET `/api/openstack/servers`

POST `/api/openstack/servers`

```json
{
    "name": "name",
    "flavor": "flavor",
    "image": "image"
}
```

GET `/api/openstack/servers/:id`

PUT `/api/openstack/servers/:id`

DELETE `/api/openstack/servers/:id`

GET `/api/openstack/server/stop/:id`

GET `/api/openstack/server/start/:id`    

### Volumes and types

GET `/api/openstack/types`

GET `/api/openstack/types/:id`

GET `/api/openstack/volumes`

POST `/api/openstack/volumes`

```json
{
    "name": "name",
    "description": "description",
    "size": "size",
    "volumeType" : "volumeType",
    "snapshotId": "snapshotId"
}
```

PUT `/api/openstack/volumes`

GET `/api/openstack/volumes/:id`

DELETE `/api/openstack/volumes/:id`

#### Snapshots from Volumes

GET `/api/openstack/snapshots`

GET `/api/openstack/snapshots/:id`

POST `/api/openstack/snapshots`

### Instances Volume Attach

GET `/api/openstack/attachments`

POST `/api/openstack/attach`

```json
{
  "server":"server",
  "volume":"volume"
}
```

POST `/api/openstack/detach`

```json
{
  "server":"server",
  "volume":"volume"
}
```

### Network

GET `/api/openstack/networks`

GET `/api/openstack/networks/:id`

DELETE `/api/openstack/networks/:id`

POST `/api/openstack/networks`

PUT `/api/openstack/networks`

####Floating IPS

GET `/api/openstack/ips`

POST `/api/openstack/ips`

POST `/api/openstack/allocate`

```json
  {
    "server":"server"
  }
```

#### Subnets

GET `/api/openstack/subnets`

GET `/api/openstack/subnets/:id`

POST `/api/openstack/subnets`

PUT `/api/openstack/subnets`

DELETE `/api/openstack/subnets/:id`

#### Ports

GET `/api/openstack/ports`

GET `/api/openstack/ports/:id`

POST `/api/openstack/ports`

PUT `/api/openstack/ports`

DELETE `/api/openstack/ports/:id`

### IoT

POST `/api/openstack/iot`

```json
{
    "name": "name",
    "flavor": "flavor",
    "image": "image"
}
```
