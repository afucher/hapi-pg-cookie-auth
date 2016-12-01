'use strict';

const User = require('./models').user;

module.exports = (server) => {
  server.route({
    method: ['GET','POST'],
    path: '/',
    handler: (request, reply) => reply('hello')
  });

  //Secret route use authentication
  server.route({
    method: ['GET', 'POST'],
    path: '/secret',
    config:{
      auth: 'session',
      handler: (request, reply) => {
        request.auth.isAuthenticated ? reply('bem vindo') : reply('tchau!');
      }
    }
  })

  server.route({
    method: ['GET','POST'],
    path: '/logout',
    handler: (request, reply) => request.cookieAuth.clear()
  });

  server.route({
    method: 'POST',
    path: '/login',
    handler: (request, reply) =>{
      if(!request.payload){
        reply("wrong login");
        return;
      }
      let username = request.payload.username;
      let password = request.payload.password;
      User.findOne({where:{username:username}})
        .then((user)=>{
          if(user && user.get("password") == password){
            request.cookieAuth.set({ username: username });
            reply(`Hi, ${username}`);
          }else{
            reply('wrong login');
          }
        });
    }
  });
}
