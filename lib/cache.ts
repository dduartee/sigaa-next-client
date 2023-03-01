import NodeCache from 'node-cache';
const cacheService = new NodeCache({useClones: false});
export default cacheService;