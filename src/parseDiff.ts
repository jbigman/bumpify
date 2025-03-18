/**
 * Parse the diff output from ncu
 * @param diff The diff output from ncu
 * @returns
 */
export const parseDiff = (diff: string): { DIFF: string; LIBS: string } => {
  const diffOutput = diff
    .split('\n')
    .filter((line) => line.startsWith('- ') || line.startsWith('+ '))
    .map((line) => line.trim())

  const updates = []
  const libs = []

  for (let i = 0; i < diffOutput.length; i += 2) {
    if (diffOutput[i] && diffOutput[i + 1]) {
      const oldDep = diffOutput[i].replace('- "', '').trim()
      const newDep = diffOutput[i + 1].replace('+ "', '').trim()
      const name = oldDep.split('":')[0] // Extract package name
      if (name) {
        updates.push(
          `${name}: ${oldDep.split('":')[1]} => ${newDep.split('":')[1]}`
        )
        libs.push(name)
      }
    }
  }

  return { DIFF: updates.join(', '), LIBS: libs.join(', ') }
}
