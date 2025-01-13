// import type { HttpContext } from '@adonisjs/core/http'

import User from "#models/user";
import hash from '@adonisjs/core/services/hash';
import moment from 'moment';

export default class UsersController {
    async auth(ctx: any){

        const { request, response } = ctx;
        
        try {
            const { email, password } = request.body();

            const user = await User.findBy('email', email);

            if(!user) return response.status(400).json({message: "Credenciais inválidas!"});
            
            const isPasswordValid = await hash.verify(user.password, password);

            if(!isPasswordValid) return response.status(400).json({message: "Credenciais inválidas!"});
    
            const token = await User.accessTokens.create(user)

            return {
              type: 'bearer',
              value: token.value!.release(),
              expiresAt: token.expiresAt
            }
        } catch (error) {
            return response.status(500).json({message: error.message});
        }
    }

    async create(ctx: any){
        const { request, response } = ctx;

        try {
            const { email, name, password } = request.body();

            if(!email) return response.status(400).json({message: "Informe um e-mail válido!"});
            if(!name) return response.status(400).json({message: "Informe o seu nome!"});
            if(!password) return response.status(400).json({message: "Informe uma senha!"});

            const hasUser = await User.findBy('email', email);

            if(hasUser) return response.status(409).json({message: "O e-mail informado já foi registrado!"});

            const user = await User.create({
                email,
                name,
                password
            });
    
            return response.status(201).json(user);
        } catch (error) {
            return response.status(500).json({message: error.message});
        }
    }
}