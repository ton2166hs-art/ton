# SMELL GOOD PARFUM — Perfumaria Artesanal com Curadoria Editorial

Site institucional e e-commerce completo da **SMELL GOOD PARFUM** (Sertãozinho/SP).

---

## 📁 Conteúdo do Arquivo ZIP

- **Código-fonte completo**: React + TypeScript + Tailwind CSS (Vite)
- **Painel Administrativo**: `admin.html` (gestão de catálogo, fotos, preços, backups JSON)
- **Catálogo de Perfumes**: `produtos.json` com 46 fragrâncias inspiradas em grifes internacionais
- **Imagens e Assets**: Frascos de 60ml e 15ml Pocket em alta resolução na pasta `public/images/`
- **Componentes**:
  - Hero com estética editorial de luxo
  - Vitrine da Coleção Pocket 15ml
  - Grid com animação suave via Intersection Observer
  - Carrinho lateral (CartDrawer) com cálculo de frete flexível
  - Checkout com integração PIX copia-e-cola e envio de pedido direto para o WhatsApp
  - Consultor Olfativo com Sommelier de Fragrâncias

---

## 🚀 Como Executar em Sua Máquina Local

### Requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- Gerenciador de pacotes `npm`, `yarn`, `pnpm` ou `bun`

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o servidor de desenvolvimento
```bash
npm run dev
```
O site estará disponível em: `http://localhost:3000`

### 3. Gerar a versão de produção (Build)
```bash
npm run build
```
Os arquivos prontos para hospedagem (Vercel, Netlify, Cloudflare Pages, Hostinger, cPanel, etc.) serão gerados na pasta `dist/`.

---

## 🛠️ Acessando o Painel Admin
Acesse diretamente via navegador:
- Localmente: `http://localhost:3000/admin.html`
- Em produção: `https://seusite.com.br/admin.html`

Senha padrão de acesso do painel: `admin123` *(pode ser alterada no código do `admin.html`)*.

---

## 📞 Suporte e Contato
- **WhatsApp**: +55 (16) 98868-3561
- **Instagram**: [@smellgood.br](https://instagram.com/smellgood.br)
- **Localização**: Sertãozinho - SP, Brasil
