import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class FileService {
  constructor() {
    this.allowedTypes = {
      images: ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
      documents: ['.pdf', '.doc', '.docx', '.txt', '.rtf'],
      spreadsheets: ['.xls', '.xlsx', '.csv'],
      archives: ['.zip', '.rar', '.7z']
    };
    
    this.maxFileSize = 10 * 1024 * 1024; // 10MB
  }

  getStorage(destination) {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, `../../uploads/${destination}/`);
        
        // Ensure directory exists
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
      }
    });
  }

  getFileFilter() {
    return (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const allAllowed = [
        ...this.allowedTypes.images,
        ...this.allowedTypes.documents,
        ...this.allowedTypes.spreadsheets,
        ...this.allowedTypes.archives
      ];

      if (allAllowed.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error(`File type ${ext} is not allowed`), false);
      }
    };
  }

  createUploadMiddleware(destination, fieldName = 'files', maxFiles = 5) {
    return multer({
      storage: this.getStorage(destination),
      limits: {
        fileSize: this.maxFileSize,
        files: maxFiles
      },
      fileFilter: this.getFileFilter()
    }).array(fieldName, maxFiles);
  }

  createSingleUploadMiddleware(destination, fieldName = 'file') {
    return multer({
      storage: this.getStorage(destination),
      limits: {
        fileSize: this.maxFileSize
      },
      fileFilter: this.getFileFilter()
    }).single(fieldName);
  }

  deleteFile(filePath) {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err && err.code !== 'ENOENT') {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  getFileInfo(filePath) {
    return new Promise((resolve, reject) => {
      fs.stat(filePath, (err, stats) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime,
            isFile: stats.isFile(),
            isDirectory: stats.isDirectory()
          });
        }
      });
    });
  }

  formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  getFileType(filename) {
    const ext = path.extname(filename).toLowerCase();
    
    if (this.allowedTypes.images.includes(ext)) return 'image';
    if (this.allowedTypes.documents.includes(ext)) return 'document';
    if (this.allowedTypes.spreadsheets.includes(ext)) return 'spreadsheet';
    if (this.allowedTypes.archives.includes(ext)) return 'archive';
    
    return 'unknown';
  }
}

export default new FileService();