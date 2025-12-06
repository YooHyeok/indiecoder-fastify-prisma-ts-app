function typeTest2(param: number) {
  Math.round(param)
}
typeTest2('1') // Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)
/* 
'string' 형식의 인수는 'number' 형식의 매개 변수에 할당될 수 없습니다.  
즉, 타입이 잘못되어 발생하는 오류이다.  
단순한 코드나 혼자서 개발할 때는 이런 류의 오류가 발생되는 상황이 제한적일 것이다.  
그러나 팀을 이루어 개발하거나 복잡한 내용의 코드를 작성하는 경우엔 동일한 오류가 생각보다 많이 발생할 수 있으며,  
이러한 오류가 서버에 실행중에 나타나기 떄문에 더 큰 문제가 발생할 수 있다.  
타입스크립트는 자바스크립트와 다르게 타입을 강제할 수 있으므로,  
위와같이 잘못된 타입으로 발생할 수 있는 다양한 문제들을 사전에 방지할 수 있는 강력한 특징을 가지게 된다.  


 */