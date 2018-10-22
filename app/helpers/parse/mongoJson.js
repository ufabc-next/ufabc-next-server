const _ = require('lodash')
const mongoose = require('mongoose')

module.exports = function mongoJson (models) {
  if(!_.isArray(models)) models = [models]

  models = models.map(model => {
    if(_.isObject(model) && !mongoose.Types.ObjectId.isValid(model)) {
      if(model.toJSON) model = model.toJSON()

      Object.keys(model).forEach(key => {
        if(mongoose.Types.ObjectId.isValid(model[key])) {
          model[key] = String(model[key])
        }
      })
    }
    else if(mongoose.Types.ObjectId.isValid(model)) {
      return model.toString()
    }

    return model
  })

  return models
}