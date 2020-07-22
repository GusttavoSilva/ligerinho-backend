'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'MEALHUNT EM CONSTRUÇÃO' }
})
//------------------------------------------LOGIN USUÁRIOS----------------------------------------------
Route.post('/loginapp', 'SessionController.store').validator('Session')
//-------------------------------------------USUÁRIOS---------------------------------------------------
Route.post('/users', 'UserController.store').validator('User') //CADASTRAR
Route.get('/users/:id', 'UserController.show').middleware(['auth:jwt'])//MOSTRAR ESPECIFICO
Route.put('/users/:id', 'UserController.update').middleware('auth')//EDITAR
Route.delete('/users/:id', 'UserController.destroy').middleware('auth')//DELETAR
//USUÁRIOS VISUALIZAR RESTAURANTES
Route.get('/restaurantes', 'RestauranteController.index').middleware(['auth:jwt'])//MOSTRAR TODOS
//-------------------------------------------ESQUECEU SENHA USUÁRIOS------------------------------------
Route.post('/forgotpassword', 'ForgotPasswordController.store').validator('ForgotPassword')//Solicitar recuperação de senha
Route.put('/resetpassword', 'ForgotPasswordController.update').validator('ResetPassword')//Recuperar senha
//------------------------------------------LOGIN RESTAURANTE-------------------------------------------
Route.post('/loginweb', 'SessionController.storeWeb').validator('Session')
//-------------------------------------------CLIENTES---------------------------------------------------
Route.post('/clientes', 'RestauranteController.store').validator('Clientes') //CADASTRAR
Route.get('/clientes', 'RestauranteController.index')//MOSTRAR TODOS
Route.get('/clientes/:id', 'RestauranteController.show').middleware(['auth:api'])//MOSTRAR ESPECIFICO
Route.put('/clientes/:id', 'RestauranteController.update').middleware(['auth:api'])//EDITAR
Route.delete('/clientes/:id', 'RestauranteController.destroy').middleware(['auth:api'])//DELETAR
//-------------------------------------------ESQUECEU SENHA RESTAURANTES--------------------------------
Route.post('/forgotpasswordres', 'ForgotPasswordController.storeRes').validator('ForgotPassword')//Solicitar recuperação de senha
Route.put('/resetpasswordres', 'ForgotPasswordController.updateRes').validator('ResetPassword')//Recuperar senha

//-------------------------------------------ENDEREÇOS USUÁRIOS-----------------------------------------
Route.group(() => {
  Route.resource('enderecos', 'EnderecoController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['enderecos.store'],
          ['Endereco']
        ]
      ]
    ))
}).middleware(['auth:jwt'])

//-------------------------------------------CARTÃO USUÁRIOS--------------------------------------------
Route.group(() => {
  Route.resource('cartao', 'CartaoController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['cartao.store'],
          ['Cartao']
        ]
      ]
    ))
}).middleware(['auth:jwt'])
//-------------------------------------------CONTA BANCÁRIA CLIENTES------------------------------------
Route.post('/conta', 'ContaBancariaController.store').validator('Conta').middleware(['auth:api'])//CADASTRAR
Route.get('/conta/:id', 'ContaBancariaController.show').middleware(['auth:api'])//MOSTRAR ESPECIFICO
Route.put('/conta/:id', 'ContaBancariaController.update').middleware(['auth:api'])//EDITAR
//------------------------------------------ADICIONAR LOGO CLIENTES-------------------------------------
Route.post('clientes/:id/logo', 'LogoController.store')
  .middleware(['auth:api'])//CADASTRAR LOGO
Route.get('logo/:path', 'LogoController.show')//EXIBIR LOGO
Route.delete('clientes/logo/:id', 'LogoController.destroy')
  .middleware(['auth:api'])//DELETAR LOGO
//------------------------------------------CATEGORIAS CARDÁPIO CLIENTES--------------------------------
Route.group(() => {
  Route.resource('clientes/:client/categorias', 'CategoriaController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['clientes/:client/categorias.store'],
          ['Categoria']
        ]
      ]
    ))
}).middleware(['auth:api'])
//------------------------------------------ITENS CARDÁPIO CLIENTES-------------------------------------
Route.group(() => {
  Route.resource('clientes/:client/categorias/:category/itens', 'ItemController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['clientes/:client/categorias/:category/itens.store'],
          ['Itens']
        ]
      ]
    ))
}).middleware(['auth:api'])
//------------------------------------------ADICIONAR IMAGENS/ITENS CLIENTES----------------------------
Route.post('clientes/:client/categorias/:category/itens/:product/images', 'ImageController.store')
  .middleware(['auth:api'])//CADASTRAR IMAGEM
Route.get('clientes/:client/categorias/:category/itens/:product/images/:path', 'ImageController.show')//EXIBIR IMAGEM
Route.delete('clientes/:client/categorias/:category/itens/:product/:id', 'ImageController.destroy')
  .middleware(['auth:api'])//DELETAR IMAGEM
//------------------------------------------CATEGORIAS DE COMPLEMENTOS CARDÁPIO CLIENTES----------------
Route.group(() => {
  Route.resource('clientes/:client/categorias/:category/itens/:product/categoriescomp', 'CategoriaComplementoController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['clientes/:client/categorias/:category/itens/:product/categoriescomp.store'],
          ['CategoriaComplemento']
        ]
      ]
    ))
}).middleware(['auth:api'])
//------------------------------------------COMPLEMENTOS CARDÁPIO CLIENTES------------------------------
Route.group(() => {
  Route.resource('clientes/:client/categorias/:category/itens/:product/categoriescomp/:catcomp/complementos', 'ComplementoController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['clientes/:client/categorias/:category/itens/:product/categoriescomp/:catcomp/complementos.store'],
          ['Complemento']
        ]
      ]
    ))
}).middleware(['auth:api'])
//------------------------------------------TAMANHOS/PIZZA CARDÁPIO CLIENTES----------------------------
Route.group(() => {
  Route.resource('clientes/:client/categorias/:category/tamanhos', 'TamanhoPizzaController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['clientes/:client/categorias/:category/tamanhos.store'],
          ['TamanhoPizza']
        ]
      ]
    ))
}).middleware(['auth:api'])
//------------------------------------------MASSA/BORDA PIZZA CARDÁPIO CLIENTE--------------------------
Route.group(() => {
  Route.resource('clientes/:client/categorias/:category/massaborda', 'MassaBordaController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['clientes/:client/categorias/:category/massaborda.store'],
          ['MassaBorda']
        ]
      ]
    ))
}).middleware(['auth:api'])
//------------------------------------------SABOR PIZZA CARDÁPIO CLIENTE--------------------------
Route.group(() => {
  Route.resource('clientes/:client/categorias/:category/sabores', 'SaborController')
  .apiOnly()
  .validator(new Map(
    [
      [
        ['clientes/:client/categorias/:category/sabores.store'],
        ['Sabor']
      ]
    ]
  ))  
}).middleware(['auth:api'])
//------------------------------------------ADICIONAR IMAGENS/SABORES CLIENTES----------------------------
Route.post('clientes/:client/categorias/:category/sabores/:flavor/images', 'ImagemSaborController.store')
  .middleware(['auth:api'])//CADASTRAR IMAGEM
Route.get('clientes/:client/categorias/:category/sabores/:flavor/images/:path', 'ImagemSaborController.show')//EXIBIR IMAGEM
Route.delete('clientes/:client/categorias/:category/sabores/:flavor/:id', 'ImagemSaborController.destroy')
  .middleware(['auth:api'])//DELETAR IMAGEM
//------------------------------------------VALOR SABOR PIZZA CARDÁPIO CLIENTE--------------------------
Route.group(() => {
  Route.resource('clientes/:client/categorias/:category/sabores/:flavor/tamanho/:size/precos', 'ValorSaborController')
  .apiOnly()
  .validator(new Map(
    [
      [
        ['clientes/:client/categorias/:category/sabores/:flavor/tamanho/:size/precos.store'],
        ['PrecoSabor']
      ]
    ]
  ))   
}).middleware(['auth:api'])