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
        await this.inputDeTarefa.click();
        await this.inputDeTarefa.fill(mensagemTarefa);
        await this.inputDeTarefa.press('Enter');
    }

    obterTarefa(nomeDaTarefa: string): TarefaComponent {
        const locatorDaTarefa = this.listaDeTarefas.filter({ hasText: nomeDaTarefa });
        return new TarefaComponent(locatorDaTarefa);
    }
}