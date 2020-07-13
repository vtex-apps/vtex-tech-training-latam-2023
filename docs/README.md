# Orders Feed Example

A boilerplate app implementing an event handler receiving status updates from OMS Feed.
This is the method for using Feed v3 Hook inside VTEX IO.

## How to Use

This app handles events sent by the app `vtex.orders-broadcast`, as you can see by looking at `node/service.json`.

```json
{
  "memory": 256,
  "ttl": 10,
  "timeout": 2,
  "minReplicas": 2,
  "maxReplicas": 4,
  "workers": 1,
  "events": {
    "omsFeed": {
      "sender": "vtex.orders-broadcast",
      "topics": ["order-status-updated"]
    }
  }
}
```

Normally `vtex.orders-broadcast` sends events only in `master` workspace. If you want to use it in a developer workspace, you have to do the following:

1. Create your development workspace by running `vtex use {workspaceName}`
2. Go to `https://{accountName}.myvtex.com/admin/apps/vtex.orders-broadcast/setup`
3. Change the `Target Workspace` variable to the name of the workspace you have created previously.
4. Now you can link this app (`vtex.orders-feed-example`) in your desired workspace and receive order status updates.
