
# Guia Prático de TypeScript — do zero até Next.js + SaaS

> Baseado no código do seu curso, com foco no que você vai realmente usar: servers, banco de dados, arrays e componentes.

---

## 0. O que o TypeScript **realmente** é (o pulo do gato que ninguém explica)

TypeScript **não roda**. Ele não existe em produção. O que acontece é:

```
seu-arquivo.ts  →  [compilador tsc]  →  arquivo.js (isso sim roda no navegador/servidor)
```

TypeScript é só uma camada de **verificação** que você usa _enquanto escreve o código_, pra pegar erros antes de rodar. É basicamente você deixando anotações tipo "essa variável só pode ser número" e o editor (VS Code) te avisa na hora se você tentar colocar um texto ali.

**Por que isso importa pra você:** em JavaScript puro, um erro de "usei a coisa errada" só aparece quando o código roda (às vezes só em produção, com o cliente usando). Em TypeScript, o editor te avisa **enquanto você digita**. É um corretor ortográfico para lógica, não uma linguagem nova pra decorar do zero.

Isso explica sua intuição: TypeScript "gerencia" dados, mas não no sentido de banco de dados — no sentido de **garantir que o formato dos dados está certo** em cada ponto do seu app (do banco → API → tela).

---

## 1. Tipos básicos — usando seu `index.ts`

```ts
let age: number = 5;
const name: string = "Mathias"
const isValid: boolean = true;
```
  
Isso lê-se: "`age` é uma variável que só pode guardar `number`". Se depois você fizer `age = "cinco"`, o TypeScript acusa erro **antes de rodar**.

Na prática, você quase nunca escreve o tipo em variáveis simples assim — o TS costuma **inferir** sozinho:

```ts
let age = 5; // TS já sabe que é number, sem precisar escrever ": number"
```

Você só escreve o tipo explicitamente quando o TS não tem como adivinhar (ex: parâmetro de função, ou quando a variável começa vazia).

### `any` — o "desliga o TypeScript" (evite)

```ts
let idk: any = 4;
idk = '125'; // permitido, sem erro
idk = true;  // permitido, sem erro
```

`any` diz "não verifica nada aqui". Usar `any` é basicamente voltar pro JavaScript puro naquele ponto — perde toda a vantagem do TS. Curso mostra isso pra você saber que existe, mas na prática **evite**. Se realmente não sabe o tipo ainda, existe uma alternativa mais segura: `unknown` (força você a verificar o tipo antes de usar).

### Arrays tipados

```ts
const ids: number[] = [1, 2, 3, 4, 5]
const names: string[] = ["Mathias", "Patricia"]
```

Isso é o que você mais vai usar num SaaS: listas de tarefas, listas de usuários, listas de pedidos vindas do banco. `string[]` = "array onde **todo** item é string".

### Union types (`|`) — "pode ser isto OU aquilo"

```ts
const productId: string | number | boolean = false;
```

Isso é extremamente comum em SaaS: um ID que às vezes vem como string do banco, às vezes como number. `string | number` documenta isso explicitamente em vez de você descobrir na marra depois.

### Enum — lista fixa de opções nomeadas

```ts
enum Direction {
    Up = 1,
    Down = 2,
    Left = "Esquerda",
}
```

Use quando você tem um conjunto **fechado** de valores possíveis — ex: `status: "pendente" | "pago" | "cancelado"` de um pedido no seu SaaS. (Aliás, hoje em dia a comunidade prefere **union de strings literais** em vez de `enum` — veja a seção 8.)

---

## 2. Objetos: `type` vs `interface` — usando seu `objects.ts`

Essa é provavelmente a coisa que você mais vai usar num SaaS: **descrever o formato dos dados** que vêm do banco.

```ts
type User = {
    firstName: string
    age: number
    email: string
    password?: string   // o "?" = campo OPCIONAL
    orders: Order[]
    register(): string
}
```

Isso é o "molde" de como um usuário deve ser. Qualquer variável do tipo `User` **precisa** ter esses campos (menos `password`, que é opcional por causa do `?`).

```ts
const user: User = {
    firstName: "Math",
    age: 18,
    email: "odevmathias@gmail.com",
    orders: [{productId: "123", price: 200}],
    register() { return "A"; },
}
```

Se você esquecer o campo `email`, por exemplo, o TS acusa erro na hora — isso é ouro quando você tem uma API retornando dados de usuário e você quer ter certeza que não esqueceu nenhum campo.

### `type` vs `interface`: qual usar?

No seu código aparecem os dois. Na prática, pra objetos, são quase intercambiáveis:

```ts
// como type
type UserType = { firstName: string; email: string }

// como interface
interface UserInterface { firstName: string; email: string }
```

**Regra prática pro seu dia a dia:**

- Use **`interface`** para formatos de objetos "principais" do seu domínio (modelo de usuário, modelo de tarefa, props de componente) — é o padrão mais comum em projetos Next.js/React.
- Use **`type`** quando precisar combinar tipos (union `|`, intersection `&`) ou tipar algo que não é só um objeto (ex: uma função, um union de strings).

### Combinando tipos com `&` (intersection)

```ts
type Author = { books: string[] }
const author: Author & User = { ...todos os campos de Author e User... }
```

`Author & User` = "precisa ter TODOS os campos de `Author` E de `User` ao mesmo tempo". Isso é útil quando você quer compor tipos menores em um maior — ex: `type AdminUser = User & { permissions: string[] }`.

---

## 3. Funções tipadas — usando seu `functions.ts`

```ts
const sum = (x: number, y: number): number => {
    return x + y
}
```

Lê-se: "recebe dois `number`, e **retorna** um `number`". O `: number` depois dos parênteses é o tipo do retorno.

```ts
const log = (message: string): void => {
    console.log(message)
}
```

`void` = "essa função não retorna nada útil" (não tem `return`, ou tem `return` sem valor).

**Por que isso importa num SaaS:** toda função que busca dado do banco, valida formulário, ou processa requisição — você vai tipar os parâmetros e o retorno. Isso evita, por exemplo, passar um `id` como `string` numa função que espera `number` e quebrar a query do banco.

### Funções assíncronas — o padrão que você MAIS vai usar

```ts
const returnPromise = async (): Promise<string> => {
    return "5"
}
```

Toda função `async` retorna uma `Promise`. Você tipa **o que tem dentro** da Promise: `Promise<string>` = "quando essa promise resolver, o valor de dentro vai ser uma string".

Isso é exatamente o que você vai escrever toda vez que buscar dado de uma API ou banco:

```ts
async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  const data: User = await response.json()
  return data
}
```

---

## 4. Classes — usando seu `classes.ts`

Você provavelmente vai usar **menos** classes num SaaS Next.js moderno (o padrão hoje é mais funções + objetos), mas entender os modificadores ajuda a ler bibliotecas (ex: classes de erro customizado, ou ORMs).

```ts
class Person implements IPerson {
    readonly id: number;      // não pode mudar depois de criado
    protected name: string;   // só a classe e as que herdam dela acessam
    private age: number       // só ESSA classe acessa, nem as filhas
    ...
}
```

- `readonly` → define uma vez (no construtor) e nunca mais muda. Útil pra IDs.
- `private` → "segredo" da classe, ninguém de fora mexe.
- `protected` → como `private`, mas classes filhas (`extends`) podem acessar.

```ts
class Employee extends Person {
    whoAmI() { return this.name } // "name" é protected, então Employee pode usar
}
```

**Onde você vai ver isso na prática:** classes de erro customizado em APIs Next.js —

```ts
class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message)
  }
}
```

---

## 5. Generics — usando seu `generics.ts` (o mais abstrato, mas o mais poderoso)

Generics travam MUITO porque parecem "álgebra" (`<T>`). Vamos direto ao "porquê".

```ts
function getFirstValueFromArray<Type>(array: Type[]) {
    return array[0]
}
```

Sem generics, você teria que escrever uma função pra pegar o primeiro item de array de string, outra pra array de number, outra pra array de User... Repetição total.

Com `<Type>`, você escreve **uma vez**, e o TypeScript "carimba" o tipo certo cada vez que você chama:

```ts
getFirstValueFromArray<string>(["1", "2"])   // TS sabe que o retorno é string
getFirstValueFromArray<number>([10, 20])     // TS sabe que o retorno é number
```

**`<Type>` é uma variável — só que de TIPO, não de valor.** Assim como `array` vira o array de verdade quando você chama a função, `Type` vira o tipo de verdade (`string`, `number`, `User`...) quando você chama.

### Onde isso vira ouro no seu SaaS: funções genéricas de fetch

```ts
async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url)
  return response.json()
}

// uso:
const users = await fetchData<User[]>("/api/users")   // TS sabe: users é User[]
const order = await fetchData<Order>("/api/orders/1") // TS sabe: order é Order
```

Uma função só, reutilizável pra **qualquer** endpoint da sua API, mantendo o tipo certo em cada chamada. Isso é praticamente o que você vai escrever toda vez que buscar dado do backend no Next.js.

---

## 6. Tipando componentes React — usando seu `Button.tsx`

```tsx
interface ButtonProps {
    text: string;
    onClick?: () => void;   // "?" = prop opcional
    children?: ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({text, onClick}) => {
    return <div onClick={onClick}>{text}</div>
}
```

`ButtonProps` é o contrato: "quem usar `<Button />` precisa passar `text`, e pode opcionalmente passar `onClick` e `children`".

**Forma mais usada hoje (2026), mais simples que `FunctionComponent`:**

```tsx
interface ButtonProps {
  text: string;
  onClick?: () => void;
  children?: ReactNode;
}

function Button({ text, onClick, children }: ButtonProps) {
  return <div onClick={onClick}>{text}{children}</div>
}
```

Você já faz exatamente isso nos seus componentes React (`Button`, `Input`, `Title` do projeto de tarefas) — só que sem tipar. Migrar pra TS ali seria só adicionar a `interface` de props em cada um.

---

## 7. TypeScript em rotas de API no Next.js (App Router) — o que você vai usar no SaaS

O Next.js atual (App Router, versão 16) usa arquivos `route.ts` dentro de `app/api/`. Isso substitui o "servidor Express" que você talvez imagine — o próprio Next.js _é_ o servidor.

```ts
// app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const tasks = await db.task.findMany() // exemplo com um ORM
  return NextResponse.json(tasks)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const newTask = await db.task.create({ data: body })
  return NextResponse.json(newTask, { status: 201 })
}
```

- `NextRequest` / `NextResponse` → versões tipadas de `Request`/`Response` da Web API, com extras do Next (cookies, etc).
- Cada função exportada (`GET`, `POST`, `PUT`, `DELETE`...) corresponde ao verbo HTTP.

### Rotas dinâmicas (ex: `/api/tasks/[id]`)

Desde as versões recentes do Next.js, os parâmetros de rota chegam como **Promise** (porque o Next passou a resolver isso de forma assíncrona):

```ts
// app/api/tasks/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const task = await db.task.findUnique({ where: { id } })
  return NextResponse.json(task)
}
```

Isso é exatamente o "servidor pra banco de dados" que você mencionou: cada `route.ts` é um endpoint, tipado de ponta a ponta.

---

## 8. Utility Types essenciais (o que todo projeto SaaS usa)

Esses são "atalhos" prontos do TypeScript pra transformar um tipo em outro, sem reescrever tudo. Extremamente comuns em SaaS com formulários e banco de dados:

```ts
interface Task {
  id: string
  title: string
  description: string
  isCompleted: boolean
}

// Partial<T> — todos os campos viram opcionais (útil em updates parciais)
function updateTask(id: string, changes: Partial<Task>) { ... }
updateTask("1", { title: "Novo título" }) // não precisa mandar TODOS os campos

// Pick<T, K> — pega só alguns campos do tipo
type TaskPreview = Pick<Task, "id" | "title">
// = { id: string; title: string }

// Omit<T, K> — tira alguns campos do tipo
type NewTask = Omit<Task, "id"> // pra criar tarefa nova, sem id ainda (o banco gera)

// Record<K, V> — objeto com chaves e valores tipados
const statusLabels: Record<"pending" | "done", string> = {
  pending: "Pendente",
  done: "Concluída",
}
```

Isso resolve exatamente o cenário "tenho o tipo `Task` completo do banco, mas no formulário de criação eu não tenho o `id` ainda" — em vez de criar um tipo novo do zero, você deriva com `Omit`.

### Union de strings em vez de `enum` (recomendado atualmente)

```ts
type TaskStatus = "pending" | "in_progress" | "done"

interface Task {
  status: TaskStatus
  ...
}
```

Faz o mesmo papel do `enum` que você viu no `index.ts`, mas é mais leve e mais comum em bases de código Next.js modernas.

---

## 9. `as` e `!` — assumindo responsabilidade sobre o tipo

Você já usou os dois no seu código:

```ts
let itemId = <string>productName;      // forma antiga de "as"
printLog(user.password!)                // "!"
```

**`as` (type assertion):** "eu, desenvolvedor, sei que isso aqui é desse tipo, mesmo que você (TS) não consiga provar." Use com cuidado — é você desligando a checagem naquele ponto específico.

```ts
const itemId = productName as string; // forma atual, prefira essa à sintaxe <string>
```

**`!` (non-null assertion):** "eu garanto que isso não é `null`/`undefined`, mesmo que o tipo diga que poderia ser."

```ts
printLog(user.password!) // "confia, password vai existir aqui"
```

**Cuidado:** os dois são você **prometendo** pro TypeScript, sem prova. Se a promessa for falsa, quebra em runtime do mesmo jeito que quebraria em JS puro — só que sem o TS te avisar antes. Use só quando você tem certeza real (ex: acabou de validar aquele dado).

---

## 10. Juntando tudo: modelando uma entidade do seu SaaS, do banco até a tela

Esse é o fluxo completo que você vai repetir o tempo todo:

```ts
// 1. O "molde" dos dados (costuma viver em types/task.ts)
interface Task {
  id: string
  title: string
  description: string
  isCompleted: boolean
  status: "pending" | "in_progress" | "done"
}

// 2. Função genérica de fetch (reutilizável pra qualquer entidade)
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Falha ao buscar dados")
  return res.json()
}

// 3. Rota de API tipada (app/api/tasks/route.ts)
export async function GET() {
  const tasks: Task[] = await db.task.findMany()
  return NextResponse.json(tasks)
}

// 4. Componente que consome isso, já tipado
interface TaskListProps {
  tasks: Task[]
}

function TaskList({ tasks }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  )
}
```

Repare: o tipo `Task` aparece em **todo lugar** — banco, API, componente. Essa é a "type safety de ponta a ponta" que dá tanto valor ao TS num projeto Next.js: se você mudar um campo no banco e esquecer de atualizar em algum lugar, o TypeScript acusa erro de compilação em vez de você descobrir com o app quebrado em produção.

---

## Cheatsheet rápido (cola pra consulta)

|Quero...|Sintaxe|
|---|---|
|Variável de tipo simples|`let x: number`|
|Array tipado|`string[]` ou `Array<string>`|
|"Pode ser A ou B"|`string \| number`|
|Objeto com formato fixo|`interface X { campo: tipo }`|
|Campo opcional|`campo?: tipo`|
|Função tipada|`(x: number): string => {...}`|
|Função assíncrona|`async (): Promise<string> => {...}`|
|Reutilizar lógica p/ vários tipos|`function f<T>(x: T): T {...}`|
|Props de componente|`interface Props { ... }` + `function C({ }: Props)`|
|Update parcial|`Partial<Task>`|
|Só alguns campos|`Pick<Task, "id" \| "title">`|
|Tudo menos alguns campos|`Omit<Task, "id">`|
|"Confio que é esse tipo"|`valor as Tipo`|
|"Confio que não é null"|`valor!`|

---

**Próximo passo natural:** quando começarmos o SaaS com Next.js de verdade, cada conceito daqui vai reaparecer no código real — e aí sim vai grudar. Teoria isolada não gruda; código rodando gruda.