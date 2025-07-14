# Site TaxAds

## Configuração do Ambiente

1. Clone o repositório
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.local.example` para `.env.local`
   - Preencha as variáveis necessárias:
     - `NEXTAUTH_SECRET`: Chave secreta para autenticação
     - `NEXTAUTH_URL`: URL base da aplicação
     - `DISCORD_CLIENT_ID`: ID do cliente Discord
     - `DISCORD_CLIENT_SECRET`: Chave secreta do cliente Discord
     - `ADMIN_DISCORD_IDS`: IDs dos administradores
     - `DISCORD_WEBHOOK_URL`: URL do webhook do Discord
     - `DISCORD_BOT_TOKEN`: Token do bot do Discord
     - `NEXT_PUBLIC_IMGBB_API_KEY`: Chave da API do ImgBB
     - `DATABASE_URL`: URL de conexão do banco de dados Neon

4. Configure o banco de dados:
   - Crie uma conta no [Neon](https://neon.tech)
   - Crie um novo projeto e obtenha a URL de conexão
   - Adicione a URL de conexão na variável `DATABASE_URL` no arquivo `.env.local`
   - Execute as migrações:
     ```bash
     npm run db:migrate
     ```

5. Instale as depencias:
   ```bash
   npm i --legacy-peer-deps
   ```

6. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Estrutura do Projeto

- `/app`: Páginas e rotas da aplicação
- `/components`: Componentes React reutilizáveis
- `/lib`: Utilitários e configurações
- `/public`: Arquivos estáticos
- `/scripts`: Scripts de migração e utilitários

## Tecnologias Utilizadas

- Next.js 13+
- React
- TypeScript
- NextAuth.js
- Neon (Postgres Serverless)
- TailwindCSS
- Discord API