import AdmZip from 'adm-zip';
import { exists } from 'node:fs/promises';

export class ZipFile {
    private zip: AdmZip;

    constructor(private zipFilePath: string, private password: string) {
        if (password) {
            console.warn('Password is not supported yet');
        }

        this.password = password;
        this.zipFilePath = zipFilePath;
        // Try to load existing zip file, create new one if it doesn't exist
        try {
            this.zip = new AdmZip(zipFilePath);
        } catch (error) {
            // File doesn't exist or is invalid, create new zip
            this.zip = new AdmZip();
        }
    }

    async addFile(path: string, content: string) {
        try {
            const entry = this.zip.getEntry(path);
            if (entry) {
                throw new Error(`File ${path} already exists in zip`);
            }
            this.zip.addFile(path, Buffer.from(content, 'utf8'));
        } catch (error) {
            throw new Error(`Failed to add ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async readFileAsText(path: string): Promise<string> {
        try {
            const entry = this.zip.getEntry(path);
            if (!entry) {
                throw new Error(`File ${path} not found in zip`);
            }
            return this.zip.readAsText(entry, 'utf8');
        } catch (error) {
            throw new Error(`Failed to read ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async save(overwrite: boolean = false) {
        if (!overwrite && await exists(this.zipFilePath)) {
            throw new Error(`File ${this.zipFilePath} already exists.`);
        }
        
        return this.zip.writeZipPromise(this.zipFilePath, {
            overwrite: overwrite,
        });
    }
}