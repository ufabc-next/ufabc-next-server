const app = require('@/app')
const populateData = require('@/populate/data/histories')()
const populate = require('@/populate')

describe.only('MODELS histories', function() {
  beforeEach(async function () {
    //await populate({ operation: 'remove' })
    await populate({ operation: 'both', only: ['subjects'] })
  })

  describe('hooks', function () {
    describe('preSave', function () {

      xit('creates an enrollment or update one if does not exists', async function () {
        const prevEnrollments = await app.models.enrollments.count({})
        const ra = populateData[0].ra
        const history = await app.models.histories.findOneAndUpdate({
          ra: ra
        }, populateData[0], {
          new: true,
          upsert: true
        })

        const afterEnrollments = await app.models.enrollments.find({})
        console.log(prevEnrollments, afterEnrollments.length, afterEnrollments[99])
      })
    })
  })
})