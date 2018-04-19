var expect =require('expect')

var {generateMessage} =require('./message')

describe('generateMessage',()=>{
  it('should generateMessage correct message object',()=>{
    var from='jen'
    var text='Some Message'
    var message = generateMessage(from,text)

    expect(typeof message.createdAt).toBe('number')
    expect(message).toMatchObject({from,text})
  })
})
