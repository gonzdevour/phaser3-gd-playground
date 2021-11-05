# IAP

Example

```javascript
// We must wait for the "deviceready" event to fire
// before we can use the store object.
var iap = InitIAP([
    { id: 'gems.lv1.cp', type: 'CONSUMABLE' },
    { id: 'gems.lv2.cp', type: 'CONSUMABLE' },
    { id: 'gems.lv3.cp', type: 'CONSUMABLE' },
    { id: 'removeads.cp', type: 'NON_CONSUMABLE' },
])

iap.on('registered', funtion(p){
    // p.id
})
iap.on('updated', function(p){
    // p.id, p.title, p.priceMicros, p.currency
})
```