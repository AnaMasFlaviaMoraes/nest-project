
# 🚀 API de Gestão de Acessos e Permissões

API desenvolvida com **NestJS + Prisma + PostgreSQL/SQLite**, que implementa controle de usuários, autenticação via JWT, gestão de permissões por módulos e controle de acesso robusto.

---

## 🔐 **Módulos do Sistema:**
- ✅ **Gestão de Usuários** (Apenas Admin e Superuser)
- ✅ **Perfil** (Todos os usuários)
- ✅ **Financeiro** (Acesso via role ou permissão)
- ✅ **Produtos** (Acesso via role ou permissão)
- ✅ **Relatórios** (Acesso via role ou permissão)

---

## ⚙️ **Autenticação**
- Autenticação via **JWT**
- Roles disponíveis:
  - `SUPERUSER`
  - `ADMIN`
  - `USER`
- Permissões específicas por módulo:
  - `FINANCEIRO`
  - `PRODUTOS`
  - `RELATORIOS`

---

## 🎯 **Principais Rotas da API**

---

## 🔑 **Auth (Autenticação)**
| Método | Rota           | Descrição             |
|--------|----------------|-----------------------|
| POST   | `/auth/login`  | Login e retorno de token |

✔️ **Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha"
}
```

✔️ **Resposta:**
```json
{
  "access_token": "TOKEN_JWT"
}
```

---

## 👤 **Perfil**
| Método | Rota           | Descrição                 |
|--------|----------------|---------------------------|
| GET    | `/profile`     | Ver seu próprio perfil    |
| PATCH  | `/profile`     | Editar seu próprio perfil |

---

## 👥 **Usuários**
| Método | Rota           | Descrição                            |
|--------|----------------|---------------------------------------|
| POST   | `/users`       | Criar usuário (apenas ADMIN/SUPER)   |
| GET    | `/users`       | Listar todos os usuários (ADMIN/SUPER) |
| GET    | `/users/:id`   | Ver usuário específico (ADMIN/SUPER) |
| PATCH  | `/users/:id`   | Atualizar usuário (ADMIN/SUPER)      |
| DELETE | `/users/:id`   | Remover usuário (ADMIN/SUPER)        |

---

## 📦 **Produtos**
| Método | Rota            | Descrição                       |
|--------|-----------------|----------------------------------|
| POST   | `/products`     | Criar produto (ADMIN/SUPER)     |
| GET    | `/products`     | Listar produtos (com permissão) |
| GET    | `/products/:id` | Ver produto                     |
| PATCH  | `/products/:id` | Atualizar (ADMIN/SUPER)         |
| DELETE | `/products/:id` | Deletar (ADMIN/SUPER)           |

---

## 💰 **Financeiro**
| Método | Rota           | Descrição                          |
|--------|----------------|-------------------------------------|
| POST   | `/finance`     | Criar registro financeiro (ADMIN/SUPER) |
| GET    | `/finance`     | Listar registros (com permissão)  |
| GET    | `/finance/:id` | Ver registro específico           |
| PATCH  | `/finance/:id` | Atualizar registro (ADMIN/SUPER)  |
| DELETE | `/finance/:id` | Deletar registro (ADMIN/SUPER)    |

---

## 📊 **Relatórios**
| Método | Rota               | Descrição                         |
|--------|--------------------|------------------------------------|
| GET    | `/reports/finance` | Relatório financeiro              |
| GET    | `/reports/products`| Relatório de produtos             |
| GET    | `/reports/users`   | Relatório de usuários por role    |

---

## 🔐 **Permissões**
| Método | Rota                              | Descrição                                 |
|--------|------------------------------------|--------------------------------------------|
| POST   | `/permissions/:userId/:module`    | ✅ Dá permissão ao usuário para um módulo  |
| DELETE | `/permissions/:userId/:module`    | ❌ Revoga permissão do usuário             |
| GET    | `/permissions/:userId`            | 🔎 Lista permissões do usuário             |

✔️ **Módulos válidos:**  
- `FINANCEIRO`  
- `PRODUTOS`  
- `RELATORIOS`  

---

## 🔐 **Regras de acesso:**
- 🔥 `SUPERUSER` → Acesso total.
- 🔥 `ADMIN` → Acesso total, exceto funções específicas do SUPERUSER.
- 🔥 `USER` → Acesso restrito apenas aos módulos que possuir permissão explícita.

---

## 🧠 **Tecnologias utilizadas:**
- NestJS
- Prisma ORM
- SQLite ou PostgreSQL
- JWT (Auth)
- Bcrypt (Hash de senha)

---

## 🏁 **Rodando o Prisma Studio:**
```bash
npx prisma studio
```

---

## 🚀 **Rodando o projeto:**
```bash
npm install
npx prisma migrate dev
npx prisma generate
npm run start:dev
```

---

## 🛠️ **Observação importante:**
- Um **superusuário é criado automaticamente** na inicialização do projeto:
  - **Email:** `super@admin.com`
  - **Senha:** `super` (hash já aplicado)
  - ✅ Esse usuário pode criar administradores e usuários comuns, além de gerenciar todas as permissões.


## 🌱 Seed de Dados

O projeto contém um script de seed que popula automaticamente o banco de dados com:
🔑 Usuários:

  - Administrador → Email: admin@admin.com | Senha: admin
  - Usuário comum → Email: user@user.com | Senha: user

📦 Produtos:

  - Câmera Canon R6
  - Lente 50mm
  - Tripé Profissional

💰 Financeiro:

  - Venda de ensaio fotográfico (Entrada)
  - Compra de lente 50mm (Saída)
  - Pagamento de aluguel do estúdio (Saída)
  - Venda de sessão premium (Entrada)

### 🏁 Rode o seed:

```bash
npm run seed
```
