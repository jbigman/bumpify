import * as core from '@actions/core'
import { parseDiff } from './parseDiff.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const diff = process.env.GIT_DIFF || ''

    const { DIFF, LIBS } = parseDiff(diff)

    // Set outputs for other workflow steps to use
    core.setOutput('DIFF', DIFF)
    core.setOutput('LIBS', LIBS)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
