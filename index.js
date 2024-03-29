const core = require('@actions/core');
const github = require('@actions/github');
const { Toolkit } = require('actions-toolkit');

const tools = new Toolkit();

const admins = ['bbenjamin', 'XinranCao', 'supraditya', 'XinranCao\-1', 'tonglj']

try {
  const token = core.getInput("github_token", { required: true })
  const client = github.getOctokit(token)

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  console.info(`Check against ${github.context.payload.repository['full_name']}`);
  let adminCheck = false;
  const isAdmin = admins.some(name => {
    const regex = new RegExp(`\-${name}$`, 'g');
    console.info(`Does ${name} do it? ${regex.test(github.context.payload.repository['full_name'])}`)
    if (!adminCheck) {
      adminCheck = regex.test(github.context.payload.repository['full_name']);
    }
    return regex.test(github.context.payload.repository['full_name']);
  })
  console.info(`isAdmin: ${isAdmin} | adminCheck: ${adminCheck}`);
  core.setOutput("is-student", (!isAdmin && !github.context.payload.repository.is_template) ? '1' : '0');

  if (!isAdmin) {
    console.info('THIS IS NOT AN ADMIN AND THUS NEEDS RESTRICTING')

  } else {
    console.log('THIS WAS SEEN AS ADMIN, DO NOT PRUNE ANYTHING.')
  }
} catch (error) {
  core.setFailed(error.message);
}
