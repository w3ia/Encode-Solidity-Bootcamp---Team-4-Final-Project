import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const metadata = {
    "description": "Awarded to Students for Succesfully Passing their Course", 
    "external_url": "https://github.com/w3ia/Encode-Solidity-Bootcamp---Team-4-Final-Project", 
    "image": "ipfs://bafkreidtjwyegembuoj5bhxgmxaoj77nrfbnhkcmvypszinbwa6jgw3u5m", 
    "name": "DiplomaGuild Certificate of Achievement",
    "attributes": []
}

// ✅ write to file SYNCHRONOUSLY
function syncWriteFile(filename: string, data: any) {
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */
  writeFileSync(join(__dirname, filename), data, {
    flag: 'w',
  });

  const contents = readFileSync(join(__dirname, filename), 'utf-8');
  console.log(contents); // 👉️ "One Two Three Four"

  return contents;
}

syncWriteFile('../assests/metadata.json', JSON.stringify(metadata));