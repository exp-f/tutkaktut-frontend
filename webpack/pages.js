import fs from 'fs';
import path from 'path';
const pagesPath = path.join(__dirname, '../source/pages/');
export default fs.readdirSync(pagesPath);