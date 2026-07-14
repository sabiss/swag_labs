import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/todoPage';
import { TarefaComponent } from '../components/tarefaComponent';

const mensagemDaTarefa: string = "Comprar leite";
let todoPage : TodoPage;
let tarefaCriada : TarefaComponent;

test.describe('Suite de Testes de Tarefas', ()=>{
    test.beforeEach(async ({ page }, testInfo) => {
        todoPage = new TodoPage(page);
        await todoPage.acessarPagina();

        //se não o teste de criar não vai servir pra verificar nada
        if (testInfo.title === 'Criar tarefa') {
            return; 
        }

        await todoPage.criarNovaTarefa(mensagemDaTarefa);
        tarefaCriada = todoPage.obterTarefa(mensagemDaTarefa);
    });

    test('Criar tarefa', async({page})=>{
        await todoPage.criarNovaTarefa(mensagemDaTarefa);
        const tarefa : TarefaComponent = todoPage.obterTarefa(mensagemDaTarefa);
        
        await expect(tarefa.tarefa).toBeVisible()
        await expect(tarefa.tarefa).toHaveText(mensagemDaTarefa)
        await expect(tarefa.checkbox).not.toBeChecked()
    })

    test('Deletar tarefa', async ({page}) => {
        await tarefaCriada.deletarTarefa();
        await expect(tarefaCriada.tarefa).not.toBeVisible();
    })

    test('Concluir Tarefa', async ({page}) => {
        await tarefaCriada.concluirTarefa();
        const tarefaConcluida =  page.getByRole('listitem').filter({hasText: mensagemDaTarefa});
        const textoRiscado = tarefaConcluida.getByText(mensagemDaTarefa);

        await expect(tarefaConcluida).toHaveClass('completed');
        await expect(textoRiscado).toHaveCSS('text-decoration', /line-through/)
    })
})