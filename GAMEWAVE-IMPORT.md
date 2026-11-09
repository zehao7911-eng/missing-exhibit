# GameWave import

Upload the game ZIP with `index.html` at the root. GameWave may inject `window.neonlib`. The title starts independently in a normal browser and waits for an explicit **Start case** or **Resume case** to start a round.

- The round is a three-exhibit gallery. The third recovery ends it, as does abandoning an active gallery for a different one. Opening the map, toggling audio, inspecting results, and beginning a new sub-round do not start or end another host round.
- The local key is `missing-exhibit-v1`. Only this game's normalized profile is sent in the `missing-exhibit` envelope. Best medals and confirmed coat flags merge monotonically. A cloud checkpoint can populate a fresh local visit before interaction. A current local checkpoint wins over a different cloud checkpoint. Existing unknown cloud data is left alone.
- Confirmed positive likes unlock the amber coat. Confirmed direct comments, including image-only comments, unlock the silver coat. Both are optional and can be equipped through the gallery map. Duplicate and unlike callbacks do not earn rewards again. If an interaction cannot register, its prompt is hidden.
- A saved case resumes at the same exhibit with a fresh preview and its prior first-guess eligibility. The next actual start is what notifies the SDK.

See the [GameWave SDK documentation](https://rg975ojk5z.feishu.cn/wiki/MQg7wMknzieOkukxyWVc4UB0nDh) for supported host versions and callbacks. Actual app-host import and callback verification require a supported GameWave app.
