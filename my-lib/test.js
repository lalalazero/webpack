const { log, flush } = require(".")

log('测试内容1111', 'compiler.txt')
log('测试内容2222', 'compiler.txt')
log('测试内容1111', 'compilation.txt')
log('测试内容2222', 'compilation.txt')
log(`111 Error
    at Object.get (E:\webpack-4.0.0-alpha.0\webpack-4.0.0-alpha.0\lib\Compiler.js:212:5)
    at Array.<anonymous> (E:\webpack-4.0.0-alpha.0\webpack-4.0.0-alpha.0\node_modules\tapable\lib\Tapable.js:24:21)
    at SyncBailHook.eval [as call] (eval at compile (E:\webpack-4.0.0-alpha.0\webpack-4.0.0-alpha.0\node_modules\tapable\lib\Hook.js:21:10), <anonymous>:7:32)
    at Compiler.plugin (E:\webpack-4.0.0-alpha.0\webpack-4.0.0-alpha.0\node_modules\tapable\lib\Tapable.js:57:36)
    at Compiler.deprecated [as plugin] (node:internal/util:176:12)
    at SingleEntryPlugin.apply (E:\webpack-4.0.0-alpha.0\webpack-4.0.0-alpha.0\lib\SingleEntryPlugin.js:16:12)
    at Compiler.apply (E:\webpack-4.0.0-alpha.0\webpack-4.0.0-alpha.0\node_modules\tapable\lib\Tapable.js:71:16)
    at Compiler.deprecated [as apply] (node:internal/util:176:12)
    at SyncBailHook._x (E:\webpack-4.0.0-alpha.0\webpack-4.0.0-alpha.0\lib\EntryOptionPlugin.js:22:14)
    at SyncBailHook.eval [as call] (eval at compile (E:\webpack-4.0.0-alpha.0\webpack-4.0.0-alpha.0\node_modules\tapable\lib\Hook.js:21:10), <anonymous>:4:18)
`, 'error-log.txt', true)

flush()




