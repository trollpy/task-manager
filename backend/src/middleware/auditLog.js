const AuditLog = require('../models/AuditLog');

const auditLog = (action) => {
  return async (req, res, next) => {
    const originalSend = res.send;
    
    res.send = function(data) {
      // Log the action after successful response
      if (res.statusCode < 400) {
        AuditLog.create({
          user: req.user._id,
          organization: req.user.organization,
          action,
          resource: req.originalUrl,
          details: {
            method: req.method,
            params: req.params,
            body: req.body
          }
        }).catch(err => console.error('Audit log error:', err));
      }
      
      originalSend.call(this, data);
    };
    
    next();
  };
};

module.exports = auditLog;