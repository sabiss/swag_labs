import { Locator, Page } from '@playwright/test'

export class TarefaComponent{
    readonly page: Page;
    readonly inputDeTarefa: Locator;
    readonly texto: string;

    constructor(page: Page, texto:string){
        this.page = page;
        this.inputDeTarefa = page.getByRole('textbox', {'name': "What needs to be done?"});
        this.texto = texto;
    }

    async adicionarTarefa(){
        await this.inputDeTarefa.click();
        await this.inputDeTarefa.fill(this.texto);
        await this.inputDeTarefa.press('Enter');
    }

    async concluirTarefa(){
        const checkBoxConclusao: Locator = this.page.getByRole('listitem').filter({hasText: this.texto}).getByRole('checkbox');
        await checkBoxConclusao.check();
    }
    
    async deletarTarefa(){
        const tarefa : Locator = this.page.getByRole('listitem').filter({hasText: this.texto});
        await tarefa.hover();
        await tarefa.getByRole('button', {name: 'Delete'}).click();
    }
}