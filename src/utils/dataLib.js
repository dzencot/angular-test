import { promises as fs } from 'fs';
import path from 'path';

const dataPath = path.resolve('./src/assets/', 'users.json');

const getData = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (e) {
    console.log(e);
  }
  return [];
};

const saveData = async (data) => {
  try {
    const result = await fs.writeFile(dataPath, data);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export { getData };
