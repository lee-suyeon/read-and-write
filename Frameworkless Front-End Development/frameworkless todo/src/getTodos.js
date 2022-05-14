// import faker from "faker";

// const createElement = () => ({
//   text: faker.random.words(2),
//   completed: faker.random.boolean()
// })

// const repeat = (elementFactory, number) => {
//   const array = []
//   for (let index = 0; index < number; index++) {
//     array.push(elementFactory())
//   }
//   return array
// }

// export default () => {
//   const howMany = faker.random.number(10)
//   return repeat(createElement, howMany)
// }

const todos = [
  { text: 'todo1', completed: false },
  { text: 'todo2', completed: false },
  { text: 'todo3', completed: false },
  { text: 'todo4', completed: false },
  { text: 'todo5', completed: false },
  { text: 'todo6', completed: false },
  { text: 'todo7', completed: false },
  { text: 'todo8', completed: false },
  { text: 'todo9', completed: false },
  { text: 'todo10', completed: false },
]

export default todos;