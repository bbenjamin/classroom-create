const core = require('@actions/core');
const github = require('@actions/github');
const { Toolkit } = require('actions-toolkit');

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
  core.setOutput("is-student", !isAdmin);

  if (!isAdmin) {
    console.info('THIS IS NOT AN ADMIN AND THUS NEEDS RESTRICTING')

  } else {
    console.log('THIS WAS SEEN AS ADMIN, IT LETS THING HAPPEN.')
  }

  const payload = JSON.stringify(github, undefined, 2)
  console.log(`big  bad output: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
