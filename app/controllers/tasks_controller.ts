import Tag from '#models/tag';
import Task from '#models/task';
import User from '#models/user';
import { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
    async index(ctx: HttpContext){
        const { response, auth, request } = ctx;
        const { currentPage, id, title, description, tagId } = request.qs();

        const query = (auth.user as User).related('tasks').query();

        try {
            if(id) query.where('id', '=', id);
            if(title) query.where('title', 'like', `%${title}%`);
            if(description) query.where('description', 'like', `%${description}%`);
            if(tagId) query.where('tagId', '=', tagId);

            return await query.preload('tag').paginate(currentPage, 5);
        } catch (error) {
            return response.status(500).json({message: error.message});
        }
    }

    async create(ctx: HttpContext){
        const { request, response, auth } = ctx;

        try {
            const { title, description, tagId } = request.body();

            if(typeof title !== "string") return response.status(400).json({message: "Informe o título da tarefa!"});
            if(description && typeof description !== "string") return response.status(400).json({message: "Informe uma descrição no formato string!"});
            if(tagId){
                const hasTag = await Tag.find(tagId);

                if(hasTag?.userId !== (auth.user as User).id) return response.status(404).json({message: `A tag ${tagId} não existe!`});
            }

            const task = await (auth.user as User).related('tasks').create({
                title,
                description,
                tagId: tagId || null
            });

            const tag = tagId ? (await task.related('tag').query())[0] : null;
    
            return response.status(201).json(Object.assign(task, {
                tag
            }));

        } catch (error) {
            return response.status(500).json({message: error.message});
        }
    }

    async update(ctx: HttpContext){
        const { request, response, auth, params } = ctx;

        try {
            const { title, description, tagId } = request.body();
            const { id } = params;

            const task: Task | null = await Task.find(id);
            
            if(!task || task.userId !== auth.user?.id){
                return response.status(404).json({ message: `A tarefa ${id} não existe!` });
            }

            if(tagId){
                const tag: Tag | null = await Tag.find(tagId);

                if(!tag || tag.userId !== auth.user?.id){
                    return response.status(404).json({ message: `A tag ${tagId} não existe!` });
                }
            }

            if(title) task.title = title;

            if(description !== undefined) task.description = description;
            if(tagId !== undefined) task.tagId = tagId;

            const result = await task.save();

            const tag = result.tagId ? (await result.related('tag').query())[0] : null;

            response.status(200).json(Object.assign(result, {
                tag
            }));

        } catch (error) {
            return response.status(500).json({message: error.message});
        }
    }

    async destroy(ctx: HttpContext){
        const { response, auth, params } = ctx;
        const { id } = params;

        try {
            const task: Task | null = await Task.find(id);
            
            if(!task || task.userId !== auth.user?.id){
                return response.status(404).json({ message: `A tarefa ${id} não existe!` });
            }

            await task.delete();

            return { message: `A tarefa ${id} foi deletada!` };

        } catch (error) {
            return response.status(500).json({message: error.message});
        }
    }
}