'use strict';
const express = require('express');
const router = express.Router();
const Application = require('../models/Application');

router.get('/apps', async (req, res, next) => {
// take all the apps from DB
  try {
    const listOfApps = await Application.find();
    res.status(200).json({ listOfApps });
  } catch (error) {
    next(error);
  }
})
;

router.post('/apps/new', async (req, res, next) => {
  try {
    const newApp = req.body;
    const createdApp = await Application.create(newApp);
    res.status(200).json(createdApp);
  } catch (error) {
    next(error);
  }
// create new App
})
;

router.put('/apps/:id/update', async (req, res, next) => {
  // update one app
  const { id } = req.params;
  const appUpdated = req.body;
  try {
    const updated = await Application.findByIdAndUpdate(id, appUpdated, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
})
;

router.delete('/apps/:id/delete', async (req, res, next) => {
  // delete one app
  const { id } = req.params;
  const appDeleted = req.body;
  try {
    await Application.findByIdAndDelete(id, appDeleted);
    res.status(200).json('app deleted');
  } catch (error) {
    next(error);
  }
})
;

module.exports = router;
