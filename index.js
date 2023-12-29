const core = require('@actions/core');
const github = require('@actions/github');
const { Toolkit } = require('actions-toolkit');

const tools = new Toolkit();

const admins = ['bbenjamin', 'XinranCao']

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  // const isAdmin = admins.some(name => {
  //     const regex = new RegExp(`\-${name}$`, 'g');
  //     return regex.text(github.context.repository['full_name']);
  // })

  // if (!isAdmin) {
  //   console.info('THIS IS NOT AN ADMIN AND THUS NEEDS RESTRICTING')
  // } else {
  //   console.log('THIS WAS SEEN AS ADMIN, IT LETS THING HAPPEN.')
  // }
  // const permissionPayload =  tools.github.repos.getCollaboratorPermissionLevel({
  //   ...tools.context.repo,
  //   username: tools.context.actor
  // });
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context, undefined, 2)
  console.log(`The entire github context for ${JSON.stringify(Object.keys(github.context))}: ${payload}`);


} catch (error) {
  core.setFailed(error.message);
}
