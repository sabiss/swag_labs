import {test, expect} from '@playwright/test'

test('Edição de tarefa salvando com ENTER', async ({page}) => {
    //ARRANGE
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    const minhasTarefas: string[] = ['Comprar leite', 'Ir na lavanderia'];
    const campoDeInput = page.getByRole('textbox', {name:'What needs to be done?'});
    const textoNovaTarefa:string = 'essa tarefa foi editada';

    //ACTION
    for(const tarefa of minhasTarefas){
        await campoDeInput.fill(tarefa);
        await campoDeInput.press('Enter');
    }
    const itensDaLista = page.locator('.todo-list li');
    const tarefaEdicao = itensDaLista.filter({hasText: minhasTarefas[0]});
    await tarefaEdicao.dblclick();

    await itensDaLista.getByRole('textbox').fill(textoNovaTarefa);//tem que buscar novamente pra achar o input, pois atualizou quando deu  o doubleclick
    await itensDaLista.getByRole('textbox').press('Enter');
    const tarefaEditada = itensDaLista.filter({hasText: textoNovaTarefa});

    await expect(tarefaEdicao).toContainText(textoNovaTarefa);
    await expect(tarefaEdicao).toBeAttached();
})
