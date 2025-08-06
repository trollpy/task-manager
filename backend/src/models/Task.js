import mongoose from 'mongoose';

const subtaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  completedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [200, 'Task title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Task description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['Awaiting Acceptance', 'In Progress', 'Completed', 'Rejected', 'On Hold'],
    default: 'Awaiting Acceptance'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  assignerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assigneeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  completedDate: Date,
  estimatedHours: {
    type: Number,
    min: [0.1, 'Estimated hours must be at least 0.1']
  },
  actualHours: {
    type: Number,
    min: [0, 'Actual hours cannot be negative']
  },
  attachments: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    path: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  subtasks: [subtaskSchema],
  comments: [{
    content: {
      type: String,
      required: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  tags: [{
    type: String,
    trim: true
  }],
  rejectionReason: {
    type: String,
    maxlength: [500, 'Rejection reason cannot exceed 500 characters']
  },
  acceptedAt: Date,
  rejectedAt: Date,
  isArchived: {
    type: Boolean,
    default: false
  },
  aiSuggestions: {
    suggestedAssignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    suggestedPriority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent']
    },
    suggestedDueDate: Date,
    confidence: {
      type: Number,
      min: 0,
      max: 1
    }
  }
}, { timestamps: true });

// Indexes
taskSchema.index({ organizationId: 1, assigneeId: 1, status: 1 });
taskSchema.index({ organizationId: 1, dueDate: 1 });
taskSchema.index({ organizationId: 1, priority: 1 });

// Virtuals
taskSchema.virtual('isOverdue').get(function () {
  return this.dueDate < new Date() && this.status !== 'Completed';
});

taskSchema.virtual('completionPercentage').get(function () {
  if (this.status === 'Completed') return 100;
  if (this.subtasks.length === 0) return 0;
  const completedSubtasks = this.subtasks.filter(subtask => subtask.isCompleted).length;
  return Math.round((completedSubtasks / this.subtasks.length) * 100);
});

// Instance methods
taskSchema.methods.updateStatus = function (newStatus, userId, reason = null) {
  this.status = newStatus;

  switch (newStatus) {
    case 'In Progress':
      if (!this.acceptedAt) this.acceptedAt = new Date();
      break;
    case 'Completed':
      this.completedDate = new Date();
      break;
    case 'Rejected':
      this.rejectedAt = new Date();
      if (reason) this.rejectionReason = reason;
      break;
  }

  return this.save();
};

// Static methods
taskSchema.statics.getAnalytics = function (organizationId, dateRange = {}) {
  const matchConditions = { organizationId };

  if (dateRange.start && dateRange.end) {
    matchConditions.createdAt = {
      $gte: new Date(dateRange.start),
      $lte: new Date(dateRange.end)
    };
  }

  return this.aggregate([
    { $match: matchConditions },
    {
      $group: {
        _id: {
          status: '$status',
          priority: '$priority'
        },
        count: { $sum: 1 },
        avgHours: { $avg: '$actualHours' }
      }
    },
    {
      $group: {
        _id: null,
        totalTasks: { $sum: '$count' },
        statusBreakdown: {
          $push: {
            status: '$_id.status',
            priority: '$_id.priority',
            count: '$count',
            avgHours: '$avgHours'
          }
        }
      }
    }
  ]);
};

const Task = mongoose.model('Task', taskSchema);

export default Task;
