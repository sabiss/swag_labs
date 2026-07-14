import { Locator, Page } from '@playwright/test';
import { TarefaComponent } from '../components/tarefaComponent';

export class TodoPage{
    readonly page: Page;
    readonly listaDeTarefas: Locator;
    readonly inputDeTarefa: Locator;

    constructor(page: Page){
        this.page = page;
        this.inputDeTarefa = page.getByRole('textbox', {'name': "What needs to be done?"});
        this.listaDeTarefas = page.getByTestId('todo-item');
    }

    async acessarPagina(){
        await this.page.goto("https://demo.playwright.dev/todomvc/#/");
    }

    async criarNovaTarefa(mensagemTarefa: string){
        const tarefa = new TarefaComponent(this.page, mensagemTarefa);
        await tarefa.adicionarTarefa();
    }

    obterTarefa(nomeDaTarefa: string): Locator {
        const locatorDaTarefa: Locator = this.listaDeTarefas.filter({ hasText: nomeDaTarefa });
        return locatorDaTarefa;
    }
}