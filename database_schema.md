https://dbdiagram.io/d/6497294802bd1c4a5e023d66

Table users {
  id integer [primary key]
  username text
  name text
  password text
}

Table categories {
  id integer [primary key]
  name varchar [note: 'Category Name']
}

Table tags {
  id integer [primary key]
  name varchar [note: 'Tag Name']
}

Table questions {
  id integer [primary key]
  text text
  options array
  solution text
  points integer
  creator_id text
  category_id text
}

Table questions_tags {
  id integer
  question_id integer
  tag_id integer
}


Ref: questions.category_id > categories.id // many-to-one
Ref: questions.creator_id > users.id // many-to-one
Ref: questions_tags.question_id > questions.id // many-to-one
Ref: questions_tags.tag_id > tags.id // many-to-one