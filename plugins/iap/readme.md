# IAP

Example

```javascript
// We must wait for the "deviceready" event to fire
// before we can use the store object.

// 1. Create iap instance
var iap = InitIAP();

// 2. Register events
iap.on('registered', funtion(p){
    // p.id
})
iap.on('updated', function(p){
    // p.id, p.title, p.priceMicros, p.currency
})

// 3. Register products
iap.register([
    { id: 'gems.lv1.cp', type: 'CONSUMABLE' },
    { id: 'gems.lv2.cp', type: 'CONSUMABLE' },
    { id: 'gems.lv3.cp', type: 'CONSUMABLE' },
    { id: 'removeads.cp', type: 'NON_CONSUMABLE' },
]);

// 4. Refresh
iap.refresh();
```