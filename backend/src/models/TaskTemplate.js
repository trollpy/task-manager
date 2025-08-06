const mongoose = require('mongoose');

const taskTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Template name is required'],
    trim: true,
    maxlength: [100, 'Template name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  taskTemplate: {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium'
    },
    estimatedHours: {
      type: Number,
      min: [0.1, 'Estimated hours must be at least 0.1']
    },
    subtasks: [{
      title: {
        type: String,
        required: true,
        trim: true
      }
    }],
    tags: [{
      type: String,
      trim: true
    }]
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  usageCount: {
    type: Number,
    default: 0
  },
  lastUsed: Date
}, {
  timestamps: true
});

// Index for better query performance
taskTemplateSchema.index({ organizationId: 1, isActive: 1 });

// Method to create task from template
taskTemplateSchema.methods.createTask = function(assigneeId, dueDate, customData = {}) {
  const Task = mongoose.model('Task');
  
  const taskData = {
    ...this.taskTemplate,
    ...customData,
    assigneeId,
    dueDate,
    organizationId: this.organizationId,
    assignerId: customData.assignerId
  };
  
  // Update template usage
  this.usageCount += 1;
  this.lastUsed = new Date();
  this.save();
  
  return new Task(taskData).save();
};

module.exports = mongoose.model('TaskTemplate', taskTemplateSchema);