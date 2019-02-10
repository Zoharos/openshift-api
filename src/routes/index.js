const asyncHandler = require('express-async-handler');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const express = require('express');
const router = express.Router();
router.use(express.json());

router.get('/new', asyncHandler(async (req, res, next) => {
  // res.status(200).send("Hello World");
  const { stdout, stderr } = await exec('oc new-project zohar');
  stderr ? res.status(400).send('stderr: ' + stderr) : res.status(200).send('stdout: ' + stdout);
}));

router.get('/delete', asyncHandler(async (req, res, next) => {
  // res.status(200).send("Hello World");
  const { stdout, stderr } = await exec('oc delete project zohar');
  stderr ? res.status(400).send('stderr: ' + stderr) : res.status(200).send('stdout: ' + stdout);
}));

module.exports = router;
// 0523074799