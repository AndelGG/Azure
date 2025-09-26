class CacheManager:
    def __init__(self, cache):
        self.cache = cache

    def get(self, key):
        return self.cache.get(key)

    def set(self, key, value):
        self.cache[key] = value

    def delete(self, key):
        if key in self.cache:
            del self.cache[key]

    def clear(self):
        self.cache.clear()

    def exists(self, key):
        return key in self.cache