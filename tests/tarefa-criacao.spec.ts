import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

const mensagemDaTarefa: string = "Comprar leite";

test.describe('Criação de uma Tarefa', ()=>{
    test('Criar tarefa', async({page})=>{
        const todoPage: TodoPage = new TodoPage(page);
        await todoPage.acessarPagina();

        await todoPage.criarNovaTarefa(mensagemDaTarefa);
        await expect(todoPage.listaDeTarefas).toHaveText(mensagemDaTarefa);
    })
})