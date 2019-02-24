const asyncHandler = require('express-async-handler');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const express = require('express');
const router = express.Router();
router.use(express.json());

router.post('/new', asyncHandler(async (req, res, next) => {
  const { stdout, stderr } = await exec('oc new-project zohar');
  stderr ? res.status(400).send('stderr: ' + stderr) : res.status(200).send('stdout: ' + stdout);
}));

router.post('/delete', asyncHandler(async (req, res, next) => {
  const { stdout, stderr } = await exec('oc delete project zohar');
  stderr ? res.status(400).send('stderr: ' + stderr) : res.status(200).send('stdout: ' + stdout);
}));

router.post('/login', asyncHandler(async (req, res, next) => {
  const { stdout, stderr } = await exec('oc login ' + process.env.OPENSHIFT_URL + ' --token=' + req.body.token);
  stderr ? res.status(400).send('stderr: ' + stderr) : res.status(200).send('stdout: ' + stdout);
}));

module.exports = router;
// 0523074799
// oc login https://api.starter-us-east-1.openshift.com --token=U7RGxMVNkfafR4Oy3gqPtp9AId-d6Kx1A7wjP1QJ-wQ