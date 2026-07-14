import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';

const mensagemDaTarefa: string = "Comprar leite";

test.describe('Suite de Testes de Tarefas', ()=>{
    test.beforeEach(async ({ page }) => {
        const todoPage = new TodoPage(page);
        await todoPage.acessarPagina();
    });

    test('Criar tarefa', async({page})=>{
        const todoPage: TodoPage = new TodoPage(page);

        await todoPage.criarNovaTarefa(mensagemDaTarefa);
        const tarefaCriada = todoPage.obterTarefa(mensagemDaTarefa);

        await expect(tarefaCriada.tarefa).toBeVisible()
        await expect(tarefaCriada.tarefa).toHaveText(mensagemDaTarefa)
        await expect(tarefaCriada.checkbox).not.toBeChecked()
    })
})