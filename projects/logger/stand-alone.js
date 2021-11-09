import InitLog from '../../plugins/logger/InitLog.js';

InitLog({
    width: '300px', height: '300px',
    backgroundColor: 'Navy'
})

log('stand-alone')
for (var i = 0; i < 1000; i++) {
    log(i)
}