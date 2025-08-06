import mongoose from 'mongoose'

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide organization name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  logo: {
    type: String,
    default: ''
  },
  settings: {
    taskCategories: [String],
    defaultTaskPriority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    taskCompletionThreshold: {
      type: Number,
      default: 80,
      min: 0,
      max: 100
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Cascade delete tasks when organization is deleted
organizationSchema.pre('remove', async function(next) {
  await mongoose.model('Task').deleteMany({ organization: this._id })
  await mongoose.model('User').deleteMany({ organization: this._id })
  next()
})

export default mongoose.model('Organization', organizationSchema)