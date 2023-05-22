interface ObjectStoreIndex {
  name: string;
  keyPath: string;
  unique?: boolean;
}

interface ObjectStoreConfig {
  name: string;
  keyPath: string;
  autoIncrement?: boolean;
  indexes: ObjectStoreIndex[];
}

class IndexedDB {
  private databaseName: string;
  private version: number;
  private objectStoreConfigList: ObjectStoreConfig[];
  private db: IDBDatabase | null = null;

  constructor(databaseName: string, version: number, objectStoreConfigList: ObjectStoreConfig[]) {
    this.databaseName = databaseName;
    this.version = version;
    this.objectStoreConfigList = objectStoreConfigList;
  }

  public open(): Promise<Event> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.databaseName, this.version);

      request.onerror = (event: Event) => {
        console.error('打开数据库错误:', event);
        reject(event);
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBRequest).result;
        this.objectStoreConfigList.forEach((config) => {
          if (!db.objectStoreNames.contains(config.name)) {
            const objectStore = db.createObjectStore(config.name, {
              keyPath: config.keyPath,
              autoIncrement: config.autoIncrement,
            });
            config.indexes.forEach((index) => {
              objectStore.createIndex(index.name, index.keyPath, { unique: index.unique });
            });
          }
        });
      };

      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
        resolve(event);
      };
    });
  }

  public close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  public delete(): Promise<Event> {
    return new Promise((resolve, reject) => {
      this.close();
      const request = window.indexedDB.deleteDatabase(this.databaseName);

      request.onerror = (event: Event) => {
        console.error('删除数据库错误:', event);
        reject(event);
      };

      request.onsuccess = (event: Event) => {
        resolve(event);
      };
    });
  }

  private getObjectStore(name: string, mode: IDBTransactionMode): IDBObjectStore {
    const objectStore = this.db!.transaction(name, mode).objectStore(name);
    return objectStore;
  }

  public get(name: string, key: IDBValidKey | IDBKeyRange): Promise<any> {
    return new Promise((resolve, reject) => {
      const objectStore = this.getObjectStore(name, 'readonly');
      const request = objectStore.get(key);

      request.onerror = (event: Event) => {
        reject(event);
      };

      request.onsuccess = (event: Event) => {
        resolve((event.target as IDBRequest).result);
      };
    });
  }

  public put(name: string, data: any): Promise<Event> {
    return new Promise((resolve, reject) => {
      const objectStore = this.getObjectStore(name, 'readwrite');
      const request = objectStore.put(data);

      request.onerror = (event: Event) => {
        reject(event);
      };

      request.onsuccess = (event: Event) => {
        resolve(event);
      };
    });
  }

  public deleteObject(name: string, key: IDBValidKey | IDBKeyRange): Promise<Event> {
    return new Promise((resolve, reject) => {
      const objectStore = this.getObjectStore(name, 'readwrite');
      const request = objectStore.delete(key);

      request.onerror = (event: Event) => {
        reject(event);
      };

      request.onsuccess = (event: Event) => {
        resolve(event);
      };
    });
  }

  // public add(name: string, data: any, key: string): Promise<Event> {
  //   return new Promise((resolve, reject) => {
  //     const objectStore = this.getObjectStore(name, 'readwrite');
  //     const request = objectStore.add(data, key);

  //     request.onerror = (event: Event) => {
  //       reject(event);
  //     };

  //     request.onsuccess = (event: Event) => {
  //       resolve(event);
  //     };
  //   });
  // }
}

export {
  IndexedDB
}