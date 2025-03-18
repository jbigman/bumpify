import * as core from '@actions/core'
import { parseDiff } from './parseDiff.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // const token: string = core.getInput("token");
    // const nodeCheckerUpdaterOptions: string = core.getInput("ncu-options");

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    // core.debug(`Waiting ${ms} milliseconds ...`);

    const diff: string = core.getInput('git-diff')
    console.log(`MAIN=${diff}`)
    // const rawResult = execSync("git diff --unified=0 package.json").toString();
    // console.log(`rawResult=${rawResult}`);
    const { DIFF, LIBS } = parseDiff(diff)
    console.log(`DIFF=${DIFF}`)
    console.log(`LIBS=${LIBS}`)

    // Set outputs for other workflow steps to use
    core.setOutput('DIFF', DIFF)
    core.setOutput('LIBS', LIBS)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
