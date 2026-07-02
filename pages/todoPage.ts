import { Locator, Page } from '@playwright/test';
import { TarefaComponent } from '../components/tarefaComponent';

export class TodoPage{
    readonly page: Page;
    readonly inputDeTarefa: Locator;

    constructor(page: Page){
        this.page = page;
        this.inputDeTarefa = page.getByRole('textbox', {'name': "What needs to be done?"});
    }

    async criarNovaTarefa(mensagemTarefa: string){
        await this.inputDeTarefa.fill(mensagemTarefa);
        await this.inputDeTarefa.press('Enter');
    }

    async concluirTarefa(tarefa: TarefaComponent){
        await tarefa.concluirTarefa();
    }

    async deletarTarefa(tarefa: TarefaComponent){
        await tarefa.deletarTarefa();
    }
}