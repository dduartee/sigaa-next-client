# sigaa-next-client

Este projeto está hospedado em [sigaa-next-client.vercel.app](https://sigaa-next-client.vercel.app/). <br>

## Disclaimer

O código em si, integra a [sigaa-socket-api](https://github.com/dduartee/sigaa-socket-api/) onde a qual tambem é integrada a [sigaa-api](https://github.com/GeovaneSchmitz/sigaa-api)
que é basicamente uma biblioteca Web Scraping, feita para acessar o [SIGAA](https://sigaa.ifsc.edu.br) (Sistema Integrado de Gestão de Atividades Acadêmicas) e retirar dados e fornecer para o usuario. Este codigo Front-end serve somente para acessar as APIs, ou seja, sem conexão com banco de dados externos e guardar senhas (sendo escolhido a utilização de tokens JWTs para identificar o usuário).

## Compatibilidade

### Vinculos inativos
Por questões de bugs e alguns problemas, não é possivel acessar vinculos inativos dentro deste contexto.

### Outros institutos
Atualmente foi testada em 2 Institutos, [IFSC (Instituto Federal de Santa Catarina)](https://ifsc.edu.br/) e na [UFPB (Universidade Federal da Paraíba)](https://www.ufpb.br/).

### Features do SIGAA não descobertas
O SIGAA por ser um sistema sem codigo-fonte aberto, não é possivel garantir 100% de compatibilidade com cada usuario.

## Página de login
![login](/docs/images/login.png)

## Página de seleção de vinculos
![bonds](/docs/images/bonds.png)

## Listagem de matérias
![courses](/docs/images/courses.png)

## Listagem de horarios
![schedules](/docs/images/schedules.png)

## Listagem de notas de todas as matérias
![grades](/docs/images/grades.png)

# Páginas
## To-Do

- [ ] Página de matéria (Full View)
- [ ] Página de noticias 

## Finalizadas
- [X] Página de horarios 
- [X] Página de notas
- [X] Página de matérias
- [X] Página de tarefas(incompleta)
