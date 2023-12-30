const core = require('@actions/core');
const github = require('@actions/github');
const { Toolkit } = require('actions-toolkit');

const tools = new Toolkit();

const admins = ['bbenjamin', 'XinranCao', 'supraditya']

try {
  const token = core.getInput("github_token", { required: true })
  const client = github.getOctokit(token)

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  const isAdmin = admins.some(name => {
      const regex = new RegExp(`\-${name}$`, 'g');
      return regex.test(github.context.payload.repository['full_name']);
  })
  core.setOutput("is-student", (!isAdmin && !github.context.payload.repository.is_template) ? '1' : '0');

  if (!isAdmin) {
    console.info('THIS IS NOT AN ADMIN AND THUS NEEDS RESTRICTING')

  } else {
    console.log('THIS WAS SEEN AS ADMIN, DO NOT PRUNE ANYTHING.')
  }
} catch (error) {
  core.setFailed(error.message);
}
