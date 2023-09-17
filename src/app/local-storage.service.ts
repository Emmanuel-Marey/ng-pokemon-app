import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

// npm install crypto-js
// npm install @types/crypto-js
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly PRIVATE_KEY: string = "Pichu";

  constructor() {}

  public clearData() {
    localStorage.clear();
  }

  public getData(key: string) {
    let data = localStorage.getItem(key) || "";
    return this.decrypt(data);
  }

  public saveData(key: string, value: string) {
    let data = this.encrypt(value);
    localStorage.setItem(key, data);
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  private encrypt(message: string): string {
    return CryptoJS.AES.encrypt(message, this.PRIVATE_KEY).toString();
  }

  private decrypt(cipherText: string) {
    return CryptoJS.AES.decrypt(cipherText, this.PRIVATE_KEY).toString(CryptoJS.enc.Utf8);
  }
}
