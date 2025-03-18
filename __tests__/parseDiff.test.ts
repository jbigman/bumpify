/**
 * Unit tests for src/parseDiff.ts
 */
import { parseDiff } from '../src/parseDiff.js'

describe('parseDiff.ts', () => {
  it('Test with a valid diff', async () => {
    const input = `diff --git a/package.json b/package.json
index 78e4311..c9e63ff 100644
--- a/package.json
+++ b/package.json
@@ -3 +3,2 @@
-    "axios": "^1.8.0"
+    "axios": "^1.8.3",
+    "npm-check-updates": "^17.1.15"
@@ -8 +9 @@
-}
+}`

    const { DIFF, LIBS } = parseDiff(input)
    expect(DIFF).toBe(`axios:  "^1.8.0" =>  "^1.8.3",`)
    expect(LIBS).toBe('axios')
  })

  it('Test with empty diff', async () => {
    const { DIFF, LIBS } = parseDiff('')
    expect(DIFF).toBe('')
    expect(LIBS).toBe('')
  })
})
