Starting benchmark listeners.js

```
EventEmitter1 x 3,132,029 ops/sec ±1.03% (78 runs sampled)
EventEmitter3@0.1.6 x 3,594,305 ops/sec ±3.49% (79 runs sampled)
EventEmitter3(master) x 3,559,838 ops/sec ±2.01% (77 runs sampled)
fastemitter x 1,303,240 ops/sec ±1.92% (81 runs sampled)
built-in x 3,343,900 ops/sec ±1.41% (82 runs sampled)
Fastest is [ 'EventEmitter3(master)' ]
```

Starting benchmark init.js

```
EventEmitter1 x 2,993,544 ops/sec ±2.28% (82 runs sampled)
EventEmitter2 x 7,688,839 ops/sec ±3.31% (74 runs sampled)
EventEmitter3@0.1.6 x 11,344,055 ops/sec ±1.72% (81 runs sampled)
EventEmitter3(master) x 11,320,446 ops/sec ±1.91% (80 runs sampled)
Drip x 13,569,286 ops/sec ±3.30% (74 runs sampled)
fastemitter x 4,191,335 ops/sec ±1.68% (84 runs sampled)
event-emitter x 8,288,483 ops/sec ±2.45% (80 runs sampled)
contra/emitter x 1,035,166 ops/sec ±4.52% (77 runs sampled)
built-in x 3,194,684 ops/sec ±1.77% (83 runs sampled)
Fastest is [ 'Drip' ]
```

Starting benchmark remove-emit.js

```
EventEmitter1 x 2,778,895 ops/sec ±0.93% (76 runs sampled)
EventEmitter2 x 1,331,104 ops/sec ±0.53% (79 runs sampled)
EventEmitter3@0.1.6 x 1,542,964 ops/sec ±0.68% (82 runs sampled)
EventEmitter3(master) x 1,551,339 ops/sec ±0.67% (87 runs sampled)
Drip x 3,189,107 ops/sec ±1.12% (80 runs sampled)
event-emitter x 1,676,414 ops/sec ±0.67% (84 runs sampled)
contra/emitter x 307,804 ops/sec ±1.62% (84 runs sampled)
built-in x 2,863,615 ops/sec ±0.76% (82 runs sampled)
Fastest is [ 'Drip' ]
```

Starting benchmark emit-multiple-listeners.js

```
EventEmitter1 x 869,056 ops/sec ±0.68% (83 runs sampled)
EventEmitter2 x 885,043 ops/sec ±0.90% (85 runs sampled)
EventEmitter3@0.1.6 x 1,542,805 ops/sec ±0.43% (86 runs sampled)
EventEmitter3(master) x 1,536,591 ops/sec ±0.47% (82 runs sampled)
fastemitter x 1,228,880 ops/sec ±0.82% (83 runs sampled)
event-emitter x 637,766 ops/sec ±0.61% (85 runs sampled)
contra/emitter x 288,261 ops/sec ±1.64% (80 runs sampled)
built-in x 2,155,386 ops/sec ±1.48% (83 runs sampled)
Fastest is [ 'built-in' ]
```

Starting benchmark context.js

```
EventEmitter1 x 3,154,673 ops/sec ±0.85% (85 runs sampled)
EventEmitter2 x 2,759,029 ops/sec ±1.23% (80 runs sampled)
EventEmitter3@0.1.6 x 3,525,406 ops/sec ±0.77% (85 runs sampled)
EventEmitter3(master) x 3,499,803 ops/sec ±1.09% (81 runs sampled)
Drip x 3,011,227 ops/sec ±1.05% (84 runs sampled)
fastemitter x 2,436,982 ops/sec ±1.03% (82 runs sampled)
event-emitter x 1,594,650 ops/sec ±0.91% (84 runs sampled)
contra/emitter x 310,121 ops/sec ±2.22% (77 runs sampled)
built-in x 2,557,280 ops/sec ±0.50% (85 runs sampled)
Fastest is [ 'EventEmitter3@0.1.6', 'EventEmitter3(master)' ]
```

Starting benchmark once.js

```
EventEmitter1 x 1,408,852 ops/sec ±0.67% (82 runs sampled)
EventEmitter2 x 1,172,064 ops/sec ±0.61% (83 runs sampled)
EventEmitter3@0.1.6 x 4,594,789 ops/sec ±2.39% (81 runs sampled)
EventEmitter3(master) x 5,702,689 ops/sec ±1.86% (80 runs sampled)
Drip x 4,692,584 ops/sec ±3.00% (83 runs sampled)
fastemitter x 3,043,717 ops/sec ±2.12% (77 runs sampled)
event-emitter x 1,060,044 ops/sec ±1.28% (85 runs sampled)
contra/emitter x 962,282 ops/sec ±2.10% (80 runs sampled)
built-in x 1,358,811 ops/sec ±1.49% (84 runs sampled)
Fastest is [ 'EventEmitter3(master)' ]
```

Starting benchmark hundreds.js

```
EventEmitter1 x 98,220 ops/sec ±0.60% (82 runs sampled)
EventEmitter2 x 79,297 ops/sec ±0.79% (85 runs sampled)
EventEmitter3@0.1.6 x 111,006 ops/sec ±0.92% (83 runs sampled)
EventEmitter3(master) x 112,743 ops/sec ±0.90% (86 runs sampled)
Drip x 132,951 ops/sec ±1.16% (81 runs sampled)
fastemitter x 147,986 ops/sec ±0.80% (84 runs sampled)
event-emitter x 89,261 ops/sec ±0.47% (83 runs sampled)
contra/emitter x 53,038 ops/sec ±1.87% (82 runs sampled)
built-in x 96,975 ops/sec ±0.47% (85 runs sampled)
Fastest is [ 'fastemitter' ]
```

Starting benchmark emit.js

```
EventEmitter1 x 2,749,776 ops/sec ±0.76% (84 runs sampled)
EventEmitter2 x 3,012,044 ops/sec ±1.14% (80 runs sampled)
EventEmitter3@0.1.6 x 3,480,369 ops/sec ±0.85% (84 runs sampled)
EventEmitter3(master) x 3,483,700 ops/sec ±0.92% (82 runs sampled)
Drip x 3,253,732 ops/sec ±1.49% (83 runs sampled)
fastemitter x 2,649,634 ops/sec ±0.92% (84 runs sampled)
event-emitter x 1,610,183 ops/sec ±0.89% (81 runs sampled)
contra/emitter x 326,713 ops/sec ±3.03% (80 runs sampled)
built-in x 2,892,279 ops/sec ±0.93% (81 runs sampled)
Fastest is [ 'EventEmitter3(master)', 'EventEmitter3@0.1.6' ]
```

Starting benchmark add-remove.js

```
EventEmitter1 x 2,065,224 ops/sec ±0.92% (81 runs sampled)
EventEmitter2 x 1,603,893 ops/sec ±3.55% (84 runs sampled)
EventEmitter3@0.1.6 x 9,166,973 ops/sec ±2.90% (78 runs sampled)
EventEmitter3(master) x 9,273,548 ops/sec ±2.07% (78 runs sampled)
Drip x 16,920,514 ops/sec ±3.95% (73 runs sampled)
fastemitter x 7,399,795 ops/sec ±1.88% (78 runs sampled)
event-emitter x 1,724,167 ops/sec ±1.19% (83 runs sampled)
contra/emitter x 3,083,190 ops/sec ±1.54% (86 runs sampled)
built-in x 1,928,597 ops/sec ±1.64% (83 runs sampled)
Fastest is [ 'Drip' ]
```
