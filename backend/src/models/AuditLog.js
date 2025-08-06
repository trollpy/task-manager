import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      'CREATE_TASK',
      'UPDATE_TASK',
      'DELETE_TASK',
      'ACCEPT_TASK',
      'REJECT_TASK',
      'COMPLETE_TASK',
      'CREATE_USER',
      'UPDATE_USER',
      'DELETE_USER',
      'LOGIN',
      'LOGOUT',
      'CHANGE_PASSWORD',
      'UPDATE_ORGANIZATION',
      'EXPORT_REPORT'
    ]
  },
  resource: {
    type: String,
    required: true,
    enum: ['Task', 'User', 'Organization', 'Report', 'Auth']
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId
  },
  oldValues: {
    type: mongoose.Schema.Types.Mixed
  },
  newValues: {
    type: mongoose.Schema.Types.Mixed
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Indexes
auditLogSchema.index({ organizationId: 1, createdAt: -1 });
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });

// Static method to log activity
auditLogSchema.statics.logActivity = function (logData) {
  const log = new this(logData);
  return log.save();
};

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
