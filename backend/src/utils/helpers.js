import crypto from 'crypto';
import jwt from 'jsonwebtoken';

class Helpers {
  // Generate auth token
  createAuthToken(user) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
  }

  generateRandomString(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  generateUniqueFilename(originalName) {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    const extension = originalName.split('.').pop();
    return `${timestamp}_${random}.${extension}`;
  }

  formatDate(date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options,
    };
    return new Date(date).toLocaleDateString('en-US', defaultOptions);
  }

  formatDateForAPI(date) {
    return new Date(date).toISOString();
  }

  daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((new Date(date1) - new Date(date2)) / oneDay));
  }

  isOverdue(dueDate) {
    return new Date(dueDate) < new Date();
  }

  sanitizeHtml(html) {
    return html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+="[^"]*"/gi, '');
  }

  generateSlug(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  generateHash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  paginate(array, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const paginatedItems = array.slice(offset, offset + limit);

    return {
      data: paginatedItems,
      pagination: {
        page,
        limit,
        total: array.length,
        totalPages: Math.ceil(array.length / limit),
        hasNext: offset + limit < array.length,
        hasPrev: page > 1,
      },
    };
  }

  deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  removeSensitiveFields(obj, fields = ['password', 'token', 'secret']) {
    const cleaned = { ...obj };
    fields.forEach((field) => {
      if (cleaned[field]) {
        delete cleaned[field];
      }
    });
    return cleaned;
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  generateColorFromString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.abs(hash).toString(16).substring(0, 6);
    return '#' + '000000'.substring(0, 6 - color.length) + color;
  }
}

const helpers = new Helpers();
export default helpers;
