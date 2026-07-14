import { Locator, Page } from '@playwright/test'

export class TarefaComponent{
    readonly tarefa: Locator;
    readonly checkbox: Locator;
    readonly botaoDeletar: Locator;

    constructor(tarefa: Locator){
        this.tarefa = tarefa;
        this.checkbox = tarefa.getByRole('checkbox');
        this.botaoDeletar = tarefa.getByRole('button', {name: 'Delete'});
    }

    async concluirTarefa(){
        await this.checkbox.check();
    }
    
    async deletarTarefa(){
        await this.tarefa.hover();
        await this.botaoDeletar.click();
    }
}