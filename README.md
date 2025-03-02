# Contatos Angular 📞

Este projeto é um desafio técnico para avaliação de habilidades em Angular 16. A aplicação permite listar, cadastrar, editar e excluir pessoas, seguindo boas práticas e padrões recomendados.

## 🚀 Tecnologias Utilizadas

- **Angular 16** - Framework principal para desenvolvimento frontend
- **TypeScript** - Para tipagem estática e melhor estruturação do código
- **Bootstrap/Tailwind** *(se aplicável)* - Para estilização da aplicação
- **API ViaCEP** - Para consulta automática de endereços pelo CEP

## 📌 Funcionalidades

✔️ **Listagem de Pessoas**  
- Exibe uma tabela com **ID, Nome, Endereço, CEP, UF, Ativo**  
- Exibe números de celular  
- Inclui botões para **editar** e **excluir**  

✔️ **Cadastro de Pessoas**  
- Campos obrigatórios: **Nome, CEP, Endereço, Cidade e UF**  
- Validação dos campos (tamanho e obrigatoriedade)  
- Consulta automática do endereço via API do [ViaCEP](https://viacep.com.br)  

✔️ **Edição de Pessoas**  
- Permite alterar os dados cadastrados  
- Mantém as mesmas validações da tela de cadastro  

✔️ **Exclusão de Pessoas**  
- Confirmação antes da remoção definitiva  

## 🛠️ Como Executar o Projeto

### 1️⃣ Clonar o repositório  
```bash
git clone https://github.com/eurmartins/Contatos-Angular.git
cd Contatos-Angular
```

### 2️⃣ Instalar as dependências  
```bash
npm install
```

### 3️⃣ Iniciar o servidor de desenvolvimento  
```bash
ng serve
```
Acesse [http://localhost:4200](http://localhost:4200) no navegador.

## 🎯 Estrutura do Projeto

```
📂 src
 ┣ 📂 app
 ┃ ┣ 📂 components  # Componentes reutilizáveis
 ┃ ┣ 📂 pages       # Páginas principais do projeto
 ┃ ┣ 📂 services    # Serviços de integração com API
 ┃ ┣ 📂 models      # Definição de interfaces/types
 ┃ ┗ 📜 app.module.ts  # Configuração principal do Angular
```

## 🎥 Demonstração *(opcional)*



## 📝 Considerações Finais

Este projeto foi desenvolvido seguindo boas práticas, com código modular e reutilizável. As diretrizes do desafio foram atendidas, garantindo uma aplicação funcional e bem estruturada.

📩 **Contato:** [Seu Email ou LinkedIn]
