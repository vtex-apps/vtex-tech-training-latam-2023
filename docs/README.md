# Orders Feed Example

A boilerplate app implementing an event handler receiving status updates from OMS Feed.
This is the method for using [Feed v3 Hook](https://developers.vtex.com/reference/feed-v3) inside VTEX IO.

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
    "allStates": {
      "sender": "vtex.orders-broadcast",
      "topics": ["order-status-updated"]
    },
    "someStates": {
      "sender": "vtex.orders-broadcast",
      "topics": ["cancel", "order-created"]
    }
  }
}
```

You have two ways of consuming changes in status:

1. Receive all events subscribing to the `order-status-updated` topic, as the `allStates` handler does
2. Receive a selection of status changes where the `currentState` equals the `topic`, as the `someStates` handler does. This option is the preferred one, when you know ahead of time, what types of events, you want to listen to.

Normally `vtex.orders-broadcast` sends events only in `master` workspace. If you want to use it in a developer workspace, do the following:

1. Create your development workspace by running `vtex use {workspaceName}`
2. Go to `https://{accountName}.myvtex.com/admin/apps/vtex.orders-broadcast/setup`
3. Change the `Target Workspace` variable to the name of the workspace you have created previously.
4. Now you can link this app (`vtex.orders-feed-example`) in your desired workspace and receive order status updates.

Here is an example body that you can expect to receive:

```json
{
  "recorder": {
    "_record": {
      "x-vtex-meta": {},
      "x-vtex-meta-bucket": {}
    }
  },
  "domain": "Marketplace",
  "orderId": "v69305315atmc-01",
  "currentState": "invoice",
  "lastState": "payment-approved",
  "currentChangeDate": "2020-07-13T20:25:13.2304508Z",
  "lastChangeDate": "2020-07-13T20:25:03.9527532Z"
}
```

If you want to understand further how Feed v3 works, check out [this documentation](https://help.vtex.com/tutorial/orders-management-feed-v3-setup--5qDml3cQypWDRTgw69s4C1).
