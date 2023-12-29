const core = require('@actions/core');
const github = require('@actions/github');
const { Toolkit } = require('actions-toolkit');
const { exec } = require('node:child_process')


const tools = new Toolkit();

const admins = ['bbenjamin', 'XinranCao']

try {
  const token = core.getInput("github_token", { required: true })
  const numbers = core.getInput("numbers")
  const owner = core.getInput("owner")
  const repository = core.getInput("repository")
  const branches = core.getInput("branches")
  const prefix = core.getInput("prefix")
  const suffix = core.getInput("suffix")
  const soft_fail = core.getInput("soft_fail")

  const client = github.getOctokit(token)
  // console.log(`THE CLIE ELI ${client.rest.users.getAuthenticated()}`);

  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  const isAdmin = admins.some(name => {
      const regex = new RegExp(`\-${name}$`, 'g');
      return regex.test(github.context.payload.repository['full_name']);
  })

  if (!isAdmin) {
    console.info('THIS IS NOT AN ADMIN AND THUS NEEDS RESTRICTING')
    exec('git branch -D solution', (err, output) => {
      // once the command has completed, the callback function is called
      if (err) {
        // log and return if we encounter an error
        console.error("could not execute command: ", err)
        return
      }
      // log the output received from the command
      console.log("Output: \n", output)
    }))
  } else {
    console.log('THIS WAS SEEN AS ADMIN, IT LETS THING HAPPEN.')
  }
  // const permissionPayload =  tools.github.repos.getCollaboratorPermissionLevel({
  //   ...tools.context.repo,
  //   username: tools.context.actor
  // });
  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github, undefined, 2)
  const payload = JSON.stringify(Object.keys(client.rest), undefined, 2)
  console.log(`The entire github context forrrr the varia les: ${payload}`);



} catch (error) {
  core.setFailed(error.message);
}
