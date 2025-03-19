/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * To mock dependencies in ESM, you can create fixtures that export mock
 * functions and objects. For example, the core module is mocked in this test,
 * so that the actual '@actions/core' module is not imported.
 */
import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'
import { parseDiff } from '../__fixtures__/parseDiff.js'

// Mocks should be declared before the module being tested is imported.
jest.unstable_mockModule('@actions/core', () => core)
jest.unstable_mockModule('../src/parseDiff.js', () => ({ parseDiff }))

// The module being tested should be imported dynamically. This ensures that the
// mocks are used in place of any actual dependencies.
const { run } = await import('../src/main.js')

describe('main.ts', () => {
  beforeEach(() => {
    // Set the action's inputs as return values from core.getInput().
    process.env.GIT_DIFF = `diff --git a/package.json b/package.json
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

    // Mock the wait function so that it does not actually wait.
    parseDiff.mockImplementation(() => {
      return {
        DIFF: `    "axios:  "^1.8.0" =>  "^1.8.3",`,
        LIBS: `    "axios`
      }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Sets the PR number output', async () => {
    await run()

    // Verify the time output was set.
    expect(core.setOutput).toHaveBeenCalledTimes(2)
    expect(core.setOutput).toHaveBeenCalledWith(
      'DIFF',
      '    "axios:  "^1.8.0" =>  "^1.8.3",'
    )

    expect(core.setOutput).toHaveBeenCalledWith('LIBS', '    "axios')
  })
  it('Check that it fails if git diff is empty', async () => {
    process.env.GIT_DIFF = ''
    await run()

    expect(core.setFailed).toHaveBeenNthCalledWith(1, 'GIT_DIFF is empty')
  })
})
