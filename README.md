# Typescript기반 Fastify, Prisma 백엔드 프로젝트
<details>
<summary>접기/펼치기</summary>
<br>

## NodeJS 백엔드 프레임워크
- ExpressJS
- Fastify
- Hapi
- koa
- restify

### Fastify의 장점
- 대중적인 프레임워크인 ExpressJS 대비 빠른 응답처리 속도
- 벤치마크상 NodeJS 프레임워크중 상위권
- ExpressJS 대비 2배이상의 속도
- 기본적으로 최소한의 기능을 제공하는 가벼운 프레임워크
  - 기능 확장을 통해 다양한 플러그인 제공
  - 커스텀으로 플러그인을만들어 기능 추가 가능
- Promise 비동기 처리 가능
- 표준화 된 JSON 스키마를 이용하여 유효성검사 가능하도록 지원

### prisma
- 대중적으로 인기있는 다양한 DB를 지원하는 ORM
- 스키마를 이용하여 데이터베이스 테이블을 직접 관리할 수 있는 기능 제공
- 별다른 DB 툴 없이 개발환경에서 사용하는 IDE를 통해 DB 구조 설정 가능

### Typescript
기본적인 기능들은 자바스크립트와 같지만 자바스크립트에서 커버하지 못하는 기능을 추가한 확장팩에 가까운 언어이다.  
</details>
<br>

# TypeScript 기초 1 - Type과 Type정의
<details>
<summary>접기/펼치기</summary>
<br>

```js
let num1 = 10
let num2 = 20
console.log(num1 + num2) // 결과: 30
```
위 코드를 보면 num1과 num2는 모두 정수 형으로 인식이 되므로 로그로 출력시 결과값이 30으로 출력된다.  

```js
let num = 10
let text = '테스트'
console.log(num + text) // 결과: 10테스트
```
위 코드의 경우 text는 문자 타입으로 할당되어 실제 결과는 문자열 연산으로 적용되어 10테스트 라는 결과를 얻게 된다.  
위와 같이 자바스크립트는 타입을 특정하지 않아도 동적으로 타입이 지정되는 방식의 언어이다.   

## 타입 명시가 필요한 이유

- 자바스크립트 예제
  ```js
  function typeTest1(param) {
    Math.round(param)
  }

  typeTest('1')
  ```
  typeTest() 함수는 param이라는 매개변수를 갖고, 전달된 param은 숫자형 타입만 적용되는 Math.round()를 이용하여 반올림을 계산한다.  
  누군가가 testType() 함수 인자에 문자를 전달하여 호출할 경우 오류가 발생하게 된다.  
  문제는 해당 오류가 코드를 실행해야 발생한다는 것이다.

- 타입스크립트 예제
  ```ts
  function typeTest2(param: number) {
    Math.round(param)
  }
  typeTest2('1') 
  ```

반면, 타입스크립트는 매개변수 param을 number타입으로 지정할 수 있다.  
또한 함수 호출시 매개변수에 문자를 입력하여 호출할 경우 코드를 작성할 때 오류가 발생하게 된다.  
즉, 코드를 서버 등에 올리기 전에 개발 단계에서 바로 오류를 확인할 수 있게 된다.  

## 기본 타입(원자성)
- number  
  정수 타입
- string  
  문자열 타입
- boolean  
  true/false (참/거짓) 타입
- null  
  값이 비어있는 타입
- undefined  
  정의되지 않은 타입
- any  
  어떠한 타입이든 모든 값을 받을 수 있는 치트키와 같은 타입  
- never
  아무 값도 가질 수 없는 자주사용되지 않는 특별한 타입  
- void  
  함수에서 반환값 즉, 리턴이 필요 없을 때 사용하는 타입  
- object  
  객체형태의 타입이다.  

위 타입들은 더이상 쪼개질 수 없는 원자의 성격을 가지며, 아래와 같이 타입을 지정할 수 있다.  
```ts
let num: number
let str: string
let bool: boolean
let no: null
let anyValue: any
```

## Type의 조합(객체형태)
기본 타입과 같이 단순하게 타입을 지정하는 경우도 있으나, 이러한 기본 타입들을 조합하여 객체 형태로 좀더 복합적인 형태의 타입을 만들어 사용할 수 있다.

```ts
type Person = {
  name: string
  age: number
}
let kim: Person
```

`type Person = {}`과 같이 정의하고, 중괄호 안에 객체 형태의 타입이 갖는 속성들에 대한 세부 타입을 지정해준다.  
이후 변수뒤에 콜른을 이용하여 만들어진 타입을 지정하면 된다.  

## union
앞서 하나의 변수에 하나의 타입을 지정한것과 달리, 필요에 따라 여러 타입을 선택적으로 사용될 경우가 있다.  
이럴 때 사용하는 것이 바로 union이다.  

버티컬바 `|` 를 이용하여 두가지 이상의 타입을 표기하면 된다.
```ts
let test: number | string
```
위 예제의 경우 test변수는 number또는 string타입 중 하나에 해당하는 타입을 가질 수 있다.  

```ts
function fn(param: Student | Worker): void {}
```
위 예제의 경우 fn 함수의 매개변수 param과 같이 Student 혹은 Worker 타입 중 하나의 타입을 가지게 설정할 수 있다.  
즉, 단순 원자타입이 아닌 사용자가 정의한 타입 역시도 union을 이용하여 여러 타입 중 하나를 갖게할 수 있다.  

## interface
타입을 지정하는 방법 중에는 interface라는 것도 있다.  
```ts
interface Person {
  name: string
  age: number
}
```
사용방법은 위와같이 type키워드 대신 interface 키워드로 정의하면 된다.  
type과는 다르게 할당하는 기호 `=`을 사용하지 않는다.  

interface는 type과 비슷하지만 타입과 다르게 속성의 확장이 가능하다.  

### interface의 확장
```ts
interface Person {
  name: string
  age: number
}
interface Student extends Person {
  /* Person의 name, age 확장 */
  major: string
}
interface Worker extends Person {
  /* Person의 name, age 확장 */
  skill: string
}
```
위 예제와 같이 extends라는 키워드를 사용하여 확장할 수 있다.  
Person타입을 extends 함으로써 Student와 Worker타입 모두 name과 age를 기본으로 갖되,  
Student는 major, Worker는 skill을 추가로 받는 형태가 되는 것이다.  

#### 다중 확장
```ts
interface Programmer extends Worker, Student {}
```
참고로 extends는 하나의 타입이 아닌 여러 타입을 extends 해서 받아올 수 있다.  
위 예제의 경우 name, age, major, skill을 기본으로 갖게 된다.  

#### type과 함께 사용 가능
```ts
type Person = {
  name: string
  age: string
}
interface Student extends Person {
  /* Person의 name, age 확장 */
  major: string
}
interface Worker extends Person {
  /* Person의 name, age 확장 */
  skill: string
}
```
첫번째 예제와 동일하게 Person의 name, age를 기본으로 갖게 된다.  

## 함수에서의 Type
함수에서는 매개변수와 반환값을 타입으로 지정할 수 있다.  
```ts
function sum(num1: number, num2: number): number {
  return num1 + num2
}
```
위 예제를 보면 매개변수 num1과 num2를 각각 number타입으로 지정하고
함수 내부에서 num1과 num2를 연산하여 반환하므로 해당 타입인 number 타입을 지정했다.  

### void 반환 타입
```ts
function sum(num1: number, num2: number): void {
  console.log(num1 + num2)
}
```
위 예제와 같이 주로 console.log()와 같이 로그를 출력하거나, 다른 함수를 출력하는 경우 등 return 하지 않을 때 void 타입을 지정한다.  
</details>
<br>


# TypeScript 기초 2 - 제네릭과 타입가드
<details>
<summary>접기/펼치기</summary>
<br>

## Generics

### generic 함수
```ts
function logText(text: string | number) {
  console.log(text)
  return text
}

const num = logText(1)
const a = logText('a')

a.toUpperCase(); // 오류 발생
```
위 예제와 같이 함수의 특정 매개변수에 한개 이상의 타입이 올 수 있게 만들어야 하는 경우가 있다.  
이때 타입스크립트에서 제공하는 union을 이용할 수 있으나 union으로 지정할 경우 number 즉 숫자 타입을 선택하고 소문자를 대문자로 치환하는 toUpperCase()와 같은 문자형을 위한 기능을 사용한다면 오류가 발생한다.  
toUpperCase가 문자열에만 적용이 되는데 `string | number`와 같이 union 타입으로 지정할 경우 문자가 될 수도 있고 숫자가 될 수도 있어 정확한 타입 체크가 어렵기 때문이다.  
물론 이런 경우 필요에 따라 함수를 여러개 만드는 방법 도 있지만, 완벽한 정답이라고 보기엔 어렵다.  
이런 경우에 편리하게 사용할 수 있는 기능이 타입스크립트의 generic이다.

```ts
function 함수명<타입변수> (매개변수: 타입변수) : 반환타입 {}
```
위와같이 함수명 옆에 홑화살괄호를 활용하여 `<타입변수>` 형태로 타입 변수를 정의하면 된다.  
그리고 매개변수나 리턴 값을 지정한 타입변수로 이용하여 타입을 지정할 수 있다.  
즉, 타입을 함수의 매개변수처럼 적용해 설정할 수 있게 되는 것이다.  

제네릭 타입의 경우 호출이 필요한 타입으로 변경이 가능하다.  
```ts
function identiiy<T>(arg: T): T {
  return arg;
}
identity<string>('hi')
identity<number>(10)
identity<boolean>(true)
```
위 예제와 같이 identity 함수 호출 예를 보면 상황에 맞게 인자값에 해당하는 타입을 설정한 것을 볼 수 있다.  
첫 번째는 string 형태의 인자를, 두 번째는 정수를, 세 번째는 boolean타입을 설정하고 해당 타입에 맞는 인자를 넣어 호출하고 있다.  
참고로 예로 든 변수 T의 경우 단일문자를 사용해도 되지만 실제 사용할 때는 변수나 함수명처럼 구체적으로 사용하는 것이 좋다.  

generic을 이용하면 아래와 같이 함수를 호출할 때 타입을 지정할 수 있으므로 어떤 함수의 매개변수나 리턴값이 여러가지 타입을 가질 수 있을 때 사용하면 매우 유용하다.  
```ts
function logText<T>(text: T): T {
 console.log(text)
 return text;
}

const str = logText<string>('abc') // 타입을 string 으로 지정
str.toUpperCase() // 정상작동
```
#### Generic함수 - 배열
또 배열의 경우 아래와 같이 `T[]` 형태로 배열 기호를 사용하거나 `Array<T>` 형태처럼 Array를 직접 써서 표현할 수도 있다.  
```ts
function identity<T>(arg: T[]): T[] {
  return arg.length
}
function identity<T>(arg: Array<T>): Array<T> {
  return arg.length
}
```
참고로 이때 만약 length와 같은 배열에 이쓴 기능의 경우 generic에 배열을 표시하지 않으면 오류가 발생하게 된다.  

### interface에서의 Generic
또 인터페이스에서도 제네릭을 사용할 수 있다.  
```ts
interface GenericFn<T> {
  (arg: T): T
}
function identity<T>(arg: T): T {
  return arg
}
let myIdentity: GenericFn<number> = identity
myIdentity(15);
```
위 문법은 함수 시그니처를 인터페이스로 정의하는 문법이다.  
즉, 인터페이스를 활용하여 함수 자체의 타입(형태)를 정의한다.  
T를 받아 T를 반환하는 함수여야만 한다는 규칙을 정의하였다.  
즉, 여러 함수들이 동일한 규격(시그니처)를 따르게 하기 위함이다.  
이와같이 사용할 경우 함수의 타입을 재사용할 수 있게 된다.  


자바의 Functional Interface와 동일하다고 생각하면 된다.

#### 자바의 Funcitonal interface
```java
interface GenericFn<T> {
  T fn(T arg)
}

public class Function {
  public static <T> T identity(T arg) {
    return arg;
  }
}

GenericFn<Integer> myIdentity = Function::identity
myIdentity.fn(15);
```

### Promise
서버와 통신등에 쓰이는 Promise의 경우 generic이 기본적으로 사용된다.  
```ts
async function test<T>(arg: T): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return arg;
}
```

generic은 특정 함수에서 매개변수나 리턴값이 상황에 따라 동적으로 타입이 달라지는 경우에 사용하면 상당히 유용하게 사용할 수 있다.  

## 타입 추론

[코드 레퍼런스](https://github.com/freeseamew/SLOG-FASTIFY-PRISMA-TS-STUDY/blob/master/src/services/articleService.ts)

![alt text](docs/images/image.png)  
createArticle의 경우 코드상으로는 리턴타입이 비어있으나 Promise 형태로 리턴 타입을 출력해준다.  
![alt text](docs/images/image-1.png)  
readArticleOne의 경우도 리턴 타입이 비어있으나, 실제로 메소드위에 마우스를 올릴경우 반환 타입을 출력해준다.  
즉, 코드상으로 표현되는 타입이 명확하다면 타입을 지정하지 않아도 타입스크립트가 타입을 추론해 낸다.  
타입 추론은 상당히 강력한 기능이다.  
이렇게 추론이 가능한 코드에서는 명시적으로 타입을 지정하지 않아도 된다는 것을 의미하고, 잘만 사용한다면 개발의 효율성을 높일수가 있다.  

</details>
<br>

# 프로젝트 세팅
<details>
<summary>접기/펼치기</summary>
<br>

## 의존성 설치 및 설정
1. fastify 디펜던시 추가  
   - command
     ```
     npm install fastify@4.15.0
     ```
2. typescript, @types/node 디펜던시 추가  
   - command  
     개발환경(devDependencies)에서만 사용될수 있도록 -D 옵션을 부여
     ```
     npm install -D typescript @types/node
     ```
3. typescript 설정파일 추가  
   - command
     ```
     npx tsc --init
     ```
4. nodemon, ts-node 디펜던시 추가  
   - nodemon : 파일의 변화를 감지해 변경이 있으면 자동으로 재시작해주는 패키지  
   - ts-node : 개발환경에서만이라도 컴파일없이 바로 타입스크립트상에서 프로젝트가 실행되게 해주는 패키지  
   - command  
     개발환경(devDependencies)에서만 사용될수 있도록 -D 옵션을 부여
     ```
     npm install -D ts-node nodemon
     ```
 
  
## 타입스크립트 설정
  
- tsconfig.js
  ```
  {
    "compilerOptions": {
      "module": "ES2022",
      "esModuleInterop": true,
      "target": "ES2022",
      "moduleResolution": "Node",
      "outDir": "./dist",
      "forceConsistentCasingInFileNames": true,
      "noFallthroughCasesInSwitch": true,
      "isolatedModules": false,
      "strict": true,
      "noImplicitAny": true,
      "useUnknownInCatchVariables": false,
      "inlineSourceMap": true
    },
    "include": [
      "src/**/*"
    ],
    "exclude": [
      "document",
      "backup"
    ],
    "ts-node": {
      "esm": true,
      "experimentalSpecifierResolution": "node"
    }
  }
  ```
  
  compilerOptions: 타입스크립트는 자바스크립트로 컴파일되어 작동하는데, 타입스크립트를 자바스크립트로 컴파일 할 수 있도록 설정 옵션들을 제공한다.  
  자바스크립트의 최신문법인 async await를 사용하기 위해서는 ES2020 버전 이상의 자바스크립트가 필요하다.  
  module과 target 옵션을 ES2022 혹은 ESNext로 설정하고 moduleResolution은 Node로 설정한다.  
  빌드시 작성한 코드를 포함할 폴더로 include 옵션에서 src 폴더를 `"src/**/*"`로 설정한다.  
  빌드시 제외할 폴더는 exclude에 설정한다.  
  import문을 사용하기 위해서는 ts-node 옵션에서 esm옵션을 true로, exprerimentalSpecifierResolution을 node로 설정한다.  
  빌드시 빌드될 파일들의 위치는 outDir 옵션에 `"./dist"`로 설정한다.
  
  
## package.json 

```json
{
  "name": "indiecoder-fastify-prisma-ts",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "type": "module",
  "scripts": {
    "start:build": "tsc -w --project tsconfig.json && npx -p tsconfig.json",
    "build:live": "nodemon --watch src --exec ts-node --esm src/main.ts --verbose",
    "start": "npm run build:live"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "fastify": "^4.15.0"
  },
  "devDependencies": {
    "@types/node": "^24.10.1",
    "nodemon": "^3.1.11",
    "ts-node": "^10.9.2",
    "typescript": "^5.9.3"
  }
}
```

### 커맨드라인 명령 설정
"scripts" 속성에 정의하며 서버를 실행하거나 빌드할때 사용한다.  

```json
"scripts": {
  "start:build": "tsc -w --project tsconfig.json && npx -p tsconfig.json",
  "build:live": "nodemon --watch 'src/' --exec ts-node --esm src/main.ts --verbose",
  "start": "npm run build:live"
}
```

#### build:live 옵션
- linux : 홑따옴표 포함
  ```json
  "build:live": "nodemon --watch 'src/' --exec ts-node --esm src/main.ts --verbose"
  ```
- windows : 홑따옴표 미포함
  ```json
  "build:live": "nodemon --watch src --exec ts-node --esm src/main.ts --verbose",
  ```
해당 속성에 등록한 명령을 통해 개발시 서버를 실행할 명령으로 컴파일 없이 바로 타입스크립트로 실행된다.  
(실제 운영서버에 올릴때에는 해당 명령을 실행하지 않고 컴파일된 파일을 바탕으로 실행되게 한다.)  

**분석**  
- `nodemon --watch 'src'` : nodemon으로 변경을 감지할 폴더(src)를 watch 옵션을 통해 지정
- `--exec ts-node --esm src/main.ts --verbose`: src/main.ts파일의 esm 모듈 방식으로 실행하되, ts-node에게 실행을 위임하고 실행 과정의 상세 로그를 출력
  - `--exec ts-node src/main.ts`: src/main.ts 파일을 nodejs 대신 ts-node가 실행하도록 위임하는 설정
  - `--esm`: ts-node가 타입스크립트 파일을 esm 모듈 방식으로 실행하도록 설정하는 옵션
  - `--verbose`: 실행과정의 상세 로그를 출력하도록 활성화 하는 옵션

#### start:build 옵션
dist 폴더에 자바스크립트로 빌드하는 옵션이다.  
타입스크립트로 작성한 코드를 tsconfig.json에 설정한 내용을 바탕으로 자바스크립트 코드로 변환하여 dist 폴더에 생성된다.
```json
"start:build": "tsc -w --project tsconfig.json && npx -p tsconfig.json"
```

#### start 옵션
build:live를 명령을 실행시킨다
```json
"start": "npm run build:live"
```

### ESM 모듈 설정
타입스크립트 내에서 import export 문법을 사용할 수 있다.  
```json
{
  /* 생략 */
  "type": "module",
  /* 생략 */
  "script": {
    /* 생략 */
  }
}
```

## 서버 실행 및 테스트

### fastify 테스트 API 코드 구성
- src/main.ts
  ```js
  import Fasitfy from "fastify";

  const fastify = Fasitfy()

  fastify.get('/ping', async (request, reply) => {
    return 'pong\n'
  })

  const start = async () => {
    try {
      await fastify.listen({ port: 8083 })
      console.log(`Server Start!!`)
    } catch (error) {
      fastify.log.error(error)
      process.exit(1) // 프로세스 종료
    }
  }

  start();
  ```

### 서버 기동
```bash
npm start
```
```
> indiecoder-fastify-prisma-ts@1.0.0 start
> npm run build:live


> indiecoder-fastify-prisma-ts@1.0.0 build:live
> nodemon --watch src --exec ts-node --esm src/main.ts --verbose

[nodemon] 3.1.11
[nodemon] to restart at any time, enter `rs`
[nodemon] or send SIGHUP to 7420 to restart
[nodemon] watching path(s): src\**\*
[nodemon] watching extensions: ts,json
[nodemon] starting `ts-node --esm src/main.ts`
[nodemon] spawning
[nodemon] child pid: 30196
[nodemon] watching 1 file
```

### get 요청 테스트 curl 명령
- powershell
  ```
  curl http://localhost:8083/ping
  ```
- prompt
  ```
  curl -X GET http://localhost:8083/ping
  ```

</details>
<br>

# Template
<details>
<summary>접기/펼치기</summary>
<br>

</details>
<br>
