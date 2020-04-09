const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('GenerateUniqueId', ()=>{
    it('should generate an Unique ID', ()=> {
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    })
})