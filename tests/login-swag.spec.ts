import { test, expect } from '@playwright/test';

test('Validar o login', async ({ page }) => {

    // --- ARRANGE ---
    // É aqui que o terreno é preparado para o teste rodar 
    await page.goto('https://www.saucedemo.com/');

    // --- ACT ---
    // Aqui são as ações do teste, o que eu quero que seja feito pra chegar no objetivo
    const inputDeUsername = page.locator('[data-test="username"]');//ponteiro para o elemento que tem o data-test igual a username
    const inputDeSenha = page.locator('[data-test="password"]');
    const botaoLogin = page.locator('[data-test="login-button"]'); 

    await inputDeUsername.fill('standard_user');
    await inputDeSenha.fill('secret_sauce');
    await botaoLogin.click();

    // --- ASSERT ---
    // É aqui que eu vejo se os resultado chegaram no objetivo certo, nesse caso, se o user consegui logar
    const tituloPagina = page.locator('[data-test="title"]');
    await expect(tituloPagina).toHaveText('Products');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});