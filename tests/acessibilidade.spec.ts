import {test, expect} from '@playwright/test';

test('Dar check em uma tarefa', async ({page}) => {
    //ARRANGE
    await page.goto('https://demo.playwright.dev/todomvc/');
    const minhasTarefas:string[] = ['Entregar projeto no IMD', 'Treino de corrida 5km', 'Atualizar sistema dual-boot']; 
    const input = page.getByPlaceholder('What needs to be done?');
    
    //ACT
    for(const tarefa of minhasTarefas){
        await input.fill(tarefa);
        await input.press('Enter');
    }
    const cardTarefaDaCorrida = page.getByRole('listitem').filter({hasText: 'Treino de corrida 5km'});
    const checkboxDaCorrida = cardTarefaDaCorrida.getByRole('checkbox');

    await checkboxDaCorrida.check();

    //ASSEC
    await expect(checkboxDaCorrida).toBeChecked();
    await expect(cardTarefaDaCorrida).toHaveClass(/completed/);//quando a tarefa é checked ele adiciona essa classe, pra alterar o visual, então aqui é um teste pra ver se o visual certo voi aplicado
})