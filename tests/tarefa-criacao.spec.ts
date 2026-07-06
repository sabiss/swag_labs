import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

const mensagemDaTarefa: string = "Comprar leite";

test.describe('Criação de uma Tarefa', ()=>{
    test('Criar tarefa', async({page})=>{
        const todoPage: TodoPage = new TodoPage(page);
        await todoPage.acessarPagina();

        await todoPage.criarNovaTarefa(mensagemDaTarefa);
        const tarefaCriada = todoPage.obterTarefa(mensagemDaTarefa);

        await expect(tarefaCriada.tarefa).toBeVisible()
        await expect(tarefaCriada.tarefa).toHaveText(mensagemDaTarefa)
        await expect(tarefaCriada.checkbox).not.toBeChecked()
    })
})