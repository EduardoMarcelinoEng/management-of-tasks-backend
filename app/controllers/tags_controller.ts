import Tag from '#models/tag';
import { HttpContext } from '@adonisjs/core/http'

export default class TagsController {
    async index(ctx: any){
        const { response, auth } = ctx;

        try {
            return await auth.user.related('tags').query();
        } catch (error) {
            return response.status(500).json({message: error.message});
        }
    }

    async create(ctx: any){
        const { request, response, auth } = ctx;
        
        try {
            const { name } = request.body();

            if(!name) return response.status(400).json({message: "Informe o nome da tag!"});
            
            const tag = await auth.user.related('tags').create({
                name
            });
    
            return response.status(201).json(tag);
        } catch (error) {
            return response.status(500).json({message: error.message});
        }
    }

    async update(ctx: HttpContext){
        const { request, response, auth, params } = ctx;

        try {
            const { name } = request.body();
            const { id } = params;

            const tag: Tag | null = await Tag.find(id);
            
            if(!tag || tag.userId !== auth.user?.id){
                return response.status(404).json({ message: `A tag ${id} não existe!` });
            }

            if(name) tag.name = name;

            return tag.save();

        } catch (error) {
            return response.status(500).json({message: error.message});
        }
    }

    async destroy(ctx: HttpContext){
        const { response, auth, params } = ctx;
        const { id } = params;

        try {
            const tag: Tag | null = await Tag.find(id);
            
            if(!tag || tag.userId !== auth.user?.id){
                return response.status(404).json({ message: `A tag ${id} não existe!` });
            }

            await tag.delete();

            return { message: `A tag ${id} foi deletada!` };

        } catch (error) {
            return response.status(500).json({message: error.message});
        }
    }
}