import fs from 'fs';
import DataUriParser from 'datauri/parser.js';
import cloudinary from './backend/utils/cloudinary.js';

const buf = fs.readFileSync(process.env.TEMP + '\\testphoto.png');
const parser = new DataUriParser();
const fileUri = parser.format('.png', buf);
console.log('datauri bytes:', fileUri.content.length);
try {
  const r = await cloudinary.uploader.upload(fileUri.content, {
    resource_type: 'image',
    folder: 'talentforge/profiles',
  });
  console.log('UPLOAD OK:', r.secure_url);
} catch (e) {
  console.log('UPLOAD FAIL:', e.name, '|', String(e.message).split('\n')[0], '| http_code:', e.http_code);
}
