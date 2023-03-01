export interface ICache {
  get<T>(key: string, collection: string): Promise<T>;
}

class CacheService implements ICache {
  get<T>(key: string, collection: string): T {
    throw new Error("Method not implemented.");
  }
  set(key: string, collection: string, value: unknown): Promise<void> {
    throw new Error("Method not implemented.");
  }
}

export default new CacheService();
