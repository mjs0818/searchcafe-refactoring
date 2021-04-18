# TagName

## Option

tagName(string) 태그 이름이 들어갑니다. 들어갈 수 있는 목록은 figma 메인 페이지 태그 그대로 입니다.
isSmall(boolean) 값으로 true를 주면 태그가 작아집니다.
isButton(boolean) 값으로 true를 주면, hover 상태일 때 색이 바뀝니다.
color(string) 색을 지정하면 default가 아닌 다른 색으로 바뀝니다.

## Example

```js
<Tag tagName={스타벅스} isSmall={true} isButton={true} color="#ffffff"></Tag>
```

# Card

## Option

cafeImage(string??) 카페 대표 이미지
cafeName(string) - 카페 이름
cafeAddress(string) - 카페 주소
cafeTag(array) - 카페 태그 배열

## Example

```js
<Card
  cafeImage="blahblah.png"
  cafeName="삼성역 근처 카페"
  cafeAddress="삼성역"
  cafeTag={['편안한', '애완 동물 동반', '스타벅스']}
></Card>
```

# Scope

## Option

isScope(boolean) - 고정된 점수 보여줌
size - 크기
scope - 점수

## Example

```js
<Scope isScope={true} size="22px" scope={5}></Scope>
```
